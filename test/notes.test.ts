import test from "node:test"
import assert from "node:assert/strict"
import { readNote, DAY } from "../notes.ts"

const parse = (text: string, arrived = 480) => readNote({ text, language: "en" }, arrived)

// Expected semantics follow RULES.md; unsupported associations must decline.
for (const text of [
  "Manual; pickup after lunch",
  "Pickup after 12:00 provided payment clears",
  "Manual; delivery when the office reopens",
  "Pickup after 10 and before 16",
  "Pickup not after 15:00",
  "Delivery inte före lunch; manual",
  "Nouto ei ennen lounasta; manuaali",
  "Pickup after 10:00, actually after 14:00; manual",
  "Manual pickup after 10:00 correction: after 14:00",
  "Nouto klo 10 jälkeen, korjaus: klo 14 jälkeen",
  "Hämtning efter 10, rättelse: efter 14",
  "Pickup after 10 today and after 14 tomorrow",
  "Pickup after 10; delivery by closing time",
  "Manual; call phone 0401234567 after arrival",
  "Manual; key code 13.30",
  "Pickup ready 14:00, car has 150 hp",
  "Delivery open tomorrow 9-17",
  "Pickup weekdays 9-17, Saturday 10-12",
]) test(`unsafe associations decline: ${text}`, () => {
  assert.equal(parse(text).uncertain, true)
})

for (const [text, key, expected] of [
  ["Pickup after half three", "pickupFrom", 870],
  ["Deliver before five", "deliveryTo", 1020],
  ["Pickup after puoli kolme", "pickupFrom", 870],
  ["Hämtning tidigast halv tre", "pickupFrom", 870],
  ["Pickup after tomorrow 12am", "pickupFrom", DAY],
  ["Delivery before the day after tomorrow 12pm", "deliveryTo", 2 * DAY + 720],
  ["Pickup ready Thurs at 10:00", "pickupFrom", 3 * DAY + 600],
  ["Pickup from 14:00", "pickupFrom", 840],
  ["Hämtning tidigast imorgon 14:00", "pickupFrom", DAY + 840],
] as const) test(`grounded time: ${text}`, () => {
  const f = parse(text)
  assert.equal(f[key], expected)
  assert.equal(f.uncertain, false)
})

test("equipment and independent stop facts survive", () => {
  const f = parse("manual; without plates; summer tyres; Pickup after 11:00; delivery before 16:30")
  assert.equal(f.manual, true)
  assert.equal(f.plates, true)
  assert.equal(f.summerTyres, true)
  assert.equal(f.pickupFrom, 660)
  assert.equal(f.deliveryTo, 990)
  assert.equal(f.uncertain, false)
})
test("contradictory bounds decline", () => {
  assert.equal(parse("Pickup after 16:00; pickup before 10:00").uncertain, true)
})
test("recurring hours remain clock minutes", () => {
  assert.deepEqual(parse("Pickup open daily 9-17").pickupHours, { opens: 540, closes: 1020 })
  assert.equal(parse("Pickup open daily 9-17").uncertain, false)
})
test("greetings and empty notes are harmless", () => {
  for (const text of ["", "thanks", "kiitos", "tack"]) assert.equal(parse(text).uncertain, false)
})
test("handbook equipment sentences are fully understood", () => {
  const plates = parse("Car has no plates.")
  assert.equal(plates.plates, true)
  assert.equal(plates.uncertain, false)
  const summer = parse("Auto vielä kesärenkailla.")
  assert.equal(summer.summerTyres, true)
  assert.equal(summer.uncertain, false)
  assert.equal(parse("Car has no plates; pickup after payment clears").uncertain, true)
})
test("completed-world cargo and reference clauses do not imply fitted summer tyres", () => {
  for (const text of ["Summer tyres in the trunk, go with the car.", "Sommardäcken i bakluckan, följer med", "Lisäksi 4 kesärengasta tavaratilassa. Kiitos taas", "Keys at service desk. Our ref: 562260"]) {
    const f = parse(text)
    assert.equal(f.summerTyres, false)
    assert.equal(f.uncertain, false)
  }
  const constrained = parse("Summer tyres in the trunk, go with the car; delivery by sunset")
  assert.equal(constrained.uncertain, true)
  assert.equal(parse("Summer tyres in the trunk, go with the car before sunset").uncertain, true)
  const timed = parse("Keys at service desk; delivery before 16:00")
  assert.equal(timed.deliveryTo, 960)
  assert.equal(timed.uncertain, false)
})

