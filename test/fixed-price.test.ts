import test from "node:test"
import assert from "node:assert/strict"
import { Desk } from "../desk.ts"
import { defaults } from "../config.ts"
import type { DriverProfile, PriceRequest, WorldMap } from "../typescript/types.ts"

const map: WorldMap = { places: ["a", "b"].map(id => ({ id, name: id, lat: 60, lon: 24 })), roads: ["a", "b"].flatMap(from => ["a", "b"].map(to => ({ from, to, km: from === to ? 0 : 100, minutes: from === to ? 0 : 100 }))) }
const roster: DriverProfile[] = Array.from({ length: 40 }, (_, i) => ({ id: `d${i}`, homePlaceId: "a", rating: 5, licence: "manual", completedGigs: 100, drops: 0 }))
const hours = { opens: 480, closes: 1200, weekdays: [0, 1, 2, 3, 4], saturday: null }
const request: PriceRequest = { id: "r", dealerId: "dealer", batchId: null, arrivedAt: 480, respondBy: 495, referenceFeeCents: 8000, note: null, options: [{ kind: "same_day", deadline: 1200, listPriceCents: 10000 }], legs: [{ car: { premium: false, electric: false, chargePercent: null }, pickup: { placeId: "a", privateAddress: false, window: { from: 480, to: 1200 }, hours }, delivery: { placeId: "b", privateAddress: false, window: { from: 480, to: 1200 }, hours } }] }
function setup(level: number, worldMap = map) { const desk = new Desk({ ...defaults, marginReserve: 0.15, minMarginCents: 2000, minLeadMinutes: 180 }, level, worldMap, roster); desk.now = 480; return desk }

test("fixed-price worlds can accept positive-margin short work below the competitive-market absolute margin floor", () => {
  for (const level of [1, 2, 3]) {
    const d = setup(level), action = d.quote(structuredClone(request))
    assert.ok(action?.type === "quote")
    if (action?.type === "quote") assert.equal(action.prices.same_day, 10000)
  }
})

test("fixed-price long work is declined when rescue-cost reserve exceeds its dealer revenue", () => {
  const long = { ...map, roads: map.roads.map(r => ({ ...r, minutes: r.from === r.to ? 0 : 350 })) }
  for (const level of [1, 2, 3]) assert.equal(setup(level, long).quote(structuredClone(request)), null)
})

test("fixed-price fee estimates do not ratchet upward from the dispatcher's own accepted prices", () => {
  for (const level of [1, 2, 3]) {
    const d = setup(level); d.observedBookings.set("a", Array(10).fill(1.85))
    assert.equal(d.feeMultiplier("a"), 1.05)
  }
  const competitive = setup(8); competitive.observedBookings.set("a", Array(10).fill(1.85))
  assert.equal(competitive.feeMultiplier("a"), defaults.feeMultiplier + 0.08)
})
