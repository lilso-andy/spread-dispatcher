import test from "node:test"
import assert from "node:assert/strict"
import { Desk } from "../desk.ts"
import { defaults } from "../config.ts"
import type { DriverProfile, Gig, Order, PriceRequest, WorldMap } from "../typescript/types.ts"

const map: WorldMap = { places: ["a","b"].map(id => ({id,name:id,lat:60,lon:24})), roads: ["a","b"].flatMap(from => ["a","b"].map(to => ({from,to,km:from===to?0:100,minutes:from===to?0:100}))) }
const roster: DriverProfile[] = Array.from({length:8},(_,i) => ({id:`d${i}`,homePlaceId:"a",rating:4.9,licence:"manual",completedGigs:100,drops:0}))
const hours = {opens:480,closes:1080,weekdays:[0,1,2,3,4],saturday:null}
function setup() {
  const desk = new Desk(defaults,8,map,roster)
  const r: PriceRequest = {id:"r",dealerId:"dealer",batchId:null,arrivedAt:480,respondBy:495,legs:[{car:{premium:false,electric:false,chargePercent:null},pickup:{placeId:"a",privateAddress:false,window:{from:480,to:2640},hours},delivery:{placeId:"b",privateAddress:false,window:{from:480,to:2640},hours}}],options:[{kind:"next_day",deadline:2640,listPriceCents:20000}],referenceFeeCents:10000,note:null}
  const order: Order = {id:r.id,dealerId:r.dealerId,option:"next_day",deadline:2640,priceCents:20000,legs:r.legs,status:"waiting",deliveredAt:[null],lastPickupAt:2500}
  desk.requests.set(r.id,r);desk.orders.set(order.id,order);desk.now=600
  return {desk,order}
}
function gig(from=600,to=900): Gig {
  return {id:"g",stops:[{orderId:"r",leg:0,kind:"pickup",window:{from,to}},{orderId:"r",leg:0,kind:"delivery",window:{from,to:1100}}],audience:{experienced:false,manualLicence:false},schedule:[{at:0,feeCents:10000}],feeCents:10000,status:"open",postedAt:480,driverId:null}
}

test("rescue schedule uses the posted pickup window, including note hours",()=>{
  const {desk,order}=setup()
  order.lastPickupAt=1100
  desk.requests.get(order.id)!.note={text:"Pickup weekdays 8-14",language:"en"}
  const post=desk.makePost(order,[0])!
  const cutoff=post.stops[0]!.window!.to
  assert.ok(cutoff<order.lastPickupAt)
  assert.equal(post.schedule[1]!.at,cutoff-210)
})
test("an open gig is rescued before its own window closes on the final pickup day",()=>{
  const {desk,order}=setup();order.lastPickupAt=1100;desk.gigs.set("g",gig());desk.now=700
  assert.ok(desk.actions().some(a=>a.type==="reprice"&&a.gigId==="g"))
})
test("theoretical order deadline remains a bound when the posted window is later",()=>{
  const {desk,order}=setup()
  assert.equal(desk.bookingCutoff(gig(600,3000),order),2500)
  assert.equal(desk.bookingCutoff({stops:[{orderId:"r",leg:0,kind:"pickup"}]},order),2500)
})
test("equal-fee reprices do not continually replace an unchanged schedule",()=>{
  const {desk,order}=setup();order.lastPickupAt=1100;desk.gigs.set("g",gig());desk.now=720
  const actions=desk.actions();desk.results(actions,actions.map(()=>({ok:true,id:"g"})))
  desk.now=781
  assert.equal(desk.actions().filter(a=>a.type==="reprice").length,0)
})
test("optional early-day windows do not trigger emergency fees several days early",()=>{
  const {desk,order}=setup();desk.gigs.set("g",gig());desk.now=700
  assert.equal(desk.rescueCutoff(gig(),order),order.lastPickupAt)
  assert.equal(desk.actions().filter(a=>a.type==="reprice").length,0)
  const post=desk.makePost(order,[0])!
  assert.equal(post.schedule[1]!.at,order.lastPickupAt-210)
})
test("future pickups do not consume today's direct-offer quota",()=>{
  const {desk,order}=setup()
  assert.equal(desk.offersFor(gig(1440+480,1440+800),order).length,0)
  assert.equal(desk.offerCounts.size,0)
  assert.equal(desk.offersFor(gig(800,1000),order).length,0)
  desk.now=621
  assert.equal(desk.offersFor(gig(800,1000),order).length,2)
})
test("expired pickup windows do not generate offers",()=>{
  const {desk,order}=setup();desk.now=901
  assert.equal(desk.offersFor(gig(),order).length,0)
  assert.equal(desk.offerCounts.size,0)
})
