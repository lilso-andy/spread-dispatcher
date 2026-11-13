# Shared status

## Objective

Build a level-8 dispatcher that meets the 90% on-time minimum and maximizes gross margin. Collaborate through private GitHub repo lilso-andy/spread-dispatcher, individual branches and PRs.

## Implemented

- Official TypeScript client and server docs downloaded.
- Dispatcher, route/notes modules, resumable practice/final runner, multi-seed evaluator, policy configs and offline behavior tests.
- Local credential file is ignored; every teammate supplies their own local `.env` using the same team key.
- baotran1604 and thanhdatLUT invited to the GitHub repo; both invitations were pending when created.

## Evidence so far

Conservative policy on level 8 seed `spread-1`: 20 orders, 100% on time, €977.20 gross margin, ranked; full week completed. More seeds and balanced policy are being evaluated. This one result does not establish general reliability.

## Next useful work

1. Improve pricing and volume while preserving on-time share on holdout seeds.
2. Expand note parsing with reveal-based failure cases, especially negation/corrections, colloquial times and recurring hours.
3. Add cross-order return chains/bundles without violating the 12-hour cap.
4. Exercise final stream reconnection in the announced test final; only one team machine runs it.

See TEAM.md for proposed module ownership. Record any new benchmark with seed + level + complete config in docs/BENCHMARKS.md.
