# Intraday loss discount with service risk gate

{
  "pid": 34372,
  "branch": "work/notes-thanhdatLUT",
  "state": "running",
  "source": "18d22250d97f15d5415c5aff4d807b1cfd63acbf",
  "candidateSource": "76771f0d9155e829579fe0955c0fb7e339c064ca",
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
  "hypothesis": "Latest group18d2225 broad intraday loss discount0.12 gained2866.77EUR across8dev+1proof but one candidate week91.78% fails this users93% gate. On this NEW baseline, disable only the extra broad discount when (known completed-late plus overdue-undelivered)/(completed plus overdue)>2% after10known outcomes. Retain base quotes, floors, learned dealer adjustment, all constraints and original4.5% quote pause. Parameter-free reuse of existing2% long-route service threshold. Opportunity EUR300-1000/adverse week assumes partial recovery of daily-a loss342.84EUR and known long-route loss cohort; not guaranteed or additive. Compare exact latest18d source against guard on known weak daily-a and highest-gain daily-h; candidate everyweek>=93%, positive pooled margin then new untouched daily-service-guard-proof-v1 strictly positive. No deployment until proof. Team docs use90% but this experiment retains users93%. No losing previous short-job policy combined.",
  "holdout": "daily-service-guard-proof-v1",
  "decision": "pending",
  "runs": [
    {
      "seed": "dispatch8-daily-a",
      "level": 8,
      "side": "baseline",
      "source": "18d22250d97f15d5415c5aff4d807b1cfd63acbf",
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
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\daily-service-validation\\dispatch8-daily-a\\baseline",
      "creationUncertain": false,
      "worldId": "w5e559e9ebc15cf0b32cc",
      "result": {
        "worldId": "w5e559e9ebc15cf0b32cc",
        "score": {
          "marginCents": 229945,
          "revenueCents": 998000,
          "marginShare": 0.2304058116232465,
          "wonOrders": 73,
          "onTimeShare": 0.9178082191780822,
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
          "worldId": "w5e559e9ebc15cf0b32cc",
          "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\daily-service-validation\\dispatch8-daily-a\\baseline",
          "quiet": true,
          "reveal": true
        },
        "elapsedSeconds": 37.871,
        "actionRefusals": 0
      }
    },
    {
      "seed": "dispatch8-daily-a",
      "level": 8,
      "side": "candidate",
      "source": "76771f0d9155e829579fe0955c0fb7e339c064ca",
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
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\daily-service-validation\\dispatch8-daily-a\\candidate",
      "creationUncertain": false,
      "worldId": "wf84629cd773bb217245c",
      "result": {
        "worldId": "wf84629cd773bb217245c",
        "score": {
          "marginCents": 207951,
          "revenueCents": 926500,
          "marginShare": 0.22444792228818133,
          "wonOrders": 65,
          "onTimeShare": 0.9076923076923077,
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
          "worldId": "wf84629cd773bb217245c",
          "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\daily-service-validation\\dispatch8-daily-a\\candidate",
          "quiet": true,
          "reveal": true
        },
        "elapsedSeconds": 36.992,
        "actionRefusals": 0
      }
    }
  ],
  "next": "Push pair dispatch8-daily-a"
}

Baseline93/candidate95 tests pass. Never ranking/final here.
