# Notes parser verification — thanhdatLUT

2026-11-14. Scope: `notes.ts`, `test/notes.test.ts`, this report. Public interface unchanged.

## Changes

Unknown clauses now produce uncertainty even if another clause supplies equipment or a clock. Corrections retain equipment facts and decline conservatively instead of deleting earlier text. Negation, competing directions/clocks, conditional release, dated/multiple opening ranges and contradictory bounds require review. English number words and half-hours are supported. The phrase “day after tomorrow” no longer selects the `after` direction.

This remains a heuristic, not a complete natural-language parser. A supported clock does not establish full understanding of arbitrary surrounding text. Extracted values on uncertain notes must not be treated as complete constraints.

## Offline evidence

Node v24.22.3 portable (official ZIP verified against SHA256). Original main: 13/13 tests pass. Final: `node --test test/*.test.ts`, 42/42 pass. `git diff --check` passes. New regression tests cover ambiguous multi-event notes, negation/corrections in FI/SV/EN, equipment, numbers unrelated to time, relative dates, AM/PM, weekday names, half-hours, recurring hours and conflicting bounds.

An additional manually labelled 12-note sample was inspected independently of the initial regression tests. It is synthetic rules-based evidence, not server reveal coverage:

| Note | Expected outcome | Final result |
| --- | --- | --- |
| Nouto huomenna klo 10 jälkeen | pickup tomorrow 10:00 | correct |
| Leverans senast 16:00 | delivery by 16:00 | correct |
| Pickup after tmrw 9am | pickup tomorrow 09:00 | correct |
| Deliver by Friday 17:00 | delivery Friday 17:00, Monday arrival | correct |
| Tack! | harmless | correct |
| Manual; pickup when payment clears | unresolved release condition | uncertain |
| Summer tyres; delivery by sunset | unsupported deadline | uncertain |
| Pickup after 11:00; no later than 13:00 | pickup 11:00–13:00 | uncertain |
| Pickup after 11:00, actually 14:00 | corrected pickup 14:00 | uncertain |
| Hämtning tidigast halv fyra | pickup from 15:30 | correct |
| Pickup open daily 10-16 | recurring pickup hours 10:00–16:00 | correct |
| Pickup after 12:00 provided payment clears | unresolved payment condition | uncertain |

Initial sample inspection found one false-safe conditional payment note. A guard and regression test were added; the rechecked sample is therefore development evidence, no longer an untouched holdout. Final supported coverage: 7/12 (58.3%); false-safe: 0/12; false-uncertain: 2/12 (the simple correction and “no later than” examples). These small-sample counts do not estimate production error rates.

## Limits and next validation

No local `.env` or team key was present. No practice worlds, reveal, ranking or final were run. Two-seed same-config before/after practice comparison remains outstanding; on-time share, ranked eligibility and gross-margin impact are unmeasured. Ask the team owner for the key privately and configure it locally before practice validation. More conservative declines can reduce order volume and margin.

Corrections are deliberately uncertain even when humans can resolve them. Multi-clock sentences, weekday-specific opening schedules and unknown conditions need a richer scoped parser. Unknown prose mixed into a recognized clause can still escape the targeted guards. For example, exceptions expressed with unsupported vocabulary are not proven safe. Do not select this revision for final operation solely from these tests.


## Server practice follow-up (2026-11-14)

This section supersedes the earlier no-key limitation. All worlds below are ordinary practice, created and controlled only by this chat; no ranking or final calls. All scores are end-of-world scores. Raw logs, reveals and credentials stay ignored.

Sources: baseline integrated dispatcher `3cb7ba4b4bff35e5a66b3cdb18b28e1820882bf0`; v1 uses that exact source with notes.ts from PR commit `26782874534e90f2feb3dcea74f74a0ca8ba6cc9` (the original matrix metadata records the underlying dispatcher SHA because notes was overlaid); v2 is isolated practice snapshot `085b3cc` (same dispatcher plus final notes/tests). The PR itself changes only the assigned three files on main; it does not merge teammate production modules. Pricing branch fetched through `636ebb8`; training config is copied unchanged from it.

The first seed was inspected after completion to develop the benign-clause whitelist. Seed 2 is independent of that development. No reveal was used as input to its ongoing world. At most two worlds were controlled concurrently.

Balanced config (all baseline/v1/v2 runs):

```json
{
  "quoteMultiplier": 1.4,
  "feeMultiplier": 1.2,
  "emergencyMultiplier": 2.4,
  "marginReserve": 0.15,
  "minMarginCents": 2000,
  "capacityFraction": 0.2,
  "maxApproachMinutes": 100,
  "minLeadMinutes": 180,
  "strictNotes": true,
  "offers": true
}
```

| Version | Level | Seed | World | Margin EUR | Won | On time | Undelivered | Eligible | Refusals |
| --- | ---: | --- | --- | ---: | ---: | ---: | ---: | --- | ---: |
| baseline | 1 | notes-loop-01 | we3df417c437e205bb784 | 2206.51 | 192 | 99.48% | 0.00% | true | 0 |
| baseline | 2 | notes-loop-01 | w679bccbe5e09afe87ac3 | 2248.09 | 192 | 99.48% | 0.00% | true | 0 |
| baseline | 3 | notes-loop-01 | w9981f1d9a4b360172e7f | 2242.97 | 192 | 99.48% | 0.00% | true | 0 |
| baseline | 4 | notes-loop-01 | wf305efdec08eb1773f84 | 3428.95 | 117 | 100.00% | 0.00% | true | 0 |
| baseline | 5 | notes-loop-01 | w6f7e9044a32965939d1e | 2297.56 | 84 | 100.00% | 0.00% | true | 0 |
| baseline | 6 | notes-loop-01 | w7297fac87fa83feea7c2 | 3522.29 | 119 | 100.00% | 0.00% | true | 0 |
| baseline | 7 | notes-loop-01 | wbd199a8875e7127c4f9f | 5393.62 | 177 | 98.87% | 0.00% | true | 0 |
| baseline | 8 | notes-loop-01 | we53cb963cbc974c9e8dc | 7831.11 | 250 | 98.00% | 0.00% | true | 0 |
| v1 | 1 | notes-loop-01 | w292ebca421832bf789a0 | 2206.51 | 192 | 99.48% | 0.00% | true | 0 |
| v1 | 2 | notes-loop-01 | w92b50643796ada2ac614 | 2248.09 | 192 | 99.48% | 0.00% | true | 0 |
| v1 | 3 | notes-loop-01 | w8107b47ce6bcd3ebc6a3 | 2242.97 | 192 | 99.48% | 0.00% | true | 0 |
| v1 | 4 | notes-loop-01 | wa17f4784b71d252d2a0e | 3428.95 | 117 | 100.00% | 0.00% | true | 0 |
| v1 | 5 | notes-loop-01 | wfea5b90cc6cecaba460c | 2017.85 | 79 | 100.00% | 0.00% | true | 0 |
| v1 | 6 | notes-loop-01 | w8fa21b2f76a4093b28e5 | 3387.10 | 111 | 100.00% | 0.00% | true | 0 |
| v1 | 7 | notes-loop-01 | w7d670b070adac89574e0 | 5041.15 | 166 | 99.40% | 0.00% | true | 0 |
| v1 | 8 | notes-loop-01 | wb9b9bfd2cb70c7f3e3dc | 7640.90 | 232 | 98.28% | 0.00% | true | 0 |
| baseline | 5 | notes-loop-02 | w64541307e0ab69713870 | 1271.15 | 43 | 100.00% | 0.00% | true | 0 |
| baseline | 6 | notes-loop-02 | w55111699573c8bc1e072 | 1451.01 | 50 | 100.00% | 0.00% | true | 0 |
| baseline | 7 | notes-loop-02 | w52037edf88923404be32 | 2658.05 | 85 | 98.82% | 0.00% | true | 0 |
| baseline | 8 | notes-loop-02 | w08ec387c606da0566320 | 4874.57 | 142 | 100.00% | 0.00% | true | 0 |
| v2 | 5 | notes-loop-01 | wc67b92094df0c63d62f7 | 2619.44 | 95 | 100.00% | 0.00% | true | 0 |
| v2 | 5 | notes-loop-02 | w9563657c124dd8499c22 | 1629.67 | 54 | 100.00% | 0.00% | true | 0 |
| v2 | 6 | notes-loop-01 | w935da45dfcc1cb44048e | 3711.16 | 125 | 100.00% | 0.00% | true | 0 |
| v2 | 6 | notes-loop-02 | we30577d83df41426a08f | 1626.64 | 59 | 100.00% | 0.00% | true | 0 |
| v2 | 7 | notes-loop-01 | w274e593b5b1d4babaf19 | 5662.20 | 194 | 98.45% | 0.00% | true | 0 |
| v2 | 7 | notes-loop-02 | w9d067f4cfa45342005fb | 3248.21 | 98 | 100.00% | 0.00% | true | 0 |
| v2 | 8 | notes-loop-01 | w93409a5a250884d7f769 | 8449.69 | 265 | 97.36% | 0.00% | true | 0 |
| v2 | 8 | notes-loop-02 | w355da5eaf8705c264001 | 5581.23 | 159 | 99.37% | 0.00% | true | 0 |
| training | 1 | notes-loop-01 | wd65f9d0f4855653acca3 | 3079.14 | 263 | 99.62% | 0.00% | true | 0 |
| training | 2 | notes-loop-01 | wd7a132a26e4cfb87ea1b | 3083.38 | 262 | 99.62% | 0.00% | true | 0 |
| training | 3 | notes-loop-01 | wef70acbd5a87aed59c9f | 3104.63 | 262 | 99.62% | 0.00% | true | 0 |

