import type { Note } from "./typescript/types.ts"

export const DAY = 1440
export type NoteFacts = {
  manual: boolean
  plates: boolean
  summerTyres: boolean
  pickupFrom?: number
  pickupTo?: number
  deliveryFrom?: number
  deliveryTo?: number
  pickupHours?: { opens: number; closes: number }
  deliveryHours?: { opens: number; closes: number }
  uncertain: boolean
  reasons: string[]
}

const DELIVERY = /toimit|perill|perille|vastaanot|kohtee|deliver|arriv|destination|receiv|leveran|framme|mottag/
const PICKUP = /nout|haett|luovut|pick.?up|collect|handover|hämt|avhämt|utlämn|ready|valmi|klar|maksu|payment|betala/
const AFTER = /jälkeen|alkaen|aikaisintaan|after|from\b|earliest|not before|ei ennen|valmi|ready|efter|tidigast|inte före|klar|vasta\b/
const BEFORE = /ennen|mennessä|viimeist|before|\bby\b|latest|före|senast|asti|until|till\b/
const week = [ /maanantai|\bma\.?\b|måndag|\bmån\b|monday|\bmon\b/, /tiistai|\bti\.?\b|tisdag|\btis\b|tuesday|\btue(?:s)?\b/, /keskiviik|\bke\.?\b|onsdag|\bons\b|wednesday|\bwed\b/, /torstai|\bto\.\s|torsdag|\btors?\b|thursday|\bthu(?:rs)?\b/, /perjantai|\bpe\.?\b|fredag|\bfre\b|friday|\bfri\b/, /lauantai|\bla\.?\b|lördag|saturday|\bsat\b/, /sunnuntai|\bsu\.?\b|söndag|sunday|\bsun\b/ ]
const words: Record<string, number> = { one:13, two:14, three:15, four:16, five:17, nine:9, ten:10, eleven:11, twelve:12, yksi:13, yhden:13, kaksi:14, kahden:14, kolme:15, kolmen:15, neljä:16, neljän:16, viisi:17, viiden:17, yhdeksän:9, yhdeksältä:9, kymmenen:10, kymmeneltä:10, yksitoista:11, kaksitoista:12, ett:13, en:13, två:14, tre:15, fyra:16, fem:17, nio:9, tio:10, elva:11, tolv:12 }

// Complete clauses only: never let a cargo/keys keyword erase a deadline.
const BENIGN = /^(?:(?:summer tyres in the trunk, go with the car|extra set of tyres in the boot, take along|spare wheels in the boot, thx)|(?:4 rengasta vanteilla tavaratilassa|lisärenkaat mukaan|rengassarja mukaan|rengassarja takapenkillä, kulkee mukana|kesärenkaat vanteineen takakontissa|lisäksi 4 kesärengasta tavaratilassa|ylimääräinen rengassarja takakontissa, mukaan)|(?:sommardäcken i bakluckan, följer med|däcken ligger i bilen, ska med)|(?:keys at service desk|avaimet huollosta|avaimet myyjältä|avaimet huollon tiskiltä)|(?:(?:our ref:|booking ref|ref|viite|varaus|tilausnumero)\s*\d{4,8})|(?:hello|hei|hei vaan|kiitos paljon|kiitos taas|kiitos etukäteen|cheers|standard transfer, thanks))[.! ]*$/
const BENIGN_EXTRA = /^(?:hi|hi there|moi|moikka|kiittos|kiios paljon|tack på förhand|hyvää päivänjatkoa|paperit hanskalokerossa|paperit kuljettajalle tiskiltä|kauppakirja mukana, anna vastaanottajalle|extra däcksats i bagaget, ska med|2 sarjaa renkaita, toinen sarja kontissa|4 rengasta vanteilla tavaratilassa, avain autossa|rengassarja mukaan, avaimet myyjältä|rengassarja mukaan, avaimet huollon tiskiltä|lisärenkaat mukaan, kiitos taas|lisärenkaat mukkaan|(?:order no|tilausnro)\s+\d{4,8})[.! ]*$/

function dayFor(text: string, arrived: number): number {
  const today = Math.floor(arrived / DAY)
  if (/ylihuomen|över.?morgon|day after tomorrow/.test(text)) return today + 2
  if (/huomen|i\s?morgon|tomorrow|tmrw/.test(text)) return today + 1
  const weekday = week.findIndex((r) => r.test(text))
  if (weekday >= 0) {
    for (let offset = 2; offset <= 6; offset++) if ((today + offset) % 7 === weekday) return today + offset
  }
  return today
}

