# Pending quote driver-hour reservation

{
  "pid": 14652,
  "branch": "work/notes-thanhdatLUT",
  "state": "running",
  "source": "ced25ae8bbbaba4c11b3a29ccb2d75d08996bf90",
  "candidateSource": "04e640e0f01641c0e854ada1cda320ac011962ef",
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
    "capacityFraction": 0.24,
    "maxApproachMinutes": 100,
    "minLeadMinutes": 180,
    "strictNotes": true,
    "trainingEconomy": false,
    "offers": true
  },
  "selection": "fallback2.0",
  "hypothesis": "Combine peer f99057a short-public quote1.25 and advance opening0.80 with capacityFraction0.24 instead0.28; baseline remains common quote1.4/opening0.92/capacity0.28. Peer combination gained3126.46EUR/12.05% across4matched seeds but worst92.806% failed our93% gate. 14.3% lower capacity occupancy may preserve that profit while improving service; opportunity scenario EUR300-900/week based on prior average+781EUR, NOT proven additive. Start with prior failing seed l8-30k-short-proof-e, then study2; require each candidate>=93%, positive pooled margin, then positive untouched shortcap24-proof-v1. No tuning after viewing proof. Reject early on service failure. This tests the merged policy, not isolated component attribution.",
  "holdout": "shortcap24-proof-v1",
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
      }
    },
    {
      "seed": "l8-30k-short-proof-e",
      "level": 8,
      "side": "candidate",
      "source": "04e640e0f01641c0e854ada1cda320ac011962ef",
      "config": {
        "quoteMultiplier": 1.4,
        "feeMultiplier": 1.08,
        "emergencyMultiplier": 2,
        "marginReserve": 0.15,
        "minMarginCents": 2000,
        "capacityFraction": 0.24,
        "maxApproachMinutes": 100,
        "minLeadMinutes": 180,
        "strictNotes": true,
        "trainingEconomy": false,
        "offers": true
      },
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\shortcap24-validation\\l8-30k-short-proof-e\\candidate",
      "creationUncertain": false,
      "worldId": "w2dc5e1582ada10e9390d",
      "result": {
        "worldId": "w2dc5e1582ada10e9390d",
        "score": {
          "marginCents": 898183,
          "revenueCents": 3387600,
          "marginShare": 0.2651384460975322,
          "wonOrders": 272,
          "onTimeShare": 0.9375,
          "undeliveredShare": 0,
          "ranked": true
        },
        "config": {
          "quoteMultiplier": 1.4,
          "feeMultiplier": 1.08,
          "emergencyMultiplier": 2,
          "marginReserve": 0.15,
          "minMarginCents": 2000,
          "capacityFraction": 0.24,
          "maxApproachMinutes": 100,
          "minLeadMinutes": 180,
          "strictNotes": true,
          "trainingEconomy": false,
          "offers": true
        },
        "options": {
          "level": 8,
          "seed": "l8-30k-short-proof-e",
          "worldId": "w2dc5e1582ada10e9390d",
          "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\shortcap24-validation\\l8-30k-short-proof-e\\candidate",
          "quiet": true,
          "reveal": true
        },
        "elapsedSeconds": 89.621,
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
      }
    },
    {
      "seed": "study-2",
      "level": 8,
      "side": "candidate",
      "source": "04e640e0f01641c0e854ada1cda320ac011962ef",
      "config": {
        "quoteMultiplier": 1.4,
        "feeMultiplier": 1.08,
        "emergencyMultiplier": 2,
        "marginReserve": 0.15,
        "minMarginCents": 2000,
        "capacityFraction": 0.24,
        "maxApproachMinutes": 100,
        "minLeadMinutes": 180,
        "strictNotes": true,
        "trainingEconomy": false,
        "offers": true
      },
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\shortcap24-validation\\study-2\\candidate",
      "creationUncertain": false,
      "worldId": "w4d17525c6df637ec849b",
      "result": {
        "worldId": "w4d17525c6df637ec849b",
        "score": {
          "marginCents": 597178,
          "revenueCents": 2193400,
          "marginShare": 0.27226132944287407,
          "wonOrders": 191,
          "onTimeShare": 0.9424083769633508,
          "undeliveredShare": 0,
          "ranked": true
        },
        "config": {
          "quoteMultiplier": 1.4,
          "feeMultiplier": 1.08,
          "emergencyMultiplier": 2,
          "marginReserve": 0.15,
          "minMarginCents": 2000,
          "capacityFraction": 0.24,
          "maxApproachMinutes": 100,
          "minLeadMinutes": 180,
          "strictNotes": true,
          "trainingEconomy": false,
          "offers": true
        },
        "options": {
          "level": 8,
          "seed": "study-2",
          "worldId": "w4d17525c6df637ec849b",
          "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\shortcap24-validation\\study-2\\candidate",
          "quiet": true,
          "reveal": true
        },
        "elapsedSeconds": 69.146,
        "actionRefusals": 0
      }
    }
  ],
  "next": "Push pair study-2"
}

Baseline93/candidate95 tests pass. Never ranking/final here.
