# Level 8 pricing handoff — 2026-11-15

Branch: work/pricing-baotran1604. PR https://github.com/lilso-andy/spread-dispatcher/pull/1. Selected code: f99057a. Team baseline actually executed: d4031ca, NOT main. Current target EUR30,000 per completed week remains UNMET. At least91% on-time required. Latest user authorizes ranking when available, but NOT final. Server season11 Sunday03:00 is already5/5; this batch created no ranking or final worlds.

## Selected implementation

Use f99057a with configs/level8-short-public-validated.json. The full config remains quote1.4, fee1.08, emergency2.0, reserve0.15, minimum2000c, capacity0.28, approach100min, lead180min, strictNotes=true, trainingEconomy=false, offers=true.

Two rules: (1) initial gig fee for nonurgent advance public single-car jobs ready at least720min later uses factor0.80 instead of0.92; rescue schedule unchanged. (2) for level8 nonpremium single-car public routes of at most120 mapped road minutes, cap the base quote factor at1.25 BEFORE dealer/day adjustment and trust; contribution floor and all feasibility checks remain. Other routes/levels retain their policy.

The combined candidate vs original d4031ca on four matched weeks earned EUR29,078.39 vs EUR25,951.93 (+EUR3,126.46; +12.05%). Each seed improved. Candidate weekly margins: dev-c EUR5,107.39/97.484%; dev-d EUR7,364.30/97.927%; unused proof-e EUR8,840.47/92.806%; known study2 stress EUR7,766.23/95.781%. Candidate had0 undelivered orders and0 refusals in all four; original proof-e had1 undelivered. 95 offline tests passed. These are four-week totals, NOT EUR29k per week. Minimum candidate92.806% leaves limited buffer; no unseen-week guarantee.

## Losses and interactions

- Permissive notes improved three old-source pairs, but teammate integrated proof failed at88.30% and -EUR2,123.75. Keep strictNotes=true.
- Capacity0.45 on old source gained onlyEUR219.24 pooled and lost a seed; unselected. Teammate wider approach/capacity also lost its fresh proof.
- Global quote1.25 increased development margin but lostEUR276.62 on unused proof-d despite57 extra wins. Rejected.
- Standalone advance fee0.80 passed three earlier pairs but later lostEUR2,017.21 on study2 against original0.92. The selected policy is the COMBINATION with short-route quoting, not a claim that lower fees always help.
- The +35.18% short-quote result is relative to the intermediate0.80 baseline. The combined policy's comparison to original team code is +12.05%; do not add these percentages.

## Checkpoint and continuation

26 unique newly completed practice worlds in this continuation:8 on frozen0b5a2e9,18 on d4031ca and explicitly identified candidate diffs. All server-confirmed ended; no owned active controller/world to resume. Full source/config/world/output/score/ledger/refusals in analysis/level8-20k-results.json and analysis/level8-30k-results.json; server verification is analysis/level8-server-verification.json. Raw journals, reveals and keys stay on the original Mac.

Frozen source directories under /Users/davetran/Documents/Codex/2026-11-14/cl/work/: level8-src, level8-v2-src, level8-v2-080, level8-v2-short125. Local scripts and outputs: level8-20k/ and level8-30k/. Every world checkpoint records source/hash, full config, world ID, PID and output. If future work is interrupted, verify the old controller stopped before any resume, and reuse the same source/config/world/journal. Do not create replacements or control teammate worlds. Max two owned active worlds; check slots.

Before another round: fetch and inspect team runtime diffs. Latest verified integration d4031ca is unchanged in runtime; newer Notes commits include separate chain/quote evidence that is not automatically validated with this policy. Rebaseline after any runtime change. Seeds already seen here cannot be new holdouts. Next grounded work: validate this composed policy on several genuinely new weeks, then measure any interaction with teammate chain policy separately. Retain all failing weeks, and target total margin subject to91% every week. Push after each finished pair. No PR merge/force push/final.
