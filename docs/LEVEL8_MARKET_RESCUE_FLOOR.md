# Combined short-market discount and rescue-cost floor

{
  "pid": 36216,
  "branch": "work/notes-thanhdatLUT",
  "state": "completed",
  "source": "cb1cdc72d723e4b2db4fa083fe42365da58e18cc",
  "candidateSource": "29c66d4cbbaa2ea4bb76a671f11f5098837153ef",
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
  "decision": "reject",
  "holdout": "short-market-rescue-floor-proof-v1",
  "hypothesis": "Last preregistered combination before final preparation freeze: short-public intraday-loss discount gained6706.06EUR/4paired seeds but knownB92.126% disqualifies. Standalone long-route rescue floor1.85 reference raised knownB to93.333% with-215.38EUR. Combine exactly those policies, no cap/fee/quote parameter tuning; cannot add their gains. Expected opportunity scenario retaining some EUR6706 acquisition gain while paying floor cost on long jobs; unknown interaction, no profit guarantee. Validate B first, then daily-a/h, everycandidate>=93% and positive total, then new untouched proof strictly positive. Existing proof from prior policy is NOT reused. Baseline exactcb1/config/level/seed/ended score verified, cached known controls not counted as new worlds. Candidate99tests vs baseline93. If any service failure, reject early; no further tuning in this branch.",
  "runs": [
    {
      "side": "baseline",
      "seed": "notes4-rescue-proof-b-v1",
      "level": 8,
      "source": "cb1cdc72d723e4b2db4fa083fe42365da58e18cc",
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
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\short-market-stress\\baseline",
      "creationUncertain": false,
      "worldId": "w517c4dc1521dfe864458",
      "result": {
        "worldId": "w517c4dc1521dfe864458",
        "score": {
          "marginCents": 395440,
          "revenueCents": 1624800,
          "marginShare": 0.24337764647956672,
          "wonOrders": 127,
          "onTimeShare": 0.9212598425196851,
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
          "seed": "notes4-rescue-proof-b-v1",
          "worldId": "w517c4dc1521dfe864458",
          "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\short-market-stress\\baseline",
          "quiet": true,
          "reveal": true
        },
        "elapsedSeconds": 43.201,
        "actionRefusals": 0
      },
      "cached": true
    },
    {
      "side": "candidate",
      "seed": "notes4-rescue-proof-b-v1",
      "level": 8,
      "source": "29c66d4cbbaa2ea4bb76a671f11f5098837153ef",
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
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\market-floor-validation\\notes4-rescue-proof-b-v1\\candidate",
      "creationUncertain": false,
      "worldId": "w86d1390138473fa394d9",
      "result": {
        "worldId": "w86d1390138473fa394d9",
        "score": {
          "marginCents": 541397,
          "revenueCents": 1761800,
          "marginShare": 0.3072976501305483,
          "wonOrders": 161,
          "onTimeShare": 0.9503105590062112,
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
          "seed": "notes4-rescue-proof-b-v1",
          "worldId": "w86d1390138473fa394d9",
          "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\market-floor-validation\\notes4-rescue-proof-b-v1\\candidate",
          "quiet": true,
          "reveal": true
        },
        "elapsedSeconds": 46.192,
        "actionRefusals": 0
      }
    },
    {
      "side": "baseline",
      "level": 8,
      "seed": "dispatch8-daily-a",
      "source": "cb1cdc72d723e4b2db4fa083fe42365da58e18cc",
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
      "worldId": "wf4beeb02fc155dcd9ed7",
      "cachedExternal": true,
      "originalControllerOutput": null,
      "cacheArchive": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\short-market-validation\\cached-dispatch8-daily-a.public-events.json",
      "metadataSource": "18d2225 docs/LEVEL8_DISPATCH_BATCH06_RESULTS.json",
      "ledger": {
        "revenue": 949900,
        "driver_fee": -659270,
        "late_refund": -10200,
        "release_fee": -4389,
        "failed_visit": -11812
      },
      "result": {
        "worldId": "wf4beeb02fc155dcd9ed7",
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
        "score": {
          "marginCents": 264229,
          "revenueCents": 949900,
          "marginShare": 0.2781650700073692,
          "wonOrders": 66,
          "onTimeShare": 0.9545454545454546,
          "undeliveredShare": 0,
          "ranked": true
        },
        "options": {
          "level": 8,
          "seed": "dispatch8-daily-a",
          "worldId": "wf4beeb02fc155dcd9ed7"
        },
        "actionRefusals": 0
      },
      "cached": true
    },
    {
      "side": "candidate",
      "seed": "dispatch8-daily-a",
      "level": 8,
      "source": "29c66d4cbbaa2ea4bb76a671f11f5098837153ef",
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
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\market-floor-validation\\dispatch8-daily-a\\candidate",
      "creationUncertain": false,
      "worldId": "w32ef67d0d192882968ed",
      "result": {
        "worldId": "w32ef67d0d192882968ed",
        "score": {
          "marginCents": 497082,
          "revenueCents": 1625000,
          "marginShare": 0.3058966153846154,
          "wonOrders": 145,
          "onTimeShare": 0.9586206896551724,
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
          "seed": "dispatch8-daily-a",
          "worldId": "w32ef67d0d192882968ed",
          "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\market-floor-validation\\dispatch8-daily-a\\candidate",
          "quiet": true,
          "reveal": true
        },
        "elapsedSeconds": 44.336,
        "actionRefusals": 0
      }
    },
    {
      "side": "baseline",
      "level": 8,
      "seed": "dispatch8-daily-h",
      "source": "cb1cdc72d723e4b2db4fa083fe42365da58e18cc",
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
      "worldId": "wf4694269692911655e47",
      "cachedExternal": true,
      "originalControllerOutput": null,
      "cacheArchive": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\short-market-validation\\cached-dispatch8-daily-h.public-events.json",
      "metadataSource": "18d2225 docs/LEVEL8_DISPATCH_BATCH06_RESULTS.json",
      "ledger": {
        "revenue": 2360100,
        "driver_fee": -1563517,
        "release_fee": -7589,
        "late_refund": -26110,
        "waiting": -3000
      },
      "result": {
        "worldId": "wf4694269692911655e47",
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
        "score": {
          "marginCents": 759884,
          "revenueCents": 2360100,
          "marginShare": 0.3219711029193678,
          "wonOrders": 177,
          "onTimeShare": 0.9548022598870056,
          "undeliveredShare": 0,
          "ranked": true
        },
        "options": {
          "level": 8,
          "seed": "dispatch8-daily-h",
          "worldId": "wf4694269692911655e47"
        },
        "actionRefusals": 0
      },
      "cached": true
    },
    {
      "side": "candidate",
      "seed": "dispatch8-daily-h",
      "level": 8,
      "source": "29c66d4cbbaa2ea4bb76a671f11f5098837153ef",
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
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\market-floor-validation\\dispatch8-daily-h\\candidate",
      "creationUncertain": false,
      "worldId": "w5c538c72d1e1b1badc56",
      "result": {
        "worldId": "w5c538c72d1e1b1badc56",
        "score": {
          "marginCents": 869856,
          "revenueCents": 2624000,
          "marginShare": 0.3315,
          "wonOrders": 213,
          "onTimeShare": 0.9765258215962441,
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
          "seed": "dispatch8-daily-h",
          "worldId": "w5c538c72d1e1b1badc56",
          "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\market-floor-validation\\dispatch8-daily-h\\candidate",
          "quiet": true,
          "reveal": true
        },
        "elapsedSeconds": 70.388,
        "actionRefusals": 0
      }
    },
    {
      "side": "baseline",
      "seed": "short-market-rescue-floor-proof-v1",
      "level": 8,
      "source": "cb1cdc72d723e4b2db4fa083fe42365da58e18cc",
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
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\market-floor-validation\\short-market-rescue-floor-proof-v1\\baseline",
      "creationUncertain": false,
      "worldId": "wa97267eb093f92b5be7f",
      "result": {
        "worldId": "wa97267eb093f92b5be7f",
        "score": {
          "marginCents": 141940,
          "revenueCents": 527900,
          "marginShare": 0.26887668118961927,
          "wonOrders": 44,
          "onTimeShare": 0.9318181818181818,
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
          "seed": "short-market-rescue-floor-proof-v1",
          "worldId": "wa97267eb093f92b5be7f",
          "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\market-floor-validation\\short-market-rescue-floor-proof-v1\\baseline",
          "quiet": true,
          "reveal": true
        },
        "elapsedSeconds": 36.669,
        "actionRefusals": 0
      }
    },
    {
      "side": "candidate",
      "seed": "short-market-rescue-floor-proof-v1",
      "level": 8,
      "source": "29c66d4cbbaa2ea4bb76a671f11f5098837153ef",
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
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\market-floor-validation\\short-market-rescue-floor-proof-v1\\candidate",
      "creationUncertain": false,
      "worldId": "wbcc44134357cc4f945a0",
      "result": {
        "worldId": "wbcc44134357cc4f945a0",
        "score": {
          "marginCents": 100030,
          "revenueCents": 391700,
          "marginShare": 0.2553740107224917,
          "wonOrders": 43,
          "onTimeShare": 0.9069767441860465,
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
          "seed": "short-market-rescue-floor-proof-v1",
          "worldId": "wbcc44134357cc4f945a0",
          "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\market-floor-validation\\short-market-rescue-floor-proof-v1\\candidate",
          "quiet": true,
          "reveal": true
        },
        "elapsedSeconds": 32.453,
        "actionRefusals": 0
      }
    }
  ],
  "next": "Final audit and publish selected code only on keep, then freeze tuning",
  "pairs": [
    {
      "seed": "notes4-rescue-proof-b-v1",
      "delta": 145957,
      "onTime": 0.9503105590062112,
      "extraUndelivered": false,
      "extraRefusals": false
    },
    {
      "seed": "dispatch8-daily-a",
      "delta": 232853,
      "onTime": 0.9586206896551724,
      "extraUndelivered": false,
      "extraRefusals": false
    },
    {
      "seed": "dispatch8-daily-h",
      "delta": 109972,
      "onTime": 0.9765258215962441,
      "extraUndelivered": false,
      "extraRefusals": false
    },
    {
      "seed": "short-market-rescue-floor-proof-v1",
      "delta": -41910,
      "onTime": 0.9069767441860465,
      "extraUndelivered": false,
      "extraRefusals": false
    }
  ]
}
