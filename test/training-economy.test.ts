import test from "node:test";import assert from "node:assert/strict";
import {Desk} from "../desk.ts";import {defaults,validateConfig} from "../config.ts";
test("training economics is explicit and restricted to training levels",()=>{
 const map:any={places:[],roads:[]};
 for(const l of [1,2,3]){assert.equal(new Desk({...defaults,trainingEconomy:true,feeMultiplier:.86},l,map,[]).feeMultiplier("x"),.86);assert.equal(new Desk({...defaults,feeMultiplier:.86},l,map,[]).feeMultiplier("x"),1.05);}
 for(const l of [7,8])assert.equal(new Desk({...defaults,trainingEconomy:true,feeMultiplier:1.08},l,map,[]).feeMultiplier("x"),1.08);
 assert.equal(validateConfig({}).trainingEconomy,false);
});
