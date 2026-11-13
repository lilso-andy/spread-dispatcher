import test from "node:test"
import assert from "node:assert/strict"
import { defaults, validateConfig } from "../config.ts"
import { readNote, DAY } from "../notes.ts"
import { asOrder, charging, intervals, Network, routeFor } from "../planner.ts"
import { Desk } from "../desk.ts"
import { historyOf } from "../runner.ts"
import type { DeskSnapshot, DriverProfile, PriceRequest, WorldMap } from "../typescript/types.ts"

const map: WorldMap = { places: ["a","b","c"].map((id) => ({ id, name:id, lat:60, lon:24 })), roads: ["a","b","c"].flatMap((from) => ["a","b","c"].map((to) => ({ from, to, km: from===to?0:250, minutes:from===to?0:180 }))) }
const hours = { opens:480, closes:1080, weekdays:[0,1,2,3,4], saturday:{ opens:540, closes:780 } }
function request(id="r1"): PriceRequest {
  return { id, dealerId:"dealer", batchId:null, arrivedAt:480, respondBy:495,
    legs:[{ car:{ premium:false,electric:false,chargePercent:null }, pickup:{placeId:"a",privateAddress:false,window:{from:480,to:3*DAY+1200},hours}, delivery:{placeId:"b",privateAddress:false,window:{from:480,to:3*DAY+1200},hours} }],
    options:[{ kind:"same_day",deadline:1200,listPriceCents:25000 },{ kind:"next_day",deadline:DAY+1200,listPriceCents:23000 }], referenceFeeCents:10000, note:null }
}
const roster: DriverProfile[] = Array.from({length:12},(_,i)=>({id:`d${i}`,homePlaceId:"a",rating:4.9,licence:"manual",completedGigs:100,drops:0}))
const noNote=readNote(null,480)

