# Spread dispatcher

TypeScript dispatcher for Bahn's simulated Finnish car-transport market. Runs with Node >=22.18 or Bun, using the official client in `typescript/`. No dependencies.

## Run

Create a local `.env` from the tracked `.env.example`, then set your team key privately. `.env` is intentionally ignored by Git and is not shared between workspaces:

```powershell
node setup-env.ts
```

After filling in `SPREAD_KEY` locally:

```powershell
node setup-env.ts --check
node --test test/*.test.ts
node --env-file-if-exists=.env dispatch.ts --level 8 --seed spread-1 --reveal
```

If your task environment already supplies `SPREAD_KEY` and `SPREAD_URL`, a `.env` file is optional. Use `--env-file-if-exists=.env` in the commands below in that case. `--check` checks configuration presence without displaying credentials; it does not call the server. Never commit the real `.env` or paste its contents into a shared prompt.

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

- Offer one feasible delivery option, with a driver-fee estimate, margin floor, lead-time buffer and capacity reserve for simultaneous pending quotes. Learn small pricing adjustments from observed wins/losses and dealer trust.
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

Limitations: the capacity model estimates hidden driver participation; no policy can promise 90% on unseen weeks. There is no cross-machine lock on final ownership, no calibrated probabilistic cost model, and no cross-order gig bundling yet. Use multi-seed evidence before selecting the final policy.
