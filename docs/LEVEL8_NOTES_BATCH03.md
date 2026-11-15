# Level8 Notes batch03: paired practice and independent confirmation

Personal branch `work/notes-thanhdatLUT`; baseline `d4031ca9c69706126b08ebd610012dce378e98a9`; chain experimental source `6bf843d7f8dfb4aca7f7eb4b5040a2e60e29a2db`. Latest team integration fetched before creation; team production changes checked after each matched group. Existing uncommitted Finnish parser fix preserved, excluded from all runtimes. Ranking season11 already exhausted by team; no ranking/final created.

Preregistered hypotheses and opportunity assumptions: [{"name":"chain85","change":"pair already-won public single-car routes <=30min reposition, same day, <=720min drive, >=120min slack, 15% combined opening/rescue fee discount","opportunityEUR":[179,822],"assumption":"20% opening fee proxy; overlapping pairs overcount potential; measure actual ledger and service"},{"name":"emergency18","change":"emergencyMultiplier2.0 ->1.8","opportunityEUR":150,"assumption":"Prior source showed EUR142-243 weekly rescue savings; current source advance discount may interact"},{"name":"quote135","change":"quoteMultiplier1.4 ->1.35","opportunityEUR":500,"assumption":"Extra profitable volume; reject if delivery quality or total margin declines"}]

Four seeds, baseline reused only for exact same code/config/level/seed. Sixteen development weeks; one independent reserved seed `notes3-chain-proof-unused-v1`. Require positive pooled gain, every candidate week >=93%, then positive independent confirmation.

|Profile|Development delta EUR|Lowest on time|
|---|---:|---:|
|chain85|1402.60|94.215%|
|emergency18|646.21|94.332%|
|quote135|1917.43|94.526%|

Selected for independent proof: quote135. Proof state completed; decision **keep**; delta 424.76 EUR. Target EUR30000 in one week remains unmet. No claim of top10 readiness.

|Seed|Profile|World|Commit|Margin EUR|Won|On time|Undelivered|Refusals|
|---|---|---|---|---:|---:|---:|---:|---:|
|study-2|baseline|w847001b82082d4ef9fef|d4031ca9c69706126b08ebd610012dce378e98a9|7460.32|241|93.361%|0|0|
|study-2|chain85|w8be6dcab0d8b6ef700b9|6bf843d7f8dfb4aca7f7eb4b5040a2e60e29a2db|7500.02|242|94.215%|0|0|
|study-2|emergency18|wdb462f225173028cf321|d4031ca9c69706126b08ebd610012dce378e98a9|7867.11|247|94.332%|0|0|
|study-2|quote135|w2aee702c390a26cdc77c|d4031ca9c69706126b08ebd610012dce378e98a9|7508.59|274|94.526%|0|0|
|spread-1|baseline|w93f4701bb9f1dffa938b|d4031ca9c69706126b08ebd610012dce378e98a9|8969.17|265|98.113%|0|0|
|spread-1|chain85|w86d1c96112c0461b237f|6bf843d7f8dfb4aca7f7eb4b5040a2e60e29a2db|9081.47|265|98.113%|0|0|
|spread-1|emergency18|w6190fef4dbbe5d9860f2|d4031ca9c69706126b08ebd610012dce378e98a9|9002.15|265|98.113%|0|0|
|spread-1|quote135|wea7f4de08419af39dd83|d4031ca9c69706126b08ebd610012dce378e98a9|8833.09|282|97.163%|0|0|
|notes3-chain-dev-a-v1|baseline|wde69f9dcf1f14a8a8c64|d4031ca9c69706126b08ebd610012dce378e98a9|3233.49|86|98.837%|0|0|
|notes3-chain-dev-a-v1|chain85|w0728ae16f94344df8e87|6bf843d7f8dfb4aca7f7eb4b5040a2e60e29a2db|3233.49|86|98.837%|0|0|
|notes3-chain-dev-a-v1|emergency18|wdcab314d90850174533d|d4031ca9c69706126b08ebd610012dce378e98a9|3239.65|86|98.837%|0|0|
|notes3-chain-dev-a-v1|quote135|w216eabd05dc169b2e3db|d4031ca9c69706126b08ebd610012dce378e98a9|4006.58|108|98.148%|0|0|
|notes3-chain-dev-b-v1|baseline|we53cc68ff578859c450b|d4031ca9c69706126b08ebd610012dce378e98a9|6778.72|198|95.455%|0|0|
|notes3-chain-dev-b-v1|chain85|w1b2b633a4c83dda0f744|6bf843d7f8dfb4aca7f7eb4b5040a2e60e29a2db|8029.32|198|97.475%|0|0|
|notes3-chain-dev-b-v1|emergency18|wc38ec8f48e68ec9b60e4|d4031ca9c69706126b08ebd610012dce378e98a9|6979.00|198|95.455%|0|0|
|notes3-chain-dev-b-v1|quote135|w5f4ce3d9784c98b5eed6|d4031ca9c69706126b08ebd610012dce378e98a9|8010.87|224|96.875%|0|0|
|notes3-chain-proof-unused-v1|proof-baseline|w2c4cf1f167eba8147411|d4031ca9c69706126b08ebd610012dce378e98a9|8107.56|218|94.954%|0|0|
|notes3-chain-proof-unused-v1|proof-candidate|wa20a14337da3224b0759|d4031ca9c69706126b08ebd610012dce378e98a9|8532.32|235|95.745%|0|0|

