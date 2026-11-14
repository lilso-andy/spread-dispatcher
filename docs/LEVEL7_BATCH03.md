# Level 7 practice batch 03

Batch 02 rejected each change. On its four development controls, next-day refunds were 16450, 68825, 25640 and 53450 cents. The baseline paid 1076250 to 1870837 cents in weekly driver fees. Test three ways to protect margin separately.

* Base uses the selected level 7 preset on the latest team integration (8a96038 plus 8543c3f). The teammate route condition is exclusive to level 8.
* Option adds 0.08 to the level 7 quote factor for next_day only. This prices exposure on the option with the largest aggregate refunds. Preserve other options, floors, rounding, capacity and driver decisions.
* Quote sets quoteMultiplier to 1.48 for all level 7 options to distinguish an option premium from a general price increase.
* Rescue sets emergencyMultiplier to 2.15 from 2.4. Test whether cheaper last-minute payments cover any lost bookings or increased refunds. Opening fees and the scheduled rescue remain as before.

Run each profile anew on spread-1, study-2, l7-b03-dev-a and l7-b03-dev-b. Rank by total final margin subject to every candidate week qualifying at 90%, and no extra undelivered orders or acknowledged refusals per seed. For gains under 1% require at least the baseline worst service. Evaluate the best eligible profile against a new control on l7-b03-proof. Require positive margin, qualifying service and the same safeguards on proof. Hold the baseline if proof fails. At most two owned active practice worlds.

## Final results

18 completed weeks. Selected profile **rescue**. Weeks below the delivery minimum: 1. The accompanying JSON records full sources, configs, scores, ledgers and controller restarts.

| Development profile | Total margin EUR | Difference EUR | Worst on time | Eligible for proof |
|---|---:|---:|---:|---|
| base | 19737.02 | 0.00 | 91.52% | Control |
| option | 16781.23 | -2955.79 | 89.09% | No |
| quote | 15622.36 | -4114.66 | 94.01% | No |
| rescue | 20018.61 | 281.59 | 91.52% | Yes |

Fresh paired proof on `l7-b03-proof` produced a difference of 58.41 EUR. Passed.

| Profile | Seed | World | Commit | Margin EUR | Won | On time | Undelivered | Refusals | Snapshot reads |
|---|---|---|---|---:|---:|---:|---:|---:|---:|
| baseline | spread-1 | w9dbc1b368bbab517f979 | aeaa6de | 5012.15 | 183 | 98.36% | 0 | 0 | 1 |
| next-day-premium | spread-1 | we16871e170bfc25035f2 | 550d890 | 5278.28 | 175 | 98.86% | 0 | 0 | 1 |
| higher-list-quote | spread-1 | wce7b20d2f7fd3cd03161 | aeaa6de | 4375.85 | 147 | 97.28% | 0 | 0 | 1 |
| lower-emergency-fee | spread-1 | w90e0dd80be10f94efac7 | aeaa6de | 4890.25 | 183 | 98.36% | 0 | 0 | 1 |
| baseline | study-2 | w519634124c7208731152 | aeaa6de | 3129.50 | 165 | 91.52% | 0 | 0 | 1 |
| next-day-premium | study-2 | w89dfba6c2c33a6421634 | 550d890 | 2551.87 | 165 | 89.09% | 0 | 0 | 1 |
| higher-list-quote | study-2 | w130979a321a2544295c6 | aeaa6de | 4145.19 | 167 | 94.01% | 0 | 0 | 1 |
| lower-emergency-fee | study-2 | w9e497c7af77a9dc96d2d | aeaa6de | 3514.59 | 165 | 91.52% | 0 | 0 | 1 |
| baseline | l7-b03-dev-a | w064581ac3be69b1a96db | aeaa6de | 5055.89 | 126 | 98.41% | 0 | 0 | 1 |
| next-day-premium | l7-b03-dev-a | w7689c58e5c860543a305 | 550d890 | 5223.22 | 121 | 99.17% | 0 | 0 | 1 |
| higher-list-quote | l7-b03-dev-a | wf2594dad6c1192961c61 | aeaa6de | 4481.99 | 95 | 98.95% | 0 | 0 | 1 |
| lower-emergency-fee | l7-b03-dev-a | w8aacd00ee2278776c2ef | aeaa6de | 5074.29 | 126 | 98.41% | 0 | 0 | 1 |
| baseline | l7-b03-dev-b | wb35155d2e69b5c0ab36a | aeaa6de | 6539.48 | 172 | 98.84% | 0 | 0 | 1 |
| next-day-premium | l7-b03-dev-b | w87ea5734ef897768515d | 550d890 | 3727.86 | 101 | 95.05% | 0 | 0 | 1 |
| higher-list-quote | l7-b03-dev-b | w077d7f69bebad0e342c2 | aeaa6de | 2619.33 | 67 | 95.52% | 0 | 0 | 1 |
| lower-emergency-fee | l7-b03-dev-b | w52e0cc485b3d9953c9a4 | aeaa6de | 6539.48 | 172 | 98.84% | 0 | 0 | 1 |
| baseline | l7-b03-proof | w9022ac0fc4efb67c5dc3 | aeaa6de | 6770.45 | 201 | 97.51% | 0 | 0 | 1 |
| lower-emergency-fee | l7-b03-proof | w6d26687c7b4003467503 | aeaa6de | 6828.86 | 201 | 97.51% | 0 | 0 | 1 |
