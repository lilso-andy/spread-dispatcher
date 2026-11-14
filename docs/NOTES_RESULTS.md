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

Both completed pairs preserve margin and on-time share exactly. The fix is adopted for semantic correctness, not claimed profit gain. At that fix checkpoint: 49 main-based / 68 integrated tests. Existing twenty-pair processes retain their frozen older candidate source; their results must not be relabelled as the typo-fixed code.

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

Completed-pair loss analysis found R00725 on notes-cycle-07 level 8: “Valmiina puoli neljästä alkaen.” The complete Unicode boundary rejected neljästä because only neljä/neljän were listed; the old parser happened to match a prefix. Baseline won this request, candidate declined it, with downstream quote differences. Snapshot 78b0670 adds explicit complete Finnish inflected hour forms. Its extraction is 5250 for request arrival 5072, exactly matching baseline reveal readyAt 5250. The malformed near-word neljästää remains uncertain. Tests: 50 main-based / 69 integrated pass. This semantic regression fix is included in the review branch; its separate paired server results are listed below, including the losing fresh holdout. Recovering one earlier week does not establish an overall profit gain. Ongoing contact comparisons retain their older frozen baseline/candidate, which both share the missing inflection.

Inflection validation status: complete. Source fb35ea8 -> 78b0670; same Balanced config.

| Seed | Version | World | Margin EUR | On time | Eligible | Refusals |
| --- | --- | --- | ---: | ---: | --- | ---: |
| notes-cycle-07 | before | wb098007321dd451d386a | 5443.27 | 97.42% | true | 0 |
| notes-cycle-07 | after | w5bcd36303c0d804203d8 | 5479.44 | 97.45% | true | 0 |
| notes-inflection-holdout-10 | before | w7e039bb83198b2140771 | 6447.11 | 98.21% | true | 0 |
| notes-inflection-holdout-10 | after | w2a30e5ff70160e08127a | 6284.17 | 98.21% | true | 0 |

### Contact-notice candidate: next evenly allocated batch

Status 16/16 matched pairs; complete. Two pairs allocated to every level 1–8. Baseline fb35ea89587f655cd3f95c442eb572eb9c937e8d, candidate a3a468e93f2100341d8d549f734f2ffeff184db3; pricing configuration snapshot 62a128663666537889fcef8f2d09be44018739d1. Both sides use the same selected configuration at each level: training 1–3, competitive 4–7, Balanced 8. This comparison tests only parser changes, not configuration selection. Candidate recognizes only complete relative contact notices and declines unsupported contact clauses. Tests: 69 integrated before server validation. No adoption solely from offline tests.

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
| 5 | notes-contact-09 | we64c2f21f5ba7912424e | wb9e463aeeca12f5e5e89 | 1014.77 | 1040.91 | 26.14 | 100.00% | 100.00% | true | 0/0 |
| 6 | notes-contact-09 | wd589fba25e630f7b4cb8 | w1047404dcfd4bf5cd39c | 1051.43 | 1077.57 | 26.14 | 100.00% | 100.00% | true | 0/0 |
| 7 | notes-contact-09 | wbe0deea74ce222c3a8cf | w2c4313d377e259813dc2 | 3426.92 | 3564.34 | 137.42 | 100.00% | 100.00% | true | 0/0 |
| 8 | notes-contact-09 | wf971c14448170c238e62 | w2d1c41cea01e2157b244 | 5462.28 | 5121.68 | -340.60 | 100.00% | 98.75% | true | 0/0 |

### Updated teammate policy comparison

Status 16/16 matched pairs; complete. Two seeds allocated to every level1–8. Source 78b0670e0844b9fa66fcee7991ab28cc3563ff35 ; teammate config revision 62a128663666537889fcef8f2d09be44018739d1. Configuration-only comparison on the same inflection-fixed parser; levels2/3/5 use the newly published files and level8 compares Balanced with existing Cost.

Full configurations:

```json
{
  "baseline": {
    "1": {
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
    "2": {
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
    "3": {
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
    "4": {
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
    },
    "5": {
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
    },
    "6": {
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
    },
    "7": {
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
    },
    "8": {
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
  },
  "candidate": {
    "1": {
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
    "2": {
      "quoteMultiplier": 1.4,
      "feeMultiplier": 1.2,
      "emergencyMultiplier": 1.9,
      "marginReserve": 0.07,
      "minMarginCents": 250,
      "capacityFraction": 0.32,
      "maxApproachMinutes": 100,
      "minLeadMinutes": 210,
      "strictNotes": true,
      "offers": true
    },
    "3": {
      "quoteMultiplier": 1.4,
      "feeMultiplier": 1.2,
      "emergencyMultiplier": 2.1,
      "marginReserve": 0.07,
      "minMarginCents": 500,
      "capacityFraction": 0.26,
      "maxApproachMinutes": 100,
      "minLeadMinutes": 210,
      "strictNotes": true,
      "offers": true
    },
    "4": {
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
    },
    "5": {
      "quoteMultiplier": 1.35,
      "feeMultiplier": 1.08,
      "emergencyMultiplier": 2.4,
      "marginReserve": 0.13,
      "minMarginCents": 1100,
      "capacityFraction": 0.28,
      "maxApproachMinutes": 100,
      "minLeadMinutes": 180,
      "strictNotes": true,
      "offers": true
    },
    "6": {
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
    },
    "7": {
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
    },
    "8": {
      "quoteMultiplier": 1.4,
      "feeMultiplier": 1.08,
      "emergencyMultiplier": 2.4,
      "marginReserve": 0.15,
      "minMarginCents": 2000,
      "capacityFraction": 0.28,
      "maxApproachMinutes": 100,
      "minLeadMinutes": 180,
      "strictNotes": true,
      "offers": true
    }
  }
}
```

| Level | Seed | Baseline world | Candidate world | Base EUR | Candidate EUR | Delta EUR | Base on time | Candidate on time | Both eligible | Refusals base/candidate |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- | --- |
| 1 | notes-policy-12 | w82ae39a7967aeeaf00dc | w9ddaafefb6bbcbd5f888 | 3069.74 | 3069.74 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 2 | notes-policy-12 | waa77c2c35dcd6fcd209d | wa0400ca222a8e607f15d | 3093.41 | 3383.43 | 290.02 | 100.00% | 99.74% | true | 0/0 |
| 3 | notes-policy-12 | wff2e888ce7a9b68dd896 | wfc77cbbd298442a843ee | 3051.02 | 3225.01 | 173.99 | 99.66% | 100.00% | true | 0/0 |
| 4 | notes-policy-12 | w166c65bc9a3f4b7229c1 | w40f2d9099b9a87b34d29 | 2520.66 | 2520.66 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 5 | notes-policy-12 | w390692283a0787c825d6 | w301d43e6eae64b270f3d | 1880.81 | 1966.86 | 86.05 | 100.00% | 100.00% | true | 0/0 |
| 6 | notes-policy-12 | wba31c9c5dc8c304baa68 | we78d746b3142927fedf5 | 2394.64 | 2394.64 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 7 | notes-policy-12 | wc1a1b863a11ce5c85115 | w62da7514abe345a13728 | 4748.80 | 4748.80 | 0.00 | 97.24% | 97.24% | true | 0/0 |
| 8 | notes-policy-12 | wb0b714dfdda86a309463 | wb298abe8ebe409cd485b | 6589.59 | 9295.26 | 2705.67 | 99.12% | 98.08% | true | 0/0 |
| 1 | notes-policy-13 | w8bbc283b128db6b72ec1 | w904b0f3e7a85f80ac00a | 2366.90 | 2366.90 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 2 | notes-policy-13 | w64f355bcef24307fd878 | wa98548c8cfb2cb841918 | 2479.21 | 2882.94 | 403.73 | 100.00% | 100.00% | true | 0/0 |
| 3 | notes-policy-13 | w5e3d31d80bded35fdd94 | web898fc43dd0314e844e | 2494.04 | 2651.93 | 157.89 | 100.00% | 100.00% | true | 0/0 |
| 4 | notes-policy-13 | w3398b71060509715fe9b | w3b1a42395c06a0ba84cb | 1772.67 | 1772.67 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 5 | notes-policy-13 | w23ea9901117ef77be3e8 | wca856f284bca77e1058f | 1198.65 | 1017.37 | -181.28 | 97.56% | 97.50% | true | 0/0 |
| 6 | notes-policy-13 | wdeae915b61b6a765dc6e | w925db5fc2c26f173c600 | 1226.65 | 1226.65 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 7 | notes-policy-13 | wb33ae38a41c18ca5967b | w5b357eb38741af641e65 | 2529.47 | 2529.47 | 0.00 | 97.75% | 97.75% | true | 0/0 |
| 8 | notes-policy-13 | wd90a9c3ab200215935f8 | w14daf65fb97a57cf952f | 1887.81 | 3360.90 | 1473.09 | 93.51% | 96.04% | true | 0/0 |

### Finnish destination-side correction

Status 15/16 matched pairs; in progress. Two seeds allocated to every level1–8. Source 78b0670e0844b9fa66fcee7991ab28cc3563ff35 -> a9d06c8872c203096398c392f7b354e727b7b744; teammate config revision 62a128663666537889fcef8f2d09be44018739d1. Code-only comparison, same per-level configuration on both sides; kohde destination hours must never overwrite pickup hours.

Full configurations:

```json
{
  "1": {
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
  "2": {
    "quoteMultiplier": 1.4,
    "feeMultiplier": 1.2,
    "emergencyMultiplier": 1.9,
    "marginReserve": 0.07,
    "minMarginCents": 250,
    "capacityFraction": 0.32,
    "maxApproachMinutes": 100,
    "minLeadMinutes": 210,
    "strictNotes": true,
    "offers": true
  },
  "3": {
    "quoteMultiplier": 1.4,
    "feeMultiplier": 1.2,
    "emergencyMultiplier": 2.1,
    "marginReserve": 0.07,
    "minMarginCents": 500,
    "capacityFraction": 0.26,
    "maxApproachMinutes": 100,
    "minLeadMinutes": 210,
    "strictNotes": true,
    "offers": true
  },
  "4": {
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
  },
  "5": {
    "quoteMultiplier": 1.35,
    "feeMultiplier": 1.08,
    "emergencyMultiplier": 2.4,
    "marginReserve": 0.13,
    "minMarginCents": 1100,
    "capacityFraction": 0.28,
    "maxApproachMinutes": 100,
    "minLeadMinutes": 180,
    "strictNotes": true,
    "offers": true
  },
  "6": {
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
  },
  "7": {
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
  },
  "8": {
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
}
```

