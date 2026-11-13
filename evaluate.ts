import { parseArgs } from "node:util"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { Client } from "./typescript/spread.ts"
import { defaults, validateConfig } from "./config.ts"
import { run } from "./runner.ts"
import type { RunResult } from "./runner.ts"

const { values: args } = parseArgs({ options: {
  seeds: { type: "string", default: "spread-1,study-2,holdout-3" }, level: { type: "string", default: "8" },
  config: { type: "string" }, output: { type: "string", default: "runs" }, reveal: { type: "boolean" },
} })
const level = Number(args.level)
if (!Number.isInteger(level) || level < 1 || level > 8) throw new Error("--level must be 1 to 8")
const seeds = args.seeds.split(",").map((s) => s.trim()).filter(Boolean)
if (!seeds.length) throw new Error("Supply at least one seed")
const config = args.config ? validateConfig(JSON.parse(await readFile(args.config, "utf8"))) : defaults
process.env.SPREAD_URL ??= "https://spread.bahnexpress.com"
const client = new Client()
const results: RunResult[] = []
// Sequential by default: teammates also need slots and the same team's rate bucket.
for (const seed of seeds) results.push(await run(client, config, { level, seed, output: args.output, reveal: args.reveal }))
const totalOrders = results.reduce((n, r) => n+r.score.wonOrders, 0)
const summary = {
  config, level, seeds, rankedRuns: results.filter((r) => r.score.ranked).length, runs: results.length,
  allRanked: results.every((r) => r.score.ranked),
  totalMarginCents: results.reduce((n, r) => n+r.score.marginCents, 0),
  minOnTimeShare: Math.min(...results.map((r) => r.score.onTimeShare)),
  weightedOnTimeShare: totalOrders ? results.reduce((n,r) => n+r.score.onTimeShare*r.score.wonOrders, 0)/totalOrders : 0,
  results,
}
await mkdir(args.output, { recursive: true })
const file = join(args.output, `evaluation-${Date.now()}.json`)
await writeFile(file, JSON.stringify(summary, null, 2))
console.log(`Ranked ${summary.rankedRuns}/${summary.runs}; margin €${(summary.totalMarginCents/100).toFixed(2)}; worst on-time ${(summary.minOnTimeShare*100).toFixed(1)}%. ${file}`)
if (!summary.allRanked) process.exitCode = 2
