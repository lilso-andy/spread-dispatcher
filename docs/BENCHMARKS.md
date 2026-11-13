# Practice benchmarks

These are completed **level 8 practice** weeks, not ranking runs or a final. Eligibility uses the server's final score, not an intermediate daily score. All monetary figures are game euros.

## Current implementation

Source revision: `2a37b7f63a4e3a5d04de415a1d965b6b73b8d784`.
Policy: `configs/balanced.json`, with unspecified fields from `config.ts` at that revision. Full machine-readable policy and results are in `benchmark-results.json`.

| Seed | Won orders | On time | Undelivered | Gross margin | Ranked | Refused actions |
| --- | ---: | ---: | ---: | ---: | --- | ---: |
| spread-1 | 147 | 96.60% | 0.68% | €3,188.67 | yes | 0 |
| study-2 | 157 | 93.63% | 0% | €2,558.43 | yes | 0 |
| holdout-3 | 85 | 98.82% | 0% | €2,900.03 | yes | 0 |

All 3 ranked; total margin **€8,647.13**; worst on-time share **93.63%**. One order remained undelivered in spread-1. These three seeds are now development evidence; use new seeds for future holdout validation. There is no guarantee of 90% service on unseen weeks.

13 offline behavior tests passed. Authenticated WebSocket history replay was smoke-tested against a disposable practice world with Node 24.22.1. Final clock timing and final-specific rate buckets have not been tested in a live test final.

## Earlier exploratory implementation

These were run while recovery/position handling was being developed. They are not a controlled same-revision comparison with the current table; rerun both policies on current main before attributing differences to configuration alone.

| Policy | Seed | Won orders | On time | Undelivered | Margin | Ranked |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| conservative | spread-1 | 20 | 100% | 0% | €977.20 | yes |
| conservative | study-2 | 63 | 98.41% | 0% | €3,393.66 | yes |
| conservative | holdout-3 | 8 | 100% | 0% | €416.71 | yes |
| balanced before recovery fixes | spread-1 | 148 | 97.30% | 1.35% | €3,158.20 | yes |
| balanced before recovery fixes | study-2 | 155 | 95.48% | 1.29% | €2,252.76 | yes |
| balanced before recovery fixes | holdout-3 | 85 | 98.82% | 1.18% | €2,446.27 | yes |

The default remains conservative. Use `--config configs/balanced.json` for the evaluated higher-volume policy. Pricing experiments should record every failed seed, not just the best margins.
