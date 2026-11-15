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
      "worldId": "w1cf8989d875e0c9a6ccc",
      "result": {
        "worldId": "w1cf8989d875e0c9a6ccc",
        "score": {
          "marginCents": 1059710,
          "revenueCents": 3667100,
          "marginShare": 0.2889776662758038,
          "wonOrders": 251,
          "onTimeShare": 0.9442231075697212,
          "undeliveredShare": 0,
          "ranked": true
        },
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
        "options": {
          "level": 8,
          "seed": "release8-new-c-v1",
          "worldId": "w1cf8989d875e0c9a6ccc",
          "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\pending-hours-validation\\release8-new-c-v1\\baseline",
          "quiet": true,
          "reveal": true
        },
        "elapsedSeconds": 72.683,
        "actionRefusals": 0
      }
    },
    {
      "seed": "release8-new-c-v1",
      "level": 8,
      "side": "candidate",
      "source": "73282e3e1fb85c2007a8258ab1f509953ce608ea",
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
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\pending-hours-validation\\release8-new-c-v1\\candidate",
      "creationUncertain": false,
      "worldId": "w26b19448ea0f6cdf0546",
      "result": {
        "worldId": "w26b19448ea0f6cdf0546",
        "score": {
          "marginCents": 909353,
          "revenueCents": 3458200,
          "marginShare": 0.262955583829738,
          "wonOrders": 235,
          "onTimeShare": 0.9234042553191489,
          "undeliveredShare": 0,
          "ranked": true
        },
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
        "options": {
          "level": 8,
          "seed": "release8-new-c-v1",
          "worldId": "w26b19448ea0f6cdf0546",
          "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\pending-hours-validation\\release8-new-c-v1\\candidate",
          "quiet": true,
          "reveal": true
        },
        "elapsedSeconds": 69.793,
        "actionRefusals": 0
      }
    }
  ],
  "next": "Push pair release8-new-c-v1"
}

Baseline93/candidate95 tests pass. Never ranking/final here.
