import type { Action, ActionResult, DeskEvent, DeskSnapshot, DriverProfile, Gig, Order, PostAction, PriceRequest, Score, WorldMap } from "./typescript/types.ts"
import type { Config } from "./config.ts"
import { DAY, readNote } from "./notes.ts"
import type { NoteFacts } from "./notes.ts"
import { asOrder, eligible, Network, routeFor } from "./planner.ts"
import type { Route } from "./planner.ts"

export type Log = (entry: Record<string, unknown>) => void
type Decision = { accepted: boolean; price: number; reference: number; route?: Route; expires: number; reason: string }
type Fix = { from: number; manual: boolean; plates: boolean; count: number }
type KnownPosition = { place: string; at: number }
const legKey = (order: string, leg: number) => `${order}:${leg}`
const live = (gig: Gig) => ["open", "booked", "working"].includes(gig.status)

/** Pure decision engine. Network I/O and durable logging live in runner.ts. */
export class Desk {
  config: Config
  level: number
  network: Network
  roster: DriverProfile[]
  now = 0
  endsAt = 14280
  seq = -1
  requests = new Map<string, PriceRequest>()
  orders = new Map<string, Order>()
  gigs = new Map<string, Gig>()
  decisions = new Map<string, Decision>()
  fixes = new Map<string, Fix>()
  initialReadyShift = new Map<string, number>()
  replan = new Set<string>()
  picked = new Set<string>()
  failed = new Set<string>() // gig:order:leg; failed legs leave a continuing multi-car gig
  positions = new Map<string, KnownPosition>()
  viewers = new Map<string, Set<string>>()
  offerCounts = new Map<string, number>()
  offerUntil = new Map<string, number>()
  offerTried = new Set<string>()
  forecasts: Extract<DeskEvent, { kind: "forecast" }>[] = []
  trust = new Map<string, number>()
  quotedOutcome = new Set<string>()
  market = new Map<string, number>()
  cooldown = new Map<string, number>()
  lastReprice = new Map<string, number>()
  observedBookings = new Map<string, number[]>()
  score: Score | undefined
  log: Log

  constructor(config: Config, level: number, map: WorldMap, roster: DriverProfile[], log: Log = () => {}) {
    this.config = config; this.level = level; this.network = new Network(map); this.roster = roster; this.log = log
  }

  restore(snapshot: DeskSnapshot, history: DeskEvent[]): void {
    for (const event of history) this.handle(event, true)
    this.now = snapshot.now; this.endsAt = snapshot.endsAt; this.score = snapshot.score
    this.orders = new Map(snapshot.orders.map((o) => [o.id, structuredClone(o)]))
    this.gigs = new Map(snapshot.gigs.map((g) => [g.id, structuredClone(g)]))
    for (const event of history) if (event.kind === "order_changed") {
      for (const g of this.gigs.values()) if (g.status === "open" && g.postedAt < event.at && g.stops.some((s) => s.orderId === event.order.id)) this.replan.add(g.id)
    }
    for (const p of snapshot.driverPositions) this.positions.set(p.driverId, { place: p.placeId, at: snapshot.now })
    for (const r of snapshot.openRequests) this.requests.set(r.id, r)
    // Pending quotes are recomputed with capacity reservations in the new process.
    this.decisions.clear()
  }

  facts(orderId: string): NoteFacts {
    const r = this.requests.get(orderId)
    const facts = readNote(r?.note ?? null, r?.arrivedAt ?? this.now)
    const order = this.orders.get(orderId)
    if (r && order) {
      const delay = this.initialReadyShift.get(order.id) ?? 0
      // The server's moved deadline exposes a whole-day readiness delay, not its hidden hour.
      if (delay >= DAY) facts.pickupFrom = Math.max(facts.pickupFrom ?? 0, order.legs[0]!.pickup.window.from + delay)
    }
    return facts
  }

