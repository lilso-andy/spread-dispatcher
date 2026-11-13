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
const words: Record<string, number> = { yksi:13, yhden:13, kaksi:14, kahden:14, kolme:15, kolmen:15, neljä:16, neljän:16, viisi:17, viiden:17, yhdeksän:9, yhdeksältä:9, kymmenen:10, kymmeneltä:10, yksitoista:11, kaksitoista:12, ett:13, en:13, två:14, tre:15, fyra:16, fem:17, nio:9, tio:10, elva:11, tolv:12 }

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
  // Corrections replace the earlier clause; retain unrelated earlier facts.
  text = text.replace(/([^;.!?]*?)(?:\bcorrection:|\bactually\b|\bkorjaus:|\bsiis\b|\brättelse:)([^;!?]*)/g, "$2")
  facts.manual = /manuaali|manual(?:\s+(?:gear|transmission|licen))?|manuell|käsivaihte/.test(text)
  facts.plates = /(?:no|without|missing)\s+(?:registration\s+)?plates|ei\s+(?:ole\s+)?(?:rekisteri)?kilpi|ilman\s+kilpi|kilvetön|saknar\s+(?:reg(?:istrerings)?[ -]?)?skylt|utan\s+skylt/.test(text)
  facts.summerTyres = /kesären|summer\s+t[yi]re|sommardäck/.test(text)
  let recognized = facts.manual || facts.plates || facts.summerTyres
  // Split clauses without splitting 13.30 or kl. 13. Requirements alone need no time.
  const clauses = text.split(/;|\n|(?<=[.!?])\s+(?=[a-zåäö])/)
  for (let clause of clauses) {
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
      } else facts.reasons.push("invalid opening-hours range")
    }
    clause = clause.replace(range, " ")
    const clocks = [...clause.matchAll(/(?:\b(?:klo|kl\.?)\s*)?(\d{1,2})(?:[.:](\d{2}))?\s*(am|pm)?\b/g)]
    const candidates: { index: number; length: number; minute: number }[] = []
    for (const m of clocks) {
      let hour = Number(m[1])
      const minute = Number(m[2] ?? 0)
      if (m[3]) hour = hour % 12 + (m[3] === "pm" ? 12 : 0)
      if (hour > 23 || minute > 59) continue
      // A bare number must have a time/constraint context; avoid registration and phone numbers.
      if (!m[2] && !m[3] && !/klo|kl\.?|ennen|jälkeen|before|after|\bby\b|senast|tidigast|före|efter|valmi|klar|ready/.test(clause)) continue
      candidates.push({ index: m.index!, length: m[0].length, minute: hour * 60 + minute })
    }
    const wordPattern = new RegExp(`\\b(?:(puoli|halv)\\s+)?(${Object.keys(words).sort((a,b) => b.length-a.length).join("|")})\\b`, "g")
    for (const m of clause.matchAll(wordPattern)) candidates.push({ index: m.index!, length: m[0].length, minute: words[m[2]!]! * 60 - (m[1] ? 30 : 0) })
    for (const candidate of candidates) {
      const before = clause.slice(0, candidate.index)
      if (/(?:\bnot|\bei|\binte)\s*$/.test(before)) continue
      const direction = AFTER.test(clause) ? "From" : BEFORE.test(clause) ? "To" : undefined
      if (!direction) { facts.reasons.push("time without a clear before/after constraint"); continue }
      const key = `${side}${direction}` as "pickupFrom" | "pickupTo" | "deliveryFrom" | "deliveryTo"
      const at = dayFor(clause, arrived) * DAY + candidate.minute
      facts[key] = direction === "From" ? Math.max(facts[key] ?? 0, at) : Math.min(facts[key] ?? Infinity, at)
      recognized = true
    }
    if (/huomen|morgon|tomorrow|tmrw|valmi|ready|klar/.test(clause) && !candidates.length && (pickup || delivery)) facts.reasons.push("date/readiness without a supported clock time")
  }
  // Unknown prose is treated as unknown, even when it could be harmless.
  if (!recognized && !/^(?:kiitos|tack|thank you|thanks|ok)[.! ]*$/.test(text)) facts.reasons.push("unrecognized note")
  // Negations of equipment requirements should not be guessed.
  if (/(?:not|ei|inte)\s+(?:manual|manuaali|manuell)|plates\s+(?:already|included)|kilvet\s+on/.test(text)) facts.reasons.push("ambiguous equipment requirement")
  facts.uncertain = facts.reasons.length > 0
  return facts
}