Paired level 5–8 totals so far: baseline EUR 29299.36, v2 EUR 32528.24, delta EUR 3228.88. Completion flags: [["baseline",true],["v1",true],["baseline",true],["v2",true],["training",true]].

Training config (configuration comparison, not parser effect):

```json
{
  "quoteMultiplier": 1.4,
  "feeMultiplier": 1.2,
  "emergencyMultiplier": 2.1,
  "marginReserve": 0.1,
  "minMarginCents": 500,
  "capacityFraction": 0.26,
  "maxApproachMinutes": 100,
  "minLeadMinutes": 210,
  "strictNotes": true,
  "offers": true
}
```

### Decision and verification limits

All 31 server weeks in this follow-up completed and…39612 tokens truncated…d165e7e00d7da894a9e04f4c646a0b60c15397f1. Controlled diff fingerprintsha256:21c61fb35b1d86d295c08ed68b245af5b7bf74c3e7a76bcc7b66e053c96c8838. Offline Baseline78/78 and candidate85/85 full integrated tests pass; diff check clean. Development seeds top6-economics-a, top6-economics-b; reserved untouched decision seedtop6-economics-decision-6-v1. Decision STOP source after first complete pair: economic delta+1350.05 EUR (+107.08%), 53?117 counted orders, both100% on time, but completed-world audit confirms a pre-existing critical parser miss on BOTH sides (R00608). No selection or holdout on this source. Known destination typo and unhandled I mean day correction require common parser fix, full tests and a fresh baseline before policy validation. No actual late outcome occurred on this request, but quality gate fails..

Baseline config:

```json
{
  "quoteMultiplier": 1.35,
  "feeMultiplier": 1.08,
  "emergencyMultiplier": 2.4,
  "marginReserve": 0.13,
  "minMarginCents": 1600,
  "capacityFraction": 0.28,
  "maxApproachMinutes": 100,
  "minLeadMinutes": 180,
  "strictNotes": true,
  "offers": true
}
```

Candidate config:

```json
{
  "quoteMultiplier": 1.05,
  "feeMultiplier": 0.95,
  "emergencyMultiplier": 2.4,
  "marginReserve": 0.13,
  "minMarginCents": 1600,
  "capacityFraction": 0.28,
  "maxApproachMinutes": 100,
  "minLeadMinutes": 180,
  "strictNotes": true,
  "offers": true
}
```

Gate: pooled development margin gain, every candidate final week>=93%, no undelivered/refused actions or critical missed note facts; then positive fresh-decision delta. Under1% gains prefer greater worst service, ties retain baseline. Negative/unranked weeks and losing candidates remain in the report. World creation/output/source/config checkpoint is saved before first advance, final week immediately saved, each complete pair pushed before continuation.

| Phase | Seed | Side | World | Margin EUR | Won | EUR/order | On time | Undelivered | Refusals | Output |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| development | top6-economics-a | baseline | w11afef92dc0f9617d399 | 1260.76 | 53 | 23.79 | 100.00% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\top6-econ\round-1\development\top6-economics-a\baseline |
| development | top6-economics-a | candidate | w70cecd910e398c680e5c | 2610.81 | 117 | 22.31 | 100.00% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\top6-econ\round-1\development\top6-economics-a\candidate |

Actual ledger EUR, seq-deduplicated and reconciled to final score:

| Seed | Side | Revenue | Driver fees | Refunds | Release | Failed visit | Waiting | Fine | Undelivered penalty |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| top6-economics-a | baseline | 6645.00 | -5313.02 | 0.00 | -71.22 | 0.00 | 0.00 | 0.00 | 0.00 |
| top6-economics-a | candidate | 12729.00 | -10040.55 | 0.00 | -77.64 | 0.00 | 0.00 | 0.00 | 0.00 |

Derived completed-world field audit/whole-cohort attribution: {"checkedAt":"2026-11-14T09:35:31.608Z","method":"Completed-world reveal only; deduplicated seq ledger reconciled to final margin. Won-order truth checked for manual/plates/tyres/deadline/release and note hours against public hours; unrevealed lost/unquoted requests have no order truth.","pairs":[{"seed":"top6-economics-a","phase":"development","baseline":{"ledger":{"revenue":664500,"driver_fee":-531302,"release_fee":-7122},"totalCents":126076,"declines":234,"noteCount":410,"safeCount":221,"checkedWonNotes":16,"misses":[{"requestId":"R00608","leg":0,"fields":["deadline"]}]},"candidate":{"ledger":{"revenue":1272900,"driver_fee":-1004055,"release_fee":-7764},"totalCents":261081,"declines":230,"noteCount":410,"safeCount":221,"checkedWonNotes":31,"misses":[{"requestId":"R00608","leg":0,"fields":["deadline"]}]},"newlySafeCount":0,"newlyQuotedCount":0,"newlyWonCount":0,"introducedCriticalMisses":[]}],"wholeCohortEffects":[{"commonLedgerDeltaCents":{"revenue":-63300,"driver_fee":60525,"release_fee":1989},"newOrderLedgerCents":{"revenue":691300,"driver_fee":-549792,"release_fee":-2631},"seed":"top6-economics-a","phase":"development","deltaCents":135005,"newlyQuoted":12,"removedQuotes":8,"newWonOrderCount":66,"lostWonOrderCount":1,"newOrderMarginCents":138877,"displacedBaselineMarginEffectCents":-3086,"commonOrderInteractionCents":-786,"newOrderMargins":[{"orderId":"R00014","marginCents":1623},{"orderId":"R00023","marginCents":1696},{"orderId":"R00049","marginCents":2784},{"orderId":"R00065","marginCents":2765},{"orderId":"R00089","marginCents":2338},{"orderId":"R00124","marginCents":701},{"orderId":"R00139","marginCents":2481},{"orderId":"R00155","marginCents":1604},{"orderId":"R00157","marginCents":1970},{"orderId":"R00172","marginCents":1645},{"orderId":"R00198","marginCents":2089},{"orderId":"R00241","marginCents":-2631},{"orderId":"R00242","marginCents":1635},{"orderId":"R00246","marginCents":1699},{"orderId":"R00256","marginCents":1642},{"orderId":"R00261","marginCents":1805},{"orderId":"R00268","marginCents":1616},{"orderId":"R00280","marginCents":1631},{"orderId":"R00289","marginCents":1650},{"orderId":"R00325","marginCents":2731},{"orderId":"R00331","marginCents":1695},{"orderId":"R00332","marginCents":1601},{"orderId":"R00335","marginCents":1642},{"orderId":"R00345","marginCents":2982},{"orderId":"R00348","marginCents":2102},{"orderId":"R00351","marginCents":1605},{"orderId":"R00381","marginCents":1635},{"orderId":"R00390","marginCents":1851},{"orderId":"R00409","marginCents":909},{"orderId":"R00417","marginCents":3263},{"orderId":"R00418","marginCents":5787},{"orderId":"R00424","marginCents":2989},{"orderId":"R00426","marginCents":1637},{"orderId":"R00442","marginCents":4068},{"orderId":"R00457","marginCents":4635},{"orderId":"R00482","marginCents":3036},{"orderId":"R00483","marginCents":1686},{"orderId":"R00490","marginCents":3032},{"orderId":"R00493","marginCents":-3665},{"orderId":"R00547","marginCents":1858},{"orderId":"R00550","marginCents":1663},{"orderId":"R00565","marginCents":1878},{"orderId":"R00587","marginCents":2819},{"orderId":"R00635","marginCents":1624},{"orderId":"R00636","marginCents":1683},{"orderId":"R00654","marginCents":3524},{"orderId":"R00661","marginCents":2397},{"orderId":"R00697","marginCents":1605},{"orderId":"R00710","marginCents":1609},{"orderId":"R00793","marginCents":1662},{"orderId":"R00806","marginCents":2505},{"orderId":"R00836","marginCents":1633},{"orderId":"R00850","marginCents":2533},{"orderId":"R00856","marginCents":2487},{"orderId":"R00857","marginCents":9215},{"orderId":"R00880","marginCents":2438},{"orderId":"R00883","marginCents":4614},{"orderId":"R00885","marginCents":1883},{"orderId":"R00888","marginCents":1633},{"orderId":"R00906","marginCents":2003},{"orderId":"R00908","marginCents":1941},{"orderId":"R00936","marginCents":1652},{"orderId":"R00946","marginCents":-379},{"orderId":"R00972","marginCents":2724},{"orderId":"R00992","marginCents":2033},{"orderId":"R01007","marginCents":1676}],"commonOrdersChanged":54,"baseline":{"plannedDrivingHours":193.81666666666666,"marginPerOrderEUR":23.787924528301886,"marginPerPlannedHourEUR":6.504910138446986},"candidate":{"plannedDrivingHours":412.1333333333333,"marginPerOrderEUR":22.314615384615383,"marginPerPlannedHourEUR":6.334867356842445},"driverHourLimit":"Logged winning-quote driving proxy excludes approach, waiting and operational constraints; not measured driver labor."}]}

