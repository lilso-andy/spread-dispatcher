import { mkdir, readFile, appendFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { Client, SpreadError, Unreachable } from "./typescript/spread.ts"
import type { World } from "./typescript/spread.ts"
import type { DeskEvent, DeskEventKind, Score } from "./typescript/types.ts"
import { Desk } from "./desk.ts"
import type { Config } from "./config.ts"

const WAKE: DeskEventKind[] = ["price_request", "order_won", "order_lost", "order_changed", "order_cancelled", "visit_failed", "gig_expired", "deadline_close", "gig_dropped", "no_show", "gig_booked", "gig_started", "picked_up", "delivered", "release", "forecast", "offer_answered"]
export const sleep = (ms: number) => new Promise<void>((done) => setTimeout(done, ms))
export type RunOptions = { level: number; seed?: string; board?: boolean; worldId?: string; final?: boolean; output?: string; reveal?: boolean; quiet?: boolean }
export type RunResult = { worldId: string; score: Score; config: Config; options: RunOptions; elapsedSeconds: number; actionRefusals: number }

export function report(label: string, score: Score): void {
  console.log(`${label}: margin €${(score.marginCents / 100).toFixed(2)}, ${score.wonOrders} orders, ${(score.onTimeShare * 100).toFixed(1)}% on time, ${(score.undeliveredShare * 100).toFixed(1)}% undelivered${score.ranked ? ", ranked" : ""}`)
}

/** Reads bounded pages so a long final history cannot be silently truncated. */
export async function historyOf(world: World): Promise<DeskEvent[]> {
  const history: DeskEvent[] = []
  let after = -1
  for (;;) {
    const page = await world.events(after, 1000)
    if (!page.length) return history
    history.push(...page)
    const next = page.at(-1)!.seq
    if (next <= after) throw new Error("Event pagination did not advance")
    after = next
    if (page.length < 1000) return history
  }
}

async function nextFinal(client: Client, quiet = false): Promise<World> {
  let said = false
  for (;;) {
    try {
      const final = await client.final()
      const world = client.world(final.worldId)
      const snapshot = await world.snapshot()
      if (snapshot.now < snapshot.endsAt) return world
    } catch (error) { if (!(error instanceof SpreadError && error.status === 404)) throw error }
    if (!said && !quiet) console.log("Waiting for a scheduled final. Practice/ranking runs are separate.")
    said = true
    await sleep(10000)
  }
}

export async function run(client: Client, config: Config, options: RunOptions): Promise<RunResult> {
  const started = Date.now()
  const output = options.output ?? "runs"
  await mkdir(output, { recursive: true })
  if (options.final && (options.board || options.seed)) throw new Error("--final cannot be combined with --board or --seed")
  if (options.board && options.seed) throw new Error("--board cannot be combined with --seed")
  let world: World
  if (options.worldId) world = client.world(options.worldId)
  else if (options.final) world = await nextFinal(client, options.quiet)
  else world = await client.create(options.level as 1|2|3|4|5|6|7|8, { seed: options.seed, board: options.board })
  // Check world kind, so --world can never advance a final accidentally.
  const summary = (await client.worlds()).find((w) => w.worldId === world.id)
  if (!summary) throw new Error(`World ${world.id} is not in this team's list`)
  const final = summary.kind === "final"
  const level = summary.level
  const file = join(output, `${world.id}.jsonl`)
  const meta = join(output, `${world.id}.result.json`)
  let queue: string[] = []
  let actionRefusals = 0
  const log = (entry: Record<string, unknown>) => {
    if (entry.type === "action" && (entry.result as {ok:boolean})?.ok === false) actionRefusals++
    queue.push(JSON.stringify(entry) + "\n")
  }
  async function flush(): Promise<void> { if (queue.length) { const text = queue.join(""); queue = []; await appendFile(file, text) } }
  log({ type: "run", worldId: world.id, config, level, seed: options.seed, final, board: summary.season !== null, startedAt: new Date().toISOString() })
  // Persist the id before any advance. An interrupted practice can resume with --world.
  await writeFile(meta, JSON.stringify({ worldId: world.id, state: "running", config, options }, null, 2))
  if (!options.quiet) console.log(`${final ? "Final" : "Practice"} world ${world.id}, level ${level}. Resume with --world ${world.id}.`)
  const map = await client.map()
  let retries = 0
  for (;;) {
    try {
      const history = await historyOf(world)
      const snapshot = await world.snapshot()
      const desk = new Desk(config, level, map, await world.roster(), log)
      desk.restore(snapshot, history)
      // Restore offer quotas from our journal, not guesses about the driver's hidden day.
      try {
        const journal = await readFile(file, "utf8")
        for (const row of journal.split("\n")) {
          if (!row) continue
          let e: any; try { e = JSON.parse(row) } catch { continue } // trailing write interrupted
          if (e.type === "action" && e.action.type === "offer") {
            const a = e.action
            const day = Math.floor(e.at / 1440)
            const key = `${day}:${a.driverId}`
            desk.offerCounts.set(key, (desk.offerCounts.get(key) ?? 0) + 1)
            desk.offerTried.add(`${a.gigId}:${a.driverId}`)
            if (e.at + 11 > desk.now) desk.offerUntil.set(`${a.gigId}:${a.driverId}`, e.at + 11)
          }
        }
      } catch (error: any) { if (error.code !== "ENOENT") throw error }
      let reportedDay = Math.floor(desk.now / 1440)
      if (final) {
        if (desk.now < desk.endsAt) {
          const initial = desk.actions()
          if (initial.length) desk.results(initial, await world.act(initial))
          await flush()
          for await (const event of world.stream({ after: desk.seq, idleMs: 350 })) {
            // Server time is authoritative; do not quote using a lagging event timestamp.
            if (event) desk.handle(event)
            if (!event || event.kind === "price_request") desk.now = Math.max(desk.now, (await client.final()).now)
            if (desk.now >= desk.endsAt) break
            const actions = desk.actions()
            if (actions.length) desk.results(actions, await world.act(actions))
            await flush()
            if (Math.floor(desk.now / 1440) > reportedDay) {
              desk.score = await world.score()
              if (!options.quiet) report(`Day ${reportedDay+1}`, desk.score)
              reportedDay = Math.floor(desk.now / 1440)
            }
          }
          const last = await world.snapshot()
          if (last.now < last.endsAt) throw new Unreachable(0, "Stream ended before the world; rebuilding")
        }
      } else {
        while (desk.now < desk.endsAt) {
          const actions = desk.actions()
          const before = desk.now
          const step = await world.advance({ untilEvent: WAKE, max: Math.min(desk.endsAt, desk.now + 30, (reportedDay+1) * 1440), actions })
          desk.results(actions, step.results)
          desk.now = step.now
          for (const e of step.events) desk.handle(e)
          if (step.now <= before && !step.events.length) throw new Error("Practice clock did not progress")
          await flush()
          if (Math.floor(desk.now / 1440) > reportedDay) {
            desk.score = await world.score()
            if (!options.quiet) report(`Day ${reportedDay+1}`, desk.score)
            reportedDay = Math.floor(desk.now / 1440)
          }
          retries = 0
        }
      }
      break
    } catch (error) {
      await flush()
      if (!(error instanceof Unreachable) || ++retries > 12) {
        console.error(`World ${world.id} preserved. Resume with --world ${world.id}. No ranking run was deleted.`)
        throw error
      }
      console.error(`Connection lost; rebuilding ${world.id} from server state in 5s (${retries}/12).`)
      // A timed-out mutation may already have happened. Never blindly resend its actions.
      await sleep(5000)
    }
  }
  const score = await world.score()
  const result: RunResult = { worldId: world.id, score, config, options, elapsedSeconds: (Date.now()-started)/1000, actionRefusals }
  log({ type: "result", ...result }); await flush()
  await writeFile(meta, JSON.stringify(result, null, 2))
  if (options.reveal && summary.season === null && !summary.boardRun) await writeFile(join(output, `${world.id}.reveal.json`), JSON.stringify(await world.reveal()))
  if (!options.quiet) report("End", score)
  return result
}
