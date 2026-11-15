# Level 8 paired integration test, batch 05

Season 11 had used all five ranking attempts before allocation. On four new development seeds compare the integration d4031ca with the notes team's quote 1.35, the pricing team's short public quote cap 1.25 and advance fee factor 0.80 on 5ee83ce, and the combination. The pricing team reported a EUR3126.46 gain across four weeks and the notes team a EUR2342.19 gain across five on different seeds. Higher volume and lower opening fees may offset the lower price. Compare final margin and the revenue, driver fees, refunds, wins and service behind it. All other config fields use the current integration level 8 preset.

Four matched weeks per profile. Reject a candidate with nonpositive pooled gain, any week below 90%, or any additional undelivered order or refused action versus its control. For gains below 1% require an equal or better worst service buffer. Give the highest qualifying profile one untouched paired proof on dispatch8-sync5-proof. Promote only after positive proof under the same checks. Record all rows including losses.

## Final results

18 completed weeks. Selected profile **base**. Weeks below the delivery minimum: 1. The accompanying JSON records full sources, configs, scores, ledgers and controller restarts.

| Development profile | Total margin EUR | Difference EUR | Worst on time | Eligible for proof |
|---|---:|---:|---:|---|
| base | 28393.69 | 0.00 | 92.25% | Control |
| notes | 26791.70 | -1601.99 | 89.47% | No |
| pricing | 30365.84 | 1972.15 | 95.73% | No |
| both | 30708.71 | 2315.02 | 91.41% | Yes |

Fresh paired proof on `dispatch8-sync5-proof` produced a difference of -378.07 EUR. Baseline retained.

| Profile | Seed | World | Commit | Margin EUR | Won | On time | Undelivered | Refusals | Snapshot reads |
|---|---|---|---|---:|---:|---:|---:|---:|---:|
| baseline | dispatch8-sync5-a | w1b27e4086eb9ed66e02d | d4031ca | 9624.43 | 231 | 99.57% | 0 | 0 | 1 |
| quote1.35 | dispatch8-sync5-a | w304adcde73618c6b44b3 | d4031ca | 9255.59 | 264 | 97.35% | 0 | 2 | 2 |
| short1.25-advance0.80 | dispatch8-sync5-a | w9b01dda5ef0d4f0ddb3c | 5ee83ce | 9494.26 | 239 | 98.33% | 0 | 0 | 1 |
| short1.25-advance0.80-quote1.35 | dispatch8-sync5-a | w469c8c6bc557f0c77106 | 5ee83ce | 9449.83 | 253 | 98.02% | 0 | 0 | 1 |
| baseline | dispatch8-sync5-b | w568f110605ee4c979dce | d4031ca | 3370.61 | 92 | 98.91% | 0 | 0 | 1 |
| quote1.35 | dispatch8-sync5-b | weebeecfb9d46aba6ee52 | d4031ca | 5129.37 | 143 | 99.30% | 0 | 0 | 1 |
| short1.25-advance0.80 | dispatch8-sync5-b | w44e80c10b7263c92e33b | 5ee83ce | 4318.91 | 113 | 96.46% | 0 | 0 | 1 |
| short1.25-advance0.80-quote1.35 | dispatch8-sync5-b | w45ea1ca9cee6417ca24e | 5ee83ce | 4710.68 | 130 | 97.69% | 0 | 0 | 1 |
| baseline | dispatch8-sync5-c | wa93adcbfb0bf9c55f752 | d4031ca | 4614.82 | 142 | 92.25% | 0 | 0 | 2 |
| quote1.35 | dispatch8-sync5-c | wb2d1ac0887086996ac03 | d4031ca | 1525.90 | 76 | 89.47% | 0 | 0 | 1 |
| short1.25-advance0.80 | dispatch8-sync5-c | w8ef10673559ef8ab2c07 | 5ee83ce | 6097.85 | 164 | 95.73% | 0 | 0 | 1 |
| short1.25-advance0.80-quote1.35 | dispatch8-sync5-c | wa8d6717db36fa030a449 | 5ee83ce | 4820.80 | 163 | 91.41% | 0 | 0 | 1 |
| baseline | dispatch8-sync5-d | we3a58d99703ddf9bf2b0 | d4031ca | 10783.83 | 260 | 97.31% | 0 | 0 | 1 |
| quote1.35 | dispatch8-sync5-d | w8caa310808a5cef4a7c2 | d4031ca | 10880.84 | 276 | 98.55% | 0 | 0 | 1 |
| short1.25-advance0.80 | dispatch8-sync5-d | wce19602a6e422ba1cd2c | 5ee83ce | 10454.82 | 259 | 97.30% | 0 | 2 | 2 |
| short1.25-advance0.80-quote1.35 | dispatch8-sync5-d | wac3be6c1da40356d2bff | 5ee83ce | 11727.40 | 284 | 96.83% | 0 | 0 | 2 |
| baseline | dispatch8-sync5-proof | w378a500179ae371afdfd | d4031ca | 8462.01 | 196 | 100.00% | 0 | 0 | 1 |
| short1.25-advance0.80-quote1.35 | dispatch8-sync5-proof | wfc1e6aaef6bb71492371 | 5ee83ce | 8083.94 | 215 | 97.67% | 0 | 0 | 1 |

Rows with multiple snapshot reads include reconstruction of local dispatcher state. Reconnection can change bidding or booking history, so their differences can include a restart effect.
