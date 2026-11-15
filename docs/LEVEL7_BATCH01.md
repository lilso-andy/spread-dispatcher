# Level 7 optimization batch 01

18 ordinary-practice weeks completed. Each final score and full server ledger was checked. One week failed the 90% minimum. Exact source commits, full configurations, world IDs, accounting, interruption diagnostics and reused baseline references are in LEVEL7_BATCH01_RESULTS.json.

The selected policy remains source 9e4748567cc7454c4e7f0c289df4a55f7fe55f34 with the existing level 7 preset. The EUR16,000 weekly objective remains unmet.

| Candidate | Development result | Fresh proof | Decision |
|---|---|---|---|
| Recovery threshold 7.5% | study-2 ended at 89.37%, margin 2988.83 EUR | Not run after failure | Reject |
| Tight long-route reserve | -129.50 EUR paired change | Not run after loss | Reject |
| Capacity 0.22 | +1144.68 EUR paired change, worst service 93.06% | -161.86 EUR, 4128.68 to 3966.82 | Retain baseline |
| Driver lookup reuse | Clean fixed-seed scores matched | One interrupted proof differed, another fresh pair matched | Equivalence limited by recovery, no margin gain claimed |

The initial harness's cross-checkout network error mismatch was corrected. Interrupted and losing weeks remain in the results. Some baseline runs also rebuilt and therefore differed from uninterrupted same-seed runs. Capacity 0.22's development gain against the earlier continuous baseline pair would be 1115.69 EUR, versus 1144.68 EUR against the fresh recorded pair. Both comparisons preserve the failed holdout conclusion.

| Run | Variant | Seed | World | Source | Margin EUR | Won | On time % | Undelivered | Refusals |
|---|---|---|---|---|---|---|---|---|---|
|1|recovery-7.5|study-2|w1f7529cb030f1f4dc8cf|cbd9800|2988.83|207|89.37|0|1|
|2|driver-lookup|spread-1|wf8a3d753810fe3cb9b18|f957b55|5144.58|186|97.85|0|0|
|3|driver-lookup|spread-1|w899e1ead607ad6e263a9|f957b55|5012.15|183|98.36|0|0|
|4|baseline|spread-1|wd7f70ff7ad84b90b6e3e|9e47485|5012.15|183|98.36|0|0|
|5|driver-lookup|study-2|wfb47e1ed97a7faf52aae|f957b55|3129.50|165|91.52|0|0|
|6|baseline|driver-lookup-proof-07|wffc03247e88f47eb4531|9e47485|7070.72|249|95.98|0|0|
|7|long-route-reserve|spread-1|wb01237cda7b25606d46e|ce9c42e|4790.44|181|97.79|0|0|
|8|driver-lookup|driver-lookup-proof-07|w97b93fdd388cf602cd74|f957b55|7159.81|250|95.60|0|0|
|9|baseline|study-2|we7e332c23f010ea02beb|9e47485|3178.26|165|91.52|0|0|
|10|long-route-reserve|study-2|w687ddd64fa4396fb02cc|ce9c42e|3270.47|183|92.35|0|6|
|11|baseline|spread-1|wba658a1c7bdc34d70562|9e47485|4983.16|184|98.37|0|0|
|12|capacity0.22|spread-1|wf11ee8ef38be4456402f|9e47485|5041.85|180|98.89|0|0|
|13|baseline|study-2|w2a348ca21121aece6734|9e47485|3129.50|165|91.52|0|0|
|14|capacity0.22|study-2|w2076e89fc723fd975018|9e47485|4215.49|173|93.06|0|0|
|15|baseline|driver-lookup-robust-07|wce66a18dd033026869ff|9e47485|4832.24|192|96.88|0|0|
|16|driver-lookup|driver-lookup-robust-07|w816975998de36fc60d7c|f957b55|4832.24|192|96.88|0|0|
|17|baseline|capacity-buffer-proof-08|w174457febddcc1d424b0|9e47485|4128.68|131|99.24|0|0|
|18|capacity0.22|capacity-buffer-proof-08|w6f42065f29de63d8834c|9e47485|3966.82|126|99.21|0|0|

Selected baseline configuration

~~~json
{
  "quoteMultiplier": 1.4,
  "feeMultiplier": 1.02,
  "emergencyMultiplier": 2.4,
  "marginReserve": 0.15,
  "minMarginCents": 2000,
  "capacityFraction": 0.28,
  "maxApproachMinutes": 100,
  "minLeadMinutes": 180,
  "strictNotes": true,
  "trainingEconomy": false,
  "offers": true
}
~~~
