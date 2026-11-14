import test from "node:test";import assert from "node:assert/strict";import {Desk} from "../desk.ts";import {defaults} from "../config.ts";
function setup(level:number,now:number,ready:number,age=1){
 const map:any={places:[],roads:[{from:"a",to:"a",minutes:0,km:0},{from:"b",to:"a",minutes:100,km:100}]};
 const d=new Desk(defaults,level,map,[{id:"d",homePlaceId:"a",rating:5,licence:"manual",completedGigs:100,drops:0}]);d.now=now;
 const legs:any=[{car:{premium:false,electric:false,chargePercent:null},pickup:{placeId:"a",privateAddress:false,window:{from:ready,to:2000},hours:null},delivery:{placeId:"b",privateAddress:false,window:{from:ready,to:2000},hours:null}}];
 d.orders.set("r",{id:"r",dealerId:"D",option:"next_day",priceCents:20000,deadline:2000,legs,status:"waiting",deliveredAt:[null],lastPickupAt:1800});
 d.gigs.set("g",{id:"g",stops:[{orderId:"r",leg:0,kind:"pickup",window:{from:ready,to:1600}},{orderId:"r",leg:0,kind:"delivery",window:{from:ready,to:2000}}],audience:{experienced:false,manualLicence:false},schedule:[{at:0,feeCents:15000}],feeCents:15000,status:"open",postedAt:now-age,driverId:null});return d;
}
test("shortage offers wait for readiness and keep daily quota for nearer work",()=>{const d=setup(8,600,1000,120);assert.equal(d.actions().filter(a=>a.type==="offer").length,0);assert.equal(d.offerCounts.size,0)});
test("a fresh acknowledged shortage gig can receive an immediate near-ready offer",()=>{const d=setup(7,900,1000);assert.equal(d.actions().filter(a=>a.type==="offer").length,1);assert.equal(d.offerCounts.get("0:d"),1)});
test("market levels keep the existing offer age trigger",()=>{assert.equal(setup(6,900,1000).actions().filter(a=>a.type==="offer").length,0);assert.equal(setup(6,900,1000,120).actions().filter(a=>a.type==="offer").length,1)});