| Level | Seed | Baseline world | Candidate world | Base EUR | Candidate EUR | Delta EUR | Base on time | Candidate on time | Both eligible | Refusals base/candidate |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- | --- |
| 1 | notes-side-14 | wbf7d7b6f2a5b9d02eb2a | w1adffc8cc0898e523597 | 2586.86 | 2586.86 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 2 | notes-side-14 | w1a1494671ae8b860d135 | w8b8fea6dfd5399089c68 | 3184.53 | 3184.53 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 3 | notes-side-14 | w6b26ea65d5fbc74cc41c | w3180ada33e6351105710 | 3054.48 | 3054.48 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 4 | notes-side-14 | w66d0c811c482a51a1182 | wcf40bdebf58ffafa8fc0 | 623.88 | 623.88 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 5 | notes-side-14 | wec7a4f8f38ac0cf6cdd2 | w7812d39f6172225c6beb | 575.47 | 575.47 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 6 | notes-side-14 | w50897b8eedb708f2b32e | we57e4181615e3d6550e0 | 543.30 | 543.30 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 7 | notes-side-14 | w317cc7ab56ca499d25df | w24f75a4b7e7ee7911cb8 | 1749.63 | 1749.63 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 8 | notes-side-14 | w67116e3fc73e1c08589b | wd4c2dce4189b5e06f6ff | 2596.76 | 2596.76 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 1 | notes-side-15 | w77fb9297b5eb65e2837c | wf7f6e69eb04f67171b4b | 2758.92 | 2758.92 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 2 | notes-side-15 | w04c323cafd89b47ca32a | w3ca23ed7478a1e6c720a | 3283.36 | 3283.36 | 0.00 | 99.71% | 99.71% | true | 0/0 |
| 3 | notes-side-15 | w9f6763959a0299e54b97 | wf26b3f9c0109c4aa4b34 | 2943.73 | 2943.73 | 0.00 | 99.34% | 99.34% | true | 0/0 |
| 4 | notes-side-15 | wd53504fe2db78956e762 | w6e131cd01057c84c31f3 | 2116.49 | 2116.49 | 0.00 | 98.97% | 98.97% | true | 0/0 |
| 5 | notes-side-15 | w54f948cabe58fce36c5b | w22a767123d518091960b | 1784.80 | 1784.80 | 0.00 | 98.86% | 98.86% | true | 0/0 |
| 6 | notes-side-15 | w549f48bfd5edf0e89b20 | wa8179f1789a14e4658b3 | 2153.91 | 2153.91 | 0.00 | 100.00% | 100.00% | true | 0/0 |
| 7 | notes-side-15 | w7706d3196a2c54b7f7b0 | w0ec96c931d9aa6433875 | 4376.20 | 4376.20 | 0.00 | 98.42% | 98.42% | true | 0/0 |

### Selection after completed contact and inflection comparisons

Contact candidate a3a468e completed16 pairs: EUR38,527.04 -> EUR38,276.88 (-EUR250.16), five gains/nine ties/two losses. Both level8 pairs lost (-EUR146.82 and -EUR340.60); all weeks stayed eligible. It is NOT adopted or pushed as parser code. The queued combined-contact validation was stopped by its negative-profit gate before creating any world. Combined source604b276 has70 offline tests only; no server qualification claim. The new experiment is the independent kohde side fix, not a retry labelled as combined contact.

Inflection fix78b0670 completed two pairs: original regression seed +EUR36.17, fresh holdout -EUR162.94, net -EUR126.77. Same on-time share on fresh holdout, and no threshold failures. Reveal confirms new accepted R00249 “Voi noutaa tänään puoli yhdestä alkaen” was parsed correctly at2190; downstream quote/order mix changed. This supports semantic correctness, not a money-improvement claim. Keep this tradeoff explicit while pricing is calibrated.

New current parser candidate a9d06c8 fixes kohde destination hours. Completed contact-world R00472 truth has pickup08:00–18:00 and delivery09:00–20:00. New parsing preserves pickupHours undefined and sets only deliveryHours09:00–20:00, with correct readiness4860. Main-based51/integrated70 tests pass; fresh paired server validation is in progress, so no profit gain is claimed for it yet.

Contact-source partial audit at its latest checkpoint: 3518 note-bearing occurrences, 1410 passing uncertainty/summer filters, 130 won requests with truth. Equipment/readiness/release/note-deadline mismatches: 0. Potential opening-hours differences requiring semantic/recovery review: 2. An absolute bound can explain some of these differences; they are diagnostics, not proven failures or a full false-safe count. The R00880 case is discussed in the planner handoff.

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

## Immediate GitHub checkpoint requested by user

Current checkpoint includes negative-bound candidate 60e940b: explicit No pickup before/until creates a lower bound, No pickup after creates an upper bound, and except/paitsi/utom/förutom clauses remain uncertain. New tests failed before the fix and pass afterward. Current personal-branch tests: 53/53; integrated candidate: 72/72. Its server comparison is queued, not yet a profit-qualified release. Existing server jobs use isolated frozen worktrees and are not changed by this checkpoint.

Latest completed policy batch: 16/16 pairs, EUR43,304.07 -> EUR48,413.23 (+EUR5,109.16), all qualified. Cost at level8 increased both fresh seeds: +EUR2,705.67 and +EUR1,473.09, total +EUR4,178.76; worst candidate service96.04%. The new level5 lower-margin-floor configuration lost EUR95.23 overall across its two seeds, so the next batch keeps the earlier competitive level5 config. This is per-level configuration selection evidence, not a global optimum guarantee.

Destination-side batch is still finishing its last pair; completed pairs so far are ties. The queued negative-bound batch waits for both policy and side batches, chooses only configurations eligible on both prior seeds with zero refusals, then validates on fresh notes-negation-16/17, two pairs per every level1–8. Do not relabel old results as this new source.

Practice only. No ranking/final and no merge. Team requested planner contract handoff only; planner.ts remains untouched. All source changes remain notes.ts, test/notes.test.ts and this report. Credentials/raw logs remain ignored.


## Bounded level 4–6 session — latest user instruction

Status: complete; stopped after exactly3 rounds. Assigned branch work/notes-thanhdatLUT. Exactly3 planned bounded rounds in order4,5,6; level4 is a compatibility control and levels5/6 test note-coverage hypotheses. Historical controls are background evidence only because the latest integrated commit advanced. No replacement worlds are created because the chat changed. The earlier unlimited loops are stopped: their controller handles exited0 and no Node controllers remained.

Runtime core: fc9a714442f2d8093a1defc21a6cb1fed1f36976; main 9dccfdb6238abe56e61938ecb48fd64b371651b2 is different and is NOT the executed dispatcher. Baseline snapshot fc9a714442f2d8093a1defc21a6cb1fed1f36976 contains the integrated core plus the personal parser overlay; git verification found only notes.ts and test/notes.test.ts different from that core. Every candidate retains the same dispatcher/client/config source; only owned parser/test diffs vary. The integration status validates level4–6 behavior; pending fixed-price changes are confined to1–3.

Source transitions: [{"round":1,"core":"e2258522db411d7d0ed2542cc184307a8388baa9","baseline":"e1d59e4c7d3c75987263f2a840e4c452f312a592","transition":"Completed all frozen level4 worlds before adopting newer source."},{"round":2,"core":"fc9a714442f2d8093a1defc21a6cb1fed1f36976","baseline":"fc9a714442f2d8093a1defc21a6cb1fed1f36976","transition":"Fresh baseline worlds after integration sync; candidate rejected."},{"round":3,"core":"fc9a714442f2d8093a1defc21a6cb1fed1f36976","baseline":"fc9a714442f2d8093a1defc21a6cb1fed1f36976","transition":"Frozen fc9a714 source completed despite later planner update; all owned world controllers ended."}]

Full fixed configuration for this bounded session (unchanged in all comparisons):

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

Baseline reuse is accepted only after checking the actual snapshot, full config, level, seed and server ended/practice/non-board state. Cached level4 pairs predate this bounded request and are compatibility evidence only, not newly preregistered optimization wins. No new level4 money gain is claimed.

| Control level | Seed | Baseline snapshot | Candidate snapshot | Baseline world | Candidate world | Base EUR | Candidate EUR | Won base/candidate | On time base/candidate | Undelivered base/candidate | Refusals base/candidate |
| ---: | --- | --- | --- | --- | --- | ---: | ---: | --- | --- | --- | --- |
| 4 | notes-clock-18 | 60e940b77b25ec68179516e3e8b69a6191eae3ab | d9d9daecade99c9804e50e771e81ab0a189eac7e | wefc4554c35ef93a7d632 | wf8d2e0b0777c771355cd | 885.41 | 885.41 | 41/41 | 100.00%/100.00% | 0/0 | 0/0 |
| 4 | notes-clock-19 | 60e940b77b25ec68179516e3e8b69a6191eae3ab | d9d9daecade99c9804e50e771e81ab0a189eac7e | w66252120e5522099553c | w41e851c6e0397d6628ca | 1167.02 | 1167.02 | 45/45 | 100.00%/100.00% | 0/0 | 0/0 |

Historical level4 evidence: both old controls have zero note-bearing requests and tied final scores; no e225 baseline reuse is claimed. Output folders remain the recorded local clock-batch seed/level4/baseline and candidate folders; no controller takeover is needed because worlds ended and old processes stopped.

### Ledger evidence used before choosing hypotheses

Historical ledger totals below deduplicate event seq and match final scores from the earlier60e940b overlay on3cb; they motivate hypotheses, not cached baselines for the new core. Raw journals/reveals remain local.

| Level | Seed | Final margin cents | Revenue cents | Driver fee cents | Late refund cents | Declined requests | Note-bearing requests |
| ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 5 | notes-clock-18 | 60761 | 290400 | -227639 | -2000 | 317 | 416 |
| 5 | notes-clock-19 | 52555 | 348300 | -295745 | 0 | 316 | 441 |
| 6 | notes-clock-18 | 69467 | 319300 | -247833 | -2000 | 317 | 416 |
| 6 | notes-clock-19 | 63172 | 388900 | -325728 | 0 | 316 | 441 |

Predeclared selection rule: All measured candidate weeks>=90%, zero refusals, positive development sum then positive fresh holdout delta. If gain<1%, prefer higher worst on-time share; tied buffer retains baseline.

### New round 1: level 4 — Compatibility control for scoped deadline preprocessing

Registered before editing/creating worlds: 2026-11-14 05:31:29 Europe/Kiev. Hypothesis: Level4 baseline controls contain zero notes; a parser-only preprocessing change must not change final margin, service or ledger. This is a compatibility check, not a claimed money optimization.

Behavior diff: Same scoped perillä viim. canonicalization later assessed at level5; the null-note path must remain identical.. Desired metric: Exact paired final margin and service equality; keep baseline on ties.. Reject condition: Any candidate week below90%/unranked, any refused action, or missed critical note constraint. Positive development sum requires positive fresh holdout. Below1% gain, prefer higher worst on-time share; tied buffer keeps baseline.. Baseline e1d59e4c7d3c75987263f2a840e4c452f312a592; candidate c647f22f556afd4e99a2190f235df4cf13445fd5. Core e2258522db411d7d0ed2542cc184307a8388baa9 on both sides.  Offline checks: Baseline72/72 and candidate73/73 full integrated tests passed, diff check passed. Candidate diff fingerprint: sha256:cbe215bec1576720095dcdfaef7a1c99435af87f9423baf2c41ae9ac7989a7fb.

Development seeds: thanhdat-bounded4-a, thanhdat-bounded4-b. Untouched planned holdout: not applicable for a tied compatibility control. Holdout is scheduled only if development passes the gate. Config is the full fixed JSON above. Decision: Both fresh development pairs tie to the cent at100% service. Compatibility passed; retain baseline, no holdout for a tie.. Next: Complete; no further level4 worlds in this session.

