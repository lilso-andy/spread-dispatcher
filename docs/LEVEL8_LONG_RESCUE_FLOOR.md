# Pending quote driver-hour reservation

{
  "pid": 19896,
  "branch": "work/notes-thanhdatLUT",
  "state": "running",
  "source": "9758e3ab27df8b8e78b61349ae5182bfa67b8709",
  "candidateSource": "db2d4dbe18476828072535c6e090689ea71d698d",
  "config": {
    "quoteMultiplier": 1.4,
    "feeMultiplier": 1.08,
    "emergencyMultiplier": 2,
    "marginReserve": 0.15,
    "minMarginCents": 2000,
    "capacityFraction": 0.28,
    "maxApproachMinutes": 100,
    "minLeadMinutes": 180,
    "strictNotes": true,
    "trainingEconomy": false,
    "offers": true
  },
  "selection": "fallback2.0",
  "hypothesis": "For level8 routes over300 mapped minutes, quote contribution floor uses max(opening estimate, referenceFee*1.85) before reserve and absolute margin. Short routes, posted driver fees, quotas and existing ceilings unchanged. Observed ranking12 long cohort EUR-1382.72 with11refund orders; other weeks long cohort positive, so use cost floor rather than blanket decline. Estimated opportunity EUR500-1500 per adverse week assumes some negative contribution jobs avoided or priced higher; no claim of won probability or margin for lost requests. Two matched known stress seeds and new untouched proof; every candidate>=93%, pooled margin positive then fresh proof positive. Reject early on service failure.",
  "holdout": "long-floor-proof-v1",
  "decision": "pending",
  "runs": [
    {
      "seed": "notes4-rescue-proof-b-v1",
      "level": 8,
      "side": "baseline",
      "source": "9758e3ab27df8b8e78b61349ae5182bfa67b8709",
      "config": {
        "quoteMultiplier": 1.4,
        "feeMultiplier": 1.08,
        "emergencyMultiplier": 2,
        "marginReserve": 0.15,
        "minMarginCents": 2000,
        "capacityFraction": 0.28,
        "maxApproachMinutes": 100,
        "minLeadMinutes": 180,
        "strictNotes": true,
        "trainingEconomy": false,
        "offers": true
      },
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\long-floor-validation\\notes4-rescue-proof-b-v1\\baseline",
      "creationUncertain": false,
      "worldId": "w24651a0d23689d7e428b"
    }
  ],
  "next": "finish owned w24651a0d23689d7e428b"
}

Baseline93/candidate95 tests pass. Never ranking/final here.
