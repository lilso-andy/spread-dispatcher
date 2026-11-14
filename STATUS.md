# Shared status

## Objective

Build a level-8 dispatcher that meets the 90% on-time minimum and maximizes gross margin. Collaborate through private GitHub repo lilso-andy/spread-dispatcher, individual branches and PRs.

## Implemented

- Official TypeScript client and server docs downloaded.
- Dispatcher, route/notes modules, resumable practice/final runner, multi-seed evaluator, policy configs and offline behavior tests.
- Local credential file is ignored; every teammate supplies their own local `.env` using the same team key.
- baotran1604 and thanhdatLUT invited to the GitHub repo; both invitations were pending when created.

## Evidence so far

Current code `2a37b7f` with `configs/balanced.json`: 3/3 completed level-8 practice seeds ranked, 389 orders total, €8,647.13 total gross margin, worst on-time share 93.63%. One order remained undelivered on spread-1. No refused actions. See docs/BENCHMARKS.md and docs/benchmark-results.json for per-seed evidence and full config.

13 offline tests passed. An authenticated WebSocket replay smoke test passed against a disposable practice world. Live final timing and final rate buckets still need the announced test final. Default config remains conservative; select balanced explicitly for its measured results.

The initial code and recovery fixes are pushed to main. Reusable teammate prompts are in prompts/pricing.md and prompts/notes-tests.md. The proposed ownership in TEAM.md is for coordination; each teammate should confirm their assignment before overlapping edits.

## Next useful work

1. Improve pricing and volume while preserving on-time share on holdout seeds.
2. Expand note parsing with reveal-based failure cases, especially negation/corrections, colloquial times and recurring hours.
3. Add cross-order return chains/bundles without violating the 12-hour cap.
4. Exercise final stream reconnection in the announced test final; only one team machine runs it.

See TEAM.md for proposed module ownership. Record any new benchmark with seed + level + complete config in docs/BENCHMARKS.md.

## Dispatcher follow-up on work/dispatcher-reliability

The review branch removes redundant equal-fee reprices and adds paired-run/action-rate diagnostics. On five matched level-8 seeds with balanced config, both baseline and candidate ranked 5/5, with the same on-time shares (worst 93.63%), 680 orders and one undelivered order. Reprices drop 385 -> 96. Candidate total margin is €17,943.31 versus €17,947.12 baseline: €3.81 lower. Four seeds match to the cent. 19 offline tests pass.

Two earlier rescue/offer experiments earned less and were reverted from the production diff; all their results are retained. See docs/DISPATCHER_RELIABILITY.md and its three JSON reports for the exact revisions and evidence. Main policy defaults remain unchanged; the branch is for review, not automatically merged. No ranking or final was run. Next dispatcher target is late bundled-trade-in recovery, coordinated with pricing and notes owners.
