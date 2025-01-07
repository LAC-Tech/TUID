import * as fc from "fast-check"
import { Latitude, Longitude } from "@outdata/nli"

export const latNum = fc.integer({ min: -90, max: 90 })
export const longNum = fc.integer({ min: -180, max: 180 })
// Decimal portion of lat or long, max 6 dp
export const decimal = fc.nat({ max: 999999 })

const point = fc.record({
	lat: latNum.map(Latitude.fromNum),
	long: longNum.map(Longitude.fromNum),
})

export const groundLevel = fc.integer({ min: -19652, max: 19651 })
export const storey = fc.integer({ min: -578, max: 577 })

/** @type {fc.Arbitrary<import("./types.d.ts").StoreyNLI>} */
export const storeyNli = fc
	.tuple(point, storey)
	.map(([p, storey]) => ({ ...p, storey }))

/** @type {fc.Arbitrary<import("./types.d.ts").GroundLevelNLI>} */
export const groundLevelNli = fc
	.tuple(point, groundLevel)
	.map(([p, groundLevel]) => ({ ...p, groundLevel }))

export const date = fc
	.date({
		min: new Date("0000-01-01T00:00:00.000Z"),
		max: new Date("9999-12-31T23:59:59.999Z"),
	})
	.map(d => {
		// TUIDs only have minute precision
		d.setUTCSeconds(0)
		d.setUTCMilliseconds(0)
		return d
	})

const capitalAsciiLetters = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
const asciiDigits = Array.from("0123456789")

/** @type {fc.Arbitrary<import("./types.d.ts").ALEI>} */
export const alei = fc.record({
	prefix: fc.record({
		jurisdiction: fc.record({
			country: fc.string({
				minLength: 2,
				maxLength: 2,
				unit: fc.constantFrom(...capitalAsciiLetters),
			}),
			subdivision: fc.option(
				fc.string({
					minLength: 2,
					maxLength: 3,
					unit: fc.constantFrom(...capitalAsciiLetters, ...asciiDigits),
				})
			),
		}),
		register: fc.string(),
	}),
	identifier: fc.string(),
})

/** @type {fc.Arbitrary<import("./types.d.ts").TUID>} */
export const tuid = fc.record({
	date,
	origin: storeyNli,
	destination: storeyNli,
	registeredPrefix: alei,
	txnRef: fc.stringMatching(/^[A-Za-z0-9-]+$/),
})
