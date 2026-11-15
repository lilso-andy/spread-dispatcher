# Level 8 Finnish Thursday parser validation

The notes teammate supplied a language-scoped correction for Finnish "to klo" denoting Thursday. Previously the clock could be interpreted on the wrong day, causing an early failed visit or an inappropriate decline. Import exactly notes.ts and its two regression tests from 8a2d57b onto the selected intraday-discount runtime. Keep all configuration fields fixed. Compare full-week margin and failed visits, refunds, wins and service on eight new identical seeds dispatch8-parser-a through h, then untouched dispatch8-parser-proof if pooled margin rises and every candidate week is above90%. Select by margin subject to that threshold. Record all results. No ranking or final. Source and full config frozen before creating worlds.

## Final results

16 completed weeks. Selected profile **base**. Weeks below the delivery minimum: 0. The accompanying JSON records full sources, configs, scores, ledgers and controller restarts.

| Development profile | Total margin EUR | Difference EUR | Worst on time | Eligible for proof |
|---|---:|---:|---:|---|
| base | 62846.44 | 0.00 | 96.11% | Control |
| parser | 62841.44 | -5.00 | 96.11% | No |

| Profile | Seed | World | Commit | Margin EUR | Won | On time | Undelivered | Refusals | Snapshot reads |
|---|---|---|---|---:|---:|---:|---:|---:|---:|
| baseline | dispatch8-parser-a | w80995d7f2b69540e0bb1 | 784e005 | 9547.36 | 231 | 97.40% | 0 | 0 | 1 |
| finnish-thursday-clock | dispatch8-parser-a | we14f7b760dc2469e2b0f | 6985649 | 9542.36 | 231 | 97.40% | 0 | 0 | 1 |
| baseline | dispatch8-parser-b | w25bb90848a9e2afc7b42 | 784e005 | 8601.36 | 213 | 97.65% | 0 | 0 | 1 |
| finnish-thursday-clock | dispatch8-parser-b | we5d88d2d9af537b80680 | 6985649 | 8601.36 | 213 | 97.65% | 0 | 0 | 1 |
| baseline | dispatch8-parser-c | w5a34cb7e6f9bb615924a | 784e005 | 5558.25 | 143 | 98.60% | 0 | 0 | 1 |
| finnish-thursday-clock | dispatch8-parser-c | w93d529ff846cb7db0ea0 | 6985649 | 5558.25 | 143 | 98.60% | 0 | 0 | 1 |
| baseline | dispatch8-parser-d | w5ed0b168aea527d677de | 784e005 | 9932.88 | 235 | 97.02% | 0 | 0 | 1 |
| finnish-thursday-clock | dispatch8-parser-d | wb89a9190462adbe0bd30 | 6985649 | 9932.88 | 235 | 97.02% | 0 | 0 | 1 |
| baseline | dispatch8-parser-e | we317804a8a94ae0f9d18 | 784e005 | 8664.48 | 208 | 97.60% | 0 | 0 | 1 |
| finnish-thursday-clock | dispatch8-parser-e | w1abbc97d9db26a7b5e33 | 6985649 | 8664.48 | 208 | 97.60% | 0 | 0 | 1 |
| baseline | dispatch8-parser-f | w484f081ebdd91ae4637e | 784e005 | 9361.67 | 237 | 97.47% | 0 | 0 | 1 |
| finnish-thursday-clock | dispatch8-parser-f | wb959e629fc765ab30ca6 | 6985649 | 9361.67 | 237 | 97.47% | 0 | 0 | 1 |
| baseline | dispatch8-parser-g | w8120778b361e5de3fad0 | 784e005 | 6521.07 | 180 | 96.11% | 0 | 0 | 1 |
| finnish-thursday-clock | dispatch8-parser-g | wfc5c6305298d7a0bfb3a | 6985649 | 6521.07 | 180 | 96.11% | 0 | 0 | 1 |
| baseline | dispatch8-parser-h | wf37c2bfe7cdd321abc21 | 784e005 | 4659.37 | 134 | 98.51% | 0 | 0 | 1 |
| finnish-thursday-clock | dispatch8-parser-h | w4e8861d28ed9eea10dfc | 6985649 | 4659.37 | 134 | 98.51% | 0 | 0 | 1 |
