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

All 31 server weeks in this follow-up completed and met the final 90% threshold. Failed thresholds: none. Refused actions: zero. Undelivered orders: zero. This includes the losing v1 experiment, which remains recorded above.

On the eight paired level 5–8 weeks, v2 increases total margin from EUR 29,299.36 to EUR 32,528.24 (+EUR 3,228.88, +11.02%), increasing on all eight pairs. Minimum service falls from 98.00% to 97.36%; this is a real tradeoff, not a claim of improved reliability. Select v2 over v1 for review, retaining the conservative ambiguity guards. Level 1–4 contain no notes in this seed and show identical baseline/v1 results. The final parser changes only note-bearing behavior; a single-seed lower-level sweep is not broad validation.

The teammate training configuration separately improves level 1/2/3 on notes-loop-01 from EUR 2,206.51 / 2,248.09 / 2,242.97 to EUR 3,079.14 / 3,083.38 / 3,104.63. Candidate service is at least 99.62%. This supports the teammate's training candidate on this seed; it is not a parser improvement or a reason to use training in competitive levels.

Final offline verification: 46/46 tests on the personal main-based branch; 65/65 on the integrated practice source. `git diff --check` passes. The final parser source is identical in both. Only notes.ts, test/notes.test.ts and this report are proposed in the PR. Main and teammate modules are not merged remotely by this task.

Post-run audit of v2 reveals: 3,533 note-bearing request occurrences across eight worlds; 1,664 passed parser uncertainty/summer filters (47.10%). Of those, 264 had won-order truth available. Zero mismatches were found for manual licence, transfer plates, fitted summer tyres, readiness/release lower bounds and note delivery deadlines. This is a partial field audit, not a full false-safe rate: opening-hours semantics, unknown prose and lost/unquoted truth remain unverified. False-uncertain rate on the server corpus cannot be established from these reveals. The earlier manually labelled sample is retained as development evidence.

The benign whitelist matches complete clauses only, including cargo tyres, keys, references and greetings. Mixed unknown conditions are still uncertain. Cargo summer tyres are not classified as fitted tyres. Corrections, unsupported hours and colloquial constraints remain areas for further work. Do not claim a global maximum or unseen-final eligibility from these two seeds.

### Reproduction and next loop

For the code-only comparison, check out integrated dispatcher 3cb7ba4 in separate worktrees. Baseline retains its notes.ts; candidate replaces only notes.ts from work/notes-thanhdatLUT. Run with Node 24:

```powershell
node --env-file=.env tools/evaluate-levels.ts --levels 5,6,7,8 --seeds notes-loop-01,notes-loop-02 --config configs/balanced.json --output runs/NEW_UNIQUE_FOLDER --reveal
```

Each checkout needs its own ignored .env. The full balanced and training configurations, every world ID, seed, score and failed v1 comparison are above. The local practice snapshot 085b3cc is reconstructible by overlaying the PR parser onto the cited integrated source. Do not interpret main-only deployment as the same integrated dispatcher benchmark.

Next: review this PR, integrate it with the dispatcher owner, then compare on additional fresh seeds before policy selection. Expand scoped correction handling and weekday-specific hours from completed-world examples. Keep every losing comparison and recheck final service before adopting any higher-volume change. Fetch teammate branches before the next paired comparison; do not change code/config midway through a pair. No world from this chat is left running after this checkpoint.


## Continuous practice batch 01 — scoped corrections and Unicode clocks

Status: complete, 20/20 completed pairs (40 completed weeks). Underlying dispatcher is frozen at 3cb7ba4. Baseline parser snapshot 085b3cc57e405d13ec12fe5b0f322786a90072a2; candidate snapshot bf1b9d49a6ac97bd74dc03ab209b09ba5b051e0e. Candidate adds bounded bare-clock corrections and complete Unicode word boundaries, retaining ambiguity declines. No ranking/final calls; one world of this chat is controlled at a time. Fetches do not change source within an active comparison.

Full configuration for both sides:

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

