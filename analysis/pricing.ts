import { readFile } from "node:fs/promises"
import type { Action, ActionResult, DeskEvent, Reveal } from "../typescript/types.ts"
import type { RunResult } from "../runner.ts"

type JournalEntry =
  | { type: "event"; event: DeskEvent }
  | { type: "decision"; requestId: string; accepted: boolean }
  | { type: "action"; at: number; action: Action; result: ActionResult }
  | { type: "result" }
  | { type: "run" }

function summarize(values: number[]) {
  values.sort((a, b) => a - b)
  return {
    count: values.length,
    mean: values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null,
    p50: values[Math.floor((values.length - 1) * 0.5)] ?? null,
    p90: values[Math.floor((values.length - 1) * 0.9)] ?? null,
  }
}

const prefixes = process.argv.slice(2)
if (!prefixes.length) throw new Error("Usage: node analysis/pricing.ts runs/<directory>/<worldId> [...]")

for (const prefix of prefixes) {
  const [resultFile, revealFile, journalFile] = await Promise.all(
    ["result.json", "reveal.json", "jsonl"].map(suffix => readFile(`${prefix}.${suffix}`, "utf8")),
  )
  const result: RunResult = JSON.parse(resultFile)
  if (!result.score) throw new Error(`Practice is incomplete: ${prefix}`)
  const reveal: Reveal = JSON.parse(revealFile)
  const entries: JournalEntry[] = journalFile.trim().split("\n").map(line => JSON.parse(line))
  const decisions = new Map<string, boolean>()
  const trust = new Map<string, number>()
  const dealerByOrder = new Map(reveal.requests.map(({ request }) => [request.id, request.dealerId]))
  const lastPickup = new Map<string, number>()
  const gigs = new Map<string, { at: number; orderIds: string[] }>()
  const trustAtQuote = new Map<string, number>()
  const seen = new Set<number>()
  const bookingDelays: number[] = []
  const bookingSlack: number[] = []
  const ledger: Record<string, { count: number; cents: number }> = {}
  const ledgerByDestination = new Map<string, Partial<Record<string, number>>>()
  const destinationByOrder = new Map<string, string>()
  for (const entry of entries) {
    if (entry.type === "decision") decisions.set(entry.requestId, entry.accepted)
    if (entry.type === "action" && entry.result.ok) {
      const { action, at } = entry
      if (action.type === "quote") trustAtQuote.set(action.requestId, trust.get(dealerByOrder.get(action.requestId) ?? "") ?? 0)
      if (action.type === "post") gigs.set(entry.result.id, { at, orderIds: [...new Set(action.stops.map(stop => stop.orderId))] })
    }
    if (entry.type !== "event" || seen.has(entry.event.seq)) continue
    const { event } = entry
    seen.add(event.seq)
    if (event.kind === "order_won") {
      destinationByOrder.set(event.order.id, event.order.legs[0]!.delivery.placeId)
    }
    if (event.kind === "order_won" || event.kind === "order_changed") lastPickup.set(event.order.id, event.order.lastPickupAt)
    if (event.kind === "deadline_close") lastPickup.set(event.orderId, event.lastPickupAt)
    if (event.kind === "gig_booked") {
      const gig = gigs.get(event.gigId)
      if (gig) {
        bookingDelays.push(event.at - gig.at)
        const deadlines = gig.orderIds.flatMap(id => lastPickup.has(id) ? [lastPickup.get(id)!] : [])
        if (deadlines.length) bookingSlack.push(Math.min(...deadlines) - event.at)
      }
    }
    if (event.kind === "ledger") {
      const { line } = event
      const total = ledger[line.kind] ??= { count: 0, cents: 0 }
      total.count++
      total.cents += line.cents
      const gigOrders = line.gigId ? gigs.get(line.gigId)?.orderIds : undefined
      const orderId = line.orderId ?? (gigOrders?.length === 1 ? gigOrders[0] : undefined)
      const destination = (orderId ? destinationByOrder.get(orderId) : undefined) ?? "unattributed"
      const destinationLedger = ledgerByDestination.get(destination) ?? {}
      destinationLedger[line.kind] = (destinationLedger[line.kind] ?? 0) + line.cents
      ledgerByDestination.set(destination, destinationLedger)
      const dealer = line.orderId ? dealerByOrder.get(line.orderId) : undefined
      if (dealer) {
        const count = trust.get(dealer) ?? 0
        if (line.kind === "revenue") trust.set(dealer, Math.min(25, count + 1))
        if (line.kind === "late_refund") trust.set(dealer, Math.floor(Math.max(0, count - 1) / 2))
      }
    }
  }

  const offers = reveal.requests.flatMap(({ request, quote, outcome }) => {
    if (!decisions.get(request.id) || !quote || outcome === "unquoted") return []
    const option = request.options.find(option => quote[option.kind] !== undefined)
    if (!option) return []
    const first = request.legs[0]!
    return [{
      lane: `${first.pickup.placeId} → ${first.delivery.placeId}`,
      won: outcome === "won",
      referenceFeeCents: request.referenceFeeCents,
      quoteToList: quote[option.kind]! / option.listPriceCents,
      trust: trustAtQuote.get(request.id) ?? null,
    }]
  })
  const lanes = new Map<string, { won: number; lost: number }>()
  const trustBands = new Map<string, { won: number; lost: number }>()
  for (const offer of offers) {
    const lane = lanes.get(offer.lane) ?? { won: 0, lost: 0 }
    lane[offer.won ? "won" : "lost"]++
    lanes.set(offer.lane, lane)
    const band = offer.trust === null ? "unknown" : offer.trust === 0 ? "0" : offer.trust < 10 ? "1–9" : "10–25"
    const counts = trustBands.get(band) ?? { won: 0, lost: 0 }
    counts[offer.won ? "won" : "lost"]++
    trustBands.set(band, counts)
  }
  const quoteSummary = (won: boolean) => {
    const group = offers.filter(offer => offer.won === won)
    return {
      count: group.length,
      referenceFeeCents: summarize(group.map(offer => offer.referenceFeeCents)),
      quoteToList: summarize(group.map(offer => offer.quoteToList)),
      trust: summarize(group.flatMap(offer => offer.trust === null ? [] : [offer.trust])),
    }
  }

  console.log(JSON.stringify({
    worldId: result.worldId,
    seed: result.options.seed,
    won: quoteSummary(true),
    lost: quoteSummary(false),
    declined: [...decisions.values()].filter(accepted => !accepted).length,
    unquoted: reveal.requests.filter(request => request.outcome === "unquoted").length,
    lanes: Object.fromEntries(lanes),
    trustBands: Object.fromEntries(trustBands),
    bookingsWithin180MinutesOfLastPickup: bookingSlack.filter(minutes => minutes <= 180).length,
    bookingDelayMinutes: summarize(bookingDelays),
    bookingSlackMinutes: summarize(bookingSlack),
    ledger,
    ledgerByDestination: Object.fromEntries(ledgerByDestination),
    ledgerMatchesScore: Object.values(ledger).reduce((sum, line) => sum + line.cents, 0) === result.score.marginCents,
  }))
}
