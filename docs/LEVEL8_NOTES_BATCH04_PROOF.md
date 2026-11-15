# Level8 batch04 untouched proof

{
  "pid": 21268,
  "branch": "work/notes-thanhdatLUT",
  "state": "completed",
  "seed": "notes4-selected-proof-v1",
  "selected": {
    "profile": "emergency18",
    "deltas": [
      {
        "seed": "study-2",
        "delta": 40679,
        "onTime": 0.9433198380566802
      },
      {
        "seed": "release8-new-c-v1",
        "delta": 20273,
        "onTime": 0.948
      },
      {
        "seed": "notes4-dev-a-v1",
        "delta": 7385,
        "onTime": 0.9689655172413794
      },
      {
        "seed": "notes4-dev-b-v1",
        "delta": 751,
        "onTime": 0.9896907216494846
      }
    ],
    "totalDelta": 69088,
    "worst": 0.9433198380566802,
    "eligible": true
  },
  "profile": {
    "name": "emergency18",
    "source": "db510d229e21aa5441ba896ab39eaff5c055310a",
    "config": {
      "quoteMultiplier": 1.4,
      "feeMultiplier": 1.08,
      "emergencyMultiplier": 1.8,
      "marginReserve": 0.15,
      "minMarginCents": 2000,
      "capacityFraction": 0.28,
      "maxApproachMinutes": 100,
      "minLeadMinutes": 180,
      "strictNotes": true,
      "trainingEconomy": false,
      "offers": true
    }
  },
  "baseline": {
    "name": "baseline",
    "source": "db510d229e21aa5441ba896ab39eaff5c055310a",
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
    }
  },
  "decision": "reject",
  "runs": [
    {
      "side": "baseline",
      "seed": "notes4-selected-proof-v1",
      "level": 8,
      "source": "db510d229e21aa5441ba896ab39eaff5c055310a",
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
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\notes-batch04-proof\\baseline",
      "creationUncertain": false,
      "worldId": "w9b676c1cd33ac1997a04",
      "result": {
        "worldId": "w9b676c1cd33ac1997a04",
        "score": {
          "marginCents": 828892,
          "revenueCents": 2681600,
          "marginShare": 0.3091035202863962,
          "wonOrders": 192,
          "onTimeShare": 0.9895833333333334,
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
          "seed": "notes4-selected-proof-v1",
          "worldId": "w9b676c1cd33ac1997a04",
          "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\notes-batch04-proof\\baseline",
          "quiet": true,
          "reveal": true
        },
        "elapsedSeconds": 54.716,
        "actionRefusals": 0
      }
    },
    {
      "side": "candidate",
      "seed": "notes4-selected-proof-v1",
      "level": 8,
      "source": "db510d229e21aa5441ba896ab39eaff5c055310a",
      "config": {
        "quoteMultiplier": 1.4,
        "feeMultiplier": 1.08,
        "emergencyMultiplier": 1.8,
        "marginReserve": 0.15,
        "minMarginCents": 2000,
        "capacityFraction": 0.28,
        "maxApproachMinutes": 100,
        "minLeadMinutes": 180,
        "strictNotes": true,
        "trainingEconomy": false,
        "offers": true
      },
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\notes-batch04-proof\\candidate",
      "creationUncertain": false,
      "worldId": "wf4387f0aea96aec1ce2e",
      "result": {
        "worldId": "wf4387f0aea96aec1ce2e",
        "score": {
          "marginCents": 828892,
          "revenueCents": 2681600,
          "marginShare": 0.3091035202863962,
          "wonOrders": 192,
          "onTimeShare": 0.9895833333333334,
          "undeliveredShare": 0,
          "ranked": true
        },
        "config": {
          "quoteMultiplier": 1.4,
          "feeMultiplier": 1.08,
          "emergencyMultiplier": 1.8,
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
          "seed": "notes4-selected-proof-v1",
          "worldId": "wf4387f0aea96aec1ce2e",
          "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\notes-batch04-proof\\candidate",
          "quiet": true,
          "reveal": true
        },
        "elapsedSeconds": 53.113,
        "actionRefusals": 0
      }
    }
  ],
  "next": "Publish verified configuration/source only if keep; otherwise baseline",
  "delta": 0
}

Decision requires positive fresh margin, >=93% candidate service, no extra undelivered/refusals; otherwise retain baseline. No ranking/final.
