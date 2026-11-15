# Short-job economy and capacity trial

Peer short-public quote1.25 plus advance0.80 at cap0.28 gains3126.46EUR/4seeds but worst92.806%; cap0.24 stress-e +1075.60EUR/93.75%, study2 -1488.54EUR/94.24%, pooled-412.94 so rejected. Test intermediate cap0.26 with no other code/config changes. Estimated incremental opportunity EUR300-900/week is a hypothesis from prior combinations, not interpolation guarantee. Reuse EXACT ced25 baseline commit/config/level/seed after server ended-score verification. Two known development seeds, each candidate>=93% and pooled positive, then untouched shortcap26-proof-v1 positive; additional known stress-B must also pass before promotion. No tuning on untouched proof, record every loss.

Frozen baseline ced25ae8bbbaba4c11b3a29ccb2d75d08996bf90; candidate 4936bcf501c0f46f581712db658ae33762b17b3c; branch work/notes-thanhdatLUT; decision **reject**. Pooled delta EUR193.21. Source/seed/config and ended server scores rechecked; all ledgers reconciled. Candidate95/baseline93 tests passed.

|Seed|Side|World|Commit|Margin EUR|Won|On time|Undelivered|Refusals|Cached|
|---|---|---|---|---:|---:|---:|---:|---:|---|
|l8-30k-short-proof-e|baseline|w641794ab1b04de9894df|ced25ae8bbbaba4c11b3a29ccb2d75d08996bf90|7906.23|228|94.737%|0.0043859649122807015|0|true|
|l8-30k-short-proof-e|candidate|w6f6bdc72d81c6a076f43|4936bcf501c0f46f581712db658ae33762b17b3c|8099.44|276|92.391%|0|0|false|

Pairs cents `[{"seed":"l8-30k-short-proof-e","delta":19321,"onTime":0.9239130434782609,"extraUndelivered":false,"extraRefusals":false}]`. Every cached baseline requires exact executed ced25 source/config/level8/seed and server end score; no result reused merely by production-equivalent code. Fetched integration cb1cdc7 changes reports/config files only, no production TypeScript or selected ranking config difference from d4031ca. Exact executed commits above, not cb1cdc7.

- w641794ab1b04de9894df: config `{"quoteMultiplier":1.4,"feeMultiplier":1.08,"emergencyMultiplier":2,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; ledger cents `{"revenue":2796800,"driver_fee":-1930715,"late_refund":-42310,"release_fee":-8152,"waiting":-3000,"undelivered_penalty":-22000}`; net EUR/order 34.68; driver fee EUR/order 84.68; output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\shortcap24-validation\l8-30k-short-proof-e\baseline`.
- w6f6bdc72d81c6a076f43: config `{"quoteMultiplier":1.4,"feeMultiplier":1.08,"emergencyMultiplier":2,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.26,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; ledger cents `{"revenue":3452000,"driver_fee":-2485961,"release_fee":-5320,"late_refund":-150775}`; net EUR/order 29.35; driver fee EUR/order 90.07; output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\shortcap26-validation\l8-30k-short-proof-e\candidate`.

These are merged-policy comparisons, not isolated causal attribution to fee/quote/capacity. Any primary keep remains provisional until the additional preregistered stressB passes93% and positive combined pooled margin. Reserved proof shortcap26-proof-v1 is untouched unless world rows explicitly show it. No ranking/final, no raw logs/reveal/key committed. EUR30000/week unmet.