## Complete configurations and local recovery checkpoints

- w847001b82082d4ef9fef: config `{"quoteMultiplier":1.4,"feeMultiplier":1.08,"emergencyMultiplier":2,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; local output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes-batch03\study-2\baseline`.
- w8be6dcab0d8b6ef700b9: config `{"quoteMultiplier":1.4,"feeMultiplier":1.08,"emergencyMultiplier":2,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; local output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes-batch03\study-2\chain85`.
- wdb462f225173028cf321: config `{"quoteMultiplier":1.4,"feeMultiplier":1.08,"emergencyMultiplier":1.8,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; local output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes-batch03\study-2\emergency18`.
- w2aee702c390a26cdc77c: config `{"quoteMultiplier":1.35,"feeMultiplier":1.08,"emergencyMultiplier":2,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; local output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes-batch03\study-2\quote135`.
- w93f4701bb9f1dffa938b: config `{"quoteMultiplier":1.4,"feeMultiplier":1.08,"emergencyMultiplier":2,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; local output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes-batch03\spread-1\baseline`.
- w86d1c96112c0461b237f: config `{"quoteMultiplier":1.4,"feeMultiplier":1.08,"emergencyMultiplier":2,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; local output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes-batch03\spread-1\chain85`.
- w6190fef4dbbe5d9860f2: config `{"quoteMultiplier":1.4,"feeMultiplier":1.08,"emergencyMultiplier":1.8,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; local output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes-batch03\spread-1\emergency18`.
- wea7f4de08419af39dd83: config `{"quoteMultiplier":1.35,"feeMultiplier":1.08,"emergencyMultiplier":2,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; local output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes-batch03\spread-1\quote135`.
- wde69f9dcf1f14a8a8c64: config `{"quoteMultiplier":1.4,"feeMultiplier":1.08,"emergencyMultiplier":2,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; local output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes-batch03\notes3-chain-dev-a-v1\baseline`.
- w0728ae16f94344df8e87: config `{"quoteMultiplier":1.4,"feeMultiplier":1.08,"emergencyMultiplier":2,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; local output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes-batch03\notes3-chain-dev-a-v1\chain85`.
- wdcab314d90850174533d: config `{"quoteMultiplier":1.4,"feeMultiplier":1.08,"emergencyMultiplier":1.8,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; local output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes-batch03\notes3-chain-dev-a-v1\emergency18`.
- w216eabd05dc169b2e3db: config `{"quoteMultiplier":1.35,"feeMultiplier":1.08,"emergencyMultiplier":2,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; local output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes-batch03\notes3-chain-dev-a-v1\quote135`.
- we53cc68ff578859c450b: config `{"quoteMultiplier":1.4,"feeMultiplier":1.08,"emergencyMultiplier":2,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; local output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes-batch03\notes3-chain-dev-b-v1\baseline`.
- w1b2b633a4c83dda0f744: config `{"quoteMultiplier":1.4,"feeMultiplier":1.08,"emergencyMultiplier":2,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; local output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes-batch03\notes3-chain-dev-b-v1\chain85`.
- wc38ec8f48e68ec9b60e4: config `{"quoteMultiplier":1.4,"feeMultiplier":1.08,"emergencyMultiplier":1.8,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; local output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes-batch03\notes3-chain-dev-b-v1\emergency18`.
- w5f4ce3d9784c98b5eed6: config `{"quoteMultiplier":1.35,"feeMultiplier":1.08,"emergencyMultiplier":2,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; local output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes-batch03\notes3-chain-dev-b-v1\quote135`.
- w2c4cf1f167eba8147411: config `{"quoteMultiplier":1.4,"feeMultiplier":1.08,"emergencyMultiplier":2,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; local output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes-batch03\proof\baseline`.
- wa20a14337da3224b0759: config `{"quoteMultiplier":1.35,"feeMultiplier":1.08,"emergencyMultiplier":2,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; local output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes-batch03\proof\candidate`.