  handle(event: DeskEvent, replay = false): void {
    if (event.seq <= this.seq) return
    this.seq = event.seq
    this.now = Math.max(this.now, event.at)
    if (!replay) this.log({ type: "event", event })
    switch (event.kind) {
      case "price_request": this.requests.set(event.request.id, event.request); break
      case "order_won":
        if (!this.orders.has(event.order.id)) this.orders.set(event.order.id, structuredClone(event.order))
        if (!this.initialReadyShift.has(event.order.id)) {
          const r = this.requests.get(event.order.id)
          const promised = r?.options.find((o) => o.kind === event.order.option)?.deadline ?? event.order.deadline
          this.initialReadyShift.set(event.order.id, Math.max(0, event.order.deadline-promised))
        }
        this.learnQuote(event.order.id, true)
        break
      case "order_lost": this.learnQuote(event.requestId, false); break
      case "order_changed":
        this.orders.set(event.order.id, structuredClone(event.order))
        for (const g of this.gigs.values()) if (g.status === "open" && g.stops.some((s) => s.orderId === event.order.id)) this.replan.add(g.id)
        break
      case "order_cancelled": {
        const o = this.orders.get(event.orderId); if (o) o.status = "cancelled"
        for (const change of event.gigs) {
          const g = this.gigs.get(change.gigId)
          if (g && ["withdrawn", "released"].includes(change.outcome)) g.status = "withdrawn"
        }
        break
      }
      case "gig_viewed":
        if (!this.viewers.has(event.gigId)) this.viewers.set(event.gigId, new Set())
        this.viewers.get(event.gigId)!.add(event.driverId)
        break
      case "gig_booked": {
        const g = this.gigs.get(event.gigId)
        if (g) {
          g.status = "booked"; g.driverId = event.driverId; g.feeCents = event.feeCents
          const ids = [...new Set(g.stops.map((s) => s.orderId))]
          const reference = ids.reduce((sum, id) => sum + (this.requests.get(id)?.referenceFeeCents ?? 0), 0)
          if (reference > 0) {
            const place = this.orders.get(ids[0]!)?.legs[g.stops[0]!.leg]?.pickup.placeId
            if (place) {
              const samples = this.observedBookings.get(place) ?? []
              samples.push(event.feeCents / reference)
              this.observedBookings.set(place, samples.slice(-30))
            }
          }
        }
        break
      }
      case "gig_started": { const g = this.gigs.get(event.gigId); if (g) g.status = "working"; break }
      case "gig_dropped": case "no_show": {
        const g = this.gigs.get(event.gigId)
        if (g) { g.status = "open"; g.driverId = null; this.lastReprice.delete(g.id) }
        break
      }
      case "gig_expired": { const g = this.gigs.get(event.gigId); if (g) g.status = "withdrawn"; break }
      case "picked_up": this.picked.add(legKey(event.orderId, event.leg)); break
      case "visit_failed": {
        this.failed.add(`${event.gigId}:${legKey(event.orderId, event.leg)}`)
        const key = legKey(event.orderId, event.leg)
        const fix = this.fixes.get(key) ?? { from: 0, manual: false, plates: false, count: 0 }
        fix.count++
        fix.manual ||= event.reason === "licence"
        fix.plates ||= event.reason === "no_plates"
        if (event.reason === "closed" || event.reason === "not_ready") fix.from = event.at + Math.min(360, 60 * 2 ** Math.min(fix.count, 3))
        this.fixes.set(key, fix)
        this.picked.delete(key)
        break
      }
      case "delivered": {
        const o = this.orders.get(event.orderId)
        if (o) {
          o.deliveredAt[event.leg] = event.at
          if (o.deliveredAt.every((v) => v !== null)) o.status = "delivered"
        }
        this.picked.delete(legKey(event.orderId, event.leg))
        const g = this.gigs.get(event.gigId)
        if (g?.driverId) this.positions.set(g.driverId, { place: event.placeId, at: event.at })
        if (g && g.stops.filter((s) => s.kind === "delivery").every((s) => this.failed.has(`${g.id}:${legKey(s.orderId, s.leg)}`) || this.orders.get(s.orderId)?.status === "cancelled" || this.orders.get(s.orderId)?.deliveredAt[s.leg] != null)) g.status = "done"
        break
      }
      case "deadline_close": { const o = this.orders.get(event.orderId); if (o) o.lastPickupAt = event.lastPickupAt; break }
      case "release": {
        const fix = this.fixes.get(legKey(event.orderId, event.leg)); if (fix) fix.from = event.at
        break
      }
      case "forecast": this.forecasts.push(event); break
      case "offer_answered": this.offerUntil.delete(`${event.gigId}:${event.driverId}`); break
      case "ledger": {
        const { line } = event
        const o = line.orderId ? this.orders.get(line.orderId) : undefined
        if (o && line.kind === "revenue") this.trust.set(o.dealerId, Math.min(25, (this.trust.get(o.dealerId) ?? 0) + 1))
        if (o && line.kind === "late_refund") this.trust.set(o.dealerId, Math.floor(Math.max(0, (this.trust.get(o.dealerId) ?? 1) - 1) / 2))
        break
      }
    }
  }