### Economics round2, level6

Before-edit registration 2026-11-14T09:40:39.695Z. Hypothesis: Opt-in lower bid/fee economics at4?6: fixed0.95 opening multiplier instead of own-fee upward feedback and1.05 list-price base. Current selected cohorts win5?16% of quotes. Static screen exposes452?530 lost bids/week lowered at least5 EUR; this is not predicted profit. Sensitivity:5% lower actual fee spend115?588 EUR/week;50 additional NET20-EUR orders would add1000 EUR/week if deliverable. Evidenced lower bound0. Keep1600 floor,13% reserve,0.28 capacity,180 lead and existing rescue schedule. Joint hypothesis needs ablation if it loses. Common parser repair on BOTH sides: canonical destination typo and decline unsupported I mean corrections. Two red regression tests reproduced the old false-side/false-confident behavior; all baseline80 and candidate87 tests pass. Old worlds are historical diagnostic evidence only; fresh baselines required because source changed.. Core2213766b83900ad7aa289437d37dd055a938dbc4. Baselineb8e2eb604bda730074c651281ce53425fc9a8971; candidate6c7f02bd2b98bb06955dfb6573581a9428450920. Controlled diff fingerprintsha256:21c61fb35b1d86d295c08ed68b245af5b7bf74c3e7a76bcc7b66e053c96c8838. Offline Common parser tests reproduced2 failures before fix; repaired baseline80/80, economic candidate87/87 full suites passed. Development seeds top6-economics-a, top6-economics-b; reserved untouched decision seedtop6-economics-decision-6-v1. Decision REJECT source eligibility despite development+1939.07 EUR and100% service: candidate seedb newly wins R00482 with an unrecognized Peirlla delivery cue assigned to pickupTo. Both weeks remain recorded; no holdout created. Repair common parser and rebaseline both sides. Original decision seed remains untouched..

Baseline config:

```json
{
  "quoteMultiplier": 1.35,
  "feeMultiplier": 1.08,
  "emergencyMultiplier": 2.4,
  "marginReserve": 0.13,
  "minMarginCents": 1600,
  "capacityFraction": 0.28,
  "maxApproachMinutes": 100,
  "minLeadMinutes": 180,
  "strictNotes": true,
  "offers": true
}
```

Candidate config:

```json
{
  "quoteMultiplier": 1.05,
  "feeMultiplier": 0.95,
  "emergencyMultiplier": 2.4,
  "marginReserve": 0.13,
  "minMarginCents": 1600,
  "capacityFraction": 0.28,
  "maxApproachMinutes": 100,
  "minLeadMinutes": 180,
  "strictNotes": true,
  "offers": true
}
```

Gate: pooled development margin gain, every candidate final week>=93%, no undelivered/refused actions or critical missed note facts; then positive fresh-decision delta. Under1% gains prefer greater worst service, ties retain baseline. Negative/unranked weeks and losing candidates remain in the report. World creation/output/source/config checkpoint is saved before first advance, final week immediately saved, each complete pair pushed before continuation.

| Phase | Seed | Side | World | Margin EUR | Won | EUR/order | On time | Undelivered | Refusals | Output |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| development | top6-economics-a | baseline | w4d5fa1ad5a2cbee41d2d | 1219.12 | 52 | 23.44 | 100.00% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\top6-econ\round-2\development\top6-economics-a\baseline |
| development | top6-economics-a | candidate | w1e122097c6d040adbd73 | 2570.43 | 116 | 22.16 | 100.00% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\top6-econ\round-2\development\top6-economics-a\candidate |
| development | top6-economics-b | baseline | wb19b4b05bddad65aba6a | 147.42 | 8 | 18.43 | 100.00% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\top6-econ\round-2\development\top6-economics-b\baseline |
| development | top6-economics-b | candidate | w183e33b36667aeadbac6 | 735.18 | 39 | 18.85 | 100.00% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\top6-econ\round-2\development\top6-economics-b\candidate |

Actual ledger EUR, seq-deduplicated and reconciled to final score:

| Seed | Side | Revenue | Driver fees | Refunds | Release | Failed visit | Waiting | Fine | Undelivered penalty |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| top6-economics-a | baseline | 6326.00 | -5035.66 | 0.00 | -71.22 | 0.00 | 0.00 | 0.00 | 0.00 |
| top6-economics-a | candidate | 12445.00 | -9796.93 | 0.00 | -77.64 | 0.00 | 0.00 | 0.00 | 0.00 |
| top6-economics-b | baseline | 541.00 | -393.58 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| top6-economics-b | candidate | 3585.00 | -2849.82 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |

