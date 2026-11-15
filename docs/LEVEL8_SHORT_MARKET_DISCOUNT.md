# Short-public intraday market discount

{
  "pid": 36312,
  "branch": "work/notes-thanhdatLUT",
  "state": "completed",
  "source": "cb1cdc72d723e4b2db4fa083fe42365da58e18cc",
  "candidateSource": "18a249785f5c328e7ba8dd5fcdcb4dec4a7b1fc2",
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
  "decision": "keep",
  "holdout": "short-market-proof-v1",
  "hypothesis": "Latest group18d broad discount gains but daily-a91.78% fails93%. Compare accepted pre-discount fallback cb1 with a candidate integrating18d broad-loss signal ONLY on single-car public nonpremium routes<=120min. Other jobs retain original fallback prices, all posted fees unchanged. Reactive service guard failed90.77%, so no reactive gate combined. Visible ended snapshots show full daily policy adds10different wins (6shortpublic/4other) and loses3 versus oldcontrol on daily-a; not same-order causal attribution. Opportunity scenario EUR300-1500/week assumes recovering some adverse medium/private exposure while retaining some daily-h uplift3837.96; not a guarantee. Primary known seeds daily-a/h, BOTH completed regardless a failure for complete attribution; promote only if everycandidate>=93%, pooled positive, then new untouched proof positive and known stressB also passes before deployment. Controls from team metadata require exact cb1/config/level/seed, snapshotReads1, ended backend score and complete server ledger verification. Latest18d is a reference, not accepted control, because its91.78% week violates user93%.",
  "runs": [
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
      }
    },
    {
      "side": "candidate",
      "seed": "dispatch8-daily-a",
      "level": 8,
      "source": "18a249785f5c328e7ba8dd5fcdcb4dec4a7b1fc2",
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
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\short-market-validation\\dispatch8-daily-a\\candidate",
      "creationUncertain": false,
      "worldId": "w26ce762a32fe98e8e920",
      "result": {
        "worldId": "w26ce762a32fe98e8e920",
        "score": {
          "marginCents": 605912,
          "revenueCents": 1999400,
          "marginShare": 0.30304691407422224,
          "wonOrders": 163,
          "onTimeShare": 0.9570552147239264,
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
          "worldId": "w26ce762a32fe98e8e920",
          "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\short-market-validation\\dispatch8-daily-a\\candidate",
          "quiet": true,
          "reveal": true
        },
        "elapsedSeconds": 52.234,
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
      }
    },
    {
      "side": "candidate",
      "seed": "dispatch8-daily-h",
      "level": 8,
      "source": "18a249785f5c328e7ba8dd5fcdcb4dec4a7b1fc2",
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
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\short-market-validation\\dispatch8-daily-h\\candidate",
      "creationUncertain": false,
      "worldId": "w2e865d0606616a8d00f9",
      "result": {
        "worldId": "w2e865d0606616a8d00f9",
        "score": {
          "marginCents": 1038083,
          "revenueCents": 3129200,
          "marginShare": 0.33174070049853,
          "wonOrders": 229,
          "onTimeShare": 0.9912663755458515,
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
          "worldId": "w2e865d0606616a8d00f9",
          "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\short-market-validation\\dispatch8-daily-h\\candidate",
          "quiet": true,
          "reveal": true
        },
        "elapsedSeconds": 56.239,
        "actionRefusals": 0
      }
    },
    {
      "side": "baseline",
      "seed": "short-market-proof-v1",
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
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\short-market-validation\\short-market-proof-v1\\baseline",
      "creationUncertain": false,
      "worldId": "w33f17b23dc6c8875e0af",
      "result": {
        "worldId": "w33f17b23dc6c8875e0af",
        "score": {
          "marginCents": 1169142,
          "revenueCents": 3370800,
          "marginShare": 0.34684407262370953,
          "wonOrders": 257,
          "onTimeShare": 0.9883268482490273,
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
          "seed": "short-market-proof-v1",
          "worldId": "w33f17b23dc6c8875e0af",
          "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\short-market-validation\\short-market-proof-v1\\baseline",
          "quiet": true,
          "reveal": true
        },
        "elapsedSeconds": 64.375,
        "actionRefusals": 0
      }
    },
    {
      "side": "candidate",
      "seed": "short-market-proof-v1",
      "level": 8,
      "source": "18a249785f5c328e7ba8dd5fcdcb4dec4a7b1fc2",
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
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\short-market-validation\\short-market-proof-v1\\candidate",
      "creationUncertain": false,
      "worldId": "wc8c2686dfeb7792780db",
      "result": {
        "worldId": "wc8c2686dfeb7792780db",
        "score": {
          "marginCents": 1220666,
          "revenueCents": 3407900,
          "marginShare": 0.3581871533789137,
          "wonOrders": 262,
          "onTimeShare": 1,
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
          "seed": "short-market-proof-v1",
          "worldId": "wc8c2686dfeb7792780db",
          "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\short-market-validation\\short-market-proof-v1\\candidate",
          "quiet": true,
          "reveal": true
        },
        "elapsedSeconds": 58.259,
        "actionRefusals": 0
      }
    }
  ],
  "next": "Audit, then known stressB before any promotion if primary keep",
  "pairs": [
    {
      "seed": "dispatch8-daily-a",
      "delta": 341683,
      "onTime": 0.9570552147239264,
      "extraUndelivered": false,
      "extraRefusals": false
    },
    {
      "seed": "dispatch8-daily-h",
      "delta": 278199,
      "onTime": 0.9912663755458515,
      "extraUndelivered": false,
      "extraRefusals": false
    },
    {
      "seed": "short-market-proof-v1",
      "delta": 51524,
      "onTime": 1,
      "extraUndelivered": false,
      "extraRefusals": false
    }
  ]
}

Baseline93/candidate97 tests passed. No ranking/final, no raw logs/reveal/key committed.