| Phase | Seed | Side | Snapshot | World ID | Margin EUR | Won | On time | Undelivered count/share | Refusals | Eligible | Output folder |
| --- | --- | --- | --- | --- | ---: | ---: | ---: | --- | ---: | --- | --- |
| development | thanhdat-bounded4-a | baseline | e1d59e4c7d3c75987263f2a840e4c452f312a592 | w6a80763cd35dfe04d53d | 736.08 | 25 | 100.00% | 0/0 | 0 | true | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\bounded-l456\round-1\development\thanhdat-bounded4-a\baseline |
| development | thanhdat-bounded4-a | candidate | c647f22f556afd4e99a2190f235df4cf13445fd5 | w1ddebfffa5d6ff7f63f4 | 736.08 | 25 | 100.00% | 0/0 | 0 | true | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\bounded-l456\round-1\development\thanhdat-bounded4-a\candidate |
| development | thanhdat-bounded4-b | baseline | e1d59e4c7d3c75987263f2a840e4c452f312a592 | wd3c6c0feea4fc838a7a1 | 1116.36 | 50 | 100.00% | 0/0 | 0 | true | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\bounded-l456\round-1\development\thanhdat-bounded4-b\baseline |
| development | thanhdat-bounded4-b | candidate | c647f22f556afd4e99a2190f235df4cf13445fd5 | w4515874e8fd9346270b7 | 1116.36 | 50 | 100.00% | 0/0 | 0 | true | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\bounded-l456\round-1\development\thanhdat-bounded4-b\candidate |

Post-week field audit: {"checkedAt":"2026-11-14T03:40:04.719Z","method":"Completed-world reveal only; deduplicated seq ledger reconciled to final margin. Won-order truth checked for manual/plates/tyres/deadline/release; opening-hour associations need separate review when newly accepted.","pairs":[{"seed":"thanhdat-bounded4-a","phase":"development","baseline":{"ledger":{"revenue":389800,"driver_fee":-316192},"totalCents":73608,"declines":56,"noteCount":0,"safeCount":0,"checkedWonNotes":0,"misses":[]},"candidate":{"ledger":{"revenue":389800,"driver_fee":-316192},"totalCents":73608,"declines":56,"noteCount":0,"safeCount":0,"checkedWonNotes":0,"misses":[]},"newlySafeCount":0,"introducedCriticalMisses":[]},{"seed":"thanhdat-bounded4-b","phase":"development","baseline":{"ledger":{"revenue":517000,"driver_fee":-405364},"totalCents":111636,"declines":47,"noteCount":0,"safeCount":0,"checkedWonNotes":0,"misses":[]},"candidate":{"ledger":{"revenue":517000,"driver_fee":-405364},"totalCents":111636,"declines":47,"noteCount":0,"safeCount":0,"checkedWonNotes":0,"misses":[]},"newlySafeCount":0,"introducedCriticalMisses":[]}]}

### New round 2: level 5 — Scoped Finnish delivery-deadline abbreviation

Registered before editing/creating worlds: 2026-11-14 05:31:29 Europe/Kiev. Hypothesis: Completed level5 reveals show repeatedly declined perillä viim. deadlines; ledger shows 317/316 declined requests and 416/441 note-bearing requests on the chosen baseline seeds. Canonicalizing only this grounded delivery-deadline phrase should recover feasible orders without dropping constraints.

Behavior diff: Replace perillä/perilla + viim. with perillä/perilla + viimeistään before clause splitting; do not generalize standalone viim. or equipment/contact text.. Desired metric: Increase paired final gross margin while every candidate week remains at least90% on time; keep all refusals at zero and confirm newly accepted deadline facts after world end.. Reject condition: Any week below90%/unranked, any refused action or missed critical note constraint; non-positive development delta; or benefit not repeated on fresh holdout. For gains below1%, prefer the higher worst on-time share; equal buffer keeps baseline.. Baseline fc9a714442f2d8093a1defc21a6cb1fed1f36976; candidate ec9aef5dbb938968f2012075f0aa735a57b69589. Core fc9a714442f2d8093a1defc21a6cb1fed1f36976 on both sides. Latest confirmed integrationfc9a714 incorporates notes471f06d and pricing645e0eb. Parser/test blobs match prior overlay, but new commit gets fresh baseline worlds. Offline checks: Fresh full baseline72/72, candidate73/73 tests passed after source sync; only owned parser/test diff. Candidate diff fingerprint: sha256:cbe215bec1576720095dcdfaef7a1c99435af87f9423baf2c41ae9ac7989a7fb.

Development seeds: notes-clock-18, notes-clock-19. Untouched planned holdout: thanhdat-bounded5-holdout-20261114. Holdout is scheduled only if development passes the gate. Config is the full fixed JSON above. Decision: Reject candidate: development total1132.16 EUR vs baseline1133.16 EUR (-1.00 EUR). Both weeks qualify (96.55%,100%); zero undelivered/refusals. Seven extra quotations recover zero orders. No holdout: development benefit gate failed.. Next: Complete; retain fc9a714 parser, do not stack rejected deadline normalization into round3.

| Phase | Seed | Side | Snapshot | World ID | Margin EUR | Won | On time | Undelivered count/share | Refusals | Eligible | Output folder |
| --- | --- | --- | --- | --- | ---: | ---: | ---: | --- | ---: | --- | --- |
| development | notes-clock-18 | baseline | fc9a714442f2d8093a1defc21a6cb1fed1f36976 | wef7babd6f572d10ac2c4 | 607.61 | 29 | 96.55% | 0/0 | 0 | true | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\bounded-l456\round-2\development\notes-clock-18\baseline |
| development | notes-clock-18 | candidate | ec9aef5dbb938968f2012075f0aa735a57b69589 | w79c84a6e02372e8d63cd | 606.61 | 29 | 96.55% | 0/0 | 0 | true | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\bounded-l456\round-2\development\notes-clock-18\candidate |
| development | notes-clock-19 | baseline | fc9a714442f2d8093a1defc21a6cb1fed1f36976 | wffdb01adf047b3fd6edc | 525.55 | 29 | 100.00% | 0/0 | 0 | true | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\bounded-l456\round-2\development\notes-clock-19\baseline |
| development | notes-clock-19 | candidate | ec9aef5dbb938968f2012075f0aa735a57b69589 | wef8d5fea220a49f144d8 | 525.55 | 29 | 100.00% | 0/0 | 0 | true | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\bounded-l456\round-2\development\notes-clock-19\candidate |

Post-week field audit: {"checkedAt":"2026-11-14T03:44:27.953Z","method":"Completed-world reveal only; deduplicated seq ledger reconciled to final margin. Won-order truth checked for manual/plates/tyres/deadline/release and note hours against public hours; unrevealed lost/unquoted requests have no order truth.","pairs":[{"seed":"notes-clock-18","phase":"development","baseline":{"ledger":{"revenue":290400,"driver_fee":-227639,"late_refund":-2000},"totalCents":60761,"declines":317,"noteCount":416,"safeCount":179,"checkedWonNotes":5,"misses":[]},"candidate":{"ledger":{"revenue":290300,"driver_fee":-227639,"late_refund":-2000},"totalCents":60661,"declines":313,"noteCount":416,"safeCount":184,"checkedWonNotes":5,"misses":[]},"newlySafeCount":5,"newlyQuotedCount":4,"newlyWonCount":0,"introducedCriticalMisses":[]},{"seed":"notes-clock-19","phase":"development","baseline":{"ledger":{"revenue":348300,"driver_fee":-295745},"totalCents":52555,"declines":316,"noteCount":441,"safeCount":184,"checkedWonNotes":6,"misses":[]},"candidate":{"ledger":{"revenue":348300,"driver_fee":-295745},"totalCents":52555,"declines":313,"noteCount":441,"safeCount":190,"checkedWonNotes":6,"misses":[]},"newlySafeCount":6,"newlyQuotedCount":3,"newlyWonCount":0,"introducedCriticalMisses":[]}]}

### New round 3: level 6 — Finnish weekday abbreviations retain their attached clock

Registered before editing/creating worlds: 2026-11-14 05:31:29 Europe/Kiev. Hypothesis: Closed level6 notes contain to. kello13 valmis and ma. kello20 perillä; clause splitting at the weekday dot loses the day/time relationship. Grounded canonical weekday/clock markers should recover feasible work.

Behavior diff: Expand dotted Finnish weekday abbreviations only immediately before a numeric klo/kello clock; normalize standalone kello only before a complete numeric clock. Preserve English to without dot, decimals, separate pickup/delivery clauses, equipment and uncertainty guards. This candidate does NOT include the rejected perilla viim. normalization.. Desired metric: Increase paired final gross margin while every measured week stays>=90%; validate day/time against post-week reveal on newly accepted cases.. Reject condition: Any candidate week below90%/unranked, any refused action, or missed critical note constraint. Positive development sum requires positive fresh holdout. Below1% gain, prefer higher worst on-time share; tied buffer keeps baseline.. Baseline fc9a714442f2d8093a1defc21a6cb1fed1f36976; candidate 39de4d9b793adbcf5f83cba96698f88d471ba0f9. Core fc9a714442f2d8093a1defc21a6cb1fed1f36976 on both sides.  Offline checks: Full baseline72/72 and candidate74/74 tests passed; diff check passed. Regressions cover observed Thursday readiness, Monday delivery with independent pickup hours, all seven dotted weekday offsets, English to, decimal clocks, invalid clocks and unknown prose.. Candidate diff fingerprint: sha256:165975b8bec11300616a0f60e2ec45f3258f7d4dbe6186cf72415822c84366c2.

Development seeds: thanhdat-bounded6-a, thanhdat-bounded6-b. Untouched planned holdout: thanhdat-bounded6-holdout-20261114. Holdout is scheduled only if development passes the gate. Config is the full fixed JSON above. Decision: Retain baseline: both paired margins/service tie, total1009.59 EUR on each side. Candidate recovers two safe notes and two quotations but no extra won orders. Minimum service93.33%; zero undelivered/refusals. No holdout: development benefit gate failed.. Next: Complete; no fourth round, no new world or automatic continuation.

| Phase | Seed | Side | Snapshot | World ID | Margin EUR | Won | On time | Undelivered count/share | Refusals | Eligible | Output folder |
| --- | --- | --- | --- | --- | ---: | ---: | ---: | --- | ---: | --- | --- |
| development | thanhdat-bounded6-a | baseline | fc9a714442f2d8093a1defc21a6cb1fed1f36976 | w1d6d368508de7451742b | 414.14 | 15 | 93.33% | 0/0 | 0 | true | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\bounded-l456\round-3\development\thanhdat-bounded6-a\baseline |
| development | thanhdat-bounded6-a | candidate | 39de4d9b793adbcf5f83cba96698f88d471ba0f9 | wd8d33545960f9f950bb9 | 414.14 | 15 | 93.33% | 0/0 | 0 | true | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\bounded-l456\round-3\development\thanhdat-bounded6-a\candidate |
| development | thanhdat-bounded6-b | baseline | fc9a714442f2d8093a1defc21a6cb1fed1f36976 | wddc4bf155217f7c105c9 | 595.45 | 32 | 100.00% | 0/0 | 0 | true | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\bounded-l456\round-3\development\thanhdat-bounded6-b\baseline |
| development | thanhdat-bounded6-b | candidate | 39de4d9b793adbcf5f83cba96698f88d471ba0f9 | w56030b608863964b7096 | 595.45 | 32 | 100.00% | 0/0 | 0 | true | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\bounded-l456\round-3\development\thanhdat-bounded6-b\candidate |

