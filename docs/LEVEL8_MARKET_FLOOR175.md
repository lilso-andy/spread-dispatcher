# Combined short-market discount and rescue-cost floor

{
  "pid": 17908,
  "branch": "work/notes-thanhdatLUT",
  "state": "running",
  "source": "cb1cdc72d723e4b2db4fa083fe42365da58e18cc",
  "candidateSource": "d3406540603e2b996f1472a06b1e3c9736423426",
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
  "holdout": "short-market-floor175-proof-v1",
  "hypothesis": "Budget-limited final refinement, maximum4new practice worlds and no further tuning: retain short-public intraday signal, reduce long-route cost estimate1.85reference to1.75reference; actual posted/rescue fees unchanged. Previous1.85 policy dev+4887.82EUR but heldout44orders90.70%/-419.10EUR, rejected. That old proof becomes an explicitly KNOWN development seed, never reused as untouched proof. Test it first then knownB, exact cachedcb1 baseline full config/seed/ended-score checks. Estimate opportunity recoveringEUR100-500/adverse week by retaining some profitable long cars, uncertain interaction. Require bothcandidate>=93%, positive pooled margin then new untouched short-market-floor175-proof-v1 strictly positive. No A/H gains from1.85 policy count as1.75 evidence. Stop immediately on service failure, freeze after this trial and push checkpoints before quota exhaustion.",
  "runs": [
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
      },
      "cached": true
    },
    {
      "side": "candidate",
      "seed": "short-market-rescue-floor-proof-v1",
      "level": 8,
      "source": "d3406540603e2b996f1472a06b1e3c9736423426",
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
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\market175-validation\\short-market-rescue-floor-proof-v1\\candidate",
      "creationUncertain": false,
      "worldId": "wf8d6d8860e3ef8cffdf5",
      "result": {
        "worldId": "wf8d6d8860e3ef8cffdf5",
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
          "worldId": "wf8d6d8860e3ef8cffdf5",
          "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\market175-validation\\short-market-rescue-floor-proof-v1\\candidate",
          "quiet": true,
          "reveal": true
        },
        "elapsedSeconds": 33.886,
        "actionRefusals": 0
      }
    }
  ],
  "next": "Push pair short-market-rescue-floor-proof-v1"
}
