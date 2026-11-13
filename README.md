# Spread dispatcher

TypeScript dispatcher for Bahn's simulated Finnish car-transport market. Runs with Node >=22.18 or Bun, using the official client in `typescript/`. No dependencies.

## Run

Copy `.env.example` to `.env` and set your team key locally:

```powershell
Copy-Item .env.example .env
node --test test/*.test.ts
node --env-file=.env dispatch.ts --level 8 --seed spread-1 --reveal
```

The default policy is conservative. Practice logs, action results, scores and optional reveals go into ignored `runs/`. The world ID is printed and saved before the first clock advance. Interrupted worlds are preserved; resume with:

```powershell
node --env-file=.env dispatch.ts --world WORLD_ID
```

Compare a configuration on several seeds:

```powershell
node --env-file=.env evaluate.ts --config configs/balanced.json --seeds spread-1,study-2,holdout-3 --reveal
```

An evaluation exits with code 2 if any run is unranked. It reports both total margin and worst on-time share, and saves the complete results. The delivery minimum is **90% of won, non-cancelled orders**, every leg on time. Zero orders is unranked.

## Ranking and final

These are explicit opt-ins; practice does not use them:

```powershell
node --env-file=.env dispatch.ts --level 8 --board
node --env-file=.env dispatch.ts --final
```

`--board` consumes a ranking run. `--final` waits for a scheduled, unfinished final and uses the authenticated event stream. It reconstructs state after a server restart. It never advances or deletes a final. Keep exactly one active dispatcher per world across the whole team.

## Policy

- Offer each feasible delivery option, with extra booking slack for faster alternatives, a driver-fee estimate, margin floor and capacity reserve for simultaneous pending quotes. A request reserves capacity once across its alternative options. Learn small pricing adjustments from observed wins/losses and dealer trust.
- Check actual road times, opening hours, private slots, charging, plates and experienced/manual audiences before posting. Keep trade-in handover stops adjacent; split multi-car work over 12 road hours.
- Parse supported Finnish, Swedish and English note constraints. Unknown/ambiguous notes and summer-tyre exposure are declined by default. This sacrifices volume for reliability; the parser is a heuristic, not full language understanding.
- Start at a stable driver fee. Plan one rescue raise before last pickup, then escalate and target direct offers while recovery is still possible. Track local driver observations and bookings without pretending to know hidden availability or costs.
- Recover dropped/expired gigs and failed visits, de-duplicate replayed events, and record every refused action. Pause accepting new exposure if completed orders show excessive lateness.

## Files and collaboration

| File | Purpose |
| --- | --- |
| `desk.ts` | Event state, quotes, capacity, fees and offers |
| `planner.ts` | Road network and feasible stop windows |
| `notes.ts` | Conservative note extraction |
| `runner.ts` | Practice/final transport, recovery and JSONL logging |
| `dispatch.ts` | CLI |
| `evaluate.ts` | Reproducible multi-seed evaluation |
| `config.ts`, `configs/` | Validated tunable policy |
| `typescript/` | Official kit, including untouched starter baseline |
| `docs/` | Downloaded challenge references and benchmark evidence |

See [TEAM.md](TEAM.md) for the Vietnamese multi-machine workflow and proposed ownership. See [STATUS.md](STATUS.md) before taking over work.

On the profit branch, the measured policy uses `--config configs/balanced.json`: five paired level-8 practice weeks increased total gross margin 30.07%, with all five qualifying and a worst on-time share of 92.86%. See [docs/QUOTE_RESULTS.md](docs/QUOTE_RESULTS.md) for per-seed results and limitations. This does not change the conservative default configuration.

Limitations: the capacity model estimates hidden driver participation; no policy can promise 90% on unseen weeks. There is no cross-machine lock on final ownership, no calibrated probabilistic cost model, and no cross-order gig bundling yet. Use multi-seed evidence before selecting the final policy.
