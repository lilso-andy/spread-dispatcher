"""Audit completed journals without reading credentials or reveal.

Usage: python3 analysis/margin_ledger.py path/to/world.jsonl [...]
All cents are integers. Multi-order gig charges without an order attribution stay
unattributed; no imagined revenue or hidden driver cost is counted as a loss.
"""
import collections
import json
import sys
from pathlib import Path


def audit(path):
    events = {}
    decisions = {}
    gigs = {}
    result = None
    for raw in Path(path).read_text().splitlines():
        row = json.loads(raw)
        if row['type'] == 'result':
            result = row
        elif row['type'] == 'event':
            events.setdefault(row['event']['seq'], row['event'])
        elif row['type'] == 'decision':
            decisions[row['requestId']] = row
        elif row['type'] == 'action' and row['result']['ok'] and row['action']['type'] == 'post':
            gigs[row['result']['id']] = set(s['orderId'] for s in row['action']['stops'])
    if result is None:
        raise ValueError(f'Incomplete journal: {path}')
    ledger = collections.Counter()
    orders = {}
    contribution = collections.Counter()
    reprices = collections.Counter()
    for event in sorted(events.values(), key=lambda e: e['seq']):
        if event['kind'] == 'order_won':
            orders[event['order']['id']] = event['order']
        if event['kind'] == 'ledger':
            line = event['line']
            ledger[line['kind']] += line['cents']
            ids = gigs.get(line['gigId'], set())
            order = line['orderId'] or (next(iter(ids)) if len(ids) == 1 else None)
            contribution[order or 'unattributed'] += line['cents']
    # Successful repricing is counted separately from the actual booked driver fee.
    for raw in Path(path).read_text().splitlines():
        row = json.loads(raw)
        if row['type'] == 'action' and row['result']['ok'] and row['action']['type'] == 'reprice':
            for order in gigs.get(row['action']['gigId'], set()):
                reprices[order] += 1
    score = result['score']
    if sum(ledger.values()) != score['marginCents']:
        raise ValueError(f'Ledger does not reconcile for {path}')
    lanes = {}
    for oid, cents in contribution.items():
        order = orders.get(oid)
        lane = 'unattributed' if not order else ' / '.join(
            leg['pickup']['placeId'] + '→' + leg['delivery']['placeId'] for leg in order['legs'])
        summary = lanes.setdefault(lane, {'ordersWithLedger': 0, 'marginCents': 0, 'negativeOrders': 0})
        summary['ordersWithLedger'] += 1
        summary['marginCents'] += cents
        summary['negativeOrders'] += int(cents < 0)
    accepted_routes = [d['route']['driveMinutes'] for d in decisions.values()
                       if d['accepted'] and d['requestId'] in orders and 'route' in d]
    return {
        'worldId': result['worldId'], 'score': score, 'actionRefusals': result['actionRefusals'],
        'config': result['config'], 'options': result['options'], 'ledgerCents': dict(ledger),
        'marginPerWonOrderEUR': score['marginCents'] / 100 / score['wonOrders'] if score['wonOrders'] else None,
        'declines': dict(collections.Counter(d['reason'] for d in decisions.values() if not d['accepted'])),
        'negativeContributionOrders': [{'orderId': oid, 'marginCents': cents, 'successfulReprices': reprices[oid]}
                                       for oid, cents in sorted(contribution.items(), key=lambda x: x[1]) if cents < 0],
        'lanes': lanes, 'successfulRepricesByOrder': dict(reprices),
        'plannedDriveHoursProxy': sum(accepted_routes) / 60,
        'proxyLimit': 'Quoted driving only, excludes approach, waiting, cancellations and replanning; not actual paid driver hours.',
    }


if __name__ == '__main__':
    if not sys.argv[1:]:
        raise SystemExit(__doc__)
    print(json.dumps([audit(p) for p in sys.argv[1:]], ensure_ascii=False, indent=2))
