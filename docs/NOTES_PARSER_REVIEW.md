# Finnish Thursday parser correction — review only

Finnish `to klo 10` means Thursday at10:00. For a request arriving at minute2402, the parser must preserve pickupFrom4920, rather than treating `to` as an earlier weekday. Normalize the abbreviation only when the note language isFinnish and an explicit `klo` clock follows. English `to` remains a preposition.

Two regression tests cover the readiness day and English preposition. The complete integrated branch suite passes95 tests.

This semantic correction was confirmed from completed ordinary-practice constraints. Previous economic experiments did not establish a repeatable margin gain. This upload is for code review, NOT a new financially validated or final-selected release. No new server practice/ranking/final was run for this push. Existing algorithm/config candidates that failed93% remain rejected.

The user confirmed the controller was stopped. Team STATUS at91fb4ff records controller21952 and watchdog21848 stopped and no automatic final restart. This chat did not stop, restart or replace a controller. Final startup still requires a separate explicit command.

Only notes.ts, its regression tests and handoff metadata are changed. Runtime/config comparisons in earlier benchmark reports refer to their exact historical commits, not this new parser patch. Keep credentials, raw logs and reveals local.