| Pair | Level | Seed | Baseline world | Candidate world | Base EUR | Candidate EUR | Delta EUR | Base on time | Candidate on time | Both eligible | Refusals base/candidate |
| ---: | ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- | --- |
| 1 | 5 | notes-cycle-03 | wb747de79b7089e197e41 | w7eb6d48afc77ea0dcf18 | 2059.31 | 2103.89 | 44.58 | 98.77% | 98.81% | true | 0/0 |
| 2 | 6 | notes-cycle-03 | w0949faecd0f94f1c3e8f | w3251d4f085546f88a16f | 3601.74 | 3601.74 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 3 | 7 | notes-cycle-03 | wf514bf0669cb988fba98 | w9828df79aba34cb30a0b | 1023.59 | 1023.59 | 0.00 | 94.44% | 94.44% | true | 0/0 |
| 4 | 8 | notes-cycle-03 | w01b3f01fd0a62602fd0b | w70c73a1d97ba9f738df4 | 5578.72 | 5578.72 | 0.00 | 97.91% | 97.91% | true | 0/0 |
| 5 | 5 | notes-cycle-04 | w03a35737295a59fa313d | wa7ffd96c207e70988d5e | 4089.87 | 4089.87 | 0.00 | 99.26% | 99.26% | true | 0/0 |
| 6 | 6 | notes-cycle-04 | w86d68dc1139f9413c400 | w715d8960397bd2c12ebd | 4340.09 | 4340.09 | 0.00 | 99.33% | 99.33% | true | 0/0 |
| 7 | 7 | notes-cycle-04 | w3ca5e628dcdd576cd998 | w611044d77fa252349e87 | 4314.06 | 4314.06 | 0.00 | 96.13% | 96.13% | true | 0/0 |
| 8 | 8 | notes-cycle-04 | w81d472fde65c5aa133c6 | w7dce3984aaa9179ae52c | 5607.73 | 5639.78 | 32.05 | 96.25% | 96.27% | true | 0/0 |
| 9 | 5 | notes-cycle-05 | wf675a96d69040806427c | w9ea48d1d6f43af36d759 | 657.69 | 657.69 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 10 | 6 | notes-cycle-05 | wcc2ed140d6f0c180346e | wc792aa81f706735aadbf | 622.71 | 622.71 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 11 | 7 | notes-cycle-05 | w4cc77e8f7c2c5f4a925b | wabfcb8c7ad615bc059b1 | 1445.11 | 1445.11 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 12 | 8 | notes-cycle-05 | w6765da89eabbd152bac7 | wc32ca34099d4a69570bc | 3809.32 | 3809.32 | 0.00 | 99.18% | 99.18% | true | 0/0 |
| 13 | 5 | notes-cycle-06 | w15c006d25d5a519b6023 | w9ba28d0c32c5e3515a93 | 484.91 | 484.91 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 14 | 6 | notes-cycle-06 | wd2011638577a7ed5254f | w1f837b7d5551af2391d0 | 525.59 | 525.59 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 15 | 7 | notes-cycle-06 | w3781f95e304148dcb038 | w24103f6bcaf126d71e99 | 1311.88 | 1311.88 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 16 | 8 | notes-cycle-06 | w5f7e472918f00c6f4d6c | w3538e1d4a2162c968e70 | 4029.35 | 4029.35 | 0.00 | 97.86% | 97.86% | true | 0/0 |
| 17 | 5 | notes-cycle-07 | waaa42ac2a049fccf86c0 | wa48b7b37c41bd2a010b6 | 1014.92 | 1014.92 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 18 | 6 | notes-cycle-07 | wf9d2ddb5bbb8dbd02f13 | w28c2d93afe28eb113f21 | 1589.27 | 1589.27 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 19 | 7 | notes-cycle-07 | wca2addda169e568bd4aa | w08ce6e1c871c645c01f2 | 3461.15 | 3461.15 | 0.00 | 99.17% | 99.17% | true | 0/0 |
| 20 | 8 | notes-cycle-07 | wa19f205f99137caf2256 | w384a337ad188eaf24021 | 5479.44 | 5443.27 | -36.17 | 97.45% | 97.42% | true | 0/0 |

Completed-pair totals: EUR 55046.45 -> EUR 55086.91; delta EUR 40.46. Final 90% threshold failures: []. All reductions are retained in the table. Partial truth audit: 391 won note-bearing requests checked; 1 mismatches for equipment, readiness/release and note deadline fields. Hours/unknown prose and lost-order truth remain unverified. Server request occurrences: 8747, passing parser uncertainty/summer filters: 3667. These counts are not a calibrated full false-safe/false-uncertain estimate.

