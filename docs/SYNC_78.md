# Integrated team checkpoint validation
Baseline source 3cb7ba4 and candidate cd40c224 (pricing 645e0eb, notes 471f06d), configs docs/dispatch-presets/level-7.json and level-8.json, two seeds sync-78-a/b. Same full config within each code comparison. Hypothesis: published note fixes preserve or improve margin while removing interpretation errors. Accept only higher total margin per level with every week >=90%, no extra undelivered/refusals; apply 1% service tie-break. Require a new paired seed before selecting any gain. No prior results are reused. Max two own controllers. Main 9dccfdb lacks these dispatcher changes. Local logs are ignored.

Level 7: accept integration for this level after fresh sync-78-proof-c gained 36,696 cents (both eligible, all delivered). Development gain 63,144 cents. Worst candidate service 98.36%. Level 8: reject integration despite development gain 29,048 cents; sync-78-a has one extra undelivered order R00370 and a 64,000-cent penalty, vs none for baseline. Its Finnish destination-hours note is parsed differently, and the gig expires with no successful repost. Keep the old 3cb7ba4 source with the level8 preset until planner recovery is validated. Full IDs/configs/ledger in sync-78-results.json. No sub-90% week in this batch.

| Level | Seed | Arm | Source | World | Margin cents | Won | On time | Undelivered | Refusals |
|---:|---|---|---|---|---:|---:|---:|---:|---:|
| 7 | sync-78-a | baseline | 3cb7ba4 | w47815a1088a3974a1d52 | 350020 | 121 | 100.0000% | 0 | 0 |
| 7 | sync-78-a | integrated | cd40c22 | w3aeceab3a3456932ce60 | 403847 | 123 | 100.0000% | 0 | 0 |
| 7 | sync-78-b | baseline | 3cb7ba4 | w8abfd40754eecbc377b3 | 202453 | 55 | 100.0000% | 0 | 0 |
| 7 | sync-78-b | integrated | cd40c22 | wd746befbc00edf87ff08 | 211770 | 61 | 98.3607% | 0 | 0 |
| 8 | sync-78-a | baseline | 3cb7ba4 | w81d850cf97d7a999e3ac | 604139 | 190 | 97.3684% | 0 | 0 |
| 8 | sync-78-a | integrated | cd40c22 | w8ef7e970aa72c76af041 | 587266 | 190 | 98.4211% | 1 | 0 |
| 8 | sync-78-b | baseline | 3cb7ba4 | w1b193e6b5311f5a46d2c | 405344 | 114 | 99.1228% | 0 | 0 |
| 8 | sync-78-b | integrated | cd40c22 | w8d6b480c0a9d09617986 | 451265 | 121 | 99.1736% | 0 | 0 |
| 7 | sync-78-proof-c | baseline | 3cb7ba4 | w2967f585fb1975c7ac97 | 785365 | 230 | 98.6957% | 0 | 0 |
| 7 | sync-78-proof-c | integrated | cd40c22 | wbdec1bbfc21d21edbf61 | 822061 | 243 | 98.7654% | 0 | 0 |

Full configurations and reconciled ledger: sync-78-results.json. Server ended status and final scores independently checked. No failed 90% weeks omitted.