Derived completed-world field audit/whole-cohort attribution: {"checkedAt":"2026-11-14T09:47:33.971Z","method":"Completed-world reveal only; deduplicated seq ledger reconciled to final margin. Won-order truth checked for manual/plates/tyres/deadline/release and note hours against public hours; unrevealed lost/unquoted requests have no order truth.","pairs":[{"seed":"top6-economics-a","phase":"development","baseline":{"ledger":{"revenue":632600,"driver_fee":-503566,"release_fee":-7122},"totalCents":121912,"declines":235,"noteCount":410,"safeCount":220,"checkedWonNotes":15,"misses":[]},"candidate":{"ledger":{"revenue":1244500,"driver_fee":-979693,"release_fee":-7764},"totalCents":257043,"declines":231,"noteCount":410,"safeCount":220,"checkedWonNotes":30,"misses":[]},"newlySafeCount":0,"newlyQuotedCount":0,"newlyWonCount":0,"introducedCriticalMisses":[]},{"seed":"top6-economics-b","phase":"development","baseline":{"ledger":{"revenue":54100,"driver_fee":-39358},"totalCents":14742,"declines":255,"noteCount":422,"safeCount":199,"checkedWonNotes":1,"misses":[]},"candidate":{"ledger":{"revenue":358500,"driver_fee":-284982},"totalCents":73518,"declines":250,"noteCount":422,"safeCount":199,"checkedWonNotes":8,"misses":[{"requestId":"R00482","leg":0,"fields":["deadline"]}]},"newlySafeCount":0,"newlyQuotedCount":0,"newlyWonCount":0,"introducedCriticalMisses":[]}],"wholeCohortEffects":[{"commonLedgerDeltaCents":{"revenue":-59800,"driver_fee":57151,"release_fee":1989},"newOrderLedgerCents":{"revenue":691300,"driver_fee":-549792,"release_fee":-2631},"seed":"top6-economics-a","phase":"development","deltaCents":135131,"newlyQuoted":12,"removedQuotes":8,"newWonOrderCount":66,"lostWonOrderCount":1,"newOrderMarginCents":138877,"displacedBaselineMarginEffectCents":-3086,"commonOrderInteractionCents":-660,"newOrderMargins":[{"orderId":"R00014","marginCents":1623},{"orderId":"R00023","marginCents":1696},{"orderId":"R00049","marginCents":2784},{"orderId":"R00065","marginCents":2765},{"orderId":"R00089","marginCents":2338},{"orderId":"R00124","marginCents":701},{"orderId":"R00139","marginCents":2481},{"orderId":"R00155","marginCents":1604},{"orderId":"R00157","marginCents":1970},{"orderId":"R00172","marginCents":1645},{"orderId":"R00198","marginCents":2089},{"orderId":"R00241","marginCents":-2631},{"orderId":"R00242","marginCents":1635},{"orderId":"R00246","marginCents":1699},{"orderId":"R00256","marginCents":1642},{"orderId":"R00261","marginCents":1805},{"orderId":"R00268","marginCents":1616},{"orderId":"R00280","marginCents":1631},{"orderId":"R00289","marginCents":1650},{"orderId":"R00325","marginCents":2731},{"orderId":"R00331","marginCents":1695},{"orderId":"R00332","marginCents":1601},{"orderId":"R00335","marginCents":1642},{"orderId":"R00345","marginCents":2982},{"orderId":"R00348","marginCents":2102},{"orderId":"R00351","marginCents":1605},{"orderId":"R00381","marginCents":1635},{"orderId":"R00390","marginCents":1851},{"orderId":"R00409","marginCents":909},{"orderId":"R00417","marginCents":3263},{"orderId":"R00418","marginCents":5787},{"orderId":"R00424","marginCents":2989},{"orderId":"R00426","marginCents":1637},{"orderId":"R00442","marginCents":4068},{"orderId":"R00457","marginCents":4635},{"orderId":"R00482","marginCents":3036},{"orderId":"R00483","marginCents":1686},{"orderId":"R00490","marginCents":3032},{"orderId":"R00493","marginCents":-3665},{"orderId":"R00547","marginCents":1858},{"orderId":"R00550","marginCents":1663},{"orderId":"R00565","marginCents":1878},{"orderId":"R00587","marginCents":2819},{"orderId":"R00635","marginCents":1624},{"orderId":"R00636","marginCents":1683},{"orderId":"R00654","marginCents":3524},{"orderId":"R00661","marginCents":2397},{"orderId":"R00697","marginCents":1605},{"orderId":"R00710","marginCents":1609},{"orderId":"R00793","marginCents":1662},{"orderId":"R00806","marginCents":2505},{"orderId":"R00836","marginCents":1633},{"orderId":"R00850","marginCents":2533},{"orderId":"R00856","marginCents":2487},{"orderId":"R00857","marginCents":9215},{"orderId":"R00880","marginCents":2438},{"orderId":"R00883","marginCents":4614},{"orderId":"R00885","marginCents":1883},{"orderId":"R00888","marginCents":1633},{"orderId":"R00906","marginCents":2003},{"orderId":"R00908","marginCents":1941},{"orderId":"R00936","marginCents":1652},{"orderId":"R00946","marginCents":-379},{"orderId":"R00972","marginCents":2724},{"orderId":"R00992","marginCents":2033},{"orderId":"R01007","marginCents":1676}],"commonOrdersChanged":53,"baseline":{"plannedDrivingHours":184.4,"marginPerOrderEUR":23.444615384615382,"marginPerPlannedHourEUR":6.611279826464208},"candidate":{"plannedDrivingHours":402.71666666666664,"marginPerOrderEUR":22.158879310344826,"marginPerPlannedHourEUR":6.382725654926954},"driverHourLimit":"Logged winning-quote driving proxy excludes approach, waiting and operational constraints; not measured driver labor."},{"commonLedgerDeltaCents":{"revenue":-5200,"driver_fee":3026},"newOrderLedgerCents":{"revenue":309600,"driver_fee":-248650},"seed":"top6-economics-b","phase":"development","deltaCents":58776,"newlyQuoted":8,"removedQuotes":3,"newWonOrderCount":31,"lostWonOrderCount":0,"newOrderMarginCents":60950,"displacedBaselineMarginEffectCents":0,"commonOrderInteractionCents":-2174,"newOrderMargins":[{"orderId":"R00023","marginCents":1691},{"orderId":"R00037","marginCents":1631},{"orderId":"R00057","marginCents":1697},{"orderId":"R00074","marginCents":1603},{"orderId":"R00120","marginCents":1804},{"orderId":"R00152","marginCents":2049},{"orderId":"R00168","marginCents":1674},{"orderId":"R00170","marginCents":1619},{"orderId":"R00230","marginCents":1623},{"orderId":"R00367","marginCents":1642},{"orderId":"R00481","marginCents":1617},{"orderId":"R00482","marginCents":1684},{"orderId":"R00534","marginCents":2102},{"orderId":"R00536","marginCents":2302},{"orderId":"R00544","marginCents":2294},{"orderId":"R00551","marginCents":1829},{"orderId":"R00572","marginCents":1642},{"orderId":"R00590","marginCents":2035},{"orderId":"R00592","marginCents":2415},{"orderId":"R00601","marginCents":1689},{"orderId":"R00602","marginCents":1628},{"orderId":"R00625","marginCents":1700},{"orderId":"R00626","marginCents":2173},{"orderId":"R00799","marginCents":2558},{"orderId":"R00808","marginCents":1683},{"orderId":"R00828","marginCents":2820},{"orderId":"R00833","marginCents":3755},{"orderId":"R00841","marginCents":1657},{"orderId":"R00954","marginCents":1657},{"orderId":"R00957","marginCents":2997},{"orderId":"R00992","marginCents":1680}],"commonOrdersChanged":8,"baseline":{"plannedDrivingHours":13.483333333333333,"marginPerOrderEUR":18.4275,"marginPerPlannedHourEUR":10.933498145859085},"candidate":{"plannedDrivingHours":112.13333333333334,"marginPerOrderEUR":18.85076923076923,"marginPerPlannedHourEUR":6.5563020214030905},"driverHourLimit":"Logged winning-quote driving proxy excludes approach, waiting and operational constraints; not measured driver labor."}]}

### Economics round3, level6

Before-edit registration 2026-11-14T09:53:01.992Z. Hypothesis: Opt-in lower bid/fee economics at4?6: fixed0.95 opening multiplier instead of own-fee upward feedback and1.05 list-price base. Current selected cohorts win5?16% of quotes. Static screen exposes452?530 lost bids/week lowered at least5 EUR; this is not predicted profit. Sensitivity:5% lower actual fee spend115?588 EUR/week;50 additional NET20-EUR orders would add1000 EUR/week if deliverable. Evidenced lower bound0. Keep1600 floor,13% reserve,0.28 capacity,180 lead and existing rescue schedule. Joint hypothesis needs ablation if it loses. Common parser repair on BOTH sides: canonical destination typo and decline unsupported I mean corrections. Two red regression tests reproduced the old false-side/false-confident behavior; all baseline80 and candidate87 tests pass. Old worlds are historical diagnostic evidence only; fresh baselines required because source changed. Second common repair: normalize observed Peirlla and known valims forms; unknown stop-side timed clauses remain uncertain instead of defaulting silently to pickup. Red tests reproduced both bugs; validate all candidate won-note misses, not only newly-safe text.. Core2213766b83900ad7aa289437d37dd055a938dbc4. Baselinede760d860abc088c6661dfd60c7c10876904e5a0; candidatef73489616ce0daadf08bbaaff65ea79f44b0721e. Controlled diff fingerprintsha256:21c61fb35b1d86d295c08ed68b245af5b7bf74c3e7a76bcc7b66e053c96c8838. Offline Guarded baseline82/82 and guarded economics candidate89/89 full tests pass; two new failures reproduced before repair. Development seeds top6-economics-a, top6-economics-b; reserved untouched decision seedtop6-economics-decision-6-v1. Decision KEEP level6 economics0.95/1.05: guarded baseline2097.26?4674.74 EUR (+2577.48,+122.90%), all3 paired seeds positive; fresh decision+762.11 EUR, lowest98.10%, no undelivered/refusals or critical candidate misses. Invalid predecessor sources excluded..

Baseline config:

```json
{
  "quoteMultiplier": 1.35,
  "feeMultiplier": 1.08,
  "emergencyMultiplier": 2.4,
  "marginReserve": 0.13,
  "minMarginCents": 1600,
  "capacityFraction": 0.28,
  "maxApproachMinutes": 100,
  "minLeadMinutes": 180,
  "strictNotes": true,
  "offers": true
}
```

Candidate config:

```json
{
  "quoteMultiplier": 1.05,
  "feeMultiplier": 0.95,
  "emergencyMultiplier": 2.4,
  "marginReserve": 0.13,
  "minMarginCents": 1600,
  "capacityFraction": 0.28,
  "maxApproachMinutes": 100,
  "minLeadMinutes": 180,
  "strictNotes": true,
  "offers": true
}
```

Gate: pooled development margin gain, every candidate final week>=93%, no undelivered/refused actions or critical missed note facts; then positive fresh-decision delta. Under1% gains prefer greater worst service, ties retain baseline. Negative/unranked weeks and losing candidates remain in the report. World creation/output/source/config checkpoint is saved before first advance, final week immediately saved, each complete pair pushed before continuation.

| Phase | Seed | Side | World | Margin EUR | Won | EUR/order | On time | Undelivered | Refusals | Output |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| development | top6-economics-a | baseline | wb3233cd92ee4e2ba9d7e | 1109.73 | 48 | 23.12 | 100.00% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\top6-econ\round-3\development\top6-economics-a\baseline |
| development | top6-economics-a | candidate | w246b77e5f724d6ba338c | 2337.34 | 110 | 21.25 | 99.09% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\top6-econ\round-3\development\top6-economics-a\candidate |
| development | top6-economics-b | baseline | w7bf9cad5029a3c3fba33 | 147.42 | 8 | 18.43 | 100.00% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\top6-econ\round-3\development\top6-economics-b\baseline |
| development | top6-economics-b | candidate | w89d56411b8497d50956d | 735.18 | 39 | 18.85 | 100.00% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\top6-econ\round-3\development\top6-economics-b\candidate |
| holdout | top6-economics-decision-6-v1 | baseline | w546aa0a8d2d7de12cad2 | 840.11 | 43 | 19.54 | 97.67% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\top6-econ\round-3\holdout\top6-economics-decision-6-v1\baseline |
| holdout | top6-economics-decision-6-v1 | candidate | we304696f4cde15534bc4 | 1602.22 | 105 | 15.26 | 98.10% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\top6-econ\round-3\holdout\top6-economics-decision-6-v1\candidate |