Tests: 48 main-based / 67 integrated-source tests passed before server comparison. Snapshot source is reconstructible from dispatcher 3cb7ba4 plus the candidate notes.ts and test/notes.test.ts proposed by this branch. Complex corrections remain uncertain. No automatic merge or final policy selection. Local scratch loop writes a checkpoint after every run and reuses completed results; interrupted worlds are resumed only from this chat’s own metadata. Next batch must use new output folders and freeze both source revisions/config before running.


## Balanced allocation follow-ups

User requested equal attention to every level. Two matched batches allocate five seeds to each level: twenty parser pairs at levels 5–8, and twenty configuration pairs at levels 1–4. No promise of equal profit growth is made; each level is reported separately. Both use the same underlying integrated dispatcher. No ranking/final run is authorized.

### Readiness typo fix

The batch audit found request R00629, “huolto kesken, valmis huuomenna klo 12”, arriving at minute 3894. Both baseline 085b3cc and scoped-correction candidate bf1b9d4 extracted 3600, while reveal readyAt was 5040. Candidate fb35ea8 normalizes only the complete observed word huuomenna to huomenna and extracts 5040. The existing baseline error is retained in the batch audit above. Its next snapshot is a separate comparison, not a retroactive change to batch scores.

Validation status: complete. Before source bf1b9d4, after source fb35ea8; same Balanced config.

| Seed | Version | World | Margin EUR | On time | Eligible | Refusals |
| --- | --- | --- | ---: | ---: | --- | ---: |
| notes-cycle-03 | before | wcfeb7505a072669e9c38 | 5578.72 | 97.91% | true | 0 |
| notes-cycle-03 | after | w3e14efc93cfcc8dfdc97 | 5578.72 | 97.91% | true | 0 |
| notes-typo-holdout-08 | before | wdc4524f7d34dd1b35722 | 3351.92 | 99.04% | true | 0 |
| notes-typo-holdout-08 | after | waee6e703cc2693ca3b4c | 3351.92 | 99.04% | true | 0 |

Both completed pairs preserve margin and on-time share exactly. The fix is adopted for semantic correctness, not claimed profit gain. Final parser tests: 49 main-based / 68 integrated tests. Existing twenty-pair processes retain their frozen older candidate source; their results must not be relabelled as the typo-fixed code.

### Equal-allocation levels 1–4 configuration comparison

Status: 20/20 pairs completed; complete. Both sides use source 085b3cc57e405d13ec12fe5b0f322786a90072a2; configurations taken unchanged from teammate pricing revision 766fdab7db20569377731bee14b4842ea9dac20f. This is configuration evidence, not a parser-code effect. Level 1–3 candidate uses training; level 4 candidate uses competitive.

Full configurations:

```json
{
  "baseline": {
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
  },
  "training": {
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
  },
  "competitive": {
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
}
```