  learnQuote(id: string, won: boolean): void {
    if (this.quotedOutcome.has(id)) return
    this.quotedOutcome.add(id)
    const r = this.requests.get(id)
    const d = this.decisions.get(id)
    if (!r || !d?.accepted) return // declined quotes are censored observations
    const key = `${Math.floor(r.arrivedAt / DAY)}:${r.dealerId}`
    this.market.set(key, Math.max(-0.12, Math.min(0.16, (this.market.get(key) ?? 0) + (won ? 0.025 : -0.008))))
    this.decisions.delete(id)
  }

  covered(orderId: string, leg: number): boolean {
    if (this.picked.has(legKey(orderId, leg))) return true
    return [...this.gigs.values()].some((g) => live(g) && !this.failed.has(`${g.id}:${legKey(orderId, leg)}`) && g.stops.some((s) => s.orderId === orderId && s.leg === leg))
  }

  busyDriver(id: string): boolean { return [...this.gigs.values()].some((g) => ["booked", "working"].includes(g.status) && g.driverId === id) }

  localDrivers(order: Order, route: Route): DriverProfile[] {
    const first = order.legs[route.stops[0]!.leg]!.pickup.placeId
    return this.roster.filter((d) => {
      const known = this.positions.get(d.id)
      const place = known && Math.floor(known.at / DAY) === Math.floor(this.now / DAY) ? known.place : d.homePlaceId
      return eligible(d, route.experienced, route.manual) && !this.busyDriver(d.id) && this.network.road(place, first).minutes <= this.config.maxApproachMinutes
    })
  }

  capacity(order: Order, route: Route): boolean {
    const local = this.localDrivers(order, route)
    if (local.length < 4) return false
    const ids = new Set(local.map((d) => d.id))
    let pressure = 0
    for (const other of this.orders.values()) {
      if (["cancelled", "delivered"].includes(other.status)) continue
      const first = other.legs.find((_, i) => other.deliveredAt[i] === null)
      if (!first) continue
      const near = local.filter((d) => this.network.road(d.homePlaceId, first.pickup.placeId).minutes <= this.config.maxApproachMinutes).length / ids.size
      // Even booked work consumes capacity; 0.5 leaves room for drivers doing several short trips.
      pressure += near * (other.legs.reduce((m, leg) => m + this.network.road(leg.pickup.placeId, leg.delivery.placeId).minutes + 90, 0) / 240)
    }
    for (const [id, pending] of this.decisions) {
      if (id === order.id || !pending.accepted || pending.expires < this.now || this.orders.has(id)) continue
      const request = this.requests.get(id)
      if (request) pressure += local.filter((d) => this.network.road(d.homePlaceId, request.legs[0]!.pickup.placeId).minutes <= this.config.maxApproachMinutes).length / ids.size
    }
    const own = Math.max(1, route.driveMinutes / 240)
    return pressure + own <= local.length * this.config.capacityFraction
  }

