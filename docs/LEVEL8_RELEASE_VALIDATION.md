# Integrated level8 release validation

Merged production TypeScript exactly matches d4031ca, selected quote1.35 beat1.4 in five prior pairs. Validate on three untouched seeds; each candidate >=93%, positive pooled margin. One same-world process interruption after accepted advance then resume with identical source/config/output; compare with continuous selected profile on same seed. No blind mutation retry. Baseline quote1.4, all other settings identical.

Frozen source 9a73d2773caaf4ba318f485894edffada0867ae5; branch work/notes-thanhdatLUT; state completed; decision **do not promote; investigate failed service or non-repeating gain**; next Audit paired gain, every candidate93% and same-seed restart equivalence.

|Seed|Side|World|Margin EUR|Won|On time|Undelivered|Observed refusals|
|---|---|---|---:|---:|---:|---:|---:|
|release8-new-a-v1|baseline|w49cf9ebabf69cb88b89c|8303.71|205|97.561%|0|0|
|release8-new-a-v1|candidate|w377dfc7fe6c2fdbeeb05|8043.27|228|96.930%|0|0|
|release8-new-b-v1|baseline|w7d11de2f00027422a159|6518.45|162|98.148%|0|0|
|release8-new-b-v1|candidate|w4a448ac24dd3430acfb9|7156.07|192|97.396%|0|0|
|release8-new-c-v1|baseline|wa3f93942335ff4a86b2b|10597.10|251|94.422%|0|0|
|release8-new-c-v1|candidate|w99a19004a1612729a1b8|8519.38|234|91.453%|0|0|
|release8-new-c-v1|restart|wa2c7b2703983b52ad7b2|9557.86|259|93.436%|0|0|

Paired deltas cents: `[{"seed":"release8-new-a-v1","delta":-26044,"worstCandidate":0.9692982456140351},{"seed":"release8-new-b-v1","delta":63762,"worstCandidate":0.9739583333333334},{"seed":"release8-new-c-v1","delta":-207772,"worstCandidate":0.9145299145299145}]`; pooled EUR-1700.54. Restart exact final score equality: false.

- w49cf9ebabf69cb88b89c: commit 9a73d2773caaf4ba318f485894edffada0867ae5 config `{"quoteMultiplier":1.4,"feeMultiplier":1.08,"emergencyMultiplier":2,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\release-validation\release8-new-a-v1\baseline`; previousControllerExit none; resumeVerifiedAt none.
- w377dfc7fe6c2fdbeeb05: commit 9a73d2773caaf4ba318f485894edffada0867ae5 config `{"quoteMultiplier":1.35,"feeMultiplier":1.08,"emergencyMultiplier":2,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\release-validation\release8-new-a-v1\candidate`; previousControllerExit none; resumeVerifiedAt none.
- w7d11de2f00027422a159: commit 9a73d2773caaf4ba318f485894edffada0867ae5 config `{"quoteMultiplier":1.4,"feeMultiplier":1.08,"emergencyMultiplier":2,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\release-validation\release8-new-b-v1\baseline`; previousControllerExit none; resumeVerifiedAt none.
- w4a448ac24dd3430acfb9: commit 9a73d2773caaf4ba318f485894edffada0867ae5 config `{"quoteMultiplier":1.35,"feeMultiplier":1.08,"emergencyMultiplier":2,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\release-validation\release8-new-b-v1\candidate`; previousControllerExit none; resumeVerifiedAt none.
- wa3f93942335ff4a86b2b: commit 9a73d2773caaf4ba318f485894edffada0867ae5 config `{"quoteMultiplier":1.4,"feeMultiplier":1.08,"emergencyMultiplier":2,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\release-validation\release8-new-c-v1\baseline`; previousControllerExit none; resumeVerifiedAt none.
- w99a19004a1612729a1b8: commit 9a73d2773caaf4ba318f485894edffada0867ae5 config `{"quoteMultiplier":1.35,"feeMultiplier":1.08,"emergencyMultiplier":2,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\release-validation\release8-new-c-v1\candidate`; previousControllerExit none; resumeVerifiedAt none.
- wa2c7b2703983b52ad7b2: commit 9a73d2773caaf4ba318f485894edffada0867ae5 config `{"quoteMultiplier":1.35,"feeMultiplier":1.08,"emergencyMultiplier":2,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`; output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\release-validation\release8-new-c-v1\restart`; previousControllerExit 17; resumeVerifiedAt 2026-11-15T03:40:09.707Z.

All finished scores re-read from server and reconciled to complete paginated server event ledger, including events between accepted advance and planned process exit. Restart run uses same world, exact config, source and output after child exits17; no mutation response is blindly resent. Observed refusal count is from runner journal/result; interrupted response may be absent, so it cannot independently prove zero refusals in that response.

- w49cf9ebabf69cb88b89c ledger cents `{"revenue":2526400,"driver_fee":-1672554,"late_refund":-23475}`
- w377dfc7fe6c2fdbeeb05 ledger cents `{"revenue":2619700,"driver_fee":-1773793,"late_refund":-41580}`
- w7d11de2f00027422a159 ledger cents `{"revenue":2129000,"driver_fee":-1459804,"late_refund":-12485,"release_fee":-4866}`
- w4a448ac24dd3430acfb9 ledger cents `{"revenue":2546300,"driver_fee":-1802877,"late_refund":-22950,"release_fee":-4866}`
- wa3f93942335ff4a86b2b ledger cents `{"revenue":3667100,"driver_fee":-2521780,"late_refund":-82610,"waiting":-3000}`
- w99a19004a1612729a1b8 ledger cents `{"revenue":3358900,"driver_fee":-2398082,"late_refund":-105880,"waiting":-3000}`
- wa2c7b2703983b52ad7b2 ledger cents `{"revenue":3660100,"driver_fee":-2594414,"late_refund":-106900,"waiting":-3000}`

93 offline tests passed. Earlier five-seed quote1.35 evidence +EUR2342.19 with worst94.5255%. No final/test-final/ranking launched here. No raw logs/reveals/key committed. EUR30000/week remains unachieved. Original root notes.ts and parser-test modifications preserved.
