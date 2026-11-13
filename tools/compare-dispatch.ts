import { parseArgs } from "node:util"
import { readdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import type { RunResult } from "../runner.ts"

const { values } = parseArgs({options:{baseline:{type:"string"},candidate:{type:"string"},out:{type:"string"}}})
if (!values.baseline || !values.candidate) throw new Error("Usage: node tools/compare-dispatch.ts --baseline DIR --candidate DIR [--out FILE]")

async function load(folder: string) {
  const result = new Map<string, {run:RunResult; actions:Record<string,number>; offers:Record<string,number>}>()
  for (const file of (await readdir(folder)).filter(f=>f.endsWith(".result.json"))) {
    const run = JSON.parse(await readFile(join(folder,file),"utf8")) as RunResult
    if (!run.score || !run.options.seed) throw new Error(`Incomplete/unseeded run in ${file}`)
    if (result.has(run.options.seed)) throw new Error(`Duplicate seed ${run.options.seed} in ${folder}`)
    const actions: Record<string,number> = {}, offers: Record<string,number> = {}
    const journal = await readFile(join(folder,`${run.worldId}.jsonl`),"utf8")
    for (const line of journal.split("\n")) {
      if (!line) continue
      const row=JSON.parse(line)
      if (row.type==="action") actions[row.action.type]=(actions[row.action.type]??0)+1
      if (row.type==="event"&&row.event.kind==="offer_answered") offers[row.event.answer]=(offers[row.event.answer]??0)+1
    }
    result.set(run.options.seed,{run,actions,offers})
  }
  return result
}
const baseline=await load(values.baseline), candidate=await load(values.candidate)
if (!baseline.size || baseline.size!==candidate.size || [...baseline.keys()].some(seed=>!candidate.has(seed))) throw new Error("Both folders must contain exactly the same completed seeds")
const pairs=[...baseline.keys()].sort().map(seed=>{
  const a=baseline.get(seed)!, b=candidate.get(seed)!
  if (a.run.options.level!==b.run.options.level || JSON.stringify(a.run.config)!==JSON.stringify(b.run.config)) throw new Error(`Config/level mismatch for ${seed}`)
  return {seed,baseline:{worldId:a.run.worldId,score:a.run.score,actions:a.actions,offerAnswers:a.offers,actionRefusals:a.run.actionRefusals,elapsedSeconds:a.run.elapsedSeconds},candidate:{worldId:b.run.worldId,score:b.run.score,actions:b.actions,offerAnswers:b.offers,actionRefusals:b.run.actionRefusals,elapsedSeconds:b.run.elapsedSeconds},marginDeltaCents:b.run.score.marginCents-a.run.score.marginCents,onTimeDelta:b.run.score.onTimeShare-a.run.score.onTimeShare}
})
function summarize(side:"baseline"|"candidate") {
  const orders=pairs.reduce((n,p)=>n+p[side].score.wonOrders,0)
  return {
    rankedRuns:pairs.filter(p=>p[side].score.ranked).length,
    failedSeeds:pairs.filter(p=>!p[side].score.ranked).map(p=>p.seed),
    totalMarginCents:pairs.reduce((n,p)=>n+p[side].score.marginCents,0),
    worstOnTimeShare:Math.min(...pairs.map(p=>p[side].score.onTimeShare)),
    weightedOnTimeShare:orders?pairs.reduce((n,p)=>n+p[side].score.onTimeShare*p[side].score.wonOrders,0)/orders:0,
    wonOrders:orders,
    undeliveredOrders:pairs.reduce((n,p)=>n+Math.round(p[side].score.undeliveredShare*p[side].score.wonOrders),0),
    offers:pairs.reduce((n,p)=>n+(p[side].actions.offer??0),0),
    reprices:pairs.reduce((n,p)=>n+(p[side].actions.reprice??0),0),
    refusedActions:pairs.reduce((n,p)=>n+p[side].actionRefusals,0),
  }
}
const report={level:pairs.length?baseline.values().next().value!.run.options.level:8,config:baseline.values().next().value!.run.config,seeds:pairs.map(p=>p.seed),baseline:summarize("baseline"),candidate:summarize("candidate"),pairs}
if(values.out) await writeFile(values.out,JSON.stringify(report,null,2)+"\n")
console.table(pairs.map(p=>({seed:p.seed,baselineMargin:p.baseline.score.marginCents/100,candidateMargin:p.candidate.score.marginCents/100,baselineOnTime:(100*p.baseline.score.onTimeShare).toFixed(2)+"%",candidateOnTime:(100*p.candidate.score.onTimeShare).toFixed(2)+"%",baselineRanked:p.baseline.score.ranked,candidateRanked:p.candidate.score.ranked})))
console.log(JSON.stringify({baseline:report.baseline,candidate:report.candidate},null,2))
if(report.candidate.failedSeeds.length) process.exitCode=2
