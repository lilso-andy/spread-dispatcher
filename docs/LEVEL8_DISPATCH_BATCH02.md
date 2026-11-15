# Level 8 practice batch 02

On study-2 public single-car routes of 100 to 300 mapped minutes yielded EUR3510.60 net from 107 delivered wins. In batch15-dev-b-v1 those routes earned EUR2947.76 from 72 delivered wins. The corresponding commercial quotes won 110/188 and 73/219 before cancellations; both replay cohorts were measured only after each control ended. Driver fee and refund costs are included. Test a selective lane discount to win more of that business when nearby drivers can take it.

Compare the selected baseline with the following change on eight matched seeds: study-2, batch15-dev-b-v1, spread-1, dispatch8-b02-a through dispatch8-b02-e. For level 8, one non-premium car between two public addresses, 100 to 300 mapped minutes inclusive, at least 15 eligible local drivers and 300 minutes of booking slack, reduce the option's list-price factor by 0.07. The existing absolute fee/margin floor, capacity, notes and service checks all still apply. Count quote changes and compare final net revenue, refunds, actual driver fees, wins, refusals, undelivered and eligibility. Admit to untouched dispatch8-proof02 if pooled margin grows and each candidate qualifies at 90%, with no extra refusals or undelivered. A gain below 1% must preserve the worst service level. Apply the same gates to the fresh pair and record every loss. Absolute target EUR20,000 in each verified week including fresh proof.

Before any worlds were created, revise the design to four profiles on four seeds (study-2, batch15-dev-b-v1, spread-1, dispatch8-b02-a). Common baseline is selected advance-opening dispatcher d9f8018 with fee1.08/emergency2.0. Latest teammate emergency1.8 won on its separate source; independently test emergency1.8 alone and combined with the medium-route quote adjustment against this baseline. Four profiles give16 development weeks, plus a fresh pair for the best eligible profile. Keep all candidate weeks >=90% and all other selection gates above.

Final design amendment before world creation: the latest pricing teammate cc81e98 independently validated strictNotes=false on three weeks, gaining EUR4959.28 development and EUR1310.94 fresh proof on an older source. Replace the combination arm with strictNotes=false alone on the current dispatcher. Retain currently parsed constraints, route checks and explicit summer-tyre decline. All action and service safeguards remain. This measures the interaction with the selected cheaper advance opening fees. Profiles are baseline, medium quote discount, emergency1.8, permissive notes. No viewed proof is reused for selection.

## Final results

18 completed weeks. Selected profile **base**. Weeks below the delivery minimum: 1. The accompanying JSON records full sources, configs, scores, ledgers and controller restarts.

| Development profile | Total margin EUR | Difference EUR | Worst on time | Eligible for proof |
|---|---:|---:|---:|---|
| base | 34321.54 | 0.00 | 93.36% | Control |
| mid | 33340.56 | -980.98 | 92.42% | No |
| rescue | 34674.38 | 352.84 | 94.33% | Yes |
| permissive | 38308.28 | 3986.74 | 92.89% | Yes |

Fresh paired proof on `dispatch8-proof02` produced a difference of -2123.75 EUR. Baseline retained.

| Profile | Seed | World | Commit | Margin EUR | Won | On time | Undelivered | Refusals | Snapshot reads |
|---|---|---|---|---:|---:|---:|---:|---:|---:|
| baseline | study-2 | w2ab0d41b3196cd17e6f3 | d9f8018 | 7460.32 | 241 | 93.36% | 0 | 0 | 1 |
| medium-public-lane-quote | study-2 | we024f8a2e327cff6b3ed | 286b508 | 5621.95 | 211 | 92.42% | 0 | 0 | 1 |
| emergency1.8 | study-2 | w90f618f80437bb6c75eb | d9f8018 | 7867.11 | 247 | 94.33% | 0 | 0 | 1 |
| notes-permissive | study-2 | w42ad11b0833b7adc797b | d9f8018 | 6686.01 | 225 | 92.89% | 0 | 0 | 1 |
| baseline | batch15-dev-b-v1 | w2e18cef625aa4a7007ca | d9f8018 | 8871.55 | 195 | 97.95% | 0 | 0 | 1 |
| medium-public-lane-quote | batch15-dev-b-v1 | w98cd066a4323c5fcf260 | 286b508 | 9506.12 | 210 | 99.05% | 0 | 0 | 1 |
| emergency1.8 | batch15-dev-b-v1 | w49969921adb5a010ac90 | d9f8018 | 8871.55 | 195 | 97.95% | 0 | 0 | 1 |
| notes-permissive | batch15-dev-b-v1 | w99c98058f3157a066a79 | d9f8018 | 10855.08 | 251 | 98.41% | 0 | 0 | 1 |
| baseline | spread-1 | wb58e4e47375a9e2b83f9 | d9f8018 | 8969.17 | 265 | 98.11% | 0 | 0 | 1 |
| medium-public-lane-quote | spread-1 | wf6274458824d57fdb38f | 286b508 | 8918.01 | 274 | 97.81% | 0 | 0 | 1 |
| emergency1.8 | spread-1 | wd724e7c812df82bea129 | d9f8018 | 8915.22 | 259 | 98.46% | 0 | 0 | 2 |
| notes-permissive | spread-1 | w140655b65edaa40606f2 | d9f8018 | 10135.86 | 314 | 96.82% | 0 | 0 | 2 |
| baseline | dispatch8-b02-a | we6a9e16b14e8ac43796d | d9f8018 | 9020.50 | 200 | 99.50% | 0 | 0 | 1 |
| medium-public-lane-quote | dispatch8-b02-a | wce2bedeb82d9c0c24921 | 286b508 | 9294.48 | 215 | 100.00% | 0 | 0 | 1 |
| emergency1.8 | dispatch8-b02-a | w420c016819e1d27eb93a | d9f8018 | 9020.50 | 200 | 99.50% | 0 | 0 | 1 |
| notes-permissive | dispatch8-b02-a | w74a55d42330c5c641854 | d9f8018 | 10631.33 | 256 | 97.66% | 0 | 0 | 1 |
| baseline | dispatch8-proof02 | w9f721c09b64ddc55258c | d9f8018 | 6528.15 | 183 | 95.63% | 0 | 0 | 1 |
| notes-permissive | dispatch8-proof02 | w37914641c69f5e30614b | d9f8018 | 4404.40 | 171 | 88.30% | 0 | 0 | 1 |

Rows with multiple snapshot reads include reconstruction of local dispatcher state. Reconnection can change bidding or booking history, so their differences can include a restart effect.