Post-week field audit: {"checkedAt":"2026-11-14T03:49:25.850Z","method":"Completed-world reveal only; deduplicated seq ledger reconciled to final margin. Won-order truth checked for manual/plates/tyres/deadline/release and note hours against public hours; unrevealed lost/unquoted requests have no order truth.","pairs":[{"seed":"thanhdat-bounded6-a","phase":"development","baseline":{"ledger":{"revenue":190600,"driver_fee":-148296,"late_refund":-890},"totalCents":41414,"declines":726,"noteCount":414,"safeCount":169,"checkedWonNotes":2,"misses":[]},"candidate":{"ledger":{"revenue":190600,"driver_fee":-148296,"late_refund":-890},"totalCents":41414,"declines":726,"noteCount":414,"safeCount":169,"checkedWonNotes":2,"misses":[]},"newlySafeCount":0,"newlyQuotedCount":0,"newlyWonCount":0,"introducedCriticalMisses":[]},{"seed":"thanhdat-bounded6-b","phase":"development","baseline":{"ledger":{"revenue":235600,"driver_fee":-176055},"totalCents":59545,"declines":289,"noteCount":437,"safeCount":192,"checkedWonNotes":10,"misses":[]},"candidate":{"ledger":{"revenue":235600,"driver_fee":-176055},"totalCents":59545,"declines":287,"noteCount":437,"safeCount":194,"checkedWonNotes":10,"misses":[]},"newlySafeCount":2,"newlyQuotedCount":2,"newlyWonCount":0,"introducedCriticalMisses":[]}]}

### Final bounded-session checkpoint

Exactly three rounds completed: six matched pairs / twelve new ordinary-practice worlds, all verified ended, practice, non-board and non-season on the server. All twelve final weeks qualified; zero below90%, zero undelivered orders, zero action refusals. Each round's final controller handle exited0; an earlier acknowledgment encoding interruption exited1 and was resolved without creating a replacement world. No own unfinished world or controller remains.

| Level | Retained parser/core | Fixed config | Baseline total EUR | Candidate total EUR | Delta EUR | Minimum service | Decision |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | e1d59e4c7d3c75987263f2a840e4c452f312a592 / e2258522db411d7d0ed2542cc184307a8388baa9 | competitive1600 (full JSON above) | 1852.44 | 1852.44 | 0.00 | 100.00% | retain baseline |
| 5 | fc9a714442f2d8093a1defc21a6cb1fed1f36976 / fc9a714442f2d8093a1defc21a6cb1fed1f36976 | competitive1600 (full JSON above) | 1133.16 | 1132.16 | -1.00 | 96.55% | retain baseline |
| 6 | fc9a714442f2d8093a1defc21a6cb1fed1f36976 / fc9a714442f2d8093a1defc21a6cb1fed1f36976 | competitive1600 (full JSON above) | 1009.59 | 1009.59 | 0.00 | 93.33% | retain baseline |

Best retained measured fallback for each assigned level4/5/6 is the unchanged competitive1600 configuration in the full JSON above; this session compares parser variants, not alternative configurations, so it does not establish a global optimum. In particular do not silently substitute the published level5 1100-cent floor: historical paired evidence in this report rejected that candidate. No new configuration edit is proposed for Pricing.

No candidate passes the positive-development gate; therefore no holdout was scheduled and neither parser experiment is promoted. This turn changes only the report on the personal branch; existing validated parser/tests are retained. Local rejected snapshots contain regression tests: deadline abbreviation retains tomorrow/Friday and delivery side; weekday normalization retains Thursday readiness, Monday delivery plus independent pickup hours, all seven2-day weekday offsets, manual requirement, decimal clocks, English destination "to", invalid clocks and unknown prose. Candidate1/2 snapshots and diff fingerprints above identify the exact local tests; these are not published as a winning production change.

Offline validation: current personal/main-based branch53/53; frozen integration baseline72/72; deadline candidate73/73; weekday candidate74/74; latest downloaded integration73/73. All full suites passed, and git diff --check passed. Ledger sums deduplicated by seq match every final score. Completed-world reveal audits found no missed critical constraints in checked won notes; newly understood notes won no additional orders, so their hidden constraints lack won-order truth and this is not evidence of safe profitable expansion.

Latest fetched integration is 2213766b83900ad7aa289437d37dd055a938dbc4, including planner9205a34. It differs from main9dccfdb6238abe56e61938ecb48fd64b371651b2; it was downloaded and tested offline only. No world in this report executed that new planner. The actual server cores remain e225852 for round1 and fc9a714 for rounds2/3. Before any future authorized experiment, establish a fresh paired baseline on the newly selected source; no fourth round or world is started here.

Evidence limits: two development seeds per level, no positive candidate and no fresh holdout; level4 has no notes and is a compatibility control. Equal on-time buffers and non-positive gains favor the existing baseline. This is not unseen-level, ranking or final validation. Raw journals, reveals, isolated worktrees and keys remain on this host outside tracked changes.

Final checkpoint: branch work/notes-thanhdatLUT; output root C:\Users\thanh\Documents\Codex\2026-11-14\t\work\bounded-l456; all world IDs, immutable commits, full config and per-world output folders are in the tables above. Next action: stop; review PR https://github.com/lilso-andy/spread-dispatcher/pull/5. Existing planner interface proposal remains for the planner owner. No ranking, test-final, live-final, merge or force-push occurred.

Checkpoint owner: this Codex desktop host; active controller: {"pid":23228,"round":3,"startedAt":"2026-11-14T03:45:36.092Z","state":"stopped","command":"work/bounded-worker.mjs 3","endedAt":"2026-11-14T03:49:32.700Z"}. Next action: STOPPED after three rounds; final checkpoint publication only, no automatic practice continuation. Only ordinary practice; no ranking/test-final/live-final, no merge/force-push, no teammate branch edits. Source changes trigger a new baseline before any next round. Planner interface changes remain a proposal for its owner. Displayed percentages are rounded; eligibility gates use exact final scores.


## Margin-first notes session — service floor94%

Status: in progress. New user instruction reopens practice optimization after the completed three-round session. Each candidate week must now reach94%, not90%. Scope remains notes.ts, test/notes.test.ts and this report. Only ordinary practice.

### Cause analysis before choosing the next experiment

Six completed baseline worlds from the previous session; seq-deduplicated ledger reconciles exactly to final scores. Twelve paired-world ledger summaries are retained below. No declined request list price is booked as a loss. All ledger entries have orderId, so order attribution is exact and requires no shared-fee allocation. Cancelled orders can still incur driver fees; these remain in the ledger and route tables even though score.wonOrders excludes cancellation.

| Level | Seed | Side | World | Revenue EUR | Driver fees EUR | Refund EUR | Release fees EUR | Failed visit EUR | Waiting/fines/undelivered EUR | Margin EUR |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 4 | thanhdat-bounded4-a | baseline | w6a80763cd35dfe04d53d | 3898.00 | -3161.92 | 0.00 | 0.00 | 0.00 | 0.00 | 736.08 |
| 4 | thanhdat-bounded4-a | candidate | w1ddebfffa5d6ff7f63f4 | 3898.00 | -3161.92 | 0.00 | 0.00 | 0.00 | 0.00 | 736.08 |
| 4 | thanhdat-bounded4-b | baseline | wd3c6c0feea4fc838a7a1 | 5170.00 | -4053.64 | 0.00 | 0.00 | 0.00 | 0.00 | 1116.36 |
| 4 | thanhdat-bounded4-b | candidate | w4515874e8fd9346270b7 | 5170.00 | -4053.64 | 0.00 | 0.00 | 0.00 | 0.00 | 1116.36 |
| 5 | notes-clock-18 | baseline | wef7babd6f572d10ac2c4 | 2904.00 | -2276.39 | -20.00 | 0.00 | 0.00 | 0.00 | 607.61 |
| 5 | notes-clock-18 | candidate | w79c84a6e02372e8d63cd | 2903.00 | -2276.39 | -20.00 | 0.00 | 0.00 | 0.00 | 606.61 |
| 5 | notes-clock-19 | baseline | wffdb01adf047b3fd6edc | 3483.00 | -2957.45 | 0.00 | 0.00 | 0.00 | 0.00 | 525.55 |
| 5 | notes-clock-19 | candidate | wef8d5fea220a49f144d8 | 3483.00 | -2957.45 | 0.00 | 0.00 | 0.00 | 0.00 | 525.55 |
| 6 | thanhdat-bounded6-a | baseline | w1d6d368508de7451742b | 1906.00 | -1482.96 | -8.90 | 0.00 | 0.00 | 0.00 | 414.14 |
| 6 | thanhdat-bounded6-a | candidate | wd8d33545960f9f950bb9 | 1906.00 | -1482.96 | -8.90 | 0.00 | 0.00 | 0.00 | 414.14 |
| 6 | thanhdat-bounded6-b | baseline | wddc4bf155217f7c105c9 | 2356.00 | -1760.55 | 0.00 | 0.00 | 0.00 | 0.00 | 595.45 |
| 6 | thanhdat-bounded6-b | candidate | w56030b608863964b7096 | 2356.00 | -1760.55 | 0.00 | 0.00 | 0.00 | 0.00 | 595.45 |

Baseline totals across6 weeks: revenue19717.00 EUR, driver fees-15692.91 EUR, refunds-28.90 EUR; release/failed-visit/waiting/fine/undelivered lines all0. Driver fees are necessary costs, not automatically avoidable losses. Six negative-margin order histories total-257.87 EUR;193.77 EUR is driver spend on subsequently cancelled orders, not release-fee lines. Only one negative-margin order has a note (-3.14 EUR) and its checked parser facts match. Both refunded orders have no note. No missed critical parser fact was confirmed in the checked won orders. Therefore neither refund nor the full driver-fee spend is claimed as a parser opportunity.

Declines by first refusal gate (mutually exclusive): {"combined capacity/time/margin":269,"parser uncertainty":979,"service recovery pause":498,"summer-tyre weather exposure":5}. Parser-family diagnostics overlap: {"other unresolved prose":687,"contact/reference text":216,"viim. abbreviation":44,"recurring hours":45,"word half-hour":4,"correction":5,"dotted FI weekday":1,"kello clock marker":2}. Generic capacity/time/margin reasons cannot be separated further without new diagnostics from the dispatcher owner. No false precision is added.

Chosen in-scope hypothesis: accept exactly four complete carried-wheel statements (renkaat kyydissä; renkaat takakontissa, menee mukana; spare wheels in the boot; second set of wheels in the back). Never mask neighboring clauses or fitted-tyre requirements. On completed level5 seeds this unlocks16/25 requests; level6 seeds18/23. Cargo-marker clause observations108 across4 weeks. The prior deadline patch unlocked11 notes but won0 extra orders (-1 EUR); weekday patch unlocked2 but won0 (tie), so they are lower priority.

Opportunity is a scenario, NOT measured lost margin: observed margin per quoted request is0.8896/0.7683 EUR at level5 and1.3403/0.8375 at level6. Assuming every unlocked request passes capacity/route/fee gates and has the same win/cost mix as existing quoted requests gives14.23/19.21 EUR per level5 week,24.12/19.26 at level6 (19.21 EUR/week pooled mean). The evidenced lower bound is0; adverse selection, delivery costs, competition and interactions can make the actual effect negative. These assumptions are specifically tested by paired end-week scores, revenue, fees, new winners and margin/order, not by request list prices.

