# Shared status

## Full season 7 ranking request

Level 8 is COMPLETE and officially ranked in season 7. Five of five weeks qualified, total margin €46,727.06, weighted on-time share 96.96%, rank 48 at verification. All orders delivered in every week, zero refused actions at level 8. The serial controller has advanced to level 7 run 3. Baseline practice `w0185db3150ff65a64ecb` also began for the isolated recovery experiment after the slot became free. The live board and full results are recorded in `docs/ranking-s7-full.json`.

The user changed scheduling to one level at a time, descending from 8. The six-worker allocation process was stopped with its exit confirmed. Serial session `71491` now owns `runs/rank7-full/manifest.json`. It resumes level 8 run 3 and completes that level before proceeding to 7, 6, 5, 4, 3, 2 and 1. Existing unfinished worlds at other levels are parked for that controller. They retain their original source, configs and output folders. At this checkpoint levels 7 and 8 have two qualified final weeks each. Level 8 run 2 earned €11,088.08 at 99.25% on time. Prospective improvements are evaluated separately before use.

The user authorized completing all five official ranking weeks at every level. Session `79989` owns `runs/rank7-full/manifest.json`, frozen source `9e47485` and the selected ranking presets. At start, levels 7 and 8 each had one qualified completed week and levels 1–6 had none. The full sweep runs up to six owned worlds concurrently, checks shared slots and prioritizes completing levels 7–8. Results are recorded in `docs/ranking-s7-full.json`. Read `prompts/resume-16000.md` before resuming anything. This section records an active run, not evidence of a completed five-week rank.

## Ranking recovery after round change

Recovery is complete. All six previously interrupted season 6 worlds ended and were independently checked against the public board. Final margins were €8,882.90 at level 1, €8,406.18 at level 2, €8,984.92 at level 3, €2,721.85 at level 6, €8,142.44 at level 7 and €10,046.25 at level 8. Every week qualified, all orders delivered, zero refused actions. This is a partial season because the round changed before the remaining runs were created.

The subsequent explicitly requested season 7 trial is complete. Level 7 run 1 earned €647.83 with 95.24% on time. Level 8 run 1 earned €9,153.87 with 94.31% on time. Both fully delivered, zero refused actions. Exact configs and server/board verified results are in `docs/ranking-s7-trial.json`. Neither reached €16,000. All recovery and trial controllers have stopped. No owned unfinished worlds remain from these controllers.

Live rules, API and leaderboard code checked on 14 November still expose eight levels. Season 7 Saturday 15:00 is current. Season 6 has closed for new runs. Six season 6 controllers were found stopped and their exact worlds were resumed only after checking the original processes had ended. The resumed level 7 run 2 finished at €8,142.44 with 97.78% on time. Level 8 run 2 finished at €10,046.25 with 95.29% on time. Both delivered every order. Level 1, 2, 3 and 6 runs are still being monitored. `docs/ranking-s6-sweep.json` contains server and leaderboard verified completed results. Resume ownership is recorded in `prompts/resume-16000.md`.

## Objective

Build a level-8 dispatcher that meets the 90% on-time minimum and maximizes gross margin. Collaborate through GitHub repo lilso-andy/spread-dispatcher, individual branches and PRs. The owner has made the repository public; credentials and raw practice logs remain ignored.

## Implemented

- Official TypeScript client and server docs downloaded.
- Dispatcher, route/notes modules, resumable practice/final runner, multi-seed evaluator, policy configs and offline behavior tests.
- Local credential file is ignored; every teammate supplies their own local `.env` using the same team key.
- baotran1604 and thanhdatLUT have accepted their invitations and appear as collaborators (Write access on this personal repository). A teammate's Codex Cloud connection can still lack permission independently of their collaborator role. Unpublished commit 7f43c1a is not present in this clone: recover it from the original task before replacing that workspace.

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

## Dispatcher profit branch, 2026-11-14

`work/dispatcher-profit` contains the trade-in handover correction at `19ba376`, with 19 offline tests passed. Main remains `5f33186`; this branch does not include the independent reprice-deduplication PR #2. Seven complete, paired level-8 server weeks with balanced configuration all qualified and had zero refused actions. Combined gross margin increased €319.17 (+1.20%), worst candidate service was 95.30%, and the one undelivered baseline order was recovered. However, the two fresh holdouts lost €223.26 (-2.58%). This is not evidence of consistent unseen profit growth. See docs/TRADE_IN_RESULTS.md and its two JSON reports for every pair.

