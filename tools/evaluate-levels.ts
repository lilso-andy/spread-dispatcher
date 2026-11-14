import { parseArgs } from "node:util"
import { readFile, mkdir, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { execFileSync } from "node:child_process"
import { Client } from "../typescript/spread.ts"
import { defaults, validateConfig } from "../config.ts"
import { run } from "../runner.ts"
import type { RunResult } from "../runner.ts"

const { values } = parseArgs({ options: {
  levels: { type: "string", default: "1,2,3,4,5,6,7,8" },
  seeds: { type: "string", default: "spread-1,study-2" },
  config: { type: "string" }, output: { type: "string", default: "runs/levels" },
  reveal: { type: "boolean" }, help: { type: "boolean" },
} })
if (values.help) {
  console.log("node --env-file=.env tools/evaluate-levels.ts --levels 1,2,3,4,5,6,7,8 --seeds spread-1,study-2 --config FILE --output DIR [--reveal]")
  console.log("Plain practice only; sequential worlds, no ranking or final switches. Saves failures and continues the matrix.")
  process.exit(0)
}
const levels = values.levels.split(",").map(Number)
if (!levels.length || levels.some(n => !Number.isInteger(n) || n < 1 || n > 8) || new Set(levels).size !== levels.length) throw Error("Supply unique levels from 1 to 8")
const seeds = values.seeds.split(",").map(s => s.trim()).filter(Boolean)
if (!seeds.length || new Set(seeds).size !== seeds.length) throw Error("Supply unique nonempty seeds")
const config = values.config ? validateConfig(JSON.parse(await readFile(values.config, "utf8"))) : defaults
const source = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim()
const client = new Client()
const results: RunResult[] = []
await mkdir(values.output, { recursive: true })
const summaryFile = join(values.output, `matrix-${Date.now()}.json`)
async function save() {
  const byLevel = levels.map(level => {
    const rows = results.filter(r => r.options.level === level)
    return { level, completed: rows.length, planned: seeds.length,
      marginCents: rows.reduce((n, r) => n + r.score.marginCents, 0),
      qualified: rows.filter(r => r.score.ranked).length,
      worstOnTimeShare: rows.length ? Math.min(...rows.map(r => r.score.onTimeShare)) : null,
      failedSeeds: rows.filter(r => !r.score.ranked).map(r => r.options.seed),
      actionRefusals: rows.reduce((n, r) => n + r.actionRefusals, 0) }
  })
  await writeFile(summaryFile, JSON.stringify({ source, config, levels, seeds, complete: results.length === levels.length * seeds.length, byLevel, results }, null, 2) + "\n")
  return byLevel
}
await save()
for (const level of levels) for (const seed of seeds) {
  console.log(`Practice matrix: level ${level}, seed ${seed}, source ${source.slice(0, 7)}`)
  results.push(await run(client, config, { level, seed, output: join(values.output, `level-${level}`), reveal: values.reveal }))
  await save()
}
console.table(await save())
console.log(summaryFile)
if (results.some(r => !r.score.ranked)) process.exitCode = 2
