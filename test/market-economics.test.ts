import test from "node:test"
import assert from "node:assert/strict"
import { Desk } from "../desk.ts"
import { defaults } from "../config.ts"
import type { DriverProfile, PriceRequest, WorldMap } from "../typescript/types.ts"

const hours = { opens: 480, closes: 1200, weekdays: [0, 1, 2, 3, 4], saturday: null }
const map: WorldMap = { places: ["a", "b"].map(id => ({ id, name: id, lat: 60, lon: 24 })), roads: ["a", "b"].flatMap(from => ["a", "b"].map(to => ({ from, to, km: from === to ? 0 : 100, minutes: from === to ? 0 : 90 }))) }
const roster: DriverProfile[] = Array.from({ length: 40 }, (_, i) => ({ id: `d${i}`, homePlaceId: "a", rating: 5, licence: "manual", completedGigs: 100, drops: 0 }))
const legacy = { ...defaults, quoteMultiplier: 1.35, feeMultiplier: 1.08, marginReserve: .13, minMarginCents: 1600, capacityFraction: .28, minLeadMinutes: 180 }
function desk(level = 6, optIn = true) { const d = new Desk({ ...legacy, ...(optIn ? { quoteMultiplier: 1.05, feeMultiplier: .95 } : {}) }, level, map, roster); d.now = 480; return d }
function request(): PriceRequest {
  return { id: "r", dealerId: "dealer", batchId: null, arrivedAt: 480, respondBy: 495, referenceFeeCents: 10000, note: null,
    legs: [{ car: { premium: false, electric: false, chargePercent: null }, pickup: { placeId: "a", privateAddress: false, window: { from: 480, to: 2640 }, hours }, delivery: { placeId: "b", privateAddress: false, window: { from: 480, to: 2640 }, hours } }],
    options: [{ kind: "next_day", deadline: 2640, listPriceCents: 20000 }] }
}
function bid(d: Desk, q = request()) { const a = d.quote(q); assert.equal(a?.type, "quote"); if (a?.type !== "quote") throw Error("No quote"); return a.prices.next_day! }

test("market levels opt into fixed opening fees without conditioning on our own bids", () => {
  for (const level of [4, 5, 6]) { const d = desk(level); d.observedBookings.set("a", [1.7, 1.7, 1.7, 1.7, 1.7]); assert.equal(d.feeMultiplier("a"), .95) }
})
test("selected legacy market configuration preserves its old floor and learned fee", () => {
  for (const level of [4, 5, 6]) { const d = desk(level, false); assert.equal(d.feeMultiplier("a"), 1.05); d.observedBookings.set("a", [1.5, 1.5, 1.5, 1.5, 1.5]); assert.equal(d.feeMultiplier("a"), 1.545); assert.equal(bid(d), 24000) }
})
test("explicit lower list-price factor changes only market-level opt-in quotes", () => {
  for (const level of [4, 5, 6]) { assert.equal(bid(desk(level)), 21000); assert.equal(bid(desk(level, false)), 24000) }
  assert.equal(bid(desk(8, false)), 27000)
})
test("training floors remain unchanged and shortage feedback is capped", () => {
  assert.equal(desk(3).feeMultiplier("a"), 1.05)
  for (const level of [7, 8]) { const d = desk(level); d.observedBookings.set("a", [1.7, 1.7, 1.7, 1.7, 1.7]); assert.equal(d.feeMultiplier("a"), d.config.feeMultiplier + 0.08) }
})
test("lower bids still include the absolute contribution floor and whole cents", () => {
  const q = request(); q.options[0]!.listPriceCents = 8000
  assert.equal(bid(desk(), q), 11100)
})
test("economics opt-in cannot bypass an expired private slot or no capacity", () => {
  const q = request(); q.legs[0]!.pickup.privateAddress = true; q.legs[0]!.pickup.window = { from: 480, to: 500 }
  assert.ok(bid(desk(), q) >= 10000000)
  const d = desk(); d.roster = []; assert.ok(bid(d) >= 10000000)
})
test("a refused economics quote releases its capacity reservation", () => {
  const d = desk(), a = d.quote(request())!; d.results([a], [{ ok: false, error: "rejected" }]); assert.equal(d.decisions.has("r"), false)
})
