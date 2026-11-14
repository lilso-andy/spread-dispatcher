# Sync round 2
Hypothesis recorded before edits: R00370 porvoo->rovaniemi could depart before pickup closes and wait for next-day destination opening. routeFor currently delays pickup to delivery-open minus drive duration and rejects it if that start is after pickup closing, even though waiting at delivery is allowed. Change earliest pickup to pickup interval start, retaining delivery end, private constraints and backward latest-start pass. Same integrated baseline cd40c22, same explicit configs, seeds sync-78-a/b at level8. Reject extra undelivered/refusals or any <90% week; require gain and fresh holdout. Level7 source is not selected by this round.

| Level | Seed | Arm | Source | World | Margin cents | Won | On time | Undelivered | Refusals |
|---:|---|---|---|---|---:|---:|---:|---:|---:|
| 8 | sync-78-a | baseline | cd40c22 | w76806d57c1c574d069f4 | 587266 | 190 | 98.4211% | 1 | 0 |
| 8 | sync-78-a | integrated | 9205a34 | wefe0c8c717650b819675 | 668407 | 192 | 98.9583% | 0 | 0 |
| 8 | sync-78-b | baseline | cd40c22 | w315196d66cc5751d2b58 | 451265 | 121 | 99.1736% | 0 | 0 |
| 8 | sync-78-b | integrated | 9205a34 | w8ff477daa1ba417eeba2 | 452822 | 125 | 98.4000% | 0 | 0 |
| 8 | route-proof-d | baseline | cd40c22 | w1db8a3202c8e8adf8171 | 604848 | 217 | 91.7051% | 0 | 0 |
| 8 | route-proof-d | integrated | 9205a34 | w2c6bc90c2fbfb0d8d744 | 652513 | 220 | 90.9091% | 0 | 0 |

Full configurations and reconciled ledger: route-78-results.json. Server ended status and final scores independently checked. No failed 90% weeks omitted.

Decision: accept planner fix at level 8. Development gain 82,698 cents and fresh holdout gain 47,665 cents. Worst service on the new seed is 90.91%, vs 91.71% baseline; this is a material limitation. All three candidate weeks delivered every order, no refusals. New planner source 9205a34 has not been validated at level 7: its selected source remains cd40c22, with docs/dispatch-presets/level-7.json. Level 8 uses 9205a34 with docs/dispatch-presets/level-8.json. Do not claim identical behavior across levels or unseen-week guarantees.
