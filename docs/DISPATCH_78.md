# Dispatch practice, levels 7 and 8

Frozen integration: `3cb7ba4b4bff35e5a66b3cdb18b28e1820882bf0` (not main `9dccfdb`). The two previous matrix controllers finished; both matrix files are complete, and the server confirms their checkpoint worlds ended. The newer pricing and notes heads, `3076729` and `471f06d`, are separate proposals, not this integration. Do not pool scores across those trees.

Round 1, specified before new runs: compare the existing balanced and cost presets on *identical unmodified integration code* at each level. Cost changes the opening-fee floor from 1.20 to 1.08 and local capacity fraction from 0.20 to 0.28 together; this measures the preset, not either parameter in isolation. Historical balanced level 7 spread-1 ledger: €8,685.99 driver fees vs €8.00 refunds. Historical balanced level 8 study-2: €19,978.70 fees and €1,049.10 refunds. These are hypothesis inputs only; rerun every comparison on the pinned commit.

Development seeds: spread-1 and study-2. If total margin increases at a level and every candidate week qualifies, run both presets on unused seed dispatch-proof-78-01. Keep baseline if the holdout gain fails to repeat, any candidate week misses 90%, or if margins are within 1% and baseline offers the higher worst service. Compare fees per won order, refunds, and service alongside gross margin. No strategy edits in this round.

Round 1 decision: select cost for both levels on this integration. On the independent seed it gained 82,663 cents at level 7 (both 100% on time), and 220,643 cents at level 8 (100% vs 99.43%). All twelve end scores qualified, with zero undelivered and zero refusals. The earlier matrices are separate evidence: both presets failed level 1 and level 2 on spread-1 at 88.89%. See dispatch-prior-matrices.json for all 14 historical weeks and dispatch-78-practice.json for this experiment.

Round 2, specified before execution: on the two level-8 cost development weeks, 13 driver fees of at least 2.39 times pro-rated reference cost 394,824 cents; all 13 orders were refunded, and 12 bookings came after the original last pickup. Change only emergencyMultiplier from 2.40 to 2.20; preserve all earlier fee steps. Test level 8 first, where the pattern was strongest (level 7: 9 of 14 such bookings after the original cutoff). Use spread-1 and study-2; gross margin must increase, both weeks must qualify, and no additional undelivered order is acceptable. Apply the same 1% service tie-break; if eligible, confirm on fresh dispatch-proof-rescue-02. The matched cost baseline is round 1 on the same frozen integration.

Round 2 decision: level 8 uses [cost with a 2.20 emergency rate](dispatch-presets/level-8.json). Development margin was 995,777 → 1,019,749 cents; spread-1 lost 3,775 cents, study-2 gained 27,747. On study-2, driver fees fell by 78,472 cents but refunds increased by 9,925 cents. The new holdout gained 12,665 cents, both at 251/257 orders on time. All paired weeks qualified with zero undelivered and zero refusals. Use the preset as the CLI --config; it is stored with the evidence to avoid touching the pricing owner's configs. Do not extrapolate it to other levels.

Round 3, specified before execution: level 7 cost paid 2,755,918 cents in driver fees across the two development weeks. 141/334 nonurgent opening fees were at the 1.08 floor. Test feeMultiplier 1.02 only; this changes opening price and quote cost estimate, not rescue rates. Baseline remains cost (2.40 emergency). Same development seeds, same 1% margin/service tie-break, reject any sub-90% candidate week or additional undelivered orders. If accepted on development, require a positive gain on fresh dispatch-proof-opening-03 under the same criteria.

## Paired end scores

Source for every row: 3cb7ba4. Full IDs, parameters, won and undelivered counts, refusals and reconciled ledger totals are in [the JSON report](dispatch-78-practice.json). Amounts below are game euros. b = balanced, c = cost, c22 = cost with emergencyMultiplier 2.20, cFee = cost with feeMultiplier 1.02.

| Round | Level | Seed | Presets | Baseline margin | Candidate margin | Baseline on time | Candidate on time |
|---:|---:|---|---|---:|---:|---:|---:|
| 1 | 7 | spread-1 | b → c | 2,989.01 | 4,111.43 | 99.17% | 98.69% |
| 1 | 7 | study-2 | b → c | 1,283.19 | 1,765.90 | 94.93% | 91.45% |
| 1 | 7 | dispatch-proof-78-01 | b → c | 2,152.83 | 2,979.46 | 100.00% | 100.00% |
| 1 | 8 | spread-1 | b → c | 5,064.23 | 6,937.51 | 98.98% | 99.13% |
| 1 | 8 | study-2 | b → c | 2,578.76 | 3,020.26 | 92.86% | 90.86% |
| 1 | 8 | dispatch-proof-78-01 | b → c | 4,244.97 | 6,451.40 | 100.00% | 99.43% |
| 2 | 8 | spread-1 | c → c22 | 6,937.51 | 6,899.76 | 99.13% | 99.12% |
| 2 | 8 | study-2 | c → c22 | 3,020.26 | 3,297.73 | 90.86% | 91.86% |
| 2 | 8 | dispatch-proof-rescue-02 | c → c22 | 9,424.69 | 9,551.34 | 97.67% | 97.67% |
| 3 | 7 | spread-1 | c → cFee | 4,111.43 | 4,676.44 | 98.69% | 99.39% |
| 3 | 7 | study-2 | c → cFee | 1,765.90 | 1,745.44 | 91.45% | 90.18% |
| 3 | 7 | dispatch-proof-opening-03 | c → cFee | 1,912.03 | 2,715.15 | 98.73% | 98.84% |

Round 3 decision: select [level 7 cost with a 1.02 opening floor](dispatch-presets/level-7.json) for measured margin. The fresh holdout gained €803.12 and service improved slightly. However, study-2 lost €20.46 and service fell from 91.45% to 90.18% (147/163): one more late order would have disqualified that week. At level 7 the original cost preset is the measured alternative for extra service buffer. Across their three matched seeds the new level 7 preset gained €1,347.67, and the new level 8 preset gained €366.37. These are different seed panels; do not sum the two levels or project the gains to a ranking round.

Verified all 20 new results against the server's ended, non-ranking practice list and score endpoint. All passed, with no undelivered orders or refused actions. Ledger amounts reconciled to each recorded margin. The previous 14 matrix scores were also checked against the server; their four level 1/2 failures remain in the linked historical file. Other levels were outside this assignment. The three rounds used the exact same dispatcher commit, using a detached checkout after documentation-only pushes. Pricing branch updates during the run did not change the pinned source. No ranking or final was accessed; no PR was merged. Raw journals stayed local.

Use the validated preset explicitly, e.g.:
```powershell
node --env-file-if-exists=.env dispatch.ts --level 7 --seed YOUR_PRACTICE_SEED --config docs/dispatch-presets/level-7.json
node --env-file-if-exists=.env dispatch.ts --level 8 --seed YOUR_PRACTICE_SEED --config docs/dispatch-presets/level-8.json
```
