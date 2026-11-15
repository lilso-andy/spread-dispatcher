# Two additional preregistered rescue confirmation seeds

{
  "pid": 21420,
  "branch": "work/notes-thanhdatLUT",
  "state": "running",
  "source": "db510d229e21aa5441ba896ab39eaff5c055310a",
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
  "candidate": {
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
  "seeds": [
    "notes4-rescue-proof-b-v1",
    "notes4-rescue-proof-c-v1"
  ],
  "priorProof": {
    "seed": "notes4-selected-proof-v1",
    "delta": 0,
    "decision": "reject"
  },
  "hypothesis": "Four development seeds all gained total690.88EUR; first independent proof tied0 and baseline retained. Two ADDITIONAL untouched seeds declared before either is scored, no parameter tuning. Require BOTH new seeds strictly positive and EVERY candidate >=93% with no additional undelivered/refusals; include old zero proof in all reporting. If either fails, retain baseline. Do not select only a favorable seed.",
  "decision": "pending",
  "runs": [
    {
      "side": "baseline",
      "seed": "notes4-rescue-proof-b-v1",
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
      "output": "C:\\Users\\thanh\\Documents\\Codex\\2026-11-14\\t\\work\\rescue-two-proofs\\notes4-rescue-proof-b-v1\\baseline",
      "creationUncertain": false,
      "worldId": "w51b2097dd189d028f240"
    }
  ],
  "next": "finish owned w51b2097dd189d028f240"
}