Dispatcher/Pricing handoff: service-recovery pause refused37 requests on level5 clock-18 and461 on level6 bounded6-a, after unnoted lateness. Relaxing it is outside Notes scope and must preserve94% at the whole-week gate; its volume is not monetized as a proven loss. Contact/reference text affects216 refusals but the previous broader contact candidate lost250.16 EUR, so frequency alone is insufficient reason to retry it.

Static parameter audit: on the executed core, level4?6 quote base is fixed1.20 and the fee-multiplier floor is fixed1.05; the configured quoteMultiplier1.35/feeMultiplier1.08 do not control those paths. Learned booked-fee feedback can still raise the fee multiplier. A proposed feeMultiplier1.08?1.04 experiment would therefore be a no-op at these assigned levels and is NOT run or counted as a saving. Larger fee-learning/recovery changes require the Dispatcher owner.

### Won-order margin by route and pickup slack

Route is the public directed place-ID sequence. Amounts include cancellation-related spend; count is order_won events, including later cancellations. Lead is public lastPickupAt minus win time; pickup slack uses first actual pickup against the original public cutoff. Rescue interventions count successful fee-increasing reprices and repeat posts of an already posted order-leg; scheduled bookings paid above opening fee are counted separately, not as repeated interventions. Planned driving hours come from the winning quote route, exclude approach/waiting/charging and are a proxy, not measured driver labor.

| Group | Orders/cancelled | Margin EUR | Driver fees EUR | Refund EUR | Planned drive h | EUR/planned h | Rescue interventions | Paid above opening |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| L4 pickup slack not picked up | 1/1 | -47.76 | -47.76 | 0.00 | 1.23 | -38.72 | 0 | 0 |
| L5 win lead 181–360 min | 2/1 | 1.67 | -93.33 | 0.00 | 2.95 | 0.57 | 0 | 0 |
| L6 rescues 2 | 1/0 | 6.92 | -24.08 | 0.00 | 0.48 | 14.32 | 2 | 1 |
| L4 win lead 181–360 min | 1/0 | 18.25 | -15.75 | 0.00 | 0.48 | 37.76 | 0 | 0 |
| L6 rescues 1 | 1/0 | 28.67 | -107.33 | 0.00 | 4.32 | 6.64 | 1 | 0 |
| L5 rescues 1 | 3/0 | 54.65 | -249.35 | 0.00 | 9.18 | 5.95 | 3 | 0 |
| L6 win lead 181–360 min | 3/0 | 65.70 | -216.30 | 0.00 | 7.05 | 9.32 | 0 | 0 |
| L4 rescues 1 | 1/0 | 66.17 | -103.83 | 0.00 | 5.82 | 11.38 | 1 | 1 |
| L5 pickup slack 181–360 min | 13/2 | 130.94 | -1099.06 | 0.00 | 39.38 | 3.32 | 0 | 0 |
| L6 pickup slack 0–180 min | 9/0 | 182.34 | -511.76 | -8.90 | 18.00 | 10.13 | 2 | 1 |
| L5 pickup slack 0–180 min | 12/0 | 229.99 | -1064.01 | -20.00 | 35.42 | 6.49 | 0 | 0 |
| L6 pickup slack 181–360 min | 11/0 | 292.34 | -875.66 | 0.00 | 31.82 | 9.19 | 0 | 0 |
| L4 pickup slack 0–180 min | 11/0 | 338.53 | -911.47 | 0.00 | 37.92 | 8.93 | 1 | 1 |
| L4 pickup slack 181–360 min | 15/0 | 415.47 | -1957.53 | 0.00 | 73.87 | 5.62 | 0 | 0 |
| L6 pickup slack >360 min | 27/0 | 534.91 | -1856.09 | 0.00 | 63.55 | 8.42 | 1 | 0 |
| L5 pickup slack >360 min | 35/0 | 772.23 | -3070.77 | 0.00 | 111.67 | 6.92 | 3 | 0 |
| L6 win lead >360 min | 44/0 | 943.89 | -3027.21 | -8.90 | 106.32 | 8.88 | 3 | 1 |
| L6 rescues 0 | 45/0 | 974.00 | -3112.10 | -8.90 | 108.57 | 8.97 | 0 | 0 |
| L5 rescues 0 | 57/2 | 1078.51 | -4984.49 | -20.00 | 177.28 | 6.08 | 0 | 0 |
| L5 win lead >360 min | 58/1 | 1131.49 | -5140.51 | -20.00 | 183.52 | 6.17 | 3 | 0 |
| L4 pickup slack >360 min | 49/0 | 1146.20 | -4298.80 | 0.00 | 159.50 | 7.19 | 0 | 0 |
| L4 rescues 0 | 75/1 | 1786.27 | -7111.73 | 0.00 | 266.70 | 6.70 | 0 | 0 |
| L4 win lead >360 min | 75/1 | 1834.19 | -7199.81 | 0.00 | 272.03 | 6.74 | 1 | 1 |

All baseline route aggregates (not raw logs/reveal):

