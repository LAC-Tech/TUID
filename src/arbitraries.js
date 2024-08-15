import * as fc from "fast-check"
import { Latitude, Longitude } from "./geography.js"

export const latNum = fc.integer({ min: -90, max: 90 })
export const longNum = fc.integer({ min: -180, max: 180 })
// Decimal portion of lat or long, max 6 dp
export const decimal = fc.nat({ max: 999999 })

export const groundLevel = fc.integer({ min: -19652, max: 19651 })
export const storey = fc.integer({ min: -578, max: 577 })

/** @type {fc.Arbitrary<import("./types.d.ts").NLI>} */
export const nli = fc.record({
	lat: latNum.map(Latitude.fromNum),
	long: longNum.map(Longitude.fromNum),
	elevation: fc.oneof(fc.record({ storey }), fc.record({ groundLevel })),
})

/** @type {fc.Arbitrary<import("./types.d.ts").TUID>} */
export const tuid = fc.record({
	date: fc.date(),
	origin: nli,
	destination: nli,
	registeredPrefix: fc.string(),
	txnRef: fc.string(),
})
