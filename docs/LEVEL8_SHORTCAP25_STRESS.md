# Short-job capacity25 known stress confirmation

{
  "pid": 4780,
  "state": "completed",
  "branch": "work/notes-thanhdatLUT",
  "seed": "notes4-rescue-proof-b-v1",
  "source": "ced25ae8bbbaba4c11b3a29ccb2d75d08996bf90",
  "candidateSource": "68b526b3a2decdc05eaaad02c18963225437a711",
  "decision": "reject",
  "hypothesis": "Additional preregistered known stress week where fallback/emergency18 both reached92.126%. No code/config tuning. Before promotion require candidate>=93%, no extra undelivered/refusals, and positive total margin across primary3pairs plus this stress pair. Primary untouched proof must remain positive; retain every negative seed result.",
  "runs": [
    {
      "side": "baseline",
      "seed": "notes4-rescue-proof-b-v1",
      "level": 8,
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
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\shortcap25-stress\\baseline",
      "creationUncertain": false,
      "worldId": "w60b8484fbc4da08a53be",
      "result": {
        "worldId": "w60b8484fbc4da08a53be",
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
          "worldId": "w60b8484fbc4da08a53be",
          "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\shortcap25-stress\\baseline",
          "quiet": true,
          "reveal": true
        },
        "elapsedSeconds": 45.031,
        "actionRefusals": 0
      }
    },
    {
      "side": "candidate",
      "seed": "notes4-rescue-proof-b-v1",
      "level": 8,
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
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\shortcap25-stress\\candidate",
      "creationUncertain": false,
      "worldId": "wa866bc0d05cb53eb5e73",
      "result": {
        "worldId": "wa866bc0d05cb53eb5e73",
        "score": {
          "marginCents": 415481,
          "revenueCents": 1543100,
          "marginShare": 0.2692508586611367,
          "wonOrders": 132,
          "onTimeShare": 0.9090909090909091,
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
          "seed": "notes4-rescue-proof-b-v1",
          "worldId": "wa866bc0d05cb53eb5e73",
          "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\shortcap25-stress\\candidate",
          "quiet": true,
          "reveal": true
        },
        "elapsedSeconds": 41.517,
        "actionRefusals": 0
      }
    }
  ],
  "next": "Audit primary plus stress and promote only if keep",
  "delta": 20041,
  "pooledDelta": 108269
}