| Group | Orders/cancelled | Margin EUR | Driver fees EUR | Refund EUR | Planned drive h | EUR/planned h | Rescue interventions | Paid above opening |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| L5 vantaa→kuopio | 3/1 | -73.23 | -355.23 | 0.00 | 12.15 | -6.03 | 0 | 0 |
| L5 espoo→lempaala | 1/0 | -32.78 | -92.78 | -20.00 | 1.70 | -19.28 | 0 | 0 |
| L6 hyvinkaa→lempaala | 1/0 | -28.18 | -87.18 | 0.00 | 1.10 | -25.62 | 0 | 0 |
| L5 helsinki→espoo | 1/1 | -18.76 | -18.76 | 0.00 | 0.53 | -35.18 | 0 | 0 |
| L4 espoo→lahti | 3/1 | -14.51 | -141.51 | 0.00 | 3.70 | -3.92 | 0 | 0 |
| L5 hyvinkaa→kuopio | 1/0 | -3.14 | -124.14 | 0.00 | 3.82 | -0.82 | 0 | 0 |
| L5 jyvaskyla→lahti | 1/0 | 16.12 | -59.88 | 0.00 | 1.98 | 8.13 | 0 | 0 |
| L4 kuopio→joensuu | 1/0 | 16.13 | -48.87 | 0.00 | 1.77 | 9.13 | 0 | 0 |
| L6 hyvinkaa→espoo | 1/0 | 16.14 | -31.86 | 0.00 | 0.77 | 21.05 | 0 | 0 |
| L4 helsinki→tampere | 1/0 | 16.15 | -64.85 | 0.00 | 1.77 | 9.14 | 0 | 0 |
| L6 vantaa→hameenlinna | 1/0 | 16.16 | -48.84 | 0.00 | 1.00 | 16.16 | 0 | 0 |
| L6 espoo→vantaa | 1/0 | 16.20 | -18.80 | 0.00 | 0.42 | 38.88 | 0 | 0 |
| L6 espoo→lappeenranta | 1/0 | 16.25 | -80.75 | 0.00 | 2.60 | 6.25 | 0 | 0 |
| L6 lahti→tampere | 1/0 | 16.26 | -56.74 | 0.00 | 1.72 | 9.47 | 0 | 0 |
| L5 turku→raisio | 1/0 | 16.27 | -12.73 | 0.00 | 0.13 | 122.02 | 0 | 0 |
| L4 tampere→rauma | 1/0 | 16.30 | -60.70 | 0.00 | 1.75 | 9.31 | 0 | 0 |
| L6 espoo→helsinki | 1/0 | 16.32 | -16.68 | 0.00 | 0.53 | 30.60 | 0 | 0 |
| L5 vantaa→lahti | 1/0 | 16.35 | -38.65 | 0.00 | 1.05 | 15.57 | 0 | 0 |
| L5 hyvinkaa→lahti | 1/0 | 16.36 | -34.64 | 0.00 | 0.83 | 19.63 | 0 | 0 |
| L4 tampere→helsinki | 1/0 | 16.45 | -59.55 | 0.00 | 1.77 | 9.31 | 0 | 0 |
| L5 vantaa→tampere | 1/0 | 16.47 | -58.53 | 0.00 | 1.77 | 9.32 | 0 | 0 |
| L5 vaasa→ylivieska | 1/0 | 16.52 | -61.48 | 0.00 | 2.43 | 6.79 | 0 | 0 |
| L5 jyvaskyla→vantaa | 1/0 | 16.53 | -88.47 | 0.00 | 2.88 | 5.73 | 0 | 0 |
| L5 vantaa→salo | 1/0 | 16.54 | -46.46 | 0.00 | 1.18 | 13.98 | 0 | 0 |
| L4 vantaa→espoo | 1/0 | 16.56 | -18.44 | 0.00 | 0.42 | 39.74 | 0 | 0 |
| L6 hyvinkaa→hameenlinna | 1/0 | 16.60 | -33.40 | 0.00 | 0.58 | 28.46 | 0 | 0 |
| L5 vantaa→raisio | 1/0 | 16.67 | -55.33 | 0.00 | 1.70 | 9.81 | 0 | 0 |
| L5 turku→pori | 1/0 | 16.68 | -54.32 | 0.00 | 1.73 | 9.62 | 0 | 0 |
| L5 hyvinkaa→lempaala | 1/0 | 16.70 | -43.30 | 0.00 | 1.10 | 15.18 | 1 | 0 |
| L5 turku→hameenlinna | 1/0 | 16.71 | -54.29 | 0.00 | 1.83 | 9.11 | 0 | 0 |
| L5 tampere→vantaa | 1/0 | 16.77 | -54.23 | 0.00 | 1.77 | 9.49 | 0 | 0 |
| L6 espoo→lahti | 1/0 | 16.79 | -43.21 | 0.00 | 1.23 | 13.61 | 0 | 0 |
| L5 hyvinkaa→kotka | 1/0 | 16.84 | -57.16 | 0.00 | 1.62 | 10.42 | 0 | 0 |
| L6 hyvinkaa→pori | 1/0 | 16.85 | -85.15 | 0.00 | 2.52 | 6.70 | 0 | 0 |
| L5 kouvola→salo | 1/0 | 16.88 | -81.12 | 0.00 | 2.75 | 6.14 | 0 | 0 |
| L6 vantaa→hyvinkaa | 1/0 | 16.93 | -35.07 | 0.00 | 0.58 | 29.02 | 0 | 0 |
| L4 vantaa→pori | 1/0 | 16.99 | -69.01 | 0.00 | 2.80 | 6.07 | 0 | 0 |
| L6 lahti→lahti | 1/0 | 16.99 | -17.01 | 0.00 | 0.42 | 40.78 | 0 | 0 |
| L4 hyvinkaa→tampere | 1/0 | 17.03 | -44.97 | 0.00 | 1.27 | 13.44 | 0 | 0 |
| L5 hyvinkaa→vaasa | 1/0 | 17.03 | -110.97 | 0.00 | 4.05 | 4.20 | 0 | 0 |
| L4 vantaa→raisio | 1/0 | 17.08 | -53.92 | 0.00 | 1.70 | 10.05 | 0 | 0 |
| L6 vantaa→jyvaskyla | 1/0 | 17.84 | -88.16 | 0.00 | 2.88 | 6.19 | 0 | 0 |
| L6 vantaa→kuopio | 1/0 | 17.98 | -118.02 | 0.00 | 4.05 | 4.44 | 0 | 0 |
| L4 vantaa→helsinki | 1/0 | 18.25 | -15.75 | 0.00 | 0.48 | 37.76 | 0 | 0 |
| L5 lahti→ylivieska | 1/0 | 18.54 | -122.46 | 0.00 | 4.72 | 3.93 | 0 | 0 |
| L4 jyvaskyla→oulu | 1/0 | 19.30 | -100.70 | 0.00 | 3.78 | 5.10 | 0 | 0 |
| L4 espoo→kuopio | 1/0 | 19.57 | -127.43 | 0.00 | 4.32 | 4.53 | 0 | 0 |
| L5 kuopio→mikkeli | 1/0 | 19.74 | -58.26 | 0.00 | 1.77 | 11.17 | 0 | 0 |
| L6 lahti→lappeenranta | 1/0 | 19.80 | -52.20 | 0.00 | 1.77 | 11.21 | 0 | 0 |
| L6 vantaa→lappeenranta | 1/0 | 19.84 | -71.16 | 0.00 | 2.40 | 8.27 | 0 | 0 |
| L6 helsinki→pori | 1/0 | 19.94 | -76.06 | 0.00 | 2.88 | 6.92 | 0 | 0 |
| L6 espoo→joensuu | 1/0 | 20.42 | -126.58 | 0.00 | 4.78 | 4.27 | 0 | 0 |
| L5 espoo→mikkeli | 1/0 | 20.43 | -74.57 | 0.00 | 2.42 | 8.45 | 0 | 0 |
| L5 hameenlinna→vantaa | 1/0 | 20.53 | -36.47 | 0.00 | 1.00 | 20.53 | 0 | 0 |
| L4 espoo→vaasa | 1/0 | 20.58 | -131.42 | 0.00 | 4.67 | 4.41 | 0 | 0 |
| L5 helsinki→turku | 1/0 | 20.86 | -60.14 | 0.00 | 1.88 | 11.08 | 0 | 0 |
| L4 jyvaskyla→hameenlinna | 1/0 | 20.89 | -60.11 | 0.00 | 2.12 | 9.87 | 0 | 0 |
| L5 kotka→jyvaskyla | 1/0 | 21.28 | -75.72 | 0.00 | 2.83 | 7.51 | 0 | 0 |
| L4 espoo→tampere | 1/0 | 21.37 | -65.63 | 0.00 | 2.03 | 10.51 | 0 | 0 |
| L4 vantaa→seinajoki | 1/0 | 21.44 | -108.56 | 0.00 | 3.83 | 5.59 | 0 | 0 |
| L5 tampere→oulu | 1/0 | 21.46 | -142.54 | 0.00 | 5.67 | 3.79 | 1 | 0 |
| L4 ylivieska→tampere | 1/0 | 21.80 | -112.20 | 0.00 | 4.27 | 5.11 | 0 | 0 |
| L4 espoo→seinajoki | 1/0 | 22.12 | -97.88 | 0.00 | 4.13 | 5.35 | 0 | 0 |
| L6 porvoo→tampere | 1/0 | 22.26 | -64.74 | 0.00 | 2.17 | 10.27 | 0 | 0 |
| L5 rauma→vantaa | 1/0 | 22.29 | -83.71 | 0.00 | 2.70 | 8.26 | 0 | 0 |
| L5 pori→mikkeli | 1/0 | 22.60 | -100.40 | 0.00 | 3.93 | 5.75 | 0 | 0 |
| L4 vantaa→lappeenranta | 1/0 | 23.71 | -67.29 | 0.00 | 2.40 | 9.88 | 0 | 0 |
| L5 vantaa→mikkeli | 1/0 | 23.98 | -76.02 | 0.00 | 2.35 | 10.20 | 0 | 0 |
| L5 helsinki→rauma | 1/0 | 24.32 | -80.68 | 0.00 | 2.93 | 8.29 | 0 | 0 |
| L4 vantaa→savonlinna | 1/0 | 25.73 | -95.27 | 0.00 | 3.75 | 6.86 | 0 | 0 |
| L4 espoo→kajaani | 1/0 | 26.11 | -168.89 | 0.00 | 6.42 | 4.07 | 0 | 0 |
| L6 hyvinkaa→ylivieska | 1/0 | 26.60 | -139.40 | 0.00 | 5.47 | 4.87 | 0 | 0 |
| L4 kuopio→vaasa | 1/0 | 26.83 | -107.17 | 0.00 | 4.15 | 6.47 | 0 | 0 |
| L5 joensuu→rovaniemi | 1/0 | 27.97 | -182.03 | 0.00 | 6.42 | 4.36 | 0 | 0 |
| L6 espoo→kuopio | 1/0 | 28.67 | -107.33 | 0.00 | 4.32 | 6.64 | 1 | 0 |
| L4 lahti→kuopio | 1/0 | 29.04 | -88.96 | 0.00 | 3.17 | 9.17 | 0 | 0 |
| L6 vantaa→mikkeli | 1/0 | 29.39 | -70.61 | 0.00 | 2.35 | 12.51 | 0 | 0 |
| L5 pori→lappeenranta | 1/0 | 31.20 | -115.80 | 0.00 | 4.67 | 6.69 | 0 | 0 |
| L4 espoo→helsinki | 2/0 | 31.58 | -41.42 | 0.00 | 1.07 | 29.61 | 0 | 0 |
| L5 hyvinkaa→ylivieska | 1/0 | 32.54 | -131.46 | 0.00 | 5.47 | 5.95 | 0 | 0 |
| L4 turku→kemi | 1/0 | 32.77 | -199.23 | 0.00 | 8.08 | 4.05 | 0 | 0 |
| L5 oulu→kokkola | 2/0 | 33.44 | -133.56 | 0.00 | 4.83 | 6.92 | 1 | 0 |
| L5 vantaa→pori | 2/0 | 33.50 | -155.50 | 0.00 | 5.60 | 5.98 | 0 | 0 |
| L6 hyvinkaa→tampere | 2/0 | 33.79 | -96.21 | 0.00 | 2.53 | 13.34 | 0 | 0 |
| L5 hameenlinna→joensuu | 1/0 | 34.08 | -96.92 | 0.00 | 4.48 | 7.60 | 0 | 0 |
| L4 vantaa→lahti | 2/0 | 34.35 | -84.65 | 0.00 | 2.10 | 16.36 | 0 | 0 |
| L5 vantaa→kemi | 1/0 | 34.35 | -224.65 | 0.00 | 8.05 | 4.27 | 0 | 0 |
| L5 hyvinkaa→pori | 1/0 | 34.56 | -62.44 | 0.00 | 2.52 | 13.73 | 0 | 0 |
| L5 espoo→kuopio | 1/0 | 34.81 | -105.19 | 0.00 | 4.32 | 8.06 | 0 | 0 |
| L4 vantaa→mikkeli | 2/0 | 35.71 | -160.29 | 0.00 | 4.70 | 7.60 | 0 | 0 |
| L4 espoo→mikkeli | 2/0 | 37.45 | -166.55 | 0.00 | 4.83 | 7.75 | 0 | 0 |
| L4 lempaala→kemi | 1/0 | 37.76 | -177.24 | 0.00 | 6.93 | 5.45 | 0 | 0 |
| L4 vantaa→vaasa | 2/0 | 39.05 | -254.95 | 0.00 | 8.93 | 4.37 | 0 | 0 |
| L4 vantaa→joensuu | 1/0 | 39.45 | -117.55 | 0.00 | 4.80 | 8.22 | 0 | 0 |
| L5 vantaa→oulu | 1/0 | 40.80 | -149.20 | 0.00 | 6.62 | 6.17 | 0 | 0 |
| L6 hyvinkaa→kokkola | 1/0 | 41.20 | -112.80 | 0.00 | 4.95 | 8.32 | 0 | 0 |
| L5 vantaa→lappeenranta | 2/0 | 43.01 | -145.99 | 0.00 | 4.80 | 8.96 | 0 | 0 |
| L5 vantaa→savonlinna | 1/0 | 43.20 | -85.80 | 0.00 | 3.75 | 11.52 | 0 | 0 |
| L4 espoo→lahti + lahti→espoo | 1/0 | 43.98 | -50.02 | 0.00 | 2.88 | 15.25 | 0 | 0 |
| L4 hyvinkaa→vaasa | 2/0 | 44.01 | -220.99 | 0.00 | 8.10 | 5.43 | 0 | 0 |
| L6 vantaa→oulu | 1/0 | 46.06 | -144.94 | 0.00 | 6.62 | 6.96 | 0 | 0 |
| L4 helsinki→mikkeli | 2/0 | 48.00 | -144.00 | 0.00 | 4.33 | 11.08 | 0 | 0 |
| L6 hyvinkaa→lahti | 3/0 | 48.32 | -119.68 | 0.00 | 2.50 | 19.33 | 0 | 0 |
| L4 helsinki→kemi | 1/0 | 49.25 | -177.75 | 0.00 | 7.65 | 6.44 | 0 | 0 |
| L4 espoo→vantaa | 3/0 | 50.14 | -54.86 | 0.00 | 1.25 | 40.11 | 0 | 0 |
| L4 lahti→pori | 2/0 | 50.38 | -153.62 | 0.00 | 5.90 | 8.54 | 0 | 0 |
| L6 hyvinkaa→vaasa | 2/0 | 50.42 | -232.58 | 0.00 | 8.10 | 6.22 | 0 | 0 |
| L5 vantaa→kajaani | 1/0 | 50.44 | -138.56 | 0.00 | 6.07 | 8.31 | 0 | 0 |
| L5 hyvinkaa→tampere | 3/0 | 51.34 | -147.66 | 0.00 | 3.80 | 13.51 | 0 | 0 |
| L4 kouvola→oulu | 1/0 | 51.47 | -137.53 | 0.00 | 6.28 | 8.19 | 0 | 0 |
| L4 espoo→jyvaskyla | 2/0 | 52.22 | -150.78 | 0.00 | 6.23 | 8.38 | 0 | 0 |
| L4 helsinki→vaasa | 2/0 | 52.63 | -241.37 | 0.00 | 9.43 | 5.58 | 0 | 0 |
| L4 tampere→lappeenranta + lappeenranta→tampere | 1/0 | 57.60 | -109.40 | 0.00 | 7.32 | 7.87 | 0 | 0 |
| L4 hyvinkaa→joensuu | 2/0 | 62.14 | -234.86 | 0.00 | 8.97 | 6.93 | 0 | 0 |
| L4 hyvinkaa→jyvaskyla + jyvaskyla→hyvinkaa | 1/0 | 66.17 | -103.83 | 0.00 | 5.82 | 11.38 | 1 | 1 |
| L4 tampere→lempaala | 4/0 | 66.21 | -67.79 | 0.00 | 1.27 | 52.27 | 0 | 0 |
| L6 hyvinkaa→kuopio | 2/0 | 66.73 | -193.27 | 0.00 | 7.63 | 8.74 | 0 | 0 |
| L6 jyvaskyla→seinajoki | 4/0 | 68.71 | -263.39 | -8.90 | 10.20 | 6.74 | 0 | 0 |
| L5 porvoo→oulu | 2/0 | 70.03 | -330.97 | 0.00 | 13.00 | 5.39 | 0 | 0 |
| L5 vantaa→ylivieska | 2/0 | 70.09 | -281.91 | 0.00 | 11.33 | 6.18 | 0 | 0 |
| L4 hyvinkaa→ylivieska | 3/0 | 84.64 | -403.36 | 0.00 | 16.40 | 5.16 | 0 | 0 |
| L6 vantaa→helsinki | 6/0 | 91.50 | -117.50 | 0.00 | 2.90 | 31.55 | 2 | 1 |
| L5 vantaa→jyvaskyla | 4/0 | 94.24 | -332.76 | 0.00 | 11.53 | 8.17 | 0 | 0 |
| L6 vantaa→kokkola | 4/0 | 186.81 | -494.19 | 0.00 | 21.40 | 8.73 | 0 | 0 |
| L4 vantaa→oulu | 11/0 | 350.56 | -1854.44 | 0.00 | 72.78 | 4.82 | 0 | 0 |

