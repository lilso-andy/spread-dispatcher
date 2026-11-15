import test from "node:test";import assert from "node:assert/strict";import {Desk} from "../desk.ts";import {defaults} from "../config.ts";
test("shortage opening estimates cap feedback from our own posted prices",()=>{
 for(const level of [7,8]){const d=new Desk({...defaults,feeMultiplier:1.02},level,{places:[],roads:[]},[]);d.observedBookings.set("p",Array(10).fill(2.4));assert.equal(d.feeMultiplier("p"),1.1);}
 const d=new Desk(defaults,6,{places:[],roads:[]},[]);d.observedBookings.set("p",Array(10).fill(2.4));assert.equal(d.feeMultiplier("p"),1.9);
});