| Level | Seed | Baseline world | Candidate world | Base EUR | Candidate EUR | Delta EUR | Base on time | Candidate on time | Both eligible | Refusals base/candidate |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- | --- |
| 1 | notes-cycle-03 | w4c1985dafa1710221061 | w3a989d3526277e6c9796 | 2350.23 | 2783.51 | 433.28 | 100.00% | 99.63% | true | 0/0 |
| 2 | notes-cycle-03 | w28c281623e890ece3bf5 | wabd2ca3988c4313a503b | 2313.54 | 2920.06 | 606.52 | 100.00% | 100.00% | true | 0/0 |
| 3 | notes-cycle-03 | w24d213b0fe3dabc9efbc | w29489a4ad1f7b7749ba7 | 2344.41 | 2920.06 | 575.65 | 100.00% | 100.00% | true | 0/0 |
| 4 | notes-cycle-03 | w8dcccce2e95ee46c72ce | wf9117c9f9f325e524a89 | 3253.90 | 3368.70 | 114.80 | 99.09% | 99.22% | true | 0/0 |
| 1 | notes-cycle-04 | w6cf55aeb2d1c73631680 | w3406f3bfb785a02765df | 2077.40 | 2752.05 | 674.65 | 98.90% | 99.23% | true | 0/0 |
| 2 | notes-cycle-04 | w6829f537005b09558b69 | w97b20c29577bd9e90892 | 2093.03 | 2834.78 | 741.75 | 98.34% | 99.23% | true | 0/0 |
| 3 | notes-cycle-04 | w02475e23d7754b031637 | w1a3334f6f0eaeced983e | 2120.08 | 2886.68 | 766.60 | 97.24% | 99.23% | true | 0/0 |
| 4 | notes-cycle-04 | w01d0b11f26e5221c7a5e | w7f4549f664b6e64f2616 | 4933.45 | 5157.59 | 224.14 | 100.00% | 100.00% | true | 0/0 |
| 1 | notes-cycle-05 | web4d8c2ba326a2202ef0 | w39a33c23dae1c8a62f75 | 2010.71 | 2623.00 | 612.29 | 98.77% | 99.56% | true | 0/0 |
| 2 | notes-cycle-05 | w580fdf07d25d7b31b312 | w50d4eebdc22d0e8c5cf9 | 1996.40 | 2562.78 | 566.38 | 98.77% | 98.68% | true | 0/0 |
| 3 | notes-cycle-05 | wbaf73064f8d10fc10dcd | w38ce6b159ab881878404 | 1996.40 | 2562.78 | 566.38 | 98.77% | 98.68% | true | 0/0 |
| 4 | notes-cycle-05 | wd9f316b85ae5895201c9 | w2fa73504019ab5e35fbb | 957.06 | 1122.91 | 165.85 | 100.00% | 100.00% | true | 0/0 |
| 1 | notes-cycle-06 | w1af8cd7df31746f96a2b | wd46df06be5c008016afe | 2183.88 | 2637.56 | 453.68 | 100.00% | 99.60% | true | 0/0 |
| 2 | notes-cycle-06 | w827ac4be7128c6ed7ac6 | w5dfcf9376be56dc8ce0d | 2066.95 | 2841.46 | 774.51 | 99.42% | 99.61% | true | 0/0 |
| 3 | notes-cycle-06 | w9626e719e583ad53d6c1 | wffa1ae49c3b256022103 | 2094.57 | 2859.42 | 764.85 | 99.42% | 99.61% | true | 0/0 |
| 4 | notes-cycle-06 | w95b1132bbb5416b0b754 | w848adcb734459b866935 | 842.41 | 957.64 | 115.23 | 100.00% | 100.00% | true | 0/0 |
| 1 | notes-cycle-07 | w7aca259f2895c23dc758 | wbd58319b442318ae5fa7 | 2316.18 | 2966.20 | 650.02 | 100.00% | 99.64% | true | 0/0 |
| 2 | notes-cycle-07 | w90b7da539ea0a93623d1 | w9299ac16b59cc265afe9 | 2290.87 | 3013.78 | 722.91 | 100.00% | 99.64% | true | 0/0 |
| 3 | notes-cycle-07 | w8a1f783765eeffedfb11 | w1f0c2c6d95139ce9841f | 2274.30 | 3013.78 | 739.48 | 100.00% | 99.64% | true | 0/0 |
| 4 | notes-cycle-07 | wb4c9e600817958f9b8bd | wa92c705e775c15d195b9 | 1420.88 | 1669.55 | 248.67 | 100.00% | 100.00% | true | 0/0 |

### Inflected-clock regression follow-up

Completed-pair loss analysis found R00725 on notes-cycle-07 level 8: “Valmiina puoli neljästä alkaen.” The complete Unicode boundary rejected neljästä because only neljä/neljän were listed; the old parser happened to match a prefix. Baseline won this request, candidate declined it, with downstream quote differences. Snapshot 78b0670 adds explicit complete Finnish inflected hour forms. Its extraction is 5250 for request arrival 5072, exactly matching baseline reveal readyAt 5250. The malformed near-word neljästää remains uncertain. Tests: 50 main-based / 69 integrated pass. This semantic regression fix is included in the review branch; its separate paired server validation is queued behind the lower-level job, so no recovered-money claim is made yet. Ongoing contact comparisons retain their older frozen baseline/candidate, which both share the missing inflection.

Inflection validation status: in progress. Source fb35ea8 -> 78b0670; same Balanced config.

| Seed | Version | World | Margin EUR | On time | Eligible | Refusals |
| --- | --- | --- | ---: | ---: | --- | ---: |
| notes-cycle-07 | before | wb098007321dd451d386a | 5443.27 | 97.42% | true | 0 |

### Contact-notice candidate: next evenly allocated batch