  feeMultiplier(place: string): number {
    const samples = [...(this.observedBookings.get(place) ?? [])].sort((a, b) => a - b)
    const learned = samples.length >= 5 ? samples[Math.floor(samples.length * 0.7)]! * 1.03 : 0
    return Math.max(this.level <= 6 ? 1.05 : this.config.feeMultiplier, Math.min(1.9, learned))
  }

  quote(request: PriceRequest): Action | null {
    this.requests.set(request.id, request)
    if (this.now >= request.respondBy || this.decisions.has(request.id) || this.quotedOutcome.has(request.id)) return null
    const facts = readNote(request.note, request.arrivedAt)
    const refuse = (reason: string): Action | null => {
      const option = request.options[0]!
      this.decisions.set(request.id, { accepted: false, price: 0, reference: request.referenceFeeCents, expires: request.respondBy, reason })
      this.log({ type: "decision", at: this.now, requestId: request.id, accepted: false, reason })
      return this.level <= 3 ? null : { type: "quote", requestId: request.id, prices: { [option.kind]: Math.max(10000000, option.listPriceCents * 100) } }
    }
    if (facts.uncertain && this.config.strictNotes) return refuse(facts.reasons.join("; "))
    if (facts.summerTyres) return refuse("summer tyres: weather exposure")
    const completed = [...this.orders.values()].filter((o) => o.status === "delivered")
    const lateCount = completed.filter((o) => o.deliveredAt.some((at, i) => at !== null && at > Math.min(o.deadline, this.facts(o.id).deliveryTo ?? Infinity, o.legs[i]!.delivery.privateAddress ? o.legs[i]!.delivery.window.to + 30 : Infinity))).length
    if (completed.length >= 10 && lateCount / completed.length > 0.045) return refuse("service recovery: pause new exposure")
    // Give explicit private appointments their actual deadline, not just the option's 20:00.
    const options = this.level <= 3 ? request.options.slice(0,1) : [...request.options].sort((a, b) => b.deadline - a.deadline)
    for (const option of options) {
      const order = asOrder(request, option)
      const route = routeFor(order, order.legs.map((_, i) => i), facts, this.network, this.now + this.config.minLeadMinutes, this.endsAt)
      if (!route || route.latestStart < this.now + this.config.minLeadMinutes) continue
      if (!this.capacity(order, route)) continue
      const place = request.legs[0]!.pickup.placeId
      const local = this.localDrivers(order, route).length
      const scarcity = local < 15 ? 0.15 : local < 30 ? 0.07 : 0
      const fee = request.referenceFeeCents * (this.feeMultiplier(place) + scarcity)
      const base = this.level <= 6 ? 1.20 : this.config.quoteMultiplier
      const adjustment = this.market.get(`${Math.floor(this.now / DAY)}:${request.dealerId}`) ?? 0
      const trust = this.level >= 8 ? (this.trust.get(request.dealerId) ?? 0) / 100 : 0
      const minimum = Math.max(fee / (1 - this.config.marginReserve), fee + this.config.minMarginCents)
      if (this.level <= 3 && minimum > option.listPriceCents) continue
      const price = this.level <= 3 ? option.listPriceCents : Math.ceil(Math.max(minimum, option.listPriceCents * (base + adjustment) * (1 + trust)) / 100) * 100
      // Do not devote capacity to a near-impossible bid. Explicitly declining is free.
      if (price > option.listPriceCents * (this.level >= 7 ? 2.25 : 1.70)) continue
      this.decisions.set(request.id, { accepted: true, price, reference: request.referenceFeeCents, route, expires: request.respondBy, reason: "feasible with capacity and margin reserve" })
      this.log({ type: "decision", at: this.now, requestId: request.id, accepted: true, option: option.kind, priceCents: price, expectedFeeCents: Math.round(fee), localDrivers: local, route })
      return { type: "quote", requestId: request.id, prices: { [option.kind]: price } }
    }
    return refuse("insufficient safe capacity, time or margin")
  }

