# Level 8 practice batch 01

Target EUR20,000 in each of at least three fixed weeks including a fresh confirmation, at least 90% on time each week. Latest teammate  bc494a9 merged into 10a56d7 for comparisons; main is 9dccfdb. Use configs/notes-level8-emergency2-validated.json with emergency 2.0 and the conditional level 8 route rule. In completed study-2 world wc3693f55d4dfe35454b2 driver fees were EUR21,943.31, revenue EUR29,997.00 and late refunds EUR1,154.30. Of 255 raw wins, 139 had first pickup availability at least 720 minutes after request arrival (249 non-cancelled wins in score). Test a cheaper initial driver fee for advance public work. On posting a single public car whose pickup window starts at least 720 minutes later, multiply the opening fee by 0.92 when the last pickup is more than 240 minutes away. Keep quote floors and rescue prices. Separately test opening feeMultiplier 1.12 (control 1.08), and the combination, to measure the tradeoff between early bookings and lower driver payments. Common development seeds study-2, spread-1, batch15-dev-b-v1, and dispatch8-dev01. The highest eligible aggregate margin gets untouched dispatch8-proof01. Require total positive gain, every candidate ranked >=90%, no extra undelivered/refusals per seed, and a positive proof; gains below 1% must preserve service margin.

## Final results

18 completed weeks. Selected profile **advance**. Weeks below the delivery minimum: 0. The accompanying JSON records full sources, configs, scores, ledgers and controller restarts.

| Development profile | Total margin EUR | Difference EUR | Worst on time | Eligible for proof |
|---|---:|---:|---:|---|
| base | 35594.46 | 0.00 | 94.38% | Control |
| advance | 39354.09 | 3759.63 | 93.36% | Yes |
| floor | 33482.87 | -2111.59 | 92.71% | No |
| both | 36917.90 | 1323.44 | 93.52% | Yes |

Fresh paired proof on `dispatch8-proof01` produced a difference of 615.62 EUR. Passed.

| Profile | Seed | World | Commit | Margin EUR | Won | On time | Undelivered | Refusals | Snapshot reads |
|---|---|---|---|---:|---:|---:|---:|---:|---:|
| baseline | study-2 | w7feb974f13727a501a6c | 10a56d7 | 6697.15 | 249 | 94.38% | 0 | 0 | 1 |
| advance-public-opening | study-2 | w47654496a993d2825dfc | a3fdbcb | 7460.32 | 241 | 93.36% | 0 | 0 | 1 |
| opening-1.12 | study-2 | wb23e95a67d4152894366 | 10a56d7 | 6019.04 | 247 | 92.71% | 0 | 0 | 1 |
| advance-and-opening-1.12 | study-2 | w1d886bd42c96541d947a | a3fdbcb | 6720.98 | 247 | 93.52% | 0 | 0 | 1 |
| baseline | spread-1 | wd20efa10d67876b81d7b | 10a56d7 | 7726.08 | 257 | 98.44% | 0 | 0 | 1 |
| advance-public-opening | spread-1 | wf057605ad6ea73500ccb | a3fdbcb | 8969.17 | 265 | 98.11% | 0 | 0 | 1 |
| opening-1.12 | spread-1 | wb48f0169a9219302dabe | 10a56d7 | 7109.34 | 248 | 97.58% | 0 | 0 | 1 |
| advance-and-opening-1.12 | spread-1 | w38da7625f3821effed7a | a3fdbcb | 8255.97 | 254 | 98.43% | 0 | 0 | 1 |
| baseline | batch15-dev-b-v1 | wd7651423d12acdf3b877 | 10a56d7 | 8025.20 | 198 | 98.48% | 0 | 0 | 1 |
| advance-public-opening | batch15-dev-b-v1 | wa2cdc4a46772b3416c76 | a3fdbcb | 8871.55 | 195 | 97.95% | 0 | 0 | 1 |
| opening-1.12 | batch15-dev-b-v1 | wf14a0ff68c594ef702b7 | 10a56d7 | 7801.37 | 194 | 99.48% | 0 | 0 | 1 |
| advance-and-opening-1.12 | batch15-dev-b-v1 | w5cfae1c4f9eb9d4c5a5a | a3fdbcb | 8263.72 | 196 | 98.47% | 0 | 0 | 1 |
| baseline | dispatch8-dev01 | w55aa6351e47f3dd4a203 | 10a56d7 | 13146.03 | 309 | 98.06% | 0 | 0 | 1 |
| advance-public-opening | dispatch8-dev01 | w6d3d938d1febd9310c1b | a3fdbcb | 14053.05 | 304 | 98.68% | 0 | 0 | 1 |
| opening-1.12 | dispatch8-dev01 | w5735a0012af0975d9737 | 10a56d7 | 12553.12 | 306 | 98.04% | 0 | 0 | 1 |
| advance-and-opening-1.12 | dispatch8-dev01 | w4a01b1444b6a1e8d1573 | a3fdbcb | 13677.23 | 304 | 98.36% | 0 | 0 | 1 |
| baseline | dispatch8-proof01 | wb48cedcd6d41d17eb422 | 10a56d7 | 8183.73 | 231 | 95.24% | 0 | 0 | 1 |
| advance-public-opening | dispatch8-proof01 | w3f5ab4f33c37644abf43 | a3fdbcb | 8799.35 | 222 | 96.40% | 0 | 0 | 1 |