test("a bare clock correction replaces only the immediately preceding single clock", () => {
  for (const [text, key, at] of [
    ["Manual; Pickup ready tomorrow at 14:00. Correction: 15:30.", "pickupFrom", DAY + 930],
    ["Hämtning tidigast imorgon kl 14. Rättelse: kl 15.", "pickupFrom", DAY + 900],
    ["Nouto huomenna klo 14 jälkeen. Korjaus: klo 15.", "pickupFrom", DAY + 900],
    ["Deliver before tomorrow 17:00. Correction: 16:00.", "deliveryTo", DAY + 960],
  ] as const) {
    const f = parse(text)
    assert.equal(f[key], at)
    assert.equal(f.uncertain, false)
    if (text.startsWith("Manual")) assert.equal(f.manual, true)
  }
  for (const text of [
    "Pickup after 10 and before 16. Correction: 14.",
    "Pickup after 10; manual. Correction: 14.",
    "Pickup after 10. Correction: tomorrow 14.",
    "Pickup not after 10. Correction: 14.",
  ]) assert.equal(parse(text).uncertain, true)
})

test("Unicode word clocks match complete Finnish and Swedish words", () => {
  assert.equal(parse("Hämtning tidigast två").pickupFrom, 840)
  assert.equal(parse("Nouto jälkeen neljä").pickupFrom, 960)
  assert.equal(parse("Nouto jälkeen yhdeksän").pickupFrom, 540)
  assert.equal(parse("Hämtning tidigast halvtvå").uncertain, true)
})
test("completed-world duplicated-vowel tomorrow retains the relative day", () => {
  const f = parse("huolto kesken, valmis huuomenna klo 12", 3894)
  assert.equal(f.pickupFrom, 3 * DAY + 720)
  assert.equal(f.uncertain, false)
})
test("Finnish inflected clocks retain their whole-word meaning", () => {
  const f = parse("Valmiina puoli neljästä alkaen.")
  assert.equal(f.pickupFrom, 930)
  assert.equal(f.uncertain, false)
  assert.equal(parse("Nouto viideltä jälkeen").pickupFrom, 1020)
  assert.equal(parse("Nouto kolmesta alkaen").pickupFrom, 900)
  assert.equal(parse("Valmiina puoli neljästää alkaen").uncertain, true)
})
test("Finnish destination hours never replace pickup hours", () => {
  const f = parse("auto valims vasta huomenna klo 9. kohde auki arkisin 9 - 20.")
  assert.equal(f.pickupFrom, DAY + 540)
  assert.equal(f.pickupHours, undefined)
  assert.deepEqual(f.deliveryHours, { opens: 540, closes: 1200 })
  assert.equal(f.uncertain, false)
  assert.equal(parse("Nouto kohteeseen ennen 16:00").uncertain, true)
})
test("explicit no-pickup negation reverses the time direction without losing its side", () => {
  const lower = parse("No pickup before tomorrow 15:00; manual")
  assert.equal(lower.pickupFrom, DAY + 900)
  assert.equal(lower.pickupTo, undefined)
  assert.equal(lower.manual, true)
  assert.equal(lower.uncertain, false)
  const upper = parse("No pickup after 17:00")
  assert.equal(upper.pickupTo, 1020)
  assert.equal(upper.pickupFrom, undefined)
  assert.equal(upper.uncertain, false)
  const delivery = parse("No delivery until 12pm")
  assert.equal(delivery.deliveryFrom, 720)
  assert.equal(delivery.deliveryTo, undefined)
  assert.equal(delivery.uncertain, false)
  assert.equal(parse("No pickup until payment clears").uncertain, true)
})
test("exceptions to a clock remain uncertain", () => {
  for (const text of ["No pickup after 17:00 except Friday", "Nouto klo 15 jälkeen paitsi huomenna", "Hämtning efter 15 utom fredag"]) assert.equal(parse(text).uncertain, true)
})

