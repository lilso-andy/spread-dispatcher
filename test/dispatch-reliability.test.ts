import test from "node:test"
import assert from "node:assert/strict"
import { Desk } from "../desk.ts"
import { defaults } from "../config.ts"
import type { Gig, Order, PriceRequest, WorldMap } from "../typescript/types.ts"

const map: WorldMap = {places:["a","b"].map(id=>({id,name:id,lat:60,lon:24})),roads:["a","b"].flatMap(from=>["a","b"].map(to=>({from,to,km:from===to?0:100,minutes:from===to?0:100})))}
function setup(fee=19500) {
  const desk=new Desk({...defaults,offers:false},8,map,[])
  const hours={opens:480,closes:1200,weekdays:[0,1,2,3,4],saturday:null}
  const request:PriceRequest={id:"r",dealerId:"dealer",batchId:null,arrivedAt:480,respondBy:495,legs:[{car:{premium:false,electric:false,chargePercent:null},pickup:{placeId:"a",privateAddress:false,window:{from:480,to:1200},hours},delivery:{placeId:"b",privateAddress:false,window:{from:480,to:1200},hours}}],options:[{kind:"same_day",deadline:1200,listPriceCents:20000}],referenceFeeCents:10000,note:null}
  const order:Order={id:"r",dealerId:"dealer",option:"same_day",deadline:1200,priceCents:20000,legs:request.legs,status:"waiting",deliveredAt:[null],lastPickupAt:1100}
  const gig:Gig={id:"g",stops:[{orderId:"r",leg:0,kind:"pickup"},{orderId:"r",leg:0,kind:"delivery"}],audience:{experienced:false,manualLicence:false},schedule:[{at:0,feeCents:fee}],feeCents:fee,status:"open",postedAt:500,driverId:null}
  desk.requests.set("r",request);desk.orders.set("r",order);desk.gigs.set("g",gig);desk.now=950
  return {desk,gig}
}
test("the dispatcher does not resend an already sufficient rescue fee",()=>{
  const {desk}=setup()
  assert.equal(desk.actions().filter(a=>a.type==="reprice").length,0)
  desk.now=1011
  assert.equal(desk.actions().filter(a=>a.type==="reprice").length,1)
})
test("real urgency increases are still sent after removing redundant reprices",()=>{
  const {desk}=setup(13500)
  const first=desk.actions().filter(a=>a.type==="reprice")
  assert.equal(first.length,1)
  if(first[0]!.type==="reprice")assert.equal(first[0]!.schedule[0]!.feeCents,19500)
  desk.results(first,[{ok:true,id:"g"}]);desk.now=1011
  const next=desk.actions().filter(a=>a.type==="reprice")
  assert.equal(next.length,1)
  if(next[0]!.type==="reprice")assert.equal(next[0]!.schedule[0]!.feeCents,24000)
})
test("an unchanged current fee leaves a prearranged future rescue step intact",()=>{
  const {desk,gig}=setup();gig.schedule.push({at:1080,feeCents:24000})
  assert.equal(desk.actions().filter(a=>a.type==="reprice").length,0)
  assert.deepEqual(gig.schedule,[{at:0,feeCents:19500},{at:1080,feeCents:24000}])
})
