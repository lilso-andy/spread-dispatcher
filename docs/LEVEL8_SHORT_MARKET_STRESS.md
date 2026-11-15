# Short-public intraday market stress confirmation

{
  "pid": 26956,
  "state": "running",
  "branch": "work/notes-thanhdatLUT",
  "seed": "notes4-rescue-proof-b-v1",
  "source": "cb1cdc72d723e4b2db4fa083fe42365da58e18cc",
  "candidateSource": "18a249785f5c328e7ba8dd5fcdcb4dec4a7b1fc2",
  "decision": "pending",
  "hypothesis": "Additional preregistered known stress week where fallback/emergency18 both reached92.126%. No code/config tuning. Before promotion require candidate>=93%, no extra undelivered/refusals, and positive total margin across primary3pairs plus this stress pair. Primary untouched proof must remain positive; retain every negative seed result.",
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
      "worldId": "w517c4dc1521dfe864458"
    }
  ],
  "next": "finish owned w517c4dc1521dfe864458"
}
