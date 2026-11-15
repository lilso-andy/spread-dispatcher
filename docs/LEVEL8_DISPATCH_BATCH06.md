Level 8 batch 06 candidate registration before editing code. Five ended batch04 controls include individual working days at 25/150, 29/167, 22/129, 10/125 and 10/157 won active bids. On level 8 only, reduce the current dealer adjustment by 0.12 for the next feasible quote when the most recent 24 accepted-bid outcomes on the same simulated day span at least 3 dealers and have at most 4 wins. Exclude explicit declines, duplicates and other days. Keep minimum contributions, notes and service controls. Spend no extra requests or actions. A reconnect can lack the active bid history and conservatively wait for 24 fresh outcomes. Compare each control and candidate on eight identical seeds (dispatch8-daily-a to h); reserve dispatch8-daily-proof. Positive pooled margin, every candidate week >=90%, no additional undelivered/refusals and fresh proof required. Under 1% prefer service buffer. Combine only with the selected batch05 runtime after authorization already provided by workflow. Freeze exact source and config before allocating.

Owner update received before completing batch06 development: maximize pooled gross margin subject to each candidate week being strictly above 90% on time. A smaller service buffer, or additional undelivered orders or action refusals, is reported and does not by itself break a tie or veto an eligible margin gain. Keep constraint checks and require a positive margin change again on the untouched proof. This supersedes the earlier near-tie preference for these two batches.

## Final results

18 completed weeks. Selected profile **daily**. Weeks below the delivery minimum: 0. The accompanying JSON records full sources, configs, scores, ledgers and controller restarts.

| Development profile | Total margin EUR | Difference EUR | Worst on time | Eligible for proof |
|---|---:|---:|---:|---|
| base | 55303.24 | 0.00 | 95.45% | Control |
| daily | 58024.09 | 2720.85 | 91.78% | Yes |

Fresh paired proof on `dispatch8-daily-proof` produced a difference of 145.92 EUR. Passed.

| Profile | Seed | World | Commit | Margin EUR | Won | On time | Undelivered | Refusals | Snapshot reads |
|---|---|---|---|---:|---:|---:|---:|---:|---:|
| baseline | dispatch8-daily-a | wf4beeb02fc155dcd9ed7 | cb1cdc7 | 2642.29 | 66 | 95.45% | 0 | 0 | 1 |
| broad-intraday-loss-discount | dispatch8-daily-a | wf9df2d8f5d4b21a81628 | 9c6137a | 2299.45 | 73 | 91.78% | 0 | 0 | 1 |
| baseline | dispatch8-daily-b | w4c2c6ce22b21a767601c | cb1cdc7 | 8244.27 | 239 | 97.07% | 0 | 0 | 1 |
| broad-intraday-loss-discount | dispatch8-daily-b | w9b62fad2eb754acedafb | 9c6137a | 8312.02 | 242 | 97.52% | 0 | 0 | 1 |
| baseline | dispatch8-daily-c | w140a8173533015fcd09f | cb1cdc7 | 5976.26 | 155 | 98.71% | 0 | 0 | 1 |
| broad-intraday-loss-discount | dispatch8-daily-c | w8cf43d5660041aad3e39 | 9c6137a | 6204.49 | 165 | 98.79% | 0 | 0 | 1 |
| baseline | dispatch8-daily-d | wcec5787ed2a2126d44e3 | cb1cdc7 | 7277.68 | 184 | 99.46% | 0 | 0 | 1 |
| broad-intraday-loss-discount | dispatch8-daily-d | w7af3fa125d5602946355 | 9c6137a | 7090.38 | 193 | 98.45% | 0 | 0 | 1 |
| baseline | dispatch8-daily-e | wa35c85ec4333ce240e09 | cb1cdc7 | 8187.18 | 207 | 97.58% | 0 | 0 | 1 |
| broad-intraday-loss-discount | dispatch8-daily-e | w4b7138611eb509ef3cbf | 9c6137a | 8289.10 | 216 | 98.15% | 1 | 0 | 1 |
| baseline | dispatch8-daily-f | wb86742daf107df15e176 | cb1cdc7 | 7695.25 | 214 | 96.26% | 0 | 0 | 1 |
| broad-intraday-loss-discount | dispatch8-daily-f | wec170f321bda5b09354b | 9c6137a | 7722.47 | 223 | 97.31% | 0 | 0 | 1 |
| baseline | dispatch8-daily-g | w62aa67a48c92fb0d1e92 | cb1cdc7 | 7681.47 | 184 | 98.91% | 0 | 0 | 1 |
| broad-intraday-loss-discount | dispatch8-daily-g | wdfa1bbc21b8c4bff71d6 | 9c6137a | 6669.38 | 181 | 97.79% | 0 | 0 | 1 |
| baseline | dispatch8-daily-h | wf4694269692911655e47 | cb1cdc7 | 7598.84 | 177 | 95.48% | 0 | 0 | 1 |
| broad-intraday-loss-discount | dispatch8-daily-h | w97a2f9fdba5ef1b7b4ac | 9c6137a | 11436.80 | 246 | 97.97% | 0 | 0 | 1 |
| baseline | dispatch8-daily-proof | w075ac6b53228489599dd | cb1cdc7 | 12641.03 | 310 | 98.06% | 0 | 0 | 1 |
| broad-intraday-loss-discount | dispatch8-daily-proof | w5516d0890fd611cf1c50 | 9c6137a | 12786.95 | 317 | 96.85% | 1 | 0 | 1 |
