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