### New controlled experiments

Full configuration, unchanged between each pair:

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

Round1, level5: Repeated complete carried-wheel phrases block16/25 otherwise understood requests; measured quoted cohort supports a scenario14?19 EUR/week, evidenced lower bound0. Four anchored cargo statements only; preserve every adjacent bound/equipment condition.. Registration 2026-11-14T04:03:44.308Z; behavior announced before editing in chat, untouched decision seed reserved before any new practice score. Core2213766b83900ad7aa289437d37dd055a938dbc4; baseline2213766b83900ad7aa289437d37dd055a938dbc4; candidate4d61a9ed80f67348097c8930086825b1f56f20a4; diffsha256:12cc35471cdc772b5febd3abc09771dbe5f302548ddd6515f9da9cc7d915474e. Offline: Baseline73/73 and candidate75/75 full tests passed; diff check passed. Development seeds notes-clock-18, notes-clock-19; reserved decision seed thanhdat-notes94-cargo-decision-5a must never be reused as fresh holdout after viewing. Supplementary frozen-code proof: thanhdat-notes94-cargo-proof-5b. Supplementary frozen-code replication: retain only if both new level5/6 pairs have positive margin delta and every candidate week>=94%, zero refusals/missed constraints. Any failure triggers withdrawal of universal cargo promotion; earlier results remain recorded. Seeds chosen before any replication score, after initial tuning; no retuning permitted. Selection: positive paired total and every candidate week>=94%, zero refused actions and critical misses; then positive fresh-decision delta. Under1% benefit, higher worst service wins; tie keeps baseline. Keep as level5-validated candidate, cross-level promotion pending: development+12.57 EUR (seed18 -4.00,seed19 +16.57), untouched decision+25.64 EUR at100%; total+38.21 EUR (+1.75%), worst96.77%, no refusals/critical misses. Two new orders add47.30 EUR, common-order interactions cost9.09 EUR. Total margin improves but pooled margin/order and per planned driving hour decline slightly; actual driver-hours unmeasured..

| Phase | Seed | Side | World | Margin EUR | Won | EUR/order | On time | Undelivered | Refusals | Output |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| development | notes-clock-18 | baseline | wcabe6387dd160101c0b6 | 641.03 | 31 | 20.68 | 96.77% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes94\round-1\development\notes-clock-18\baseline |
| development | notes-clock-18 | candidate | wb89928a09d65613eb87f | 637.03 | 31 | 20.55 | 96.77% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes94\round-1\development\notes-clock-18\candidate |
| development | notes-clock-19 | baseline | w48bf3984c9385a5e62d8 | 569.33 | 30 | 18.98 | 100.00% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes94\round-1\development\notes-clock-19\baseline |
| development | notes-clock-19 | candidate | we54600465e46a4ca050e | 585.90 | 31 | 18.90 | 100.00% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes94\round-1\development\notes-clock-19\candidate |
| holdout | thanhdat-notes94-cargo-decision-5a | baseline | w29ae3ead7523090ffbf6 | 974.83 | 36 | 27.08 | 100.00% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes94\round-1\holdout\thanhdat-notes94-cargo-decision-5a\baseline |
| holdout | thanhdat-notes94-cargo-decision-5a | candidate | w3c505f2af26a48622b34 | 1000.47 | 37 | 27.04 | 100.00% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes94\round-1\holdout\thanhdat-notes94-cargo-decision-5a\candidate |
| replication | thanhdat-notes94-cargo-proof-5b | baseline | wb70c798acc2636917ddc | 732.97 | 28 | 26.18 | 100.00% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes94\round-1\replication\thanhdat-notes94-cargo-proof-5b\baseline |
| replication | thanhdat-notes94-cargo-proof-5b | candidate | w11c67be7ffec525604a2 | 754.17 | 29 | 26.01 | 100.00% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes94\round-1\replication\thanhdat-notes94-cargo-proof-5b\candidate |

Actual final ledger causes, EUR (zeros retained):

| Seed | Side | Revenue | Driver fee | Refund | Release fee | Failed visit | Waiting | Fine | Undelivered penalty |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| notes-clock-18 | baseline | 2970.00 | -2308.97 | -20.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| notes-clock-18 | candidate | 2966.00 | -2308.97 | -20.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| notes-clock-19 | baseline | 3734.00 | -3164.67 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| notes-clock-19 | candidate | 3812.00 | -3226.10 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| thanhdat-notes94-cargo-decision-5a | baseline | 4643.00 | -3668.17 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| thanhdat-notes94-cargo-decision-5a | candidate | 4785.00 | -3784.53 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| thanhdat-notes94-cargo-proof-5b | baseline | 3500.00 | -2767.03 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| thanhdat-notes94-cargo-proof-5b | candidate | 3669.00 | -2914.83 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |

Completed-world field/ledger audit: {"checkedAt":"2026-11-14T04:24:09.817Z","method":"Completed-world reveal only; deduplicated seq ledger reconciled to final margin. Won-order truth checked for manual/plates/tyres/deadline/release and note hours against public hours; unrevealed lost/unquoted requests have no order truth.","pairs":[{"seed":"notes-clock-18","phase":"development","baseline":{"ledger":{"revenue":297000,"driver_fee":-230897,"late_refund":-2000},"totalCents":64103,"declines":266,"noteCount":416,"safeCount":179,"checkedWonNotes":5,"misses":[]},"candidate":{"ledger":{"revenue":296600,"driver_fee":-230897,"late_refund":-2000},"totalCents":63703,"declines":245,"noteCount":416,"safeCount":200,"checkedWonNotes":5,"misses":[]},"newlySafeCount":21,"newlyQuotedCount":21,"newlyWonCount":0,"introducedCriticalMisses":[]},{"seed":"notes-clock-19","phase":"development","baseline":{"ledger":{"revenue":373400,"driver_fee":-316467},"totalCents":56933,"declines":300,"noteCount":441,"safeCount":184,"checkedWonNotes":6,"misses":[]},"candidate":{"ledger":{"revenue":381200,"driver_fee":-322610},"totalCents":58590,"declines":268,"noteCount":441,"safeCount":217,"checkedWonNotes":6,"misses":[]},"newlySafeCount":33,"newlyQuotedCount":32,"newlyWonCount":0,"introducedCriticalMisses":[]},{"seed":"thanhdat-notes94-cargo-decision-5a","phase":"holdout","baseline":{"ledger":{"revenue":464300,"driver_fee":-366817},"totalCents":97483,"declines":278,"noteCount":415,"safeCount":185,"checkedWonNotes":10,"misses":[]},"candidate":{"ledger":{"revenue":478500,"driver_fee":-378453},"totalCents":100047,"declines":261,"noteCount":415,"safeCount":204,"checkedWonNotes":11,"misses":[]},"newlySafeCount":19,"newlyQuotedCount":17,"newlyWonCount":1,"introducedCriticalMisses":[]},{"seed":"thanhdat-notes94-cargo-proof-5b","phase":"replication","baseline":{"ledger":{"revenue":350000,"driver_fee":-276703},"totalCents":73297,"declines":292,"noteCount":404,"safeCount":157,"checkedWonNotes":6,"misses":[]},"candidate":{"ledger":{"revenue":366900,"driver_fee":-291483},"totalCents":75417,"declines":266,"noteCount":404,"safeCount":185,"checkedWonNotes":7,"misses":[]},"newlySafeCount":28,"newlyQuotedCount":26,"newlyWonCount":1,"introducedCriticalMisses":[]}],"wholeCohortEffects":[{"commonLedgerDeltaCents":{"revenue":-400,"driver_fee":0,"late_refund":0},"newOrderLedgerCents":{},"seed":"notes-clock-18","phase":"development","deltaCents":-400,"newlyQuoted":21,"removedQuotes":0,"newWonOrderCount":0,"lostWonOrderCount":0,"newOrderMarginCents":0,"displacedBaselineMarginEffectCents":0,"commonOrderInteractionCents":-400,"newOrderMargins":[],"commonOrdersChanged":4,"baseline":{"plannedDrivingHours":81.15,"marginPerOrderEUR":20.67838709677419,"marginPerPlannedHourEUR":7.899322242760319},"candidate":{"plannedDrivingHours":81.15,"marginPerOrderEUR":20.549354838709675,"marginPerPlannedHourEUR":7.850030807147257},"driverHourLimit":"Logged winning-quote driving proxy excludes approach, waiting and operational constraints; not measured driver labor."},{"commonLedgerDeltaCents":{"revenue":-100,"driver_fee":0},"newOrderLedgerCents":{"revenue":7900,"driver_fee":-6143},"seed":"notes-clock-19","phase":"development","deltaCents":1657,"newlyQuoted":32,"removedQuotes":0,"newWonOrderCount":1,"lostWonOrderCount":0,"newOrderMarginCents":1757,"displacedBaselineMarginEffectCents":0,"commonOrderInteractionCents":-100,"newOrderMargins":[{"orderId":"R00855","marginCents":1757}],"commonOrdersChanged":1,"baseline":{"plannedDrivingHours":114.65,"marginPerOrderEUR":18.977666666666668,"marginPerPlannedHourEUR":4.965808983863933},"candidate":{"plannedDrivingHours":116.81666666666666,"marginPerOrderEUR":18.9,"marginPerPlannedHourEUR":5.015551433870738},"driverHourLimit":"Logged winning-quote driving proxy excludes approach, waiting and operational constraints; not measured driver labor."},{"commonLedgerDeltaCents":{"revenue":-300,"driver_fee":-109},"newOrderLedgerCents":{"revenue":14500,"driver_fee":-11527},"seed":"thanhdat-notes94-cargo-decision-5a","phase":"holdout","deltaCents":2564,"newlyQuoted":17,"removedQuotes":0,"newWonOrderCount":1,"lostWonOrderCount":0,"newOrderMarginCents":2973,"displacedBaselineMarginEffectCents":0,"commonOrderInteractionCents":-409,"newOrderMargins":[{"orderId":"R00757","marginCents":2973}],"commonOrdersChanged":4,"baseline":{"plannedDrivingHours":132.93333333333334,"marginPerOrderEUR":27.078611111111112,"marginPerPlannedHourEUR":7.333224674022066},"candidate":{"plannedDrivingHours":137.4,"marginPerOrderEUR":27.039729729729732,"marginPerPlannedHourEUR":7.281441048034934},"driverHourLimit":"Logged winning-quote driving proxy excludes approach, waiting and operational constraints; not measured driver labor."},{"commonLedgerDeltaCents":{"revenue":-100,"driver_fee":0},"newOrderLedgerCents":{"revenue":17000,"driver_fee":-14780},"seed":"thanhdat-notes94-cargo-proof-5b","phase":"replication","deltaCents":2120,"newlyQuoted":26,"removedQuotes":0,"newWonOrderCount":1,"lostWonOrderCount":0,"newOrderMarginCents":2220,"displacedBaselineMarginEffectCents":0,"commonOrderInteractionCents":-100,"newOrderMargins":[{"orderId":"R00708","marginCents":2220}],"commonOrdersChanged":1,"baseline":{"plannedDrivingHours":102.11666666666666,"marginPerOrderEUR":26.177500000000002,"marginPerPlannedHourEUR":7.177770523910561},"candidate":{"plannedDrivingHours":107.3,"marginPerOrderEUR":26.005862068965516,"marginPerPlannedHourEUR":7.0286113699906805},"driverHourLimit":"Logged winning-quote driving proxy excludes approach, waiting and operational constraints; not measured driver labor."}]}