Actual ledger EUR, seq-deduplicated and reconciled to final score:

| Seed | Side | Revenue | Driver fees | Refunds | Release | Failed visit | Waiting | Fine | Undelivered penalty |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| top6-economics-a | baseline | 5774.00 | -4593.27 | 0.00 | -71.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| top6-economics-a | candidate | 11783.00 | -9350.27 | -17.75 | -77.64 | 0.00 | 0.00 | 0.00 | 0.00 |
| top6-economics-b | baseline | 541.00 | -393.58 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| top6-economics-b | candidate | 3585.00 | -2849.82 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| top6-economics-decision-6-v1 | baseline | 5218.00 | -4309.39 | -68.50 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| top6-economics-decision-6-v1 | candidate | 11844.00 | -10173.08 | -68.70 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |

Derived completed-world field audit/whole-cohort attribution: {"checkedAt":"2026-11-14T10:05:23.956Z","method":"Completed-world reveal only; deduplicated seq ledger reconciled to final margin. Won-order truth checked for manual/plates/tyres/deadline/release and note hours against public hours; unrevealed lost/unquoted requests have no order truth.","pairs":[{"seed":"top6-economics-a","phase":"development","baseline":{"ledger":{"revenue":577400,"driver_fee":-459327,"release_fee":-7100},"totalCents":110973,"declines":263,"noteCount":410,"safeCount":189,"checkedWonNotes":11,"misses":[]},"candidate":{"ledger":{"revenue":1178300,"driver_fee":-935027,"release_fee":-7764,"late_refund":-1775},"totalCents":233734,"declines":260,"noteCount":410,"safeCount":189,"checkedWonNotes":23,"misses":[]},"newlySafeCount":0,"newlyQuotedCount":0,"newlyWonCount":0,"introducedCriticalMisses":[]},{"seed":"top6-economics-b","phase":"development","baseline":{"ledger":{"revenue":54100,"driver_fee":-39358},"totalCents":14742,"declines":276,"noteCount":422,"safeCount":178,"checkedWonNotes":1,"misses":[]},"candidate":{"ledger":{"revenue":358500,"driver_fee":-284982},"totalCents":73518,"declines":271,"noteCount":422,"safeCount":178,"checkedWonNotes":8,"misses":[]},"newlySafeCount":0,"newlyQuotedCount":0,"newlyWonCount":0,"introducedCriticalMisses":[]},{"seed":"top6-economics-decision-6-v1","phase":"holdout","baseline":{"ledger":{"revenue":521800,"driver_fee":-430939,"late_refund":-6850},"totalCents":84011,"declines":257,"noteCount":386,"safeCount":164,"checkedWonNotes":11,"misses":[]},"candidate":{"ledger":{"revenue":1184400,"driver_fee":-1017308,"late_refund":-6870},"totalCents":160222,"declines":250,"noteCount":386,"safeCount":164,"checkedWonNotes":20,"misses":[]},"newlySafeCount":0,"newlyQuotedCount":0,"newlyWonCount":0,"introducedCriticalMisses":[]}],"wholeCohortEffects":[{"commonLedgerDeltaCents":{"revenue":-56700,"driver_fee":53219,"late_refund":-1775,"release_fee":1967},"newOrderLedgerCents":{"revenue":657600,"driver_fee":-528919,"release_fee":-2631},"seed":"top6-economics-a","phase":"development","deltaCents":122761,"newlyQuoted":12,"removedQuotes":9,"newWonOrderCount":63,"lostWonOrderCount":0,"newOrderMarginCents":126050,"displacedBaselineMarginEffectCents":0,"commonOrderInteractionCents":-3289,"newOrderMargins":[{"orderId":"R00014","marginCents":1623},{"orderId":"R00023","marginCents":1696},{"orderId":"R00049","marginCents":2884},{"orderId":"R00065","marginCents":2765},{"orderId":"R00089","marginCents":2338},{"orderId":"R00124","marginCents":701},{"orderId":"R00139","marginCents":2481},{"orderId":"R00155","marginCents":1604},{"orderId":"R00172","marginCents":1645},{"orderId":"R00198","marginCents":2189},{"orderId":"R00241","marginCents":-2631},{"orderId":"R00242","marginCents":1635},{"orderId":"R00246","marginCents":1699},{"orderId":"R00256","marginCents":1642},{"orderId":"R00261","marginCents":1805},{"orderId":"R00268","marginCents":1616},{"orderId":"R00280","marginCents":1631},{"orderId":"R00289","marginCents":1650},{"orderId":"R00325","marginCents":2731},{"orderId":"R00331","marginCents":1695},{"orderId":"R00332","marginCents":1601},{"orderId":"R00335","marginCents":1642},{"orderId":"R00345","marginCents":2982},{"orderId":"R00348","marginCents":2102},{"orderId":"R00351","marginCents":1705},{"orderId":"R00381","marginCents":1635},{"orderId":"R00390","marginCents":1851},{"orderId":"R00409","marginCents":1015},{"orderId":"R00417","marginCents":3263},{"orderId":"R00418","marginCents":5787},{"orderId":"R00424","marginCents":2989},{"orderId":"R00426","marginCents":1637},{"orderId":"R00442","marginCents":4068},{"orderId":"R00457","marginCents":4635},{"orderId":"R00482","marginCents":3036},{"orderId":"R00483","marginCents":1686},{"orderId":"R00490","marginCents":-7187},{"orderId":"R00493","marginCents":2854},{"orderId":"R00547","marginCents":1858},{"orderId":"R00550","marginCents":1663},{"orderId":"R00565","marginCents":1878},{"orderId":"R00587","marginCents":2819},{"orderId":"R00635","marginCents":1624},{"orderId":"R00636","marginCents":1683},{"orderId":"R00654","marginCents":3524},{"orderId":"R00661","marginCents":2397},{"orderId":"R00697","marginCents":1605},{"orderId":"R00710","marginCents":1609},{"orderId":"R00793","marginCents":1662},{"orderId":"R00806","marginCents":2505},{"orderId":"R00850","marginCents":2633},{"orderId":"R00856","marginCents":2487},{"orderId":"R00857","marginCents":5026},{"orderId":"R00880","marginCents":2438},{"orderId":"R00883","marginCents":4614},{"orderId":"R00885","marginCents":1883},{"orderId":"R00888","marginCents":1633},{"orderId":"R00906","marginCents":2003},{"orderId":"R00936","marginCents":1652},{"orderId":"R00946","marginCents":-379},{"orderId":"R00972","marginCents":2724},{"orderId":"R00992","marginCents":2133},{"orderId":"R01007","marginCents":1676}],"commonOrdersChanged":50,"baseline":{"plannedDrivingHours":168.43333333333334,"marginPerOrderEUR":23.119375,"marginPerPlannedHourEUR":6.5885414605185035},"candidate":{"plannedDrivingHours":381.51666666666665,"marginPerOrderEUR":21.248545454545457,"marginPerPlannedHourEUR":6.126442706740641},"driverHourLimit":"Logged winning-quote driving proxy excludes approach, waiting and operational constraints; not measured driver labor."},{"commonLedgerDeltaCents":{"revenue":-5200,"driver_fee":3026},"newOrderLedgerCents":{"revenue":309600,"driver_fee":-248650},"seed":"top6-economics-b","phase":"development","deltaCents":58776,"newlyQuoted":8,"removedQuotes":3,"newWonOrderCount":31,"lostWonOrderCount":0,"newOrderMarginCents":60950,"displacedBaselineMarginEffectCents":0,"commonOrderInteractionCents":-2174,"newOrderMargins":[{"orderId":"R00023","marginCents":1691},{"orderId":"R00037","marginCents":1631},{"orderId":"R00057","marginCents":1697},{"orderId":"R00074","marginCents":1603},{"orderId":"R00120","marginCents":1804},{"orderId":"R00152","marginCents":2049},{"orderId":"R00168","marginCents":1674},{"orderId":"R00170","marginCents":1619},{"orderId":"R00230","marginCents":1623},{"orderId":"R00367","marginCents":1642},{"orderId":"R00481","marginCents":1617},{"orderId":"R00482","marginCents":1684},{"orderId":"R00534","marginCents":2102},{"orderId":"R00536","marginCents":2302},{"orderId":"R00544","marginCents":2294},{"orderId":"R00551","marginCents":1829},{"orderId":"R00572","marginCents":1642},{"orderId":"R00590","marginCents":2035},{"orderId":"R00592","marginCents":2415},{"orderId":"R00601","marginCents":1689},{"orderId":"R00602","marginCents":1628},{"orderId":"R00625","marginCents":1700},{"orderId":"R00626","marginCents":2173},{"orderId":"R00799","marginCents":2558},{"orderId":"R00808","marginCents":1683},{"orderId":"R00828","marginCents":2820},{"orderId":"R00833","marginCents":3755},{"orderId":"R00841","marginCents":1657},{"orderId":"R00954","marginCents":1657},{"orderId":"R00957","marginCents":2997},{"orderId":"R00992","marginCents":1680}],"commonOrdersChanged":8,"baseline":{"plannedDrivingHours":13.483333333333333,"marginPerOrderEUR":18.4275,"marginPerPlannedHourEUR":10.933498145859085},"candidate":{"plannedDrivingHours":112.13333333333334,"marginPerOrderEUR":18.85076923076923,"marginPerPlannedHourEUR":6.5563020214030905},"driverHourLimit":"Logged winning-quote driving proxy excludes approach, waiting and operational constraints; not measured driver labor."},{"commonLedgerDeltaCents":{"revenue":-42600,"driver_fee":6927,"late_refund":-20},"newOrderLedgerCents":{"revenue":718100,"driver_fee":-602918},"seed":"top6-economics-decision-6-v1","phase":"holdout","deltaCents":76211,"newlyQuoted":14,"removedQuotes":7,"newWonOrderCount":64,"lostWonOrderCount":2,"newOrderMarginCents":115182,"displacedBaselineMarginEffectCents":-3278,"commonOrderInteractionCents":-35693,"newOrderMargins":[{"orderId":"R00034","marginCents":2148},{"orderId":"R00085","marginCents":1670},{"orderId":"R00112","marginCents":1967},{"orderId":"R00113","marginCents":1663},{"orderId":"R00119","marginCents":4403},{"orderId":"R00123","marginCents":3020},{"orderId":"R00137","marginCents":1935},{"orderId":"R00155","marginCents":1698},{"orderId":"R00199","marginCents":1691},{"orderId":"R00206","marginCents":1661},{"orderId":"R00210","marginCents":-7304},{"orderId":"R00236","marginCents":1618},{"orderId":"R00240","marginCents":2920},{"orderId":"R00250","marginCents":1619},{"orderId":"R00258","marginCents":3386},{"orderId":"R00268","marginCents":2467},{"orderId":"R00278","marginCents":2372},{"orderId":"R00308","marginCents":1717},{"orderId":"R00316","marginCents":1695},{"orderId":"R00324","marginCents":3199},{"orderId":"R00329","marginCents":-2998},{"orderId":"R00330","marginCents":2580},{"orderId":"R00345","marginCents":1921},{"orderId":"R00410","marginCents":-8741},{"orderId":"R00462","marginCents":1905},{"orderId":"R00465","marginCents":2491},{"orderId":"R00479","marginCents":4168},{"orderId":"R00487","marginCents":2554},{"orderId":"R00489","marginCents":3348},{"orderId":"R00491","marginCents":2581},{"orderId":"R00492","marginCents":1609},{"orderId":"R00542","marginCents":1747},{"orderId":"R00550","marginCents":1646},{"orderId":"R00579","marginCents":1901},{"orderId":"R00605","marginCents":1693},{"orderId":"R00621","marginCents":3854},{"orderId":"R00624","marginCents":1681},{"orderId":"R00634","marginCents":3846},{"orderId":"R00647","marginCents":3005},{"orderId":"R00651","marginCents":1611},{"orderId":"R00667","marginCents":1694},{"orderId":"R00688","marginCents":1699},{"orderId":"R00690","marginCents":1629},{"orderId":"R00700","marginCents":1673},{"orderId":"R00708","marginCents":1604},{"orderId":"R00718","marginCents":1697},{"orderId":"R00723","marginCents":1687},{"orderId":"R00730","marginCents":1772},{"orderId":"R00739","marginCents":1674},{"orderId":"R00740","marginCents":3001},{"orderId":"R00749","marginCents":2279},{"orderId":"R00759","marginCents":2709},{"orderId":"R00766","marginCents":2783},{"orderId":"R00772","marginCents":2407},{"orderId":"R00786","marginCents":1691},{"orderId":"R00792","marginCents":1691},{"orderId":"R00798","marginCents":1615},{"orderId":"R00852","marginCents":1721},{"orderId":"R00863","marginCents":1946},{"orderId":"R00872","marginCents":1611},{"orderId":"R00897","marginCents":1691},{"orderId":"R00913","marginCents":3363},{"orderId":"R00917","marginCents":1610},{"orderId":"R00922","marginCents":1988}],"commonOrdersChanged":41,"baseline":{"plannedDrivingHours":152.1,"marginPerOrderEUR":19.537441860465115,"marginPerPlannedHourEUR":5.523405654174885},"candidate":{"plannedDrivingHours":379.21666666666664,"marginPerOrderEUR":15.259238095238096,"marginPerPlannedHourEUR":4.2250780116907665},"driverHourLimit":"Logged winning-quote driving proxy excludes approach, waiting and operational constraints; not measured driver labor."}]}

