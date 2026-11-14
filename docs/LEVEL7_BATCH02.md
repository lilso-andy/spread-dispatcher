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
