import { parseArgs } from "node:util"
import { readFile } from "node:fs/promises"
import { pathToFileURL } from "node:url"
import { Client } from "./typescript/spread.ts"
import { defaults, validateConfig } from "./config.ts"
import { run } from "./runner.ts"

export async function main(): Promise<void> {
  const { values: args } = parseArgs({ options: {
    help: { type: "boolean" }, level: { type: "string", default: "8" }, seed: { type: "string" },
    board: { type: "boolean" }, final: { type: "boolean" }, world: { type: "string" },
    config: { type: "string" }, output: { type: "string", default: "runs" }, reveal: { type: "boolean" },
  } })
  if (args.help) {
    console.log("node --env-file-if-exists=.env dispatch.ts [--level 1-8] [--seed text] [--config file.json] [--reveal]\n  --world id  resume a preserved world\n  --final     wait for and run the scheduled final\n  --board     consume one of your five ranking runs (explicit opt-in)\n  --output dir  logs and results, default runs/")
    return
  }
  const level = Number(args.level)
  if (!Number.isInteger(level) || level < 1 || level > 8) throw new Error("--level must be an integer from 1 to 8")
  if (args.world && (args.seed || args.board || args.final)) throw new Error("--world cannot be combined with --seed, --board or --final")
  const config = args.config ? validateConfig(JSON.parse(await readFile(args.config, "utf8"))) : defaults
  process.env.SPREAD_URL ??= "https://spread.bahnexpress.com"
  await run(new Client(), config, { level, seed: args.seed, board: args.board, final: args.final, worldId: args.world, output: args.output, reveal: args.reveal })
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main().catch((error) => { console.error(error.message); process.exitCode = 1 })
