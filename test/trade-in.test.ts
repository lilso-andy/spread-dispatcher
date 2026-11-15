import test from "node:test"
import assert from "node:assert/strict"
import { Network, routeFor } from "../planner.ts"
import { readNote } from "../notes.ts"
import type { Order, WorldMap } from "../typescript/types.ts"

const map:WorldMap={places:["yard","customer","other"].map(id=>({id,name:id,lat:60,lon:24})),roads:["yard","customer","other"].flatMap(from=>["yard","customer","other"].map(to=>({from,to,km:from===to?12:100,minutes:from===to?25:100})))}
const network=new Network(map), facts=readNote(null,480)
function order():Order {
  const hours={opens:480,closes:1260,weekdays:[0,1,2,3,4],saturday:null}
  const dealer={placeId:"yard",privateAddress:false,window:{from:600,to:1200},hours}
  const customer={placeId:"customer",privateAddress:true,window:{from:900,to:960},hours:null}
  const car={premium:false,electric:false,chargePercent:null}
  return {id:"trade",dealerId:"d",option:"same_day",priceCents:20000,deadline:1200,status:"waiting",deliveredAt:[null,null],lastPickupAt:850,legs:[{car,pickup:dealer,delivery:customer},{car,pickup:structuredClone(customer),delivery:structuredClone(dealer)}]}
}

test("trade-in return stays adjacent and does not impose a standalone private pickup window",()=>{
  const route=routeFor(order(),[0,1],facts,network,600,14280)!
  assert.ok(route)
  assert.deepEqual(route.stops.map(s=>[s.leg,s.kind]),[[0,"pickup"],[0,"delivery"],[1,"pickup"],[1,"delivery"]])
  assert.equal(route.stops[2]!.window,undefined)
  assert.equal(route.driveMinutes,225) // retain the conservative mapped cap
  assert.equal(route.finishesAt,1033) // hand over at 900, then 100*1.18+15; no 25-minute reposition
})
test("a bundled trade-in can still be posted after the customer's original hour",()=>{
  const route=routeFor(order(),[0,1],facts,network,970,14280,true)
  assert.ok(route)
  assert.equal(route.stops[2]!.window,undefined)
  assert.ok(route.finishesAt<1440)
})
test("a rescheduled standalone slot does not postpone the attached return by a day",()=>{
  const o=order();o.legs[1]!.pickup.window={from:2340,to:2400}
  const route=routeFor(o,[0,1],facts,network,970,14280,true)
  assert.ok(route);assert.ok(route.finishesAt<1440)
})
test("a return posted alone must still respect the private seller's slot",()=>{
  assert.equal(routeFor(order(),[1],facts,network,970,14280,true),null)
})
test("a different private location does not get the trade-in same-visit exception",()=>{
  const o=order();o.legs[1]!.pickup.placeId="other"
  assert.equal(routeFor(o,[0,1],facts,network,970,14280,true),null)
})
test("bundled trade-ins still obey the mapped 12-hour cap",()=>{
  const long={...map,roads:map.roads.map(r=>({...r,minutes:r.from===r.to?25:350}))}
  assert.equal(routeFor(order(),[0,1],facts,new Network(long),480,14280,true),null)
})
