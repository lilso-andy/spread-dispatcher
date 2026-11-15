# Pending quote driver-hour reservation

{
  "pid": 20664,
  "branch": "work/notes-thanhdatLUT",
  "state": "running",
  "source": "a176b59cab17672715429310ae9ec669a550f3b2",
  "candidateSource": "73282e3e1fb85c2007a8258ab1f509953ce608ea",
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
  "hypothesis": "Pending level8 quotes currently consume1 capacity unit regardless of driving duration; won orders consume (drive+90perleg)/240. Reserve the same hours for pending quotes, minimum1, leaving short jobs possible. Ranking12 week1 observed34raw long wins,11late-refund orders, EUR-1382.72 order-linked net margin in long cohort vs profitable long cohorts other weeks. Estimated EUR500-1500/week opportunity assumes some loss-making long backlog is prevented; cohorts include cancellations and are not counterfactual lost revenue. Only practice can test this mechanism. Two matched development seeds, each>=93% and pooled positive, then unused holdout. No claimed profit from un-won requests.",
  "holdout": "pending-hours-proof-v1",
  "decision": "pending",
  "runs": [
    {
      "seed": "release8-new-c-v1",
      "level": 8,
      "side": "baseline",
      "source": "a176b59cab17672715429310ae9ec669a550f3b2",
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
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\pending-hours-validation\\release8-new-c-v1\\baseline",
      "creationUncertain": false,
      "worldId": "w1cf8989d875e0c9a6ccc"
    }
  ],
  "next": "finish owned w1cf8989d875e0c9a6ccc"
}

Baseline93/candidate95 tests pass. Never ranking/final here.
