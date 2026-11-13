# Delivery alternatives: completed profit comparison

## Selected behavior

The dispatcher previously quoted only the slowest feasible delivery option. It now prices each independently feasible alternative in a single quote. The dealer can choose only one option, so the request reserves capacity once. Faster alternatives need twice the usual booking lead before their latest feasible start (360 minutes with balanced configuration); the slowest feasible option retains the original 180-minute check. Each option still passes route, hours, notes, driver eligibility, capacity and margin checks. A refused quote releases the reservation.

This branch also includes the trade-in same-visit correction documented in TRADE_IN_RESULTS.md. The comparison below measures their combined effect against main. It does not isolate pricing alternatives from that correction. Pricing coefficients, driver fees, conservative note parsing, official starter and runner behavior are unchanged. It does not include the production reprice-deduplication change from PR #2; only that PR's comparison utilities and their tests are reused.

## Sources and method

- Baseline: main `5f33186967c13fc4d86564c2877490ef3a8e26ce`.
- Selected candidate: `8430f689ea41ff4a6777439d97fccdd00b7d41d6` (production code frozen before the first version's holdout results were inspected).
- Node 24, level 8, identical complete configuration for both versions: `{"quoteMultiplier":1.4,"feeMultiplier":1.2,"emergencyMultiplier":2.4,"marginReserve":0.15,"minMarginCents":2000,"capacityFraction":0.2,"maxApproachMinutes":100,"minLeadMinutes":180,"strictNotes":true,"offers":true}`.
- Three development seeds, then two new seeds. The new-seed baseline was run from an isolated copy of main; eight relevant source/config files were checked byte-for-byte after newline normalization against the Git commit.
- All scores below are end-of-world server scores. The five candidate and five baseline worlds finished. No ranking run or final was used.

## Paired results

| Seed | Main margin | Candidate margin | Gain | Main on time | Candidate on time |
| --- | ---: | ---: | ---: | ---: | ---: |
| spread-1 | €3,188.67 | €5,064.23 | €1,875.56 | 96.60% | 98.98% |
| study-2 | €2,558.43 | €2,578.76 | €20.33 | 93.63% | 92.86% |
| holdout-3 | €2,900.03 | €3,366.29 | €466.26 | 98.82% | 97.30% |
| quote-unseen-01 | €5,373.96 | €6,424.51 | €1,050.55 | 98.04% | 98.40% |
| quote-unseen-02 | €3,129.48 | €4,873.45 | €1,743.97 | 99.06% | 100.00% |
| **Total** | **€17,150.57** | **€22,307.24** | **€5,156.67 (+30.07%)** | | |

Development total: €8,647.13 → €11,009.28 (+27.32%). New-seed total: €8,503.44 → €11,297.96 (+32.86%). Margin increased on each of the five seeds. Candidate won 815 orders versus 648; its weighted on-time share was 97.55% versus 96.91%. The worst week decreased from 93.63% to 92.86%, despite the higher weighted share. Study-2 therefore remains the primary service risk.

Both versions qualified in 5/5 weeks. **Failed final 90% thresholds: none.** Candidate had zero undelivered orders and zero refused actions; main had one undelivered order. Offline action-token replay found no delayed quotes for the candidate, but ignores network latency, reads and behavior changes from delayed actions; live final timing is not validated by this check.

The unrestricted alternative variant `ae11f0c` also qualified in 5/5 weeks, earning €21,798.05. Its study-2 result was only 90.28% and €1,857.62. The selected extra-lead variant earns €509.19 more overall and improves that minimum to 92.86%. Complete first-variant results, including its two development-seed margin losses, are retained in quote-v1-development.json and quote-v1-holdouts.json. No failed completed week is omitted. Study-2 temporarily fell below 90% midweek in the first variant; its completed week recovered to 90.28%.

These are practice results on five seeds, not a guarantee of 90% on an unseen final or proof of a global maximum. Do not combine the teammate's lower-fee configuration or the other dispatcher PR without a new paired comparison.

## Reproduce

On the candidate branch:

```sh
node --test test/*.test.ts
node --env-file=.env evaluate.ts --config configs/balanced.json --seeds spread-1,study-2,holdout-3 --output runs/reproduce-development --reveal
node --env-file=.env evaluate.ts --config configs/balanced.json --seeds quote-unseen-01,quote-unseen-02 --output runs/reproduce-holdouts --reveal
```

Run the same commands from an isolated checkout of the baseline commit, using separate output folders and a local ignored credential file. Compare matching folders with `node tools/compare-dispatch.ts --baseline BASELINE_DIR --candidate CANDIDATE_DIR --out REPORT.json`. The utility rejects mismatched seeds, levels and configurations. Machine-readable scores, world IDs and action counts are in quote-development.json and quote-holdouts.json. Operator raw logs remain ignored in runs/quote-development-baseline, runs/multi-option-v2, runs/quote-unseen-baseline and runs/quote-slack-holdouts. Final offline suite: 26 passed; CLI help and diff whitespace checks passed.
