# Combined short-market discount and rescue-cost floor

{
  "pid": 36216,
  "branch": "work/notes-thanhdatLUT",
  "state": "running",
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
  "decision": "pending",
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
    }
  ],
  "next": "Push pair dispatch8-daily-a"
}
