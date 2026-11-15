# Level8 dispatch batch04

The selected baseline wins about200 to300 cars, with constrained regional driver supply. The previous conditional recovery rule made no difference across8 seeds; changing the pause alone provided no measured volume. Test the local capacity estimate and eligible approach range independently. capacityFraction0.28 to0.35 makes a larger fraction of compatible nearby drivers count as available. maxApproachMinutes100 to150 includes a wider candidate roster for quotes and direct offers. The product of both is a separate interaction arm. These changes may expose the dispatcher to distant drivers or more simultaneous commitments, so every candidate week must still qualify at90%, with no extra undelivered or refused actions per seed. Compare four profiles on study-2, spread-1, dispatch8-cap-a and dispatch8-cap-b (16 completed worlds). Best eligible total-margin increase gets untouched dispatch8-cap-proof, which must repeat a positive gain under the same safety gates. Sub1% gains preserve worst service. Use the exact selected advance opening source and its full baseline config. Target EUR30000 per completed week remains.

## Final results

18 completed weeks. Selected profile **base**. Weeks below the delivery minimum: 0. The accompanying JSON records full sources, configs, scores, ledgers and controller restarts.

| Development profile | Total margin EUR | Difference EUR | Worst on time | Eligible for proof |
|---|---:|---:|---:|---|
| base | 37352.49 | 0.00 | 91.96% | Control |
| capacity | 37707.34 | 354.85 | 92.88% | Yes |
| approach | 38199.59 | 847.10 | 92.88% | Yes |
| both | 38724.40 | 1371.91 | 92.91% | Yes |

Fresh paired proof on `dispatch8-cap-proof` produced a difference of -1081.60 EUR. Baseline retained.

| Profile | Seed | World | Commit | Margin EUR | Won | On time | Undelivered | Refusals | Snapshot reads |
|---|---|---|---|---:|---:|---:|---:|---:|---:|
| baseline | study-2 | w45dbb2a188d4ee6264b7 | 4f4d83b | 7460.32 | 241 | 93.36% | 0 | 0 | 1 |
| capacity0.35 | study-2 | wb2db27c3a5097967e946 | 4f4d83b | 7637.38 | 247 | 93.52% | 0 | 0 | 1 |
| approach150 | study-2 | w5ffd75be11e09ee10acc | 4f4d83b | 6525.36 | 213 | 94.37% | 0 | 0 | 1 |
| capacity0.35-approach150 | study-2 | w1b12a3bc1ff0deca2289 | 4f4d83b | 6645.75 | 216 | 94.44% | 0 | 0 | 1 |
| baseline | spread-1 | wfb15ca17b5bbf84c5094 | 4f4d83b | 8969.17 | 265 | 98.11% | 0 | 0 | 1 |
| capacity0.35 | spread-1 | w846e0fc50382f64afa37 | 4f4d83b | 8880.14 | 268 | 97.01% | 0 | 0 | 1 |
| approach150 | spread-1 | wec74294fb96679348259 | 4f4d83b | 9630.80 | 277 | 97.83% | 0 | 0 | 1 |
| capacity0.35-approach150 | spread-1 | wb6c0547efa41fa55ef17 | 4f4d83b | 9888.41 | 282 | 98.58% | 0 | 0 | 1 |
| baseline | dispatch8-cap-a | w0fed1a9d7600567e1f07 | 4f4d83b | 10276.12 | 247 | 99.19% | 0 | 0 | 1 |
| capacity0.35 | dispatch8-cap-a | w0fbf75a853f1f39ddd30 | 4f4d83b | 10177.09 | 249 | 99.60% | 0 | 0 | 1 |
| approach150 | dispatch8-cap-a | w17663ccd86663f36a8c6 | 4f4d83b | 10928.33 | 260 | 98.85% | 0 | 0 | 1 |
| capacity0.35-approach150 | dispatch8-cap-a | w4179caae965b3a29705b | 4f4d83b | 11030.44 | 265 | 98.87% | 0 | 0 | 1 |
| baseline | dispatch8-cap-b | wa89fdf0ffbe419570e56 | 4f4d83b | 10646.88 | 286 | 91.96% | 0 | 0 | 1 |
| capacity0.35 | dispatch8-cap-b | w7d49ce288c46d6195822 | 4f4d83b | 11012.73 | 295 | 92.88% | 0 | 0 | 1 |
| approach150 | dispatch8-cap-b | we72724c24067f1f3a9f4 | 4f4d83b | 11115.10 | 295 | 92.88% | 0 | 0 | 1 |
| capacity0.35-approach150 | dispatch8-cap-b | w75c51ed53e8f41e445ad | 4f4d83b | 11159.80 | 296 | 92.91% | 0 | 0 | 1 |
| baseline | dispatch8-cap-proof | w05400ed0483d64c7ba02 | 4f4d83b | 6638.35 | 168 | 98.21% | 0 | 0 | 1 |
| capacity0.35-approach150 | dispatch8-cap-proof | w7100a70c0438adb1d1ae | 4f4d83b | 5556.75 | 155 | 98.71% | 0 | 0 | 1 |
