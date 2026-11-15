# Dispatcher reliability follow-up

14 November 2026. Work is isolated on `work/dispatcher-reliability` for review. No ranking runs or live final were used.

## Proposed change

An open gig whose current fee already meets the required rescue fee used to receive another identical-price reprice every hour. A reprice replaces the whole schedule, so such calls can also remove a prearranged later step. Send a reprice only when the required fee is higher than the current fee. Actual fee increases still go through.

The production diff in desk.ts is one condition. Quote multipliers, note parsing, capacity, stop planning and direct offers retain the main policy. The branch also adds behavioral regression tests and reproducible comparison tooling.

## Paired practice evidence

Baseline source: `5f33186`; proposed source: `c90e213d8d29324077ae02eb5b0b62b0f22db801`. Both use the same complete `configs/balanced.json` policy at level 8. The baseline was rerun for all five seeds, including the two additional dispatch seeds. Every row is a completed week.

| Seed | Baseline margin | Proposed margin | On time, both versions | Ranked, both |
| --- | ---: | ---: | ---: | --- |
| spread-1 | €3,188.67 | €3,188.67 | 96.60% | yes |
| study-2 | €2,558.43 | €2,554.62 | 93.63% | yes |
| holdout-3 | €2,900.03 | €2,900.03 | 98.82% | yes |
| dispatch-holdout-a | €3,636.06 | €3,636.06 | 99.12% | yes |
| dispatch-holdout-b | €5,663.93 | €5,663.93 | 99.44% | yes |

- All five runs ranked for both versions; no failed 90% thresholds.
- Both won 680 non-cancelled orders, with identical on-time shares per seed and one undelivered order in spread-1.
- Reprices fell from **385 to 96**: **289 fewer, 75.06% reduction**. Offers remained 16,631. Both had zero refused actions.
- Total margin changed from **€17,947.12 to €17,943.31**, a reduction of **€3.81 (0.021%)**. Four seeds match to the cent. On study-2 the ledger difference is an extra €3.81 driver fee for R00580; suppressing a request is not a promise of identical simulation outcomes.
- The candidate is an action/schedule cleanup, not an improvement in measured gross margin. Review the small cost against fewer redundant calls and preservation of future fee steps before merging.
- 19 offline tests pass: existing behavior, real rescue increases, unchanged-fee suppression, future-step preservation and action-bucket replay.

Full policies, scores, world IDs, action counts and per-run timings: [dispatcher-reprice-results.json](dispatcher-reprice-results.json).

## Two rejected experiments

Both alternatives were tested on the same five seeds and met the delivery minimum, but earned less than the baseline. They were removed from the proposed production diff.

| Experiment | Source | Total margin | Worst on-time share | Reprices | Offers | Decision |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| Rescue at every posted pickup cutoff; offer only within 3 hours of readiness | 23d76e8 | €13,008.58 | 96.55% | 243 | 2,888 | reject: margin fell 27.5% |
| Rescue at posted cutoff only on last pickup day; same offer restriction | e5ace87 | €16,437.18 | 91.67% | 121 | 3,134 | reject: lower margin and worse minimum service |

Earlier daily windows can expire while an order still has later delivery opportunities. Paying rescue rates against every such window proved expensive. Restricting offers and moving fee timing also changes bookings, learned fees and later wins; these results do not isolate either factor individually.

Full results, including all seeds: [experiment 1](dispatcher-rescue-v1.json), [experiment 2](dispatcher-rescue-v2.json). These seeds are development evidence now, not fresh holdouts for further tuning.

## Action-rate replay and its limits

`tools/rate-replay.ts` maps world minutes to the published final clock speeds and replays the final action bucket (20 actions/second, capacity 50). It accounts only for action-token pressure: no network/read latency or behavioral effects from delayed actions. It does not establish live-final performance.

On these traces, both the baseline and proposed change have at most 0.20 seconds of action-token lag and zero quotes delayed past their response deadline by that bucket alone. The experiments reduce traffic further, but this replay found no baseline action-bucket overload that would justify their margin loss. A coordinated live test final is still needed.

## Reproduce

Run each code revision on the same seeds/config and save to separate folders, then:

```powershell
node --test test/*.test.ts
node tools/compare-dispatch.ts --baseline runs/rescue-baseline --candidate runs/reprice-only --out docs/dispatcher-reprice-results.json
```

The comparator refuses incomplete weeks, duplicate seeds, unmatched seed sets, differing levels or differing complete policies. All raw journals and reveals stay in ignored runs/; no credentials are included in the committed reports.

## Next dispatcher work

Investigate bundled trade-ins whose old-car pickup should remain attached to the new-car delivery even after the booked hour (RULES.md). The current planner can split a narrow trade-in into separately priced legs; the surviving undelivered order R00769 on spread-1 is a useful regression case. Model single-leg recovery cost before changing the dispatch policy. Keep note/parser and pricing work coordinated with their owners.