### Economics round4, level6

Before-edit registration 2026-11-14T10:09:53.560Z. Hypothesis: Lower fixed opening fee0.95?0.86 under same code/config otherwise. Accepted0.95 policy has98.10?100% service but still far fewer won jobs than public top6 reference. Actual driver fees dominate spend; a hypothetical uniform9.47% reduction in price-sensitive fees is a sensitivity, not guaranteed saving (late/rescue fees unchanged and bookings can decline). More competitive fee-based quote floors can win profitable volume. Larger lever than tiny additional parser coverage; prior training-level0.86 evidence is motivation only, not validation at6.. Core2213766b83900ad7aa289437d37dd055a938dbc4. Baselinef73489616ce0daadf08bbaaff65ea79f44b0721e; candidatef73489616ce0daadf08bbaaff65ea79f44b0721e. Controlled diff fingerprintsame immutable source; sole config delta feeMultiplier0.95?0.86. Offline Fresh full89/89 tests pass on identical baseline/candidate source; validateConfig accepts full0.86 profile; no code edits. Development seeds top6-economics-a, top6-economics-b; reserved untouched decision seedtop6-economics-fee086-decision-6-v1. Decision REJECT fee0.86 as a near tie with worse buffer: development+8.15 EUR (+0.27%), seedA -367.95,seedB +376.10; minimum98.43% vs0.95 control99.09%. The under1% rule prefers the better service buffer. No new0.86 decision world is created; reserved seed remains unseen..

Baseline config:

```json
{
  "quoteMultiplier": 1.05,
  "feeMultiplier": 0.95,
  "emergencyMultiplier": 2.4,
  "marginReserve": 0.13,
  "minMarginCents": 1600,
  "capacityFraction": 0.28,
  "maxApproachMinutes": 100,
  "minLeadMinutes": 180,
  "strictNotes": true,
  "offers": true
}
```

Candidate config:

```json
{
  "quoteMultiplier": 1.05,
  "feeMultiplier": 0.86,
  "emergencyMultiplier": 2.4,
  "marginReserve": 0.13,
  "minMarginCents": 1600,
  "capacityFraction": 0.28,
  "maxApproachMinutes": 100,
  "minLeadMinutes": 180,
  "strictNotes": true,
  "offers": true
}
```

Gate: pooled development margin gain, every candidate final week>=93%, no undelivered/refused actions or critical missed note facts; then positive fresh-decision delta. Under1% gains prefer greater worst service, ties retain baseline. Negative/unranked weeks and losing candidates remain in the report. World creation/output/source/config checkpoint is saved before first advance, final week immediately saved, each complete pair pushed before continuation.

| Phase | Seed | Side | World | Margin EUR | Won | EUR/order | On time | Undelivered | Refusals | Output |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| development | top6-economics-a | baseline | w246b77e5f724d6ba338c | 2337.34 | 110 | 21.25 | 99.09% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\top6-econ\round-3\development\top6-economics-a\candidate |
| development | top6-economics-a | candidate | w8e568c7115f86b058aed | 1969.39 | 127 | 15.51 | 98.43% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\top6-econ\round-4\development\top6-economics-a\candidate |
| development | top6-economics-b | baseline | w89d56411b8497d50956d | 735.18 | 39 | 18.85 | 100.00% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\top6-econ\round-3\development\top6-economics-b\candidate |
| development | top6-economics-b | candidate | wd1fce921714c0c0eb379 | 1111.28 | 57 | 19.50 | 100.00% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\top6-econ\round-4\development\top6-economics-b\candidate |

Actual ledger EUR, seq-deduplicated and reconciled to final score:

| Seed | Side | Revenue | Driver fees | Refunds | Release | Failed visit | Waiting | Fine | Undelivered penalty |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| top6-economics-a | baseline | 11783.00 | -9350.27 | -17.75 | -77.64 | 0.00 | 0.00 | 0.00 | 0.00 |
| top6-economics-a | candidate | 12916.00 | -10786.83 | -59.50 | -70.28 | 0.00 | -30.00 | 0.00 | 0.00 |
| top6-economics-b | baseline | 3585.00 | -2849.82 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| top6-economics-b | candidate | 5362.00 | -4196.33 | 0.00 | -54.39 | 0.00 | 0.00 | 0.00 | 0.00 |

Derived completed-world field audit/whole-cohort attribution: {"checkedAt":"2026-11-14T10:46:48.440Z","method":"Completed-world reveal only; deduplicated seq ledger reconciled to final margin. Won-order truth checked for manual/plates/tyres/deadline/release and note hours against public hours; unrevealed lost/unquoted requests have no order truth.","pairs":[{"seed":"top6-economics-a","phase":"development","baseline":{"ledger":{"revenue":1178300,"driver_fee":-935027,"release_fee":-7764,"late_refund":-1775},"totalCents":233734,"declines":260,"noteCount":410,"safeCount":189,"checkedWonNotes":23,"misses":[]},"candidate":{"ledger":{"revenue":1291600,"driver_fee":-1078683,"release_fee":-7028,"waiting":-3000,"late_refund":-5950},"totalCents":196939,"declines":260,"noteCount":410,"safeCount":189,"checkedWonNotes":29,"misses":[]},"newlySafeCount":0,"newlyQuotedCount":0,"newlyWonCount":0,"introducedCriticalMisses":[]},{"seed":"top6-economics-b","phase":"development","baseline":{"ledger":{"revenue":358500,"driver_fee":-284982},"totalCents":73518,"declines":271,"noteCount":422,"safeCount":178,"checkedWonNotes":8,"misses":[]},"candidate":{"ledger":{"revenue":536200,"driver_fee":-419633,"release_fee":-5439},"totalCents":111128,"declines":275,"noteCount":422,"safeCount":178,"checkedWonNotes":11,"misses":[]},"newlySafeCount":0,"newlyQuotedCount":0,"newlyWonCount":0,"introducedCriticalMisses":[]}],"wholeCohortEffects":[{"commonLedgerDeltaCents":{"revenue":-18700,"driver_fee":-9737,"release_fee":736,"late_refund":-4175,"waiting":-3000},"newOrderLedgerCents":{"revenue":187300,"driver_fee":-178700},"seed":"top6-economics-a","phase":"development","deltaCents":-36795,"newlyQuoted":2,"removedQuotes":2,"newWonOrderCount":23,"lostWonOrderCount":5,"newOrderMarginCents":8600,"displacedBaselineMarginEffectCents":-10519,"commonOrderInteractionCents":-34876,"newOrderMargins":[{"orderId":"R00013","marginCents":1992},{"orderId":"R00106","marginCents":-7342},{"orderId":"R00107","marginCents":-6331},{"orderId":"R00177","marginCents":1695},{"orderId":"R00207","marginCents":1681},{"orderId":"R00232","marginCents":1659},{"orderId":"R00271","marginCents":1629},{"orderId":"R00319","marginCents":1658},{"orderId":"R00326","marginCents":1603},{"orderId":"R00329","marginCents":1650},{"orderId":"R00350","marginCents":1606},{"orderId":"R00370","marginCents":1661},{"orderId":"R00445","marginCents":2663},{"orderId":"R00489","marginCents":3195},{"orderId":"R00505","marginCents":1681},{"orderId":"R00515","marginCents":1638},{"orderId":"R00543","marginCents":1647},{"orderId":"R00593","marginCents":1930},{"orderId":"R00824","marginCents":1950},{"orderId":"R00862","marginCents":1781},{"orderId":"R00905","marginCents":1619},{"orderId":"R00912","marginCents":-14378},{"orderId":"R00965","marginCents":1713}],"commonOrdersChanged":103,"baseline":{"plannedDrivingHours":381.51666666666665,"marginPerOrderEUR":21.248545454545457,"marginPerPlannedHourEUR":6.126442706740641},"candidate":{"plannedDrivingHours":424.15,"marginPerOrderEUR":15.507007874015748,"marginPerPlannedHourEUR":4.643145113756926},"driverHourLimit":"Logged winning-quote driving proxy excludes approach, waiting and operational constraints; not measured driver labor."},{"commonLedgerDeltaCents":{"revenue":-27600,"driver_fee":33133,"release_fee":-5439},"newOrderLedgerCents":{"revenue":220300,"driver_fee":-180369},"seed":"top6-economics-b","phase":"development","deltaCents":37610,"newlyQuoted":2,"removedQuotes":6,"newWonOrderCount":21,"lostWonOrderCount":1,"newOrderMarginCents":39931,"displacedBaselineMarginEffectCents":-2415,"commonOrderInteractionCents":94,"newOrderMargins":[{"orderId":"R00049","marginCents":1663},{"orderId":"R00062","marginCents":1662},{"orderId":"R00128","marginCents":1871},{"orderId":"R00156","marginCents":2327},{"orderId":"R00189","marginCents":1831},{"orderId":"R00318","marginCents":1669},{"orderId":"R00334","marginCents":1944},{"orderId":"R00355","marginCents":1617},{"orderId":"R00396","marginCents":3088},{"orderId":"R00454","marginCents":710},{"orderId":"R00480","marginCents":1612},{"orderId":"R00541","marginCents":1643},{"orderId":"R00721","marginCents":3910},{"orderId":"R00774","marginCents":1635},{"orderId":"R00786","marginCents":1652},{"orderId":"R00847","marginCents":1664},{"orderId":"R00938","marginCents":1768},{"orderId":"R00974","marginCents":1626},{"orderId":"R00981","marginCents":1647},{"orderId":"R00987","marginCents":1697},{"orderId":"R00994","marginCents":2695}],"commonOrdersChanged":37,"baseline":{"plannedDrivingHours":112.13333333333334,"marginPerOrderEUR":18.85076923076923,"marginPerPlannedHourEUR":6.5563020214030905},"candidate":{"plannedDrivingHours":181.65,"marginPerOrderEUR":19.49614035087719,"marginPerPlannedHourEUR":6.1176988714560965},"driverHourLimit":"Logged winning-quote driving proxy excludes approach, waiting and operational constraints; not measured driver labor."}]}

### Economics round5, level6

Before-edit registration 2026-11-14T10:51:13.360Z. Hypothesis: Keep driver fee0.95 and quote1.05, lower ONLY absolute contribution floor1600?900 to target short profitable work without the driver-booking/wait/refund side effects seen at fee0.86. Completed0.95 data show424/439 lost near-fee-floor bids with >=5 EUR possible floor room; existing winner revenue sacrifice is bounded by284/152 EUR if all exposed discounts applied. Scenario50 extra NET9-EUR orders gives450 EUR before that sacrifice, not a win/profit forecast; real driver/capacity costs may erase it. Prior1100-floor loss on the old fee-learning source remains recorded and is not a validation of this new fixed-fee model. New integration source requires fresh paired baselines even though training flag is false at6.. Core1e8e5211364f95f75ec165e3338e0729259a530f. Baselineca6ed3f4ce3e4beb114e8380a38892a16f7a7752; candidateca6ed3f4ce3e4beb114e8380a38892a16f7a7752. Controlled diff fingerprintidentical source commit on both sides; sole scalar change minMarginCents1600?900. Offline New integrated key-overlay full90/90 tests pass; validateConfig on both profiles required. Development seeds top6-economics-a, top6-economics-b; reserved untouched decision seedtop6-floor900-decision-6-v1. Decision DEFER remaining practice at user instruction to run ranking4?6. First floor900 pair+259.84 EUR at99.28%; only one development seed completed, no holdout, candidate NOT selected. Preserve untouched remaining seeds/world checkpoint; do not use it for ranking..

Baseline config:

```json
{
  "quoteMultiplier": 1.05,
  "feeMultiplier": 0.95,
  "emergencyMultiplier": 2.4,
  "marginReserve": 0.13,
  "minMarginCents": 1600,
  "capacityFraction": 0.28,
  "maxApproachMinutes": 100,
  "minLeadMinutes": 180,
  "strictNotes": true,
  "offers": true,
  "trainingEconomy": false
}
```

Candidate config:

```json
{
  "quoteMultiplier": 1.05,
  "feeMultiplier": 0.95,
  "emergencyMultiplier": 2.4,
  "marginReserve": 0.13,
  "minMarginCents": 900,
  "capacityFraction": 0.28,
  "maxApproachMinutes": 100,
  "minLeadMinutes": 180,
  "strictNotes": true,
  "offers": true,
  "trainingEconomy": false
}
```

Gate: pooled development margin gain, every candidate final week>=93%, no undelivered/refused actions or critical missed note facts; then positive fresh-decision delta. Under1% gains prefer greater worst service, ties retain baseline. Negative/unranked weeks and losing candidates remain in the report. World creation/output/source/config checkpoint is saved before first advance, final week immediately saved, each complete pair pushed before continuation.

