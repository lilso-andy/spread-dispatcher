/** Offline action-bucket pressure only: ignores network/read latency and behavioral
 * changes from delayed actions. This is not a live-final simulation or guarantee. */
export function finalSeconds(minute: number): number {
  let seconds=0
  for(let t=0;t<minute;) {
    const hour=Math.floor(t/60),day=Math.floor(hour/24),clock=hour%24
    const boundary=Math.min(minute,(hour+1)*60)
    const daytime=clock>=6&&clock<22
    const secondsPerHour=day>7||(day===7&&clock>=22)||day%7===6||!daytime?3:day===7?9:day%7===5?6:18
    seconds+=(boundary-t)*secondsPerHour/60
    t=boundary
  }
  return seconds
}

export class ActionBucketReplay {
  at=0
  tokens=50
  maxLagSeconds=0
  lateQuotes=0
  actions=0

  take(worldMinute:number,respondBy?:number): number {
    const arrival=finalSeconds(worldMinute)
    const availableAt=Math.max(arrival,this.at)
    this.tokens=Math.min(50,this.tokens+Math.max(0,availableAt-this.at)*20)
    this.at=availableAt
    if(this.tokens<1) { this.at+=(1-this.tokens)/20;this.tokens=1 }
    this.tokens-=1
    const lag=Math.max(0,this.at-arrival)
    this.maxLagSeconds=Math.max(this.maxLagSeconds,lag)
    this.actions++
    if(respondBy!==undefined&&this.at>=finalSeconds(respondBy))this.lateQuotes++
    return lag
  }
}
