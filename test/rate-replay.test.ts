import test from "node:test"
import assert from "node:assert/strict"
import { ActionBucketReplay, finalSeconds } from "../tools/rate-replay.ts"

test("final clock maps weekday, night, weekend and last Monday speed",()=>{
  assert.equal(finalSeconds(60),3)
  assert.equal(finalSeconds(7*60)-finalSeconds(6*60),18)
  assert.equal(finalSeconds(5*1440+7*60)-finalSeconds(5*1440+6*60),6)
  assert.equal(finalSeconds(6*1440+7*60)-finalSeconds(6*1440+6*60),3)
  assert.equal(finalSeconds(7*1440+7*60)-finalSeconds(7*1440+6*60),9)
  assert.equal(finalSeconds(8*1440+7*60)-finalSeconds(8*1440+6*60),3)
})
test("action replay admits a burst of 50, then refills at 20 per real second",()=>{
  const bucket=new ActionBucketReplay()
  for(let i=0;i<50;i++)assert.equal(bucket.take(600),0)
  assert.ok(Math.abs(bucket.take(600)-0.05)<1e-8)
  for(let i=0;i<49;i++)bucket.take(600)
  assert.ok(Math.abs(bucket.maxLagSeconds-2.5)<1e-8)
  assert.equal(bucket.take(660),0)
})
test("action-only replay identifies a quote delayed beyond its response deadline",()=>{
  const bucket=new ActionBucketReplay()
  for(let i=0;i<150;i++)bucket.take(600)
  bucket.take(600,615)
  assert.equal(bucket.lateQuotes,1)
})