test("observed carried-wheel clauses do not become fitted-tyre restrictions", () => {
  for (const text of ["Renkaat kyydissä", "Renkaat takakontissa, menee mukana.", "Spare wheels in the boot", "Second set of wheels in the back."]) {
    const f = parse(text)
    assert.equal(f.uncertain, false)
    assert.equal(f.summerTyres, false)
  }
  const f = parse("Renkaat kyydissä; manual; delivery before tomorrow 14:00")
  assert.equal(f.manual, true)
  assert.equal(f.deliveryTo, DAY + 840)
  assert.equal(f.uncertain, false)
  assert.equal(parse("Spare wheels in the boot; no plates").plates, true)
})

test("carried-wheel whitelist cannot erase conditions or fitted summer tyres", () => {
  assert.equal(parse("Renkaat kyydissä vain jos nouto onnistuu").uncertain, true)
  assert.equal(parse("Spare wheels in the boot unless collection changes").uncertain, true)
  const f = parse("Renkaat kyydissä; car has summer tyres")
  assert.equal(f.summerTyres, true)
  const deadline = parse("Second set of wheels in the back; delivery before 15:00")
  assert.equal(deadline.deliveryTo, 900)
  assert.equal(deadline.uncertain, false)
})

test("complete key locations and lockbox codes do not create clocks", () => {
  for (const text of ["Key in the car", "Avain autossa.", "Avaimet toimistosta", "Avain avainboksissa, koodi 1234", "Avain avainboksissa, koodi 0000."]) {
    const f = parse(text)
    assert.equal(f.uncertain, false)
    assert.equal(f.pickupFrom, undefined)
    assert.equal(f.pickupTo, undefined)
    assert.equal(f.deliveryTo, undefined)
  }
})

test("key metadata preserves separate readiness delivery and equipment facts", () => {
  const f = parse("Avain avainboksissa, koodi 1234; nouto vasta huomenna klo 10; delivery before tomorrow 17:00; manual; no plates")
  assert.equal(f.pickupFrom, DAY + 600)
  assert.equal(f.deliveryTo, DAY + 1020)
  assert.equal(f.manual, true)
  assert.equal(f.plates, true)
  assert.equal(f.uncertain, false)
  assert.equal(parse("Key in the car; summer tyres").summerTyres, true)
})

test("key-only coverage does not discard conditions or unrelated metadata", () => {
  for (const text of ["Key in the car unless pickup changes", "Avain avainboksissa, koodi 12.30", "Key in the car; provided delivery changes", "Meidän viite 123456", "Huoltokirja ja rekisteriote autossa", "Terve"]) assert.equal(parse(text).uncertain, true)
})

test("observed destination typo keeps a delivery deadline off the pickup side", () => {
  const f = parse("At destinattion tomorrow 15:00 latest")
  assert.equal(f.deliveryTo, DAY + 900)
  assert.equal(f.pickupTo, undefined)
  assert.equal(f.uncertain, false)
})

test("I mean day corrections remain uncertain while preserving equipment", () => {
  const f = readNote({ text: "No plates; At destinattion tomorrow 15:00 latest, sorry, I mean Friday!" }, 3811)
  assert.equal(f.uncertain, true)
  assert.ok(f.reasons.includes("correction scope requires review"))
  assert.equal(f.plates, true)
  assert.equal(parse("Delivery tomorrow 15:00 latest, I mean Friday!").uncertain, true)
})

test("observed Peirlla typo remains a Monday delivery deadline", () => {
  const f = readNote({ text: "Peirllä ma klo 19.00 mennessä!" }, 3587)
  assert.equal(f.deliveryTo, 7 * DAY + 1140)
  assert.equal(f.pickupTo, undefined)
  assert.equal(f.uncertain, false)
})

test("a timed clause without a grounded stop side cannot silently become pickup", () => {
  const f = parse("Manual; mysterious depot tomorrow 15:00 latest")
  assert.equal(f.manual, true)
  assert.equal(f.uncertain, true)
  assert.ok(f.reasons.includes("unrecognized stop side"))
})