Status 12/16 matched pairs; in progress. Two pairs allocated to every level 1–8. Baseline fb35ea89587f655cd3f95c442eb572eb9c937e8d, candidate a3a468e93f2100341d8d549f734f2ffeff184db3; pricing configuration snapshot 62a128663666537889fcef8f2d09be44018739d1. Both sides use the same selected configuration at each level: training 1–3, competitive 4–7, Balanced 8. This comparison tests only parser changes, not configuration selection. Candidate recognizes only complete relative contact notices and declines unsupported contact clauses. Tests: 69 integrated before server validation. No adoption solely from offline tests.

Full configurations:

```json
{
  "balanced": {
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
  },
  "training": {
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
  },
  "competitive": {
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
}
```

| Level | Seed | Baseline world | Candidate world | Base EUR | Candidate EUR | Delta EUR | Base on time | Candidate on time | Both eligible | Refusals base/candidate |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- | --- |
| 1 | notes-contact-08 | w6b7cca713fa536c6d913 | w736b645ea8916f78ff46 | 3057.38 | 3057.38 | 0.00 | 99.00% | 99.00% | true | 0/0 |
| 2 | notes-contact-08 | w50153cab6a20bfbea1bb | w781bf7bc9878ec263684 | 3055.38 | 3055.38 | 0.00 | 99.00% | 99.00% | true | 0/0 |
| 3 | notes-contact-08 | wfd431f20895b9f2b8cf6 | w3bc15aeae1ddae534d5d | 3097.44 | 3097.44 | 0.00 | 99.00% | 99.00% | true | 0/0 |
| 4 | notes-contact-08 | wdd3f3961f52e0bade964 | w7e8428903b3a0308e8ea | 754.58 | 754.58 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 5 | notes-contact-08 | w5eb871a49649020d7066 | wf9a6626b26ebd8919cfb | 591.19 | 616.47 | 25.28 | 100.00% | 100.00% | true | 0/0 |
| 6 | notes-contact-08 | wae9838fc7645bb00a746 | w4cd402cc2d0946d26c0d | 686.41 | 708.69 | 22.28 | 100.00% | 100.00% | true | 0/0 |
| 7 | notes-contact-08 | wad80f95619affeee22d6 | w2653d756f0677f203700 | 2489.29 | 2489.29 | 0.00 | 97.39% | 97.39% | true | 0/0 |
| 8 | notes-contact-08 | w048a88a3f18eab964760 | w2adcfbcd9d99ec43e2e3 | 3388.99 | 3242.17 | -146.82 | 95.12% | 95.20% | true | 0/0 |
| 1 | notes-contact-09 | wf43f8f2a52aa3d1f2193 | w033c72899e2fbb7d6183 | 3100.83 | 3100.83 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 2 | notes-contact-09 | wd67afe6cc76a57f1c4ef | w72f230f571e1177047d3 | 3066.09 | 3066.09 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 3 | notes-contact-09 | w13d927209d8cadd4e934 | wb4f0796cb4c610d60200 | 3066.09 | 3066.09 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 4 | notes-contact-09 | w2380563bd4fd60014e53 | w013fa9b109264ddaa0b4 | 1217.97 | 1217.97 | 0.00 | 100.00% | 100.00% | true | 0/0 |

Contact-source partial audit at its latest checkpoint: 1752 note-bearing occurrences, 652 passing uncertainty/summer filters, 48 won requests with truth. Equipment/readiness/release/note-deadline mismatches: 0. Potential opening-hours differences requiring semantic/recovery review: 1. An absolute bound can explain some of these differences; they are diagnostics, not proven failures or a full false-safe count. The R00880 case is discussed in the planner handoff.

### Allocation scoreboard

Code-only parser comparisons at 5–8 and configuration comparisons at 1–4 are distinct experiments. Each level is allocated five matched seeds; incomplete levels are not extrapolated.

