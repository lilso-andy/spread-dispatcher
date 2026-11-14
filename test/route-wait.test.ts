import test from "node:test";
import assert from "node:assert/strict";
import {routeFor,Network} from "../planner.ts";
test("long route may wait overnight for destination to open",()=>{
 const hours={opens:540,closes:1080,weekdays:[0,1,2,3,4],saturday:null};
 const o:any={id:"r",deadline:2340,legs:[{car:{electric:false,premium:false},pickup:{placeId:"a",privateAddress:false,window:{from:540,to:2340},hours},delivery:{placeId:"b",privateAddress:false,window:{from:540,to:2340},hours:{...hours,opens:420,closes:900}}}]};
 const network=new Network({places:[],roads:[{from:"a",to:"b",minutes:570,km:700}]} as any);
 const f={manual:false,plates:false,summerTyres:false,uncertain:false,reasons:[],deliveryHours:{opens:420,closes:900}};
 const r=routeFor(o,[0],f,network,560,14280);
 assert.ok(r);assert.equal(r.startsAt,560);assert.equal(r.finishesAt,1860);
 assert.ok(r.stops[0].window!.to<=1080);assert.equal(r.stops[1].window!.from,1860);
});

