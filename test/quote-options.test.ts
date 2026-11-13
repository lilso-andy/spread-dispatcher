import test from "node:test"
import assert from "node:assert/strict"
import { Desk } from "../desk.ts"
import { defaults } from "../config.ts"
import type { DriverProfile, PriceRequest, WorldMap } from "../typescript/types.ts"

const hours = { opens: 480, closes: 1080, weekdays: [0, 1, 2, 3, 4], saturday: null }
const map: WorldMap = { places: ["a", "b"].map(id => ({ id, name: id, lat: 60, lon: 24 })), roads: ["a", "b"].flatMap(from => ["a", "b"].map(to => ({ from, to, km: from === to ? 0 : 200, minutes: from === to ? 0 : 180 }))) }
const roster: DriverProfile[] = Array.from({ length: 12 }, (_, i) => ({ id: `d${i}`, homePlaceId: "a", rating: 5, licence: "manual", completedGigs: 100, drops: 0 }))
function request(id = "r"): PriceRequest {
  return { id, dealerId: "dealer", batchId: null, arrivedAt: 480, respondBy: 495, referenceFeeCents: 10000, note: null,
    legs: [{ car: { premium: false, electric: false, chargePercent: null }, pickup: { placeId: "a", privateAddress: false, window: { from: 480, to: 4080 }, hours }, delivery: { placeId: "b", privateAddress: false, window: { from: 480, to: 4080 }, hours } }],
    options: [{ kind: "same_day", deadline: 1200, listPriceCents: 25000 }, { kind: "next_day", deadline: 2640, listPriceCents: 23000 }] }
}
function desk() { const d = new Desk({ ...defaults, capacityFraction: 0.2, minLeadMinutes: 180 }, 8, map, roster); d.now = 480; return d }

test("quote offers each feasible alternative, reserving one order of capacity", () => {
  const d = desk()
  const first = d.quote(request("first"))!
  assert.equal(first.type, "quote")
  if (first.type !== "quote") return
  assert.deepEqual(Object.keys(first.prices).sort(), ["next_day", "same_day"])
  assert.ok(first.prices.same_day! > first.prices.next_day!)
  const second = d.quote(request("second"))!
  const third = d.quote(request("third"))!
  assert.ok(second.type === "quote" && second.prices.same_day! < 10000000)
  assert.ok(third.type === "quote" && Object.values(third.prices)[0]! >= 10000000)
})

test("an infeasible early alternative is omitted even when the later option fits", () => {
  const d = desk(), r = request()
  r.legs[0]!.pickup.window.from = 1100
  const action = d.quote(r)!
  assert.ok(action.type === "quote")
  if (action.type === "quote") assert.deepEqual(Object.keys(action.prices), ["next_day"])
})

test("a faster alternative needs twice the ordinary booking lead", () => {
  const d = desk(), r = request()
  d.now = 650
  r.arrivedAt = 650; r.respondBy = 665
  const action = d.quote(r)!
  assert.ok(action.type === "quote")
  if (action.type === "quote") assert.deepEqual(Object.keys(action.prices), ["next_day"])
})

test("a refused multi-option quote releases its single capacity reservation", () => {
  const d = desk(), r = request(), action = d.quote(r)!
  d.results([action], [{ ok: false, error: "rejected" }])
  assert.equal(d.decisions.has(r.id), false)
  assert.ok(d.quote(r))
})
