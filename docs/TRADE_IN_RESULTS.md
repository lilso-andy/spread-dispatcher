# Trade-in handover correction

## Behavior

Rules section Gigs allows an old car to be picked up in the same private-address visit as delivery of the new car. Its standalone pickup slot must not expire a bundled gig or postpone it to tomorrow. The planner now keeps these stops adjacent, uses zero same-address repositioning time, and omits the attached pickup's explicit window. Standalone private pickups keep their hard slots. The mapped road total is still used conservatively for the 720-minute multi-car cap.

Source: baseline `5f33186967c13fc4d86564c2877490ef3a8e26ce`; candidate `19ba3764e0e660a967c9050ed199143a985a8e1b`. Both use Node 24, level 8 and exactly `configs/balanced.json` plus defaults. The official starter and pricing configuration are unchanged. Six regression cases passed with the original 13 tests (19 total).

## Completed server practice weeks

All rows are end-of-world scores, not midweek estimates. Each pair uses an identical seed and configuration. The first five seeds were already used during development. The last two were new after the candidate was fixed.

| Seed | Main margin | Corrected margin | Main on time | Corrected on time |
| --- | ---: | ---: | ---: | ---: |
| spread-1 | €3,188.67 | €3,661.57 | 96.60% | 97.28% |
| study-2 | €2,558.43 | €2,620.95 | 93.63% | 95.30% |
| holdout-3 | €2,900.03 | €2,871.83 | 98.82% | 98.82% |
| dispatch-holdout-a | €3,636.06 | €3,671.27 | 99.12% | 100.00% |
| dispatch-holdout-b | €5,663.93 | €5,663.93 | 99.44% | 99.44% |
| trade-in-unseen-01 | €2,729.65 | €2,729.65 | 96.04% | 96.04% |
| trade-in-unseen-02 | €5,915.84 | €5,692.58 | 97.98% | 97.47% |

Development total: €17,947.12 → €18,489.55 (+€542.43, +3.02%). Fresh holdouts: €8,645.49 → €8,422.23 (-€223.26, -2.58%). Combined: €26,592.61 → €26,911.78 (+€319.17, +1.20%). Both versions qualified in all seven weeks, with zero refused actions. There were **no failed 90% thresholds**. Candidate worst on-time share is 95.30%; undelivered orders fell from one to zero across these weeks. This is a rules correction with mixed margin evidence; the fresh holdouts do not demonstrate a profit improvement.

On spread-1 the formerly stranded R00769 remained a two-car gig: new-car delivery and old-car pickup occurred at the same minute (6603), then the return completed at 6736. Main had left the new car undelivered and incurred a €342 penalty. Other behavior changes affect bookings and later driver supply, so the net gain cannot be attributed only to that penalty.

Machine-readable scores, world IDs, configurations and action counts are in `trade-in-development.json` and `trade-in-holdouts.json`. Ignored raw logs are under `runs/rescue-baseline`, `runs/trade-in-v1`, `runs/trade-in-unseen-baseline` and `runs/trade-in-unseen-candidate` on the operator machine. Action-bucket replay is an offline pressure check, not evidence of live final latency. No ranking run or final was used.
