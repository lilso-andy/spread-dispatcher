# Level8 quote1.35 + public route chain validation

Combine validated quote1.35 with slack-protected chain85. Previous chain-only development +EUR1402.60 at quote1.4; assume EUR150-1000 incremental weekly potential, not proven additive. Reject if pooled margin <=0 or any candidate week<93%; then require positive untouched proof. No retuning on proof.

State completed; decision **reject**. Total incremental paired margin EUR1031.99. Each candidate week must >=93%; proof uses new seed notes3-combined-proof-v1.

|Seed|Side|World|Commit|Margin EUR|Won|On time|Undelivered|Refusals|
|---|---|---|---|---:|---:|---:|---:|---:|
|study-2|baseline|w2aee702c390a26cdc77c|d4031ca9c69706126b08ebd610012dce378e98a9|7508.59|274|94.526%|0|0|
|study-2|candidate|w285a1254a754aefa363d|6bf843d7f8dfb4aca7f7eb4b5040a2e60e29a2db|7946.97|273|94.139%|0|0|
|notes3-chain-dev-b-v1|baseline|w5f4ce3d9784c98b5eed6|d4031ca9c69706126b08ebd610012dce378e98a9|8010.87|224|96.875%|0|0|
|notes3-chain-dev-b-v1|candidate|w44e5cad6e3dea0202ed5|6bf843d7f8dfb4aca7f7eb4b5040a2e60e29a2db|8604.48|225|98.222%|0|0|
|notes3-combined-proof-v1|baseline|w85831a2b98f5a0567d8f|d4031ca9c69706126b08ebd610012dce378e98a9|9146.02|244|97.951%|0|0|
|notes3-combined-proof-v1|candidate|wa4c804913f6ef655caec|6bf843d7f8dfb4aca7f7eb4b5040a2e60e29a2db|9146.02|244|97.951%|0|0|

All completed scores independently re-read from server, ended status confirmed, deduplicated ledgers reconciled. Exact baseline reuse: quote135 development worlds from notes-batch03; same d4031ca code, config, level8, seed and server score verified before candidate creation. Config for every world: `{"quoteMultiplier":1.35,"feeMultiplier":1.08,"emergencyMultiplier":2,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.28,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"trainingEconomy":false,"offers":true}`. Candidate source6bf843d = d4031ca + public chain patch; 96 offline tests passed versus baseline93.

- w2aee702c390a26cdc77c ledger cents: `{"revenue":3200300,"driver_fee":-2303953,"release_fee":-22218,"late_refund":-115270,"failed_visit":-5000,"waiting":-3000}`; output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes-batch03\study-2\quote135`
- w285a1254a754aefa363d ledger cents: `{"revenue":3256200,"driver_fee":-2334735,"release_fee":-22218,"late_refund":-96550,"failed_visit":-5000,"waiting":-3000}`; output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes3-combined\study-2\candidate`
- w5f4ce3d9784c98b5eed6 ledger cents: `{"release_fee":-2536,"revenue":3077800,"driver_fee":-2205427,"late_refund":-65750,"waiting":-3000}`; output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes-batch03\notes3-chain-dev-b-v1\quote135`
- w44e5cad6e3dea0202ed5 ledger cents: `{"release_fee":-2536,"revenue":3094700,"driver_fee":-2170341,"late_refund":-58375,"waiting":-3000}`; output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes3-combined\notes3-chain-dev-b-v1\candidate`
- w85831a2b98f5a0567d8f ledger cents: `{"revenue":3031100,"driver_fee":-2081530,"waiting":-6000,"late_refund":-22925,"release_fee":-6043}`; output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes3-combined\notes3-combined-proof-v1\baseline`
- wa4c804913f6ef655caec ledger cents: `{"revenue":3031100,"driver_fee":-2081530,"waiting":-6000,"late_refund":-22925,"release_fee":-6043}`; output `C:\Users\thanh\Documents\Codex\2026-11-14\t\work\notes3-combined\notes3-combined-proof-v1\candidate`

Patch applies ONLY onto integrated d4031ca; quote1.35 config is separately required. Do not combine with emergency1.8 or other fee/capacity trials without new paired tests. Remain practice only; no final command was executed. EUR30000/week target remains unmet. One new proof seed is limited evidence; broad chain-only four-seed results are in LEVEL8_NOTES_BATCH03.md but are not identical to this combined runtime/config.