  actions(): Action[] {
    const actions: Action[] = []
    // Oldest deadlines first; reserving each tentative quote prevents a bulk batch overbooking us.
    for (const r of [...this.requests.values()].filter((r) => r.respondBy > this.now).sort((a,b) => a.respondBy-b.respondBy || a.id.localeCompare(b.id))) {
      const action = this.quote(r); if (action) actions.push(action)
    }
    for (const o of [...this.orders.values()].sort((a, b) => a.lastPickupAt - b.lastPickupAt)) {
      if (["cancelled", "delivered"].includes(o.status)) continue
      const free = o.legs.map((_, i) => i).filter((i) => o.deliveredAt[i] === null && !this.covered(o.id, i) && (this.cooldown.get(legKey(o.id, i)) ?? 0) <= this.now)
      if (free.length) {
        const group = this.makePost(o, free)
        if (group) actions.push(group)
        else for (const leg of free) { const post = this.makePost(o, [leg]); if (post) actions.push(post) }
      }
    }
    for (const gig of this.gigs.values()) {
      if (gig.status !== "open") continue
      if (this.replan.has(gig.id)) { actions.push({ type: "withdraw", gigId: gig.id }); continue }
      const first = gig.stops.find((s) => s.kind === "pickup")!
      const order = this.orders.get(first.orderId)
      if (!order || order.status === "cancelled") continue
      const urgency = this.bookingCutoff(gig, order) - this.now
      if (urgency <= 240 && (this.lastReprice.get(gig.id) ?? -Infinity) + 60 <= this.now) {
        const base = this.baseFee(order, gig.stops.filter((s) => s.kind === "pickup").length)
        const multiplier = urgency <= 90 ? this.config.emergencyMultiplier : urgency <= 180 ? 1.95 : 1.65
        const feeCents = Math.max(this.currentFee(gig), Math.round(base * Math.max(multiplier, this.feeMultiplier(order.legs[first.leg]!.pickup.placeId))))
        if (feeCents > this.currentFee(gig)) actions.push({ type: "reprice", gigId: gig.id, schedule: [{ at: this.now, feeCents }] })
      }
      if (this.config.offers && this.level >= 3 && (urgency <= 300 || this.now - gig.postedAt >= 90)) actions.push(...this.offersFor(gig, order))
    }
    return actions
  }

  baseFee(order: Order, cars: number): number { return (this.requests.get(order.id)?.referenceFeeCents ?? order.priceCents * 0.75) * cars / order.legs.length }
  currentFee(gig: Gig): number { return gig.schedule.filter((s) => s.at <= this.now).at(-1)?.feeCents ?? gig.schedule[0]!.feeCents }

  /** Own windows can close before the order's theoretical last on-time pickup. */
  bookingCutoff(gig: Pick<Gig, "stops">, order: Order): number {
    const first = gig.stops.find((s) => s.kind === "pickup")
    return Math.min(order.lastPickupAt, first?.window?.to ?? Infinity)
  }

  makePost(order: Order, legs: number[]): PostAction | null {
    const facts = this.facts(order.id)
    for (const leg of legs) {
      const fix = this.fixes.get(legKey(order.id, leg))
      if (fix) { facts.pickupFrom = Math.max(facts.pickupFrom ?? 0, fix.from); facts.manual ||= fix.manual; facts.plates ||= fix.plates }
    }
    const late = this.now > order.lastPickupAt
    let route = routeFor(order, legs, facts, this.network, this.now + 20, this.endsAt, late)
    if (!route && !late) route = routeFor(order, legs, facts, this.network, this.now + 20, this.endsAt, true)
    if (!route) return null // private pickups must await the next booked slot
    const base = this.baseFee(order, legs.length)
    const cutoff = this.bookingCutoff(route, order)
    const urgent = cutoff - this.now <= 240
    const multiple = Math.max(this.feeMultiplier(order.legs[legs[0]!]!.pickup.placeId), urgent ? 1.85 : 0)
    const feeCents = Math.max(1, Math.round(base * multiple))
    const schedule = [{ at: this.now, feeCents }]
    // A single planned rescue raise, well before last pickup, avoids hourly fee conditioning.
    const rescueAt = cutoff - 210
    if (this.level >= 2 && rescueAt > this.now) schedule.push({ at: rescueAt, feeCents: Math.max(feeCents, Math.round(base * 1.85)) })
    return { type: "post", stops: route.stops, audience: { experienced: route.experienced, manualLicence: route.manual }, schedule }
  }

