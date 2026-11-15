# Level8 current handoff — supersedes previous quote135 recommendation

Recommended fallback: integrated team production d4031ca / merged personal production495ab6b (TypeScript equivalent), configs/notes-level8-service-fallback.json. Quote1.4, fee1.08, emergency2.0, reserve0.15, minimum2000c, capacity0.28, approach100min, lead180min, strictNotestrue, trainingEconomyfalse, offerstrue. Use explicit config. Historical notes-level8-quote135-validated.json is NOT currently recommended.

This continuation completed8 NEW practice worlds: three baseline/candidate pairs + one controlled restart + one rejected short-public candidate. All owned worlds ended; no active controller remains.

Fresh price1.35 deltas: -260.44,+637.62,-2077.72 EUR, total -1700.54 EUR. Candidate third week91.453% fails93%. Keep price1.4 fallback: fresh weekly margins8303.71,6518.45,10597.10 EUR; worst94.4223%. Historical5-seed price1.35 gains +2342.19 do NOT override new safety failure.

Controlled restart: child exited17 after accepted advance; same world wa2c7b2703983b52ad7b2 resumed only after verified child exit, with identical code/config/output. Finished EUR9557.86,93.4363%, all delivered. Continuous selected world EUR8519.38,91.453%; exact score equivalence FALSE. Operational recovery demonstrated in one practice week; restart-invariant policy state is not established. Do not repeatedly restart to seek gains.

Short-public price1.25 only (advance fee stays0.92) fails92.2509% on releaseC, EUR9392.50 versus baseline10597.10; rejected immediately. No candidate source changes promoted.

Code integration was pushed495ab6b after observed positive evidence then later experiments rejected lower-price policies. Final checkpoint supersedes that recommendation, preserving code and all historical results. No PR merge, no teammate branch change, no force push, no ranking/test-final/final. Pending root notes.ts and test/notes.test.ts changes remain untouched. No raw logs/reveals/key committed. EUR30000/week target remains UNMET.

93 selected-runtime offline tests passed;95 isolated short-public tests passed. Full configs/sources/worlds/ledgers/output in docs/LEVEL8_RELEASE_VALIDATION.md and docs/LEVEL8_SHORT125_ONLY.md. Local checkpoints work/release-validation/checkpoint.json and work/short125-validation/checkpoint.json.

Next operator: fetch personal branch and team integration, compare production source before creating worlds; if changed, full tests and new baseline. Exactly one controller for final; user must separately authorize final start and identify primary machine. No final started in this work.