| Phase | Seed | Side | World | Margin EUR | Won | EUR/order | On time | Undelivered | Refusals | Output |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| development | top6-economics-a | baseline | w9a0a27618693a42ebd6f | 2337.34 | 110 | 21.25 | 99.09% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\top6-econ\round-5\development\top6-economics-a\baseline |
| development | top6-economics-a | candidate | w73061dccaac0006763b7 | 2597.18 | 138 | 18.82 | 99.28% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\top6-econ\round-5\development\top6-economics-a\candidate |

Actual ledger EUR, seq-deduplicated and reconciled to final score:

| Seed | Side | Revenue | Driver fees | Refunds | Release | Failed visit | Waiting | Fine | Undelivered penalty |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| top6-economics-a | baseline | 11783.00 | -9350.27 | -17.75 | -77.64 | 0.00 | 0.00 | 0.00 | 0.00 |
| top6-economics-a | candidate | 12842.00 | -10123.11 | -17.75 | -103.96 | 0.00 | 0.00 | 0.00 | 0.00 |

Derived completed-world field audit/whole-cohort attribution: {"checkedAt":"2026-11-14T10:58:27.055Z","method":"Completed-world reveal only; deduplicated seq ledger reconciled to final margin. Won-order truth checked for manual/plates/tyres/deadline/release and note hours against public hours; unrevealed lost/unquoted requests have no order truth.","pairs":[{"seed":"top6-economics-a","phase":"development","baseline":{"ledger":{"revenue":1178300,"driver_fee":-935027,"release_fee":-7764,"late_refund":-1775},"totalCents":233734,"declines":260,"noteCount":410,"safeCount":189,"checkedWonNotes":23,"misses":[]},"candidate":{"ledger":{"revenue":1284200,"driver_fee":-1012311,"release_fee":-10396,"late_refund":-1775},"totalCents":259718,"declines":262,"noteCount":410,"safeCount":189,"checkedWonNotes":29,"misses":[]},"newlySafeCount":0,"newlyQuotedCount":0,"newlyWonCount":0,"introducedCriticalMisses":[]}],"wholeCohortEffects":[{"commonLedgerDeltaCents":{"revenue":-5200,"driver_fee":14768,"release_fee":-2632,"late_refund":0},"newOrderLedgerCents":{"revenue":146900,"driver_fee":-121857},"seed":"top6-economics-a","phase":"development","deltaCents":25984,"newlyQuoted":0,"removedQuotes":2,"newWonOrderCount":31,"lostWonOrderCount":3,"newOrderMarginCents":25043,"displacedBaselineMarginEffectCents":-5995,"commonOrderInteractionCents":6936,"newOrderMargins":[{"orderId":"R00013","marginCents":926},{"orderId":"R00064","marginCents":957},{"orderId":"R00074","marginCents":1174},{"orderId":"R00076","marginCents":909},{"orderId":"R00107","marginCents":-6231},{"orderId":"R00133","marginCents":1141},{"orderId":"R00177","marginCents":1371},{"orderId":"R00183","marginCents":1427},{"orderId":"R00207","marginCents":1312},{"orderId":"R00231","marginCents":921},{"orderId":"R00232","marginCents":951},{"orderId":"R00271","marginCents":1275},{"orderId":"R00276","marginCents":1069},{"orderId":"R00301","marginCents":1058},{"orderId":"R00326","marginCents":999},{"orderId":"R00327","marginCents":999},{"orderId":"R00329","marginCents":985},{"orderId":"R00366","marginCents":990},{"orderId":"R00370","marginCents":1289},{"orderId":"R00388","marginCents":-908},{"orderId":"R00429","marginCents":1377},{"orderId":"R00433","marginCents":961},{"orderId":"R00479","marginCents":945},{"orderId":"R00492","marginCents":912},{"orderId":"R00512","marginCents":1060},{"orderId":"R00810","marginCents":1195},{"orderId":"R00824","marginCents":1463},{"orderId":"R00862","marginCents":1424},{"orderId":"R00905","marginCents":1131},{"orderId":"R00955","marginCents":953},{"orderId":"R01021","marginCents":1008}],"commonOrdersChanged":51,"baseline":{"plannedDrivingHours":381.51666666666665,"marginPerOrderEUR":21.248545454545457,"marginPerPlannedHourEUR":6.126442706740641},"candidate":{"plannedDrivingHours":400.3,"marginPerOrderEUR":18.82014492753623,"marginPerPlannedHourEUR":6.488083937047214},"driverHourLimit":"Logged winning-quote driving proxy excludes approach, waiting and operational constraints; not measured driver labor."}]}

Controller {"pid":5608,"round":5,"startedAt":"2026-11-14T10:51:22.523Z","state":"running","command":"work/economics-worker.mjs 5"}. Next Push completed floor pair, stop idle own practice controller, switch to explicitly authorized current-round ranking4?6 with frozen team presets. Shared slots checked; own worlds run serially, never more than2 active. Only own IDs can be resumed after the old controller stops. Frozen source finishes its worlds despite later teammate updates; fetch/rebaseline/test before a new round. Dependency: exact per-level parser, core, both full configs and unchanged route/capacity/rescue algorithms. Quotes and opening fees are a joint policy, so mechanism is established through ledger and ablations, not inferred from one scalar. No declined list revenue counts as a loss. Planned-driving-hour ratios are logged-route proxies excluding approach/waiting.

Exact integrated file artifact: https://github.com/lilso-andy/spread-dispatcher/commit/2fd2bf3e36e4a39b588214884ff976a7354e7897. To reproduce tested level6 source f734896, start from core2213766 and restore ONLY desk.ts, test/market-economics.test.ts, notes.ts and test/notes.test.ts from that artifact. Other files in the main-based review commit are not the executed dispatcher. Branch HEAD retains a minimal compatible Desk diff and cargo-default Notes. For level5 use cargo Notes from HEAD, not the level6 key variant. Newer integration must merge the scoped diff and rebaseline; never overwrite newer teammate code with the archived file.

Scope: notes.ts/parser tests/report plus explicitly approved desk.ts and test/market-economics.test.ts. No shared config, planner/runner or teammate-branch edits, PR merge, force-push, ranking/test-final/live-final. Raw logs/reveals/keys stay local.

## Authorized ranking levels4–6: season6 run2

User explicitly authorized ranking levels4–6 in this chat. Limited to one additional run per level, expected run2/5 in season6. No seeds, reveal, fork, final, merge or other levels. Source frozen at ab4f5b139176de9c12687a7b73685d8d19403af3 (C:\Users\thanh\Documents\Codex\2026-11-14\t\work\ranking-456-latest); main differs: main is 9dccfdb6238abe56e61938ecb48fd64b371651b2. All 87 offline tests passed. Team integration presets are used without experimental floor900/fee086. Earlier practice controller stopped at a completed pair; its remaining experiment is deferred.

Checkpoint: Push preregistered ranking checkpoint before creation. Controller: not started. Local manifest: work/ranking-456/manifest.json. Raw journals remain local.

| Level | Status | World | Margin EUR | Won | On time | Undelivered | Refusals |
|---:|---|---|---:|---:|---:|---:|---:|
| 4 | planned | pending | pending | pending | pending | pending | pending |
| 5 | planned | pending | pending | pending | pending | pending | pending |
| 6 | planned | pending | pending | pending | pending | pending | pending |

Level 4: source ab4f5b139176de9c12687a7b73685d8d19403af3; season6 expected run2; full config `{"quoteMultiplier":1.35,"feeMultiplier":1.08,"emergencyMultiplier":2.4,"marginReserve":0.13,"minMarginCents":1600,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; output C:\Users\thanh\Documents\Codex\2026-11-14\t\work\ranking-456\level-4; world not created; next create only if season6 played1 and no run2 exists, then run own world.

Level 5: source ab4f5b139176de9c12687a7b73685d8d19403af3; season6 expected run2; full config `{"quoteMultiplier":1.35,"feeMultiplier":1.08,"emergencyMultiplier":2.4,"marginReserve":0.13,"minMarginCents":1600,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; output C:\Users\thanh\Documents\Codex\2026-11-14\t\work\ranking-456\level-5; world not created; next create only if season6 played1 and no run2 exists, then run own world.

Level 6: source ab4f5b139176de9c12687a7b73685d8d19403af3; season6 expected run2; full config `{"quoteMultiplier":1.05,"feeMultiplier":0.95,"emergencyMultiplier":2.4,"marginReserve":0.13,"minMarginCents":1600,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; output C:\Users\thanh\Documents\Codex\2026-11-14\t\work\ranking-456\level-6; world not created; next create only if season6 played1 and no run2 exists, then run own world.

These are ranking observations, not paired causal uplift evidence. Retain every completed result, including any week below93%. Two of five weeks per level cannot establish a final top-six position.
