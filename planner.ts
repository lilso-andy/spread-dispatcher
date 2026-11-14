import type { DriverProfile, Leg, Order, PriceRequest, Road, StopPlace, StopRef, TimeWindow, WorldMap } from "./typescript/types.ts"
import type { NoteFacts } from "./notes.ts"
import { DAY } from "./notes.ts"

export class Network {
  roads: Map<string, Road>
  constructor(map: WorldMap) { this.roads = new Map(map.roads.map((r) => [`${r.from}:${r.to}`, r])) }
  road(from: string, to: string): Road {
    const road = this.roads.get(`${from}:${to}`)
    if (!road) throw new Error(`Missing road ${from} -> ${to}`)
    return road
  }
}

export type Route = { stops: StopRef[]; startsAt: number; finishesAt: number; latestStart: number; driveMinutes: number; experienced: boolean; manual: boolean }

export function eligible(driver: DriverProfile, experienced: boolean, manual: boolean): boolean {
  return (!experienced || (driver.rating >= 4.8 && driver.completedGigs >= 50)) && (!manual || driver.licence === "manual")
}

export function intervals(stop: StopPlace, now: number, deadline: number, overrides?: { opens: number; closes: number }, from?: number, to?: number): TimeWindow[] {
  const lo = Math.max(now, stop.window.from, from ?? 0)
  const hi = Math.min(deadline, stop.privateAddress ? stop.window.to : Infinity, to ?? Infinity)
  if (lo > hi) return []
  if (stop.privateAddress || !stop.hours) return [{ from: lo, to: hi }]
  const result: TimeWindow[] = []
  for (let day = Math.floor(lo / DAY); day <= Math.floor(hi / DAY); day++) {
    const dow = day % 7
    const hours = dow === 5 ? stop.hours.saturday : dow === 6 || !stop.hours.weekdays.includes(dow) ? null : stop.hours
    if (!hours) continue
    const start = Math.max(lo, day * DAY + (overrides?.opens ?? hours.opens))
    const end = Math.min(hi, day * DAY + (overrides?.closes ?? hours.closes))
    if (start <= end) result.push({ from: start, to: end })
  }
  return result
}

export function charging(leg: Leg, network: Network): boolean {
  return leg.car.electric && leg.car.chargePercent !== null && leg.car.chargePercent < 30 && network.road(leg.pickup.placeId, leg.delivery.placeId).km > 200
}

/** Find a day's feasible stop windows, preserving the customer's handover adjacency. */
export function routeFor(order: Order, legs: number[], facts: NoteFacts, network: Network, now: number, endsAt: number, late = false): Route | null {
  if (!legs.length) return null
  const deadline = late ? endsAt : Math.min(order.deadline, facts.deliveryTo ?? Infinity)
  let time = now
  let previous: string | undefined
  let driveMinutes = 0
  const stops: StopRef[] = []
  const times: number[] = []
  const travel: number[] = []
  const attachedPickups: number[] = []
  let previousLeg: Leg | undefined
  for (const index of legs) {
    const leg = order.legs[index]!
    const mappedBetween = previous ? network.road(previous, leg.pickup.placeId).minutes : 0
    const attached = previousLeg?.delivery.privateAddress === true && leg.pickup.privateAddress && previousLeg.delivery.placeId === leg.pickup.placeId
    // A trade-in collects the old car during the new-car handover. The map's
    // same-town journey is for separate sites, not this same-address visit.
    const between = attached ? 0 : mappedBetween
    const road = network.road(leg.pickup.placeId, leg.delivery.placeId)
    const extras = (facts.plates ? 30 : 0) + (charging(leg, network) ? 40 : 0)
    const duration = Math.ceil(road.minutes * (late ? 1 : 1.18)) + extras + 15
    // Keep the contract's mapped road total as a conservative 12-hour cap.
    driveMinutes += mappedBetween + road.minutes
    const pickupPlace = attached ? { ...leg.pickup, privateAddress: false, hours: null, window: { from: previousLeg!.delivery.window.from, to: endsAt } } : leg.pickup
    const picks = intervals(pickupPlace, time + between, deadline, attached ? undefined : facts.pickupHours, attached ? undefined : Math.max(facts.pickupFrom ?? 0, leg.pickup.window.from), attached || late ? undefined : facts.pickupTo)
    // Only private pickups have a hard slot. A missed private delivery must still move,
    // and the rules explicitly allow its posted window to extend beyond the booked hour.
    const deliveryPlace = late && leg.delivery.privateAddress ? { ...leg.delivery, privateAddress: false, hours: null } : leg.delivery
    const deliveries = intervals(deliveryPlace, time, deadline, facts.deliveryHours, facts.deliveryFrom, late ? undefined : facts.deliveryTo)
    let found: { p: TimeWindow; d: TimeWindow; start: number; end: number } | undefined
    for (const p of picks) {
      for (const d of deliveries) {
        const start = p.from // Delivery may wait until a later opening, including overnight.
        const end = Math.max(d.from, start + duration)
        if (start <= p.to && end <= d.to) { found = { p, d, start, end }; break }
      }
      if (found) break
    }
    if (!found) return null
    const { p, d, start, end } = found
    const pickupWindow = { from: Math.max(p.from, pickupPlace.window.from), to: Math.min(p.to, d.to - duration) }
    const deliveryWindow = { from: Math.max(d.from, leg.delivery.window.from), to: d.to }
    if (pickupWindow.from > pickupWindow.to || deliveryWindow.from > deliveryWindow.to) return null
    if (attached) attachedPickups.push(stops.length)
    stops.push({ orderId: order.id, leg: index, kind: "pickup", window: pickupWindow, withPlates: facts.plates, withCharging: charging(leg, network) }, { orderId: order.id, leg: index, kind: "delivery", window: deliveryWindow })
    times.push(start, end)
    travel.push(between, duration)
    previous = leg.delivery.placeId
    previousLeg = leg
    time = end
  }
  if (legs.length > 1 && driveMinutes > 720) return null
  // Backward pass: ensure the latest first pickup also leaves time for every later car.
  let latest = Infinity
  for (let i = stops.length - 1; i >= 0; i--) {
    latest = Math.min(stops[i]!.window!.to, latest)
    stops[i]!.window!.to = latest
    if (stops[i]!.window!.from > latest) return null
    if (i > 0) latest -= travel[i]!
  }
  // Let the server apply the explicit trade-in exception: the attached old-car
  // pickup neither expires the gig nor constrains booking to its standalone slot.
  for (const i of attachedPickups) delete stops[i]!.window
  return { stops, startsAt: times[0]!, finishesAt: time, latestStart: stops[0]!.window!.to, driveMinutes, experienced: legs.some((i) => order.legs[i]!.car.premium), manual: facts.manual }
}

export function asOrder(request: PriceRequest, option: PriceRequest["options"][number]): Order {
  return { id: request.id, dealerId: request.dealerId, option: option.kind, priceCents: option.listPriceCents, deadline: option.deadline, legs: request.legs, status: "waiting", deliveredAt: request.legs.map(() => null), lastPickupAt: option.deadline }
}

