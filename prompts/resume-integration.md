# Resume the dispatcher integration loop

Read AGENTS.md, README.md, STATUS.md and TEAM.md first. Work on `work/dispatcher-integration`. Practice only: **never use --board or --final** during this work. Keep the official starter intact. Do not print, copy into chat, or commit credentials.

The branch combines profit PR #3, reliability PR #2, pricing work through `e45f85d`, and main's merged environment setup PR #4. Main currently contains the environment helper but not the dispatcher optimization branches. Teammates can use `node setup-env.ts`; their real key remains local/ignored.

Validation known at handoff:

- PR #3 alone: five paired level-8 weeks €17,150.57 → €22,307.24 (+30.07%), all qualified, minimum 92.86%. See docs/QUOTE_RESULTS.md.
- Integrated production `de28d13`, level 8, development seeds spread-1/study-2/holdout-3: balanced €11,009.28, teammate cost configuration €13,965.12 (+26.85%). Both 3/3 qualified, but cost minimum is only 90.86%. Need new-seed comparisons before selecting it. Full configurations and scores: docs/integrated-cost-development.json.
- Multi-level baseline `1ac2844` is running on seed spread-1. Both configurations failed level 1 and level 2 at 88.89%, €179.44, 18 orders. Level 3 passed at 94.44%, €350.79. Balanced levels 4–6 passed at 100%; cost level 4 passed at 100%, later levels were still pending. See the timestamped snapshot docs/levels-initial-partial.json; it is explicitly incomplete.
- Unvalidated candidate production `4766c82` changes only levels 1–3: lower absolute contribution floor, recovery-cost reserve on >300-minute routes, and removal of upward fee feedback from our own posted prices. **It has not run on the server yet.** All 32 offline tests pass after the test-only cap assertion fix in `671b350`. Do not call this candidate a service fix until measured.

The previous two Node evaluation processes may still be running on the original machine. Their tool session IDs are 55971 (balanced matrix) and 71280 (cost matrix). Check those sessions and result metadata before doing anything with their worlds. At snapshot time, balanced was on level 7 world `w389e0eb99dc3b0f72049`, cost on level 5 world `wd37605442553a50098e7`. **Never start a second controller for a world.** On another machine, coordinate with the operator before resuming these worlds.

Original-machine raw logs and durable summaries: runs/levels-balanced-a, runs/levels-cost-a, runs/integrated-balanced and runs/integrated-cost. These are ignored and do not travel with Git. An isolated copy of baseline `1ac2844` is in runs/fixed-base-source. Matrix sources are already loaded into the active processes; the later local code edits do not change those running baselines.

Next work, in order:

1. Finish the two baseline sweeps and update the partial report, retaining every failed 90% threshold.
2. Run the fixed-price candidate on levels 1–3 with balanced config on spread-1 and at least one other identical seed for both baseline and candidate. Use the isolated baseline source or a separate checkout. Do not mix different configurations in a purported code-only comparison. Revert/adjust any unsuccessful candidate; preserve its measured results.
3. Validate integrated balanced versus cost on new level-8 seeds. Two new seeds already used for PR #3 were quote-unseen-01/02, so use additional new seeds for independent validation. Compare paired configs explicitly with tools/compare-dispatch.ts --allow-config-change; it records both configurations.
4. Extend the additional-level checks to a second seed, including levels 4–7. Report per-level margin and service, not a pooled figure that hides failures.
5. Fetch team branches again, inspect changes, integrate cleanly, run checks, and repeat practice comparisons. Keep changes on a personal branch/PR and record source hashes, configuration and complete results. No ranking runs; no claim of a global maximum.

Practice matrix command: `node --env-file-if-exists=.env tools/evaluate-levels.ts --levels 1,2,3 --seeds spread-1,study-2 --config configs/balanced.json --output runs/NEW_UNIQUE_FOLDER --reveal`. It runs sequentially, records failures, and keeps going. Do not rerun it into folders that already contain those same seeds.
