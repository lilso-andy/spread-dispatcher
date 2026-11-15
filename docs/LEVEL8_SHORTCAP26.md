# Pending quote driver-hour reservation

{
  "pid": 21656,
  "branch": "work/notes-thanhdatLUT",
  "state": "running",
  "source": "ced25ae8bbbaba4c11b3a29ccb2d75d08996bf90",
  "candidateSource": "4936bcf501c0f46f581712db658ae33762b17b3c",
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
  "candidateConfig": {
    "quoteMultiplier": 1.4,
    "feeMultiplier": 1.08,
    "emergencyMultiplier": 2,
    "marginReserve": 0.15,
    "minMarginCents": 2000,
    "capacityFraction": 0.26,
    "maxApproachMinutes": 100,
    "minLeadMinutes": 180,
    "strictNotes": true,
    "trainingEconomy": false,
    "offers": true
  },
  "selection": "fallback2.0",
  "hypothesis": "Peer short-public quote1.25 plus advance0.80 at cap0.28 gains3126.46EUR/4seeds but worst92.806%; cap0.24 stress-e +1075.60EUR/93.75%, study2 -1488.54EUR/94.24%, pooled-412.94 so rejected. Test intermediate cap0.26 with no other code/config changes. Estimated incremental opportunity EUR300-900/week is a hypothesis from prior combinations, not interpolation guarantee. Reuse EXACT ced25 baseline commit/config/level/seed after server ended-score verification. Two known development seeds, each candidate>=93% and pooled positive, then untouched shortcap26-proof-v1 positive; additional known stress-B must also pass before promotion. No tuning on untouched proof, record every loss.",
  "holdout": "shortcap26-proof-v1",
  "decision": "pending",
  "runs": [
    {
      "seed": "l8-30k-short-proof-e",
      "level": 8,
      "side": "baseline",
      "source": "ced25ae8bbbaba4c11b3a29ccb2d75d08996bf90",
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
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\shortcap24-validation\\l8-30k-short-proof-e\\baseline",
      "creationUncertain": false,
      "worldId": "w641794ab1b04de9894df",
      "result": {
        "worldId": "w641794ab1b04de9894df",
        "score": {
          "marginCents": 790623,
          "revenueCents": 2796800,
          "marginShare": 0.28268842963386726,
          "wonOrders": 228,
          "onTimeShare": 0.9473684210526315,
          "undeliveredShare": 0.0043859649122807015,
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
          "seed": "l8-30k-short-proof-e",
          "worldId": "w641794ab1b04de9894df",
          "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\shortcap24-validation\\l8-30k-short-proof-e\\baseline",
          "quiet": true,
          "reveal": true
        },
        "elapsedSeconds": 66.54,
        "actionRefusals": 0
      },
      "cached": true
    },
    {
      "seed": "l8-30k-short-proof-e",
      "level": 8,
      "side": "candidate",
      "source": "4936bcf501c0f46f581712db658ae33762b17b3c",
      "config": {
        "quoteMultiplier": 1.4,
        "feeMultiplier": 1.08,
        "emergencyMultiplier": 2,
        "marginReserve": 0.15,
        "minMarginCents": 2000,
        "capacityFraction": 0.26,
        "maxApproachMinutes": 100,
        "minLeadMinutes": 180,
        "strictNotes": true,
        "trainingEconomy": false,
        "offers": true
      },
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\shortcap26-validation\\l8-30k-short-proof-e\\candidate",
      "creationUncertain": false,
      "worldId": "w6f6bdc72d81c6a076f43"
    }
  ],
  "next": "finish owned w6f6bdc72d81c6a076f43"
}

Baseline93/candidate95 tests pass. Never ranking/final here.
