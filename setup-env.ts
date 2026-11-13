import { constants } from "node:fs"
import { copyFile, readFile } from "node:fs/promises"
import { parseArgs, parseEnv } from "node:util"

const { values } = parseArgs({ options: { check: { type: "boolean" }, help: { type: "boolean" } } })
if (values.help) {
  console.log("node setup-env.ts          Create a local .env from .env.example without overwriting it.")
  console.log("node setup-env.ts --check  Check local/environment configuration without displaying credentials.")
  process.exit(0)
}
const local = new URL(".env", import.meta.url)
if (!values.check) {
  try {
    await copyFile(new URL(".env.example", import.meta.url), local, constants.COPYFILE_EXCL)
    console.log("Created local .env. Set SPREAD_KEY privately, then run: node setup-env.ts --check")
  } catch (error: any) {
    if (error.code !== "EEXIST") throw error
    console.log("Local .env already exists; left it unchanged.")
  }
} else {
  let file: Record<string, string> = {}
  try { file = parseEnv(await readFile(local, "utf8")) }
  catch (error: any) { if (error.code !== "ENOENT") throw error }
  const key = process.env.SPREAD_KEY ?? file.SPREAD_KEY
  const url = process.env.SPREAD_URL ?? file.SPREAD_URL ?? "https://spread.bahnexpress.com"
  let validUrl = false
  try { validUrl = ["https:", "http:"].includes(new URL(url).protocol) } catch {}
  if (!key?.trim() || key.trim() === "your-team-key" || !validUrl) {
    console.error("Configuration incomplete. Set a real SPREAD_KEY and valid SPREAD_URL in your local .env or task environment. Credential values are not displayed.")
    process.exitCode = 1
  } else console.log("Configuration present. No credential values displayed; server authentication has not been tested.")
}
