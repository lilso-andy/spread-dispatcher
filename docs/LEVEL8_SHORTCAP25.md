# Pending quote driver-hour reservation

{
  "pid": 26544,
  "branch": "work/notes-thanhdatLUT",
  "state": "running",
  "source": "ced25ae8bbbaba4c11b3a29ccb2d75d08996bf90",
  "candidateSource": "68b526b3a2decdc05eaaad02c18963225437a711",
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
    "capacityFraction": 0.25,
    "maxApproachMinutes": 100,
    "minLeadMinutes": 180,
    "strictNotes": true,
    "trainingEconomy": false,
    "offers": true
  },
  "selection": "fallback2.0",
  "hypothesis": "Final intermediate occupancy test in this tuning branch: same peer short-public1.25/advance0.80 code, cap0.25 only. cap0.24 met93% on2dev seeds but pooled-412.94EUR; cap0.26 gained193.21EUR on first seed but92.3913%, so rejected early. Test0.25 before viewing any new proof; no further cap grid in this branch. Two EXACT cached ced25 baseline/config/level8/seed/end-score matches verified. Require both candidate weeks>=93% and pooled positive, then positive untouched shortcap25-proof-v1, plus known stressB93% before promotion. Estimated EUR100-600/week is an uncertain opportunity, not interpolation guarantee; all failures retained.",
  "holdout": "shortcap25-proof-v1",
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
      "source": "68b526b3a2decdc05eaaad02c18963225437a711",
      "config": {
        "quoteMultiplier": 1.4,
        "feeMultiplier": 1.08,
        "emergencyMultiplier": 2,
        "marginReserve": 0.15,
        "minMarginCents": 2000,
        "capacityFraction": 0.25,
        "maxApproachMinutes": 100,
        "minLeadMinutes": 180,
        "strictNotes": true,
        "trainingEconomy": false,
        "offers": true
      },
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\shortcap25-validation\\l8-30k-short-proof-e\\candidate",
      "creationUncertain": false,
      "worldId": "w442404b21358c1773684",
      "result": {
        "worldId": "w442404b21358c1773684",
        "score": {
          "marginCents": 898464,
          "revenueCents": 3432400,
          "marginShare": 0.26175970166647244,
          "wonOrders": 274,
          "onTimeShare": 0.9343065693430657,
          "undeliveredShare": 0,
          "ranked": true
        },
        "config": {
          "quoteMultiplier": 1.4,
          "feeMultiplier": 1.08,
          "emergencyMultiplier": 2,
          "marginReserve": 0.15,
          "minMarginCents": 2000,
          "capacityFraction": 0.25,
          "maxApproachMinutes": 100,
          "minLeadMinutes": 180,
          "strictNotes": true,
          "trainingEconomy": false,
          "offers": true
        },
        "options": {
          "level": 8,
          "seed": "l8-30k-short-proof-e",
          "worldId": "w442404b21358c1773684",
          "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\shortcap25-validation\\l8-30k-short-proof-e\\candidate",
          "quiet": true,
          "reveal": true
        },
        "elapsedSeconds": 89.646,
        "actionRefusals": 0
      }
    },
    {
      "seed": "study-2",
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
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\shortcap24-validation\\study-2\\baseline",
      "creationUncertain": false,
      "worldId": "w9b6d0ff0bbe82d96be43",
      "result": {
        "worldId": "w9b6d0ff0bbe82d96be43",
        "score": {
          "marginCents": 746032,
          "revenueCents": 2925900,
          "marginShare": 0.25497522129942923,
          "wonOrders": 241,
          "onTimeShare": 0.9336099585062241,
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
          "seed": "study-2",
          "worldId": "w9b6d0ff0bbe82d96be43",
          "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\shortcap24-validation\\study-2\\baseline",
          "quiet": true,
          "reveal": true
        },
        "elapsedSeconds": 74.629,
        "actionRefusals": 0
      },
      "cached": true
    },
    {
      "seed": "study-2",
      "level": 8,
      "side": "candidate",
      "source": "68b526b3a2decdc05eaaad02c18963225437a711",
      "config": {
        "quoteMultiplier": 1.4,
        "feeMultiplier": 1.08,
        "emergencyMultiplier": 2,
        "marginReserve": 0.15,
        "minMarginCents": 2000,
        "capacityFraction": 0.25,
        "maxApproachMinutes": 100,
        "minLeadMinutes": 180,
        "strictNotes": true,
        "trainingEconomy": false,
        "offers": true
      },
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\shortcap25-validation\\study-2\\candidate",
      "creationUncertain": false,
      "worldId": "wddba4ffdaab0282ae6d8",
      "result": {
        "worldId": "wddba4ffdaab0282ae6d8",
        "score": {
          "marginCents": 651313,
          "revenueCents": 2309300,
          "marginShare": 0.2820391460615771,
          "wonOrders": 204,
          "onTimeShare": 0.9411764705882353,
          "undeliveredShare": 0,
          "ranked": true
        },
        "config": {
          "quoteMultiplier": 1.4,
          "feeMultiplier": 1.08,
          "emergencyMultiplier": 2,
          "marginReserve": 0.15,
          "minMarginCents": 2000,
          "capacityFraction": 0.25,
          "maxApproachMinutes": 100,
          "minLeadMinutes": 180,
          "strictNotes": true,
          "trainingEconomy": false,
          "offers": true
        },
        "options": {
          "level": 8,
          "seed": "study-2",
          "worldId": "wddba4ffdaab0282ae6d8",
          "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\shortcap25-validation\\study-2\\candidate",
          "quiet": true,
          "reveal": true
        },
        "elapsedSeconds": 68.115,
        "actionRefusals": 0
      }
    }
  ],
  "next": "Push pair study-2"
}

Baseline93/candidate95 tests pass. Never ranking/final here.