Selected production source `8430f689ea41ff4a6777439d97fccdd00b7d41d6` offers independently feasible delivery options in one quote, reserving only one order's capacity. Faster options need twice the ordinary booking lead. It retains balanced pricing and conservative notes. Five paired complete server weeks increased margin from €17,150.57 to €22,307.24 (+30.07%), increasing on every seed. Both versions qualified in 5/5 weeks; no failed final 90% thresholds. Candidate worst on-time share is 92.86% (main 93.63%), with zero undelivered orders and zero refused actions. Two new-seed totals rose 32.86%; these are practice results, not an unseen-final guarantee. See docs/QUOTE_RESULTS.md and the machine-readable reports.

The earlier unrestricted alternatives at `ae11f0c` earned less overall (€21,798.05) and were closer to disqualification (study-2 at 90.28%). Its full results remain recorded. Final offline suite: 26 passed, including existing diagnostic utility tests reused from PR #2. No ranking run or live final has been started. Do not assume a combination with the teammate's pricing candidate or PR #2's production change is validated.
## Dispatcher follow-up on work/dispatcher-reliability

The review branch removes redundant equal-fee reprices and adds paired-run/action-rate diagnostics. On five matched level-8 seeds with balanced config, both baseline and candidate ranked 5/5, with the same on-time shares (worst 93.63%), 680 orders and one undelivered order. Reprices drop 385 -> 96. Candidate total margin is €17,943.31 versus €17,947.12 baseline: €3.81 lower. Four seeds match to the cent. 19 offline tests pass.

Two earlier rescue/offer experiments earned less and were reverted from the production diff; all their results are retained. See docs/DISPATCHER_RELIABILITY.md and its three JSON reports for the exact revisions and evidence. Main policy defaults remain unchanged; the branch is for review, not automatically merged. No ranking or final was run. Next dispatcher target is late bundled-trade-in recovery, coordinated with pricing and notes owners.

## Integration loop, 2026-11-14

`work/dispatcher-integration` merges the profit branch, pricing branch `0a07bfc` and reliability branch `f997df7`. Both earlier status sections above are historical evidence for their separate branches. The integrated policy is not validated by those individual results. Practice-only comparisons of balanced and the teammate's cost configuration are next. Do not run ranking or the live final during this loop.

Latest pricing analysis `e45f85d` and main's environment setup PR #4 are now integrated. Level-8 development runs on `de28d13` completed: balanced €11,009.28, cost €13,965.12 (+26.85%) across spread-1/study-2/holdout-3, each 3/3 eligible, no refused actions. Cost minimum service is only 90.86%, versus balanced 92.86%; holdouts are not yet complete, so this is not a final policy selection.

Multi-level baseline source `1ac2844`: on spread-1, both balanced and cost configurations **failed level 1 and level 2**, each €179.44 and 88.89% on time (18 orders). Level 3 passed at €350.79 and 94.44%. Matrix raw logs and durable partial summaries are in ignored runs/levels-balanced-a and runs/levels-cost-a. These completed failures must remain in the report. Further levels are still running.

Candidate production `4766c82` changes only levels 1–3: a 500-cent absolute contribution floor alongside the existing percentage reserve, a higher estimated recovery cost for trips over 300 mapped road minutes, and a stable 1.05 fee estimate instead of upward feedback from our own accepted prices. Levels 4–8 retain their existing behavior. A test-only assertion was corrected for the existing 1.9 cap; all 32 tests now pass. Server validation of this candidate is pending; do not claim the lower-level failure is fixed yet.

User requested an immediate GitHub checkpoint before running out of context. See prompts/resume-integration.md for source hashes, active evaluation sessions/worlds, credential setup and the ordered continuation plan. docs/levels-initial-partial.json is a timestamped incomplete baseline snapshot; it does not validate the candidate. No ranking or final was started by this integration loop.