Round2, level6: Largest grounded Notes opportunity remains carried-wheel coverage: level5 now confirms+38.21 EUR including untouched decision+25.64; older completed level6 cohorts unlock18/23 requests, scenario19?24 EUR/week with lower bound0. Verify same exact patch under surprise-world interactions; preserve >=94% on every candidate week. Larger service-pause/recovery interventions remain outside Notes scope.. Registration 2026-11-14T04:10:56.313Z; behavior announced before editing in chat, untouched decision seed reserved before any new practice score. Core2213766b83900ad7aa289437d37dd055a938dbc4; baseline2213766b83900ad7aa289437d37dd055a938dbc4; candidate4d61a9ed80f67348097c8930086825b1f56f20a4; diffsha256:12cc35471cdc772b5febd3abc09771dbe5f302548ddd6515f9da9cc7d915474e. Offline: Fresh baseline73/73 and candidate75/75 full tests passed before level6; same frozen2213766 core. Development seeds notes-clock-18, notes-clock-19; reserved decision seed thanhdat-notes94-cargo-decision-6a must never be reused as fresh holdout after viewing. Supplementary frozen-code proof: thanhdat-notes94-cargo-proof-6b. Supplementary frozen-code replication: retain only if both new level5/6 pairs have positive margin delta and every candidate week>=94%, zero refusals/missed constraints. Any failure triggers withdrawal of universal cargo promotion; earlier results remain recorded. Seeds chosen before any replication score, after initial tuning; no retuning permitted. Selection: positive paired total and every candidate week>=94%, zero refused actions and critical misses; then positive fresh-decision delta. Under1% benefit, higher worst service wins; tie keeps baseline. Keep as level6-validated candidate: development+28.66 EUR, untouched decision+21.23 EUR; total+49.89 EUR (+1.95%), minimum97.30%, no refusals/critical misses. Four additional orders add68.55 EUR; common-order interactions cost18.66 EUR..

| Phase | Seed | Side | World | Margin EUR | Won | EUR/order | On time | Undelivered | Refusals | Output |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| development | notes-clock-18 | baseline | w91bc087ba6553a5cf5e3 | 744.87 | 36 | 20.69 | 97.22% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes94\round-2\development\notes-clock-18\baseline |
| development | notes-clock-18 | candidate | wafda5a91dc72ff80879b | 756.96 | 37 | 20.46 | 97.30% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes94\round-2\development\notes-clock-18\candidate |
| development | notes-clock-19 | baseline | wccc33c55c40b3edeb8e5 | 675.50 | 35 | 19.30 | 100.00% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes94\round-2\development\notes-clock-19\baseline |
| development | notes-clock-19 | candidate | w84c0fe5b53ec9d2277b0 | 692.07 | 36 | 19.22 | 100.00% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes94\round-2\development\notes-clock-19\candidate |
| holdout | thanhdat-notes94-cargo-decision-6a | baseline | w237f9e383a9ecb736336 | 1142.06 | 52 | 21.96 | 100.00% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes94\round-2\holdout\thanhdat-notes94-cargo-decision-6a\baseline |
| holdout | thanhdat-notes94-cargo-decision-6a | candidate | w5b5198a680f6ba2a235c | 1163.29 | 54 | 21.54 | 100.00% | 0 | 0 | C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes94\round-2\holdout\thanhdat-notes94-cargo-decision-6a\candidate |

Actual final ledger causes, EUR (zeros retained):

| Seed | Side | Revenue | Driver fee | Refund | Release fee | Failed visit | Waiting | Fine | Undelivered penalty |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| notes-clock-18 | baseline | 3329.00 | -2564.13 | -20.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| notes-clock-18 | candidate | 3402.00 | -2625.04 | -20.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| notes-clock-19 | baseline | 4140.00 | -3464.50 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| notes-clock-19 | candidate | 4218.00 | -3525.93 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| thanhdat-notes94-cargo-decision-6a | baseline | 5833.00 | -4595.49 | 0.00 | -95.45 | 0.00 | 0.00 | 0.00 | 0.00 |
| thanhdat-notes94-cargo-decision-6a | candidate | 5990.00 | -4731.26 | 0.00 | -95.45 | 0.00 | 0.00 | 0.00 | 0.00 |

Completed-world field/ledger audit: {"checkedAt":"2026-11-14T04:17:56.011Z","method":"Completed-world reveal only; deduplicated seq ledger reconciled to final margin. Won-order truth checked for manual/plates/tyres/deadline/release and note hours against public hours; unrevealed lost/unquoted requests have no order truth.","pairs":[{"seed":"notes-clock-18","phase":"development","baseline":{"ledger":{"revenue":332900,"driver_fee":-256413,"late_refund":-2000},"totalCents":74487,"declines":266,"noteCount":416,"safeCount":179,"checkedWonNotes":5,"misses":[]},"candidate":{"ledger":{"revenue":340200,"driver_fee":-262504,"late_refund":-2000},"totalCents":75696,"declines":245,"noteCount":416,"safeCount":200,"checkedWonNotes":6,"misses":[]},"newlySafeCount":21,"newlyQuotedCount":21,"newlyWonCount":1,"introducedCriticalMisses":[]},{"seed":"notes-clock-19","phase":"development","baseline":{"ledger":{"revenue":414000,"driver_fee":-346450},"totalCents":67550,"declines":300,"noteCount":441,"safeCount":184,"checkedWonNotes":7,"misses":[]},"candidate":{"ledger":{"revenue":421800,"driver_fee":-352593},"totalCents":69207,"declines":268,"noteCount":441,"safeCount":217,"checkedWonNotes":7,"misses":[]},"newlySafeCount":33,"newlyQuotedCount":32,"newlyWonCount":0,"introducedCriticalMisses":[]},{"seed":"thanhdat-notes94-cargo-decision-6a","phase":"holdout","baseline":{"ledger":{"revenue":583300,"driver_fee":-459549,"release_fee":-9545},"totalCents":114206,"declines":316,"noteCount":454,"safeCount":182,"checkedWonNotes":16,"misses":[]},"candidate":{"ledger":{"revenue":599000,"driver_fee":-473126,"release_fee":-9545},"totalCents":116329,"declines":295,"noteCount":454,"safeCount":205,"checkedWonNotes":18,"misses":[]},"newlySafeCount":23,"newlyQuotedCount":21,"newlyWonCount":2,"introducedCriticalMisses":[]}],"wholeCohortEffects":[{"commonLedgerDeltaCents":{"revenue":-400,"driver_fee":0,"late_refund":0},"newOrderLedgerCents":{"revenue":7700,"driver_fee":-6091},"seed":"notes-clock-18","phase":"development","deltaCents":1209,"newlyQuoted":21,"removedQuotes":0,"newWonOrderCount":1,"lostWonOrderCount":0,"newOrderMarginCents":1609,"displacedBaselineMarginEffectCents":0,"commonOrderInteractionCents":-400,"newOrderMargins":[{"orderId":"R00839","marginCents":1609}],"commonOrdersChanged":4,"baseline":{"plannedDrivingHours":89.78333333333333,"marginPerOrderEUR":20.690833333333334,"marginPerPlannedHourEUR":8.296305921663263},"candidate":{"plannedDrivingHours":91.6,"marginPerOrderEUR":20.45837837837838,"marginPerPlannedHourEUR":8.263755458515284},"driverHourLimit":"Logged winning-quote driving proxy excludes approach, waiting and operational constraints; not measured driver labor."},{"commonLedgerDeltaCents":{"revenue":-100,"driver_fee":0},"newOrderLedgerCents":{"revenue":7900,"driver_fee":-6143},"seed":"notes-clock-19","phase":"development","deltaCents":1657,"newlyQuoted":32,"removedQuotes":0,"newWonOrderCount":1,"lostWonOrderCount":0,"newOrderMarginCents":1757,"displacedBaselineMarginEffectCents":0,"commonOrderInteractionCents":-100,"newOrderMargins":[{"orderId":"R00855","marginCents":1757}],"commonOrdersChanged":1,"baseline":{"plannedDrivingHours":124.15,"marginPerOrderEUR":19.3,"marginPerPlannedHourEUR":5.440998791784132},"candidate":{"plannedDrivingHours":126.31666666666666,"marginPerOrderEUR":19.22416666666667,"marginPerPlannedHourEUR":5.478849452434359},"driverHourLimit":"Logged winning-quote driving proxy excludes approach, waiting and operational constraints; not measured driver labor."},{"commonLedgerDeltaCents":{"revenue":-200,"driver_fee":-1166,"release_fee":0},"newOrderLedgerCents":{"revenue":15900,"driver_fee":-12411},"seed":"thanhdat-notes94-cargo-decision-6a","phase":"holdout","deltaCents":2123,"newlyQuoted":21,"removedQuotes":0,"newWonOrderCount":2,"lostWonOrderCount":0,"newOrderMarginCents":3489,"displacedBaselineMarginEffectCents":0,"commonOrderInteractionCents":-1366,"newOrderMargins":[{"orderId":"R00568","marginCents":1628},{"orderId":"R00657","marginCents":1861}],"commonOrdersChanged":3,"baseline":{"plannedDrivingHours":171.01666666666668,"marginPerOrderEUR":21.962692307692308,"marginPerPlannedHourEUR":6.678062567001266},"candidate":{"plannedDrivingHours":174.18333333333334,"marginPerOrderEUR":21.542407407407406,"marginPerPlannedHourEUR":6.67853793895321},"driverHourLimit":"Logged winning-quote driving proxy excludes approach, waiting and operational constraints; not measured driver labor."}]}

Controller {"pid":25312,"round":1,"startedAt":"2026-11-14T04:22:12.727Z","state":"running","command":"work/notes94-worker.mjs 1"}. Next: Push completed pair thanhdat-notes94-cargo-proof-5b before continuing. Integration dependencies: competitive1600 fee/margin floor, minLead180, capacity0.28, strictNotes=true, existing pickup-window/quote/offer algorithms and exact core commits above. No claim transfers to a different planner/config or level8 without Dispatcher paired integration validation at>=94%. No ranking/test-final/live-final/merge/force-push.
