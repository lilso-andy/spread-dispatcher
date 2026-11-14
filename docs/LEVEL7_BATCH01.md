# Level 7 practice optimization batch 01

The user requested level 7 algorithm/configuration improvements, tested on the server in batches of at least 15 completed practice weeks, followed by one update and another batch. A run counts when a practice week ends. Historical reused baseline weeks support comparison and are identified separately from the batch's completed run count.

The starting selected behavior is source `9e47485` with the full level 7 ranking preset. Two isolated candidates are already registered in `TENK_78.md`. Recovery candidate `cbd9800` raises only the shortage service recovery threshold from 0.045 to 0.075. Performance candidate `f957b55` reuses busy-driver and local-driver lookups while preserving decision policy. They passed 94 and 93 offline tests respectively, versus 91 for baseline. Current work resumes their existing unfinished level 7 worlds after verifying prior controllers stopped.

Each hypothesis is recorded before edits or new runs. Compare identical level/seed/full-config inputs, record the actual source per arm, use final scores and complete server ledger, preserve failures and action refusals, and check an untouched seed before retaining a policy gain. Every retained candidate week must meet at least 90% on-time delivery. Near ties prefer service buffer. Performance-only changes require score/accounting equivalence and should not be described as measured margin gains.

Ranking worlds at other levels are parked for later continuation. Practice output and live ownership are in ignored `runs/level7-batch01/state.json`. Shared reports contain configuration and results, with raw logs and credentials kept local.