Dispatch lead: round 1 completed on frozen integration 3cb7ba4. Cost passed the fresh level 7 and 8 holdout; see docs/DISPATCH_78.md and docs/dispatch-78-practice.json for all paired weeks. Both prior matrices ended; full results, including the four failures, are in docs/dispatch-prior-matrices.json.
Level 8: lower emergency fee passed a new holdout at identical service (+126.65 euros). Selected preset and every paired result in docs/DISPATCH_78.md.
Dispatcher integration: three rounds finished. On 3cb7ba4 use docs/dispatch-presets/level-7.json or level-8.json explicitly. New level 7 holdout +803.12 euros, weakest development week 90.18%; cost is the safer measured fallback. All 20 new plain-practice weeks qualified, zero undelivered/refusals. See docs/DISPATCH_78.md for losses, earlier failures and limits. No active worlds from this benchmark.

Team sync: integration cd40c22 includes pricing 645e0eb and notes 471f06d; 72 tests passed. Paired level 7/8 validation is running on sync-78-a/b with explicit level presets. Raw IDs in runs/sync-78; source worktrees frozen. No teammate thread was connected in this host; synchronization uses published branches/reports. Do not treat this checkpoint as completed validation. See docs/SYNC_78.md.

Team sync completed: pricing 645e0eb and notes 471f06d integrated at cd40c22. Level 7 passed two seeds plus fresh proof (+998.40 euros total) with its existing preset; source cd40c22. Level 8 integration initially added an undelivered order and was rejected despite higher pooled margin. Planner fix 9205a34 permits waiting across destination opening intervals; paired three-seed margin gain 1303.63 euros vs cd40c22, fresh proof +476.65, worst service 90.91%. Select 9205a34 only for level8 with existing preset; level7 planner revalidation pending. Reports docs/SYNC_78.md and docs/SYNC_ROUTE.md contain all 16 new weeks, exact configs/commits/world IDs/ledger. 73 offline tests pass; server final scores verified. No own active worlds, no ranking/final/PR merge. Continue with planner level7 revalidation or lower-risk service improvements before more fee cuts.

Explicitly authorized ranking sweep completed: season6 Saturday12:00, exactly run1 at each level1–8, source a112534. All eight qualified and fully delivered. Level7 EUR6258.71/223 orders/94.17%; level8 EUR8823.72/233 orders/97.42%. 87 offline tests passed before running. All end scores and board entries independently verified, full configs and refusals in docs/ranking-s6-results.json, summary docs/RANKING_S6.md. Four runs remain per level in this season at checkpoint. No final or extra runs; no own active worlds.

EUR16k goal active: user requires each of>=3 fixed seeds per level7/8 >=EUR16,000 and>=90% on-time; report success then WAIT for model switch before ranking. No further ranking. Selected shortage feedback cap a5286b4 passed both levels with fresh proof; selected level8-only readiness-timed offers passed3 matched seeds. Level7 timing trial rejected, restored old trigger. Price1.25 trial rejected both levels, includes88.33% failed week. docs/TENK_78.md and docs/tenk-78-results.json hold22 final server-verified weeks with full sources/configs/IDs/ledger.91tests passed. No own active worlds. Source/config behavior of this release: level7 a5286b4 + existing ranking preset; level8 cb2e5ab timing + existing preset, restricted release guard only. Next explore explicit lower-fee economy/earlier offer efficiency with preregistered matched experiments; baseline MUST be current release with exact configs, no claimed16k progress beyond recorded results.
# Practice checkpoint for the €16,000 weekly target

The user authorized all remaining official runs for levels 1–8 in season 6. At handoff the team had used two per level 1–6 and one per level 7–8, leaving 26 slots. For levels 4–5 the synchronized team trials support quote 1.05 and fee 0.95. For level 6 they support a 900-cent minimum margin. The three-seed comparisons and independent holdouts are in `docs/NOTES_RESULTS.md`. Levels 1–3 and 7–8 use their existing ranking presets. The level 7 cheap-fee trial failed at 81.55% on `study-2`.

The same candidate must reach €16,000 and 90% on time in every validation week at levels 7 and 8 separately. The first completed round 4 pair at level 7 on `spread-1` earned €5,012.15 (baseline, 180/183 on time) and €5,749.00 (fee multiplier 0.86, 199/203 on time). Both delivered every order with zero refused actions. Both used `baab6f09b4ac8c0d7e4b674310cf5df7b549e723`. The other comparisons are pending. See `docs/tenk-78-results.json` for exact configurations and `prompts/resume-16000.md` for controller ownership.

