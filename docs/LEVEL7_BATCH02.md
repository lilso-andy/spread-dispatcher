# Level 7 optimization batch 02

The selected baseline is frozen at `8a19a32`, including the latest published teammate documentation. Its dispatcher code and level 7 preset match the retained batch01 behavior. The complete selected configuration remains quote 1.4, opening fee 1.02, emergency 2.4, reserve 0.15, minimum contribution 2000 cents, capacity 0.28, approach 100 minutes, booking lead 180 minutes, strict notes, offers enabled and training economics disabled.

Four fixed development seeds are `spread-1`, `study-2`, `l7-b02-dev-a` and `l7-b02-dev-b`. Run all four profiles at each seed, for sixteen completed practice weeks. Two worlds may be controlled concurrently, with shared slot checks. The highest eligible development-margin profile gets a paired fresh proof on `l7-b02-primary-proof`. A failed proof retains baseline. Every candidate week must qualify, with no additional undelivered orders or refused actions. Positive differences below 1% prefer equal or better service buffer.

| Profile | Source | Full offline tests | Behavior |
|---|---|---|---|
| Baseline | 8a19a32 | 91 | Retained dispatcher |
| Short public quotes | c0150b7 | 96 | Cap the base quote multiplier at 1.25 for one non-premium public car, at most 120 mapped driving minutes, at least 360 minutes booking slack and at least 15 eligible local drivers. Keep existing fee/margin floors and dealer/day feedback. |
| Bounded recovery | 588a712 | 96 | Under the existing service recovery guard, admit one public short non-premium request at a time, with at least 360 minutes slack, 8 local drivers and a completed-order budget that permits one further late job while keeping the known total at least 90% on time. Wait for outstanding work and quoted reservations. |
| Combined | 05e0166 | 102 | Both changes, with interaction coverage for margin floor and single-request reservation. |

The proposals were recorded in the local batch plan before edits and server creation. Source profiles and full configuration were frozen in `runs/level7-batch02/profiles.json` before the matrix started. Runtime ownership and final accounting are saved in `runs/level7-batch02/state.json`. Ranking worlds remain parked while these practice comparisons run.

## Final results

18 completed weeks. Selected profile **base**. Weeks below the delivery minimum: 0. The accompanying JSON records full sources, configs, scores, ledgers and controller restarts.

| Development profile | Total margin EUR | Difference EUR | Worst on time | Eligible for proof |
|---|---:|---:|---:|---|
| base | 17945.82 | 0.00 | 91.52% | Control |
| short | 17677.64 | -268.18 | 91.35% | No |
| recovery | 18392.82 | 447.00 | 91.52% | Yes |
| combined | 17880.72 | -65.10 | 91.35% | No |

Fresh paired proof on `l7-b02-primary-proof` produced a difference of 0.00 EUR. Baseline retained.

| Profile | Seed | World | Commit | Margin EUR | Won | On time | Undelivered | Refusals | Snapshot reads |
|---|---|---|---|---:|---:|---:|---:|---:|---:|
| baseline | spread-1 | w9ee94c93bb2eb4c64f27 | 8a19a32 | 5012.15 | 183 | 98.36% | 0 | 0 | 1 |
| public-short-quotes | spread-1 | w9e4481ec697894cd7bcc | c0150b7 | 5045.98 | 205 | 98.54% | 0 | 0 | 1 |
| bounded-recovery | spread-1 | w1c7acb14915b9efad40b | 588a712 | 5012.15 | 183 | 98.36% | 0 | 0 | 1 |
| short-quotes-and-recovery | spread-1 | we8fadb4b1deef66d4a5c | 05e0166 | 5045.98 | 205 | 98.54% | 0 | 0 | 1 |
| baseline | study-2 | wb75c821a985db8779844 | 8a19a32 | 3129.50 | 165 | 91.52% | 0 | 0 | 1 |
| public-short-quotes | study-2 | w611f95f88a7a5d2bc42c | c0150b7 | 2896.56 | 208 | 91.35% | 0 | 0 | 2 |
| bounded-recovery | study-2 | wf7c6c751741bc2eac997 | 588a712 | 3141.44 | 165 | 91.52% | 0 | 0 | 2 |
| short-quotes-and-recovery | study-2 | wf3367832c089e451e725 | 05e0166 | 2927.40 | 208 | 91.35% | 0 | 0 | 2 |
| baseline | l7-b02-dev-a | w1e6d4fae1a20fa123d26 | 8a19a32 | 6843.98 | 186 | 96.24% | 0 | 0 | 1 |
| public-short-quotes | l7-b02-dev-a | we4141c28692436b23c67 | c0150b7 | 6137.22 | 201 | 94.03% | 0 | 0 | 1 |
| bounded-recovery | l7-b02-dev-a | w7b59848bf8907980c8b0 | 588a712 | 7279.04 | 188 | 97.34% | 0 | 0 | 2 |
| short-quotes-and-recovery | l7-b02-dev-a | w1ed7c4e7fc318206cfff | 05e0166 | 6309.46 | 200 | 94.50% | 0 | 0 | 2 |
| baseline | l7-b02-dev-b | w7a9031fbdbd66bd07bbb | 8a19a32 | 2960.19 | 154 | 93.51% | 0 | 0 | 1 |
| public-short-quotes | l7-b02-dev-b | w64026360634da3c37ff4 | c0150b7 | 3597.88 | 164 | 95.12% | 1 | 0 | 1 |
| bounded-recovery | l7-b02-dev-b | we14880603b7c07e7cccf | 588a712 | 2960.19 | 154 | 93.51% | 0 | 0 | 1 |
| short-quotes-and-recovery | l7-b02-dev-b | w3868427ec39ec560e5e8 | 05e0166 | 3597.88 | 164 | 95.12% | 1 | 0 | 1 |
| baseline | l7-b02-primary-proof | w76bfc8f6fe471d59f69e | 8a19a32 | 7692.11 | 219 | 98.17% | 0 | 0 | 1 |
| bounded-recovery | l7-b02-primary-proof | w82b20e81dc03404215db | 588a712 | 7692.11 | 219 | 98.17% | 0 | 0 | 1 |

Rows with multiple snapshot reads include reconstruction of local dispatcher state. Reconnection can change bidding or booking history, so their differences can include a restart effect.