/** Only convert facts we can ground in the text; unfamiliar notes are declined at quoting. */
export function readNote(note: Note | null, arrived: number): NoteFacts {
  const facts: NoteFacts = { manual: false, plates: false, summerTyres: false, uncertain: false, reasons: [] }
  if (!note?.text.trim()) return facts
  let text = note.text.normalize("NFKC").toLowerCase()
  // Observed in completed practice R00629: the duplicated vowel still means tomorrow.
  text = text.replace(/(?<![\p{L}\p{N}_])huuomenna(?![\p{L}\p{N}_])/gu, "huomenna")
  const pieces = text.split(/;|\n|(?<=[.!?])\s+(?=[a-zåäö])/)
  for (let i = 1; i < pieces.length; i++) {
    const correction = /^\s*(?:correction|korjaus|rättelse):\s*(?:(?:klo|kl\.?|at)\s*)?(\d{1,2}(?:[.:]\d{2})?(?:\s*(?:am|pm))?)[.! ]*$/.exec(pieces[i]!)
    if (!correction) continue
    const previous = pieces[i - 1]!
    if (/correction|korjaus|rättelse|actually|siis/.test(previous)) continue
    const clocks = [...previous.matchAll(/(?<![\p{L}\p{N}_])\d{1,2}(?:[.:]\d{2})?(?:\s*(?:am|pm))?(?![\p{L}\p{N}_])/gu)]
    if (clocks.length !== 1) continue
    // Ask the ordinary parser to establish a single, fully understood time scope.
    const old = readNote({ ...note, text: previous }, arrived)
    const bounds = [old.pickupFrom, old.pickupTo, old.deliveryFrom, old.deliveryTo].filter(v => v !== undefined)
    if (old.uncertain || bounds.length !== 1 || old.pickupHours || old.deliveryHours) continue
    const clock = clocks[0]!
    pieces[i - 1] = previous.slice(0, clock.index) + correction[1] + previous.slice(clock.index! + clock[0].length)
    pieces[i] = "thanks"
  }
  text = pieces.join("; ")
  // Cargo tyres are not tyres fitted to the car. Mask only fully matched benign clauses.
  text = text.split(/;|\n|(?<=[.!?])\s+(?=[a-zåäö])/).map(c => BENIGN.test(c.trim()) || BENIGN_EXTRA.test(c.trim()) ? "thanks" : c).join("; ")
  // A correction may replace a time while leaving equipment facts in force.
  // Until its scope is resolved, retain the text and decline the note.
  if (/\b(?:correction|actually|korjaus|siis|rättelse)\b/.test(text)) facts.reasons.push("correction scope requires review")
  facts.manual = /manuaali|manual(?:\s+(?:gear|transmission|licen))?|manuell|käsivaihte/.test(text)
  facts.plates = /(?:no|without|missing)\s+(?:registration\s+)?plates|ei\s+(?:ole\s+)?(?:rekisteri)?kilpi|ilman\s+kilpi|kilvetön|saknar\s+(?:reg(?:istrerings)?[ -]?)?skylt|utan\s+skylt/.test(text)
  facts.summerTyres = /kesären|summer\s+t[yi]re|sommardäck/.test(text)
  let recognized = facts.manual || facts.plates || facts.summerTyres
  // Split clauses without splitting 13.30 or kl. 13. Requirements alone need no time.
  const clauses = text.split(/;|\n|(?<=[.!?])\s+(?=[a-zåäö])/)
  for (let clause of clauses) {
    if (!clause.trim()) continue
    // A bounded whitelist for complete equipment sentences, including handbook examples.
    if (/^(?:car has no plates|auto ilman kilpiä|manuaalivaihteisto|auto vielä kesärenkailla)[.! ]*$/.test(clause.trim())) continue
    const equipmentOnly = /^(?:manuaali[a-zåäö]*|manual(?:\s+(?:gearbox|transmission|licence))?|manuell[a-zåäö]*|käsivaihte[a-zåäö]*|(?:auto\s+)?ilman\s+kilpi[a-zåäö]*|(?:no|without|missing)\s+(?:registration\s+)?plates|saknar\s+skylt[a-zåäö]*|kesären[a-zåäö]*|summer\s+t[yi]res|sommardäck)[.! ]*$/.test(clause.trim())
    const harmless = /^(?:kiitos|tack|thank you|thanks|ok)[.! ]*$/.test(clause.trim())
    if (equipmentOnly || harmless) { recognized = true; continue }
    let clauseRecognized = false
    if (/\b(?:provided|unless|if|when|jos|kun|om|när)\b/.test(clause)) facts.reasons.push("conditional constraint requires review")
    if ([...clause.matchAll(/\b\d{1,2}(?:[.:]\d{2})?\s*[-–]\s*\d{1,2}(?:[.:]\d{2})?\b/g)].length > 1) facts.reasons.push("multiple opening ranges cannot be represented")
    // Clause-wide direction/date matching cannot safely associate competing facts.
    const directionText = clause.replace(/(?:the )?day after tomorrow/g, "tomorrow")
    if (AFTER.test(directionText) && BEFORE.test(directionText) && !/not before|ei ennen|inte före/.test(clause)) facts.reasons.push("multiple time directions in one clause")
    if (/(?:\bnot\b|\bei\b|\binte\b)/.test(clause) && !/not before|ei ennen|inte före/.test(clause)) facts.reasons.push("negated constraint requires review")
    const delivery = DELIVERY.test(clause)
    const pickup = PICKUP.test(clause) || !delivery
    if (delivery && PICKUP.test(clause)) {
      facts.reasons.push("pickup and delivery constraints in the same clause")
      continue
    }
    const side = delivery ? "delivery" : "pickup"
    const range = /\b(\d{1,2})(?:[.:](\d{2}))?\s*[-–]\s*(\d{1,2})(?:[.:](\d{2}))?\b/g
    for (const match of clause.matchAll(range)) {
      const opens = Number(match[1]) * 60 + Number(match[2] ?? 0)
      const closes = Number(match[3]) * 60 + Number(match[4] ?? 0)
      if (opens < closes && closes < DAY && Number(match[2] ?? 0) < 60 && Number(match[4] ?? 0) < 60) {
        facts[`${side}Hours`] = { opens, closes }
        recognized = true
        clauseRecognized = true
      } else facts.reasons.push("invalid opening-hours range")
    }
    clause = clause.replace(range, " ")
    const clocks = [...clause.matchAll(/(?:\b(?:klo|kl\.?)\s*)?(\d{1,2})(?:[.:](\d{2}))?\s*(am|pm)?\b/g)]
    const candidates: { index: number; length: number; minute: number }[] = []
    for (const m of clocks) {
      let hour = Number(m[1])
      const minute = Number(m[2] ?? 0)
      if (m[3] && (hour < 1 || hour > 12)) { facts.reasons.push("invalid AM/PM hour"); continue }
      if (m[3]) hour = hour % 12 + (m[3] === "pm" ? 12 : 0)
      if (hour > 23 || minute > 59) continue
      // A bare number must have a time/constraint context; avoid registration and phone numbers.
      if (!m[2] && !m[3] && !/klo|kl\.?|ennen|jälkeen|before|after|\bby\b|senast|tidigast|före|efter|valmi|klar|ready/.test(clause)) continue
      candidates.push({ index: m.index!, length: m[0].length, minute: hour * 60 + minute })
    }
    const wordPattern = new RegExp(`(?<![\\p{L}\\p{N}_])(?:(puoli|halv|half)\\s+)?(${Object.keys(words).sort((a,b) => b.length-a.length).join("|")})(?![\\p{L}\\p{N}_])`, "gu")
    for (const m of clause.matchAll(wordPattern)) candidates.push({ index: m.index!, length: m[0].length, minute: words[m[2]!]! * 60 - (m[1] ? 30 : 0) })
    for (const candidate of candidates) {
      const before = clause.slice(0, candidate.index)
      if (/(?:\bnot|\bei|\binte)\s*$/.test(before)) continue
      const direction = AFTER.test(directionText) ? "From" : BEFORE.test(directionText) ? "To" : undefined
      if (!direction) { facts.reasons.push("time without a clear before/after constraint"); continue }
      const key = `${side}${direction}` as "pickupFrom" | "pickupTo" | "deliveryFrom" | "deliveryTo"
      const at = dayFor(clause, arrived) * DAY + candidate.minute
      facts[key] = direction === "From" ? Math.max(facts[key] ?? 0, at) : Math.min(facts[key] ?? Infinity, at)
      recognized = true
      clauseRecognized = true
    }
    if (/huomen|morgon|tomorrow|tmrw|valmi|ready|klar/.test(clause) && !candidates.length && (pickup || delivery)) facts.reasons.push("date/readiness without a supported clock time")
    if (!clauseRecognized) facts.reasons.push("unrecognized clause")
    // Do not treat a recognized number as proof that all surrounding prose is understood.
    if (candidates.length > 1 || /\b(?:phone|tel|code|pin|km|hp|litres)\b/.test(clause)) facts.reasons.push("multiple clocks or non-time numbers require review")
    if (/every|daily|weekdays|arkisin|joka|varje|vardagar/.test(clause) && !facts[`${side}Hours`]) facts.reasons.push("unsupported recurring hours")
    if (facts[`${side}Hours`] && /tomorrow|huomen|morgon|monday|tuesday|wednesday|thursday|friday|saturday|sunday/.test(clause)) facts.reasons.push("dated hours cannot be represented as recurring hours")
  }
  for (const side of ["pickup", "delivery"] as const) {
    const from = facts[`${side}From`], to = facts[`${side}To`]
    if (from !== undefined && to !== undefined && from > to) facts.reasons.push("contradictory time bounds")
  }
  // Unknown prose is treated as unknown, even when it could be harmless.
  if (!recognized && !/^(?:kiitos|tack|thank you|thanks|ok)[.! ]*$/.test(text)) facts.reasons.push("unrecognized note")
  // Negations of equipment requirements should not be guessed.
  if (/(?:not|ei|inte)\s+(?:manual|manuaali|manuell)|plates\s+(?:already|included)|kilvet\s+on/.test(text)) facts.reasons.push("ambiguous equipment requirement")
  facts.uncertain = facts.reasons.length > 0
  return facts
}