  offersFor(gig: Gig, order: Order): Action[] {
    const day = Math.floor(this.now / DAY)
    if (this.now % DAY < 420 || this.now % DAY >= 1380) return []
    const first = gig.stops.find((s) => s.kind === "pickup")
    if (!first) return []
    const ready = first.window?.from ?? order.legs[first.leg]!.pickup.window.from
    // A driver's three daily offers are scarce. Reserve them for work close enough
    // to pickup to fit today's day, rather than exhausting them on tomorrow's gigs.
    if (ready > this.now + 180 || this.bookingCutoff(gig, order) <= this.now) return []
    const open = [...this.offerUntil].filter(([key, until]) => key.startsWith(`${gig.id}:`) && until >= this.now).length
    if (open >= 3) return []
    const leg = order.legs[gig.stops[0]!.leg]!
    const candidates = this.roster.filter((d) => eligible(d, gig.audience.experienced, gig.audience.manualLicence) && !this.busyDriver(d.id) && (this.offerCounts.get(`${day}:${d.id}`) ?? 0) < 3 && !this.offerTried.has(`${gig.id}:${d.id}`)).map((d) => {
      const known = this.positions.get(d.id)
      const place = known && Math.floor(known.at / DAY) === day ? known.place : d.homePlaceId
      const approach = this.network.road(place, leg.pickup.placeId).minutes
      const home = this.network.road(leg.delivery.placeId, d.homePlaceId).minutes
      const score = approach + home * 0.25 + d.drops * 2 - (this.viewers.get(gig.id)?.has(d.id) ? 20 : 0)
      return { d, approach, score }
    }).filter((c) => c.approach <= this.config.maxApproachMinutes && this.now + c.approach + 30 < (gig.stops[0]!.window?.to ?? order.lastPickupAt)).sort((a,b) => a.score-b.score || a.d.id.localeCompare(b.d.id))
    return candidates.slice(0, Math.min(2, 3-open)).map(({ d }) => {
      // Reserve on queueing: even refused offers cannot create a storm of retries.
      this.offerCounts.set(`${day}:${d.id}`, (this.offerCounts.get(`${day}:${d.id}`) ?? 0) + 1)
      this.offerUntil.set(`${gig.id}:${d.id}`, this.now + 11)
      this.offerTried.add(`${gig.id}:${d.id}`)
      return { type: "offer", gigId: gig.id, driverId: d.id, feeCents: this.currentFee(gig) }
    })
  }

  results(actions: Action[], results: ActionResult[]): void {
    if (results.length !== actions.length) throw new Error("API returned an incomplete action batch; rebuild before continuing")
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i]!, result = results[i]!
      if (action.type === "withdraw") this.replan.delete(action.gigId)
      this.log({ type: "action", at: this.now, action, result })
      if (!result.ok) {
        if (action.type === "post") for (const s of action.stops) this.cooldown.set(legKey(s.orderId, s.leg), this.now + 30)
        if (action.type === "quote") this.decisions.delete(action.requestId)
        if (action.type === "reprice") this.lastReprice.set(action.gigId, this.now)
        continue
      }
      if (action.type === "post") this.gigs.set(result.id, { id: result.id, ...structuredClone(action), status: "open", postedAt: this.now, feeCents: action.schedule[0]!.feeCents, driverId: null })
      if (action.type === "withdraw" || action.type === "release") { const g = this.gigs.get(action.gigId); if (g) g.status = "withdrawn" }
      if (action.type === "reprice") { const g = this.gigs.get(action.gigId); if (g) g.schedule = structuredClone(action.schedule); this.lastReprice.set(action.gigId, this.now) }
    }
  }
}