| Level | Completed/planned pairs | Baseline EUR | Candidate EUR | Delta EUR | Delta % | Worst candidate on time | Failed baseline/candidate weeks |
| ---: | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 1 | 5/5 | 10938.40 | 13762.32 | 2823.92 | 25.82 | 99.23% | 0/0 |
| 2 | 5/5 | 10760.79 | 14172.86 | 3412.07 | 31.71 | 98.68% | 0/0 |
| 3 | 5/5 | 10829.76 | 14242.72 | 3412.96 | 31.51 | 98.68% | 0/0 |
| 4 | 5/5 | 11407.70 | 12276.39 | 868.69 | 7.61 | 99.22% | 0/0 |
| 5 | 5/5 | 8306.70 | 8351.28 | 44.58 | 0.54 | 98.81% | 0/0 |
| 6 | 5/5 | 10679.40 | 10679.40 | 0.00 | 0.00 | 99.33% | 0/0 |
| 7 | 5/5 | 11555.79 | 11555.79 | 0.00 | 0.00 | 94.44% | 0/0 |
| 8 | 5/5 | 24504.56 | 24500.44 | -4.12 | -0.02 | 96.27% | 0/0 |

### Completed parser-batch interpretation

Twenty pairs completed: EUR 55046.45 -> EUR 55086.91. Two gains, seventeen ties, one loss; the loss at level 8 / notes-cycle-07 is EUR 36.17. Per-level net effects: level 5 +EUR 44.58, level 6 unchanged, level 7 unchanged, level 8 -EUR 4.12. This does not establish consistent profit improvement across levels. The scoped corrections/Unicode changes are retained for their tested semantics and no failed delivery thresholds, not promoted as a final profit-optimal policy. Prioritize level 8 in the next balanced batch while retaining equal seed allocation. The current PR also includes the separately validated readiness typo fix; its two-pair result is listed separately above.

### Planner handoff requested by the team

The user chose to keep this agent within notes/tests/report and have the planner owner integrate the interface change. No planner.ts edit is proposed in this PR.

Current limitation: NoteFacts pickupHours/deliveryHours require both opens and closes, and planner intervals replaces the stated pair. A note specifying only a recurring closing time cannot safely invent an opening time. Proposed additive fields (names for coordinator review): pickupDailyCloses?: number and deliveryDailyCloses?: number, each integer minutes since midnight, emitted only for an unambiguous recurring-hours clause with a grounded pickup/delivery side. Preserve pickupTo/deliveryTo as absolute timestamps for ordinary one-day before/by constraints. Unclear scope remains uncertain.

Planner integration: on each permitted day, keep the stated opening and use min(stated daily closing, note daily closing); retain the original weekday/Saturday schedule and private booked slot. Intersect with the order window. If full note-hours overrides are also present, intersect the closing restriction with that existing range. Do not let a recovery gig that relaxes an order deadline erase a real recurring site-closing restriction. Do not extend Saturday hours or create Sunday opening.

Concrete acceptance cases for the planner owner:

| Case | Input | Expected interval/result |
| --- | --- | --- |
| Closing-only pickup | Stated weekday 09:00–18:00; note “Nouto arkisin ennen klo 14” | On each weekday use 09:00–14:00; no invented 00:00 opening |
| Delivery hours | Stated weekday 08:00–18:00; explicit recurring receiving close 16:30 | Delivery ends at 16:30 on each weekday; opening stays 08:00 |
| Short Saturday | Stated Saturday 09:00–14:00; recurring close 16:30 | Saturday remains 09:00–14:00 |
| Sunday | Site closed Sunday | No Sunday interval |
| Late recovery | Order deadline expired but site really closes 16:30 | Relaxing the order deadline must still respect site close on every later visit day |
| Private slot | Private pickup booked 15:00–16:00; note close 14:00 | No feasible pickup, never expand or move the slot |
| One-day time | “Pickup before 16:30” with no recurring-hours statement | Existing absolute pickupTo, not a daily closing field |
| Ambiguous side | A closing statement with no grounded pickup/delivery referent | Parser remains uncertain; no side guessed solely to increase volume |

Observed completed-world diagnostic: notes-contact-08 level8 R00880 says “Liike kiinni klo 16.30, haettava ennen sitä”. Stated pickup is 09:00–18:00; reveal actual weekday close is 16:30. Current parser emits absolute pickupTo6750 and no recurring hours. Its original-day restriction is conservative, but this does not prove later recovery visits respect real recurring hours. This is a handoff example, not a claim that the new fields are implemented. Keep this note uncertain if its side/recurrence cannot be grounded under the agreed grammar.

No automatic merge. Other agents keep ownership of dispatcher/planner/pricing files. Explicit recurring closing-only forms remain uncertain when the present interface cannot express them; the implicit closing example above still needs coordinator review. No raw logs or credentials are included.