test("multilingual clocks, relative dates, manual and plates",()=>{
  const f=readNote({text:"Nouto huomenna klo 13.30 jälkeen; manuaalivaihteisto; auto ilman kilpiä",language:"fi"},480)
  assert.equal(f.pickupFrom,DAY+810); assert.equal(f.manual,true);assert.equal(f.plates,true);assert.equal(f.uncertain,false)
  const sv=readNote({text:"Hämtning tidigast halv tre",language:"sv"},480)
  assert.equal(sv.pickupFrom,870)
  const weekday=readNote({text:"Pickup ready Thursday at 10:00",language:"en"},480)
  assert.equal(weekday.pickupFrom,3*DAY+600)
  const pm=readNote({text:"Deliver by tomorrow 3pm",language:"en"},480)
  assert.equal(pm.deliveryTo,DAY+900)
})
test("notes keep pickup and delivery constraints separate",()=>{
  const facts=readNote({text:"Pickup after 11:00; delivery before 16:30",language:"en"},480)
  assert.equal(facts.pickupFrom,660);assert.equal(facts.deliveryTo,990)
  assert.equal(readNote({text:"call me about the slot",language:"en"},480).uncertain,true)
  assert.equal(readNote({text:"Pickup after 12:00 and delivery before 13:00",language:"en"},480).uncertain,true)
})
test("opening hours skip Sunday and obey short Saturday hours",()=>{
  const stop=request().legs[0]!.pickup
  assert.deepEqual(intervals(stop,5*DAY,7*DAY+1200),[{from:5*DAY+540,to:5*DAY+780},{from:7*DAY+480,to:7*DAY+1080}])
  assert.equal(intervals({...stop,privateAddress:true,window:{from:600,to:660}},700,1200).length,0)
})
test("routes include plates, charging and safe opening windows",()=>{
  const r=request();r.legs[0]!.car={premium:true,electric:true,chargePercent:15}
  const network=new Network(map)
  assert.equal(charging(r.legs[0]!,network),true)
  const route=routeFor(asOrder(r,r.options[0]!),[0],{...noNote,plates:true},network,600,14280)!
  assert.ok(route);assert.equal(route.experienced,true)
  assert.equal(route.stops[0]!.withCharging,true);assert.equal(route.stops[0]!.withPlates,true)
  assert.ok(route.latestStart<=1080-Math.ceil(180*1.18)-70-15)
  assert.equal(routeFor(asOrder(r,r.options[0]!),[0],noNote,network,1050,14280),null)
})
test("multi-car routes enforce 12-hour cap including empty repositioning",()=>{
  const r=request();r.legs.push({...structuredClone(r.legs[0]!),pickup:{...r.legs[0]!.pickup,placeId:"c"}})
  const long={...map,roads:map.roads.map(r=>({...r,minutes:r.from===r.to?0:300}))}
  assert.equal(routeFor(asOrder(r,r.options[1]!),[0,1],noNote,new Network(long),480,14280),null)
})
test("pending quotes reserve capacity in a simultaneous batch",()=>{
  const desk=new Desk({...defaults,maxApproachMinutes:100,capacityFraction:0.2},8,map,roster)
  desk.now=480
  const first=desk.quote(request("r1"))!
  const second=desk.quote(request("r2"))!
  const third=desk.quote(request("r3"))!
  assert.ok(first.type==="quote" && Object.values(first.prices)[0]!<10000000)
  assert.ok(second.type==="quote" && Object.values(second.prices)[0]!<10000000)
  assert.ok(third.type==="quote" && Object.values(third.prices)[0]!>=10000000)
})
test("accepted posts carry legs only after API acknowledgement and recover failed cars",()=>{
  const desk=new Desk(defaults,8,map,roster);desk.now=500
  const r=request();desk.requests.set(r.id,r)
  const order=asOrder(r,r.options[1]!);desk.orders.set(order.id,order)
  const actions=desk.actions().filter(a=>a.type==="post")
  assert.equal(actions.length,1);assert.equal(desk.covered(order.id,0),false)
  desk.results(actions,[{ok:true,id:"g1"}]);assert.equal(desk.covered(order.id,0),true)
  desk.handle({kind:"visit_failed",seq:0,at:600,gigId:"g1",orderId:order.id,leg:0,reason:"no_plates"})
  assert.equal(desk.covered(order.id,0),false)
  const post=desk.actions().find(a=>a.type==="post")!
  assert.equal(post.type,"post");if(post.type==="post")assert.equal(post.stops[0]!.withPlates,true)
})
test("replay de-duplicates ledger, resumes snapshot gigs without double posting",()=>{
  const desk=new Desk(defaults,8,map,roster);const r=request();const o=asOrder(r,r.options[1]!)
  const history:any[]=[{kind:"price_request",seq:0,at:480,request:r},{kind:"order_won",seq:1,at:495,order:o},{kind:"ledger",seq:2,at:900,line:{kind:"revenue",orderId:o.id,cents:23000}}]
  const snap:DeskSnapshot={worldId:"w",now:600,endsAt:14280,openRequests:[],orders:[o],gigs:[{id:"g",stops:[{orderId:o.id,leg:0,kind:"pickup"},{orderId:o.id,leg:0,kind:"delivery"}],audience:{manualLicence:false,experienced:false},schedule:[{at:495,feeCents:12000}],status:"booked",postedAt:495,feeCents:12000,driverId:"d0"}],driverPositions:[],score:{marginCents:0,revenueCents:0,marginShare:0,wonOrders:1,onTimeShare:1,undeliveredShare:0,ranked:true}}
  desk.restore(snap,history);desk.handle(history[2]);assert.equal(desk.trust.get("dealer"),1)
  assert.equal(desk.actions().filter(a=>a.type==="post").length,0)
})
test("offers respect three-per-driver-per-day and three open per gig",()=>{
  const desk=new Desk(defaults,8,map,roster.slice(0,4));desk.now=600
  const o=asOrder(request(),request().options[0]!);desk.orders.set(o.id,o)
  const gig:any={id:"g",stops:[{orderId:o.id,leg:0,kind:"pickup",window:{from:600,to:1000}}],audience:{experienced:false,manualLicence:false},schedule:[{at:0,feeCents:12000}],status:"open",postedAt:500,driverId:null}
  const first=desk.offersFor(gig,o);assert.equal(first.length,2)
  assert.equal(desk.offersFor(gig,o).length,1)
  assert.equal(desk.offersFor(gig,o).length,0)
  for(let i=0;i<10;i++){desk.now+=12;desk.offersFor({...gig,id:`g${i}`},o)}
  assert.ok([...desk.offerCounts.values()].every(v=>v<=3))
})
test("event history fetches every page",async()=>{
  let calls=0
  const world:any={events:async(after:number)=>{calls++;return after<0?Array.from({length:1000},(_,seq)=>({seq})):after===999?[{seq:1000}]:[]}}
  assert.equal((await historyOf(world)).length,1001);assert.equal(calls,2)
})
test("a snow deadline extension does not postpone readiness, and open gigs replan",()=>{
  const desk=new Desk(defaults,8,map,roster);const r=request();const o=asOrder(r,r.options[1]!)
  desk.handle({kind:"price_request",seq:0,at:480,request:r})
  desk.handle({kind:"order_won",seq:1,at:495,order:o})
  const post=desk.makePost(o,[0])!;desk.results([post],[{ok:true,id:"g"}])
  desk.handle({kind:"order_changed",seq:2,at:600,order:{...o,deadline:o.deadline+DAY},message:{text:"Snow: deadline extended",language:"en"}})
  assert.equal(desk.facts(o.id).pickupFrom,undefined)
  assert.ok(desk.actions().some(a=>a.type==="withdraw"&&a.gigId==="g"))
  desk.results([{type:"withdraw",gigId:"g"}],[{ok:true,id:"g"}])
  assert.equal(desk.covered(o.id,0),false)
  assert.ok(desk.actions().some(a=>a.type==="post"))
})
test("invalid configuration fails before creating a world",()=>{
  assert.throws(()=>validateConfig({capacityFraction:1.5}))
  assert.throws(()=>validateConfig({marginReserve:1}))
  assert.throws(()=>validateConfig({strictNotes:"true"}))
  assert.throws(()=>validateConfig({typo:1}))
})