## Reconciled ledger in cents

Every completed score independently re-read from server and reconciled to deduplicated ledger sum.

- w847001b82082d4ef9fef: `{"revenue":2925900,"driver_fee":-2048405,"release_fee":-15093,"late_refund":-113870,"failed_visit":-2500}`
- w8be6dcab0d8b6ef700b9: `{"revenue":2909500,"driver_fee":-2020030,"release_fee":-15093,"late_refund":-118875,"failed_visit":-2500,"waiting":-3000}`
- wdb462f225173028cf321: `{"revenue":2982300,"driver_fee":-2062266,"release_fee":-12498,"late_refund":-115825,"failed_visit":-5000}`
- w2aee702c390a26cdc77c: `{"revenue":3200300,"driver_fee":-2303953,"release_fee":-22218,"late_refund":-115270,"failed_visit":-5000,"waiting":-3000}`
- w93f4701bb9f1dffa938b: `{"revenue":2528700,"driver_fee":-1612491,"late_refund":-16850,"release_fee":-2442}`
- w86d1c96112c0461b237f: `{"revenue":2522000,"driver_fee":-1594496,"late_refund":-9870,"release_fee":-9487}`
- w6190fef4dbbe5d9860f2: `{"revenue":2528700,"driver_fee":-1609193,"late_refund":-16850,"release_fee":-2442}`
- wea7f4de08419af39dd83: `{"revenue":2728300,"driver_fee":-1817235,"late_refund":-24215,"release_fee":-3541}`
- wde69f9dcf1f14a8a8c64: `{"revenue":1068300,"driver_fee":-743001,"late_refund":-1950}`
- w0728ae16f94344df8e87: `{"revenue":1068300,"driver_fee":-743001,"late_refund":-1950}`
- wdcab314d90850174533d: `{"revenue":1068300,"driver_fee":-742385,"late_refund":-1950}`
- w216eabd05dc169b2e3db: `{"revenue":1309000,"driver_fee":-904567,"late_refund":-3775}`
- we53cc68ff578859c450b: `{"release_fee":-2536,"revenue":2822200,"driver_fee":-2022667,"late_refund":-119125}`
- w1b2b633a4c83dda0f744: `{"release_fee":-2536,"revenue":2822900,"driver_fee":-1954182,"late_refund":-63250}`
- wc38ec8f48e68ec9b60e4: `{"release_fee":-2536,"revenue":2822200,"driver_fee":-2002639,"late_refund":-119125}`
- w5f4ce3d9784c98b5eed6: `{"release_fee":-2536,"revenue":3077800,"driver_fee":-2205427,"late_refund":-65750,"waiting":-3000}`
- w2c4cf1f167eba8147411: `{"revenue":2842100,"driver_fee":-1940294,"release_fee":-4174,"late_refund":-80200,"failed_visit":-6676}`
- wa20a14337da3224b0759: `{"revenue":3037600,"driver_fee":-2113418,"late_refund":-70950}`

## Mechanism and limitations

Chains produced 3,2,0,1 multi-order posts in the four development seeds. Development weekly changes +39.70,+112.30,0,+1250.60 EUR. Last seed driver fees fell684.85 EUR and refunds558.75 EUR; these are whole-policy effects, not a fixed same-order causal attribution. No unseen-final generalization is established. Lower quote1.35 changes order volume as well as margin per order; spread-1 lost136.08 EUR. Emergency1.8 and chain policy are separate alternatives, not a validated combination.

Resume only an unfinished owned world after verifying previous controller stopped, using exact source/config/output. Source and output checkpoints remain local at work/notes-batch03/checkpoint.json and proof.json. No raw logs/reveal/key committed. Do not merge or start final without operator authorization.
