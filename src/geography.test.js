import { expect, test, describe } from "vitest"
import fc from "fast-check"

import * as arb from "./arbitraries.js"
import { GroundLevel, Latitude, Longitude, Storey } from "./geography.js"

test("Storey encoding examples from ISO", () => {
	expect(Storey.encode(0)).toBe("H0")
	expect(Storey.encode(5)).toBe("H5")
	expect(Storey.encode(-2)).toBe("GW")
})

test("Ground level encoding examples from ISO", () => {
	expect(GroundLevel.encode(0)).toBe("H00")
	expect(GroundLevel.encode(1000)).toBe("HTE")
	expect(GroundLevel.encode(-1000)).toBe("G4K")
})

describe("encoding/decoding is reversible", () => {
	test("latitude", () =>
		fc.assert(
			fc.property(
				arb.Lat,
				/** @param {number} n */
				n => {
					const actual = Latitude.fromNum(n)
					const expected = Latitude.decode(actual.encode())
					expect(actual.n).toEqual(expected.n)
				}
			)
		))

	test("longitude", () => {
		fc.assert(
			fc.property(
				arb.Long,
				/** @param {number} n */
				n => {
					const actual = Longitude.fromNum(n)
					const expected = Longitude.decode(actual.encode())
					expect(actual.n).toEqual(expected.n)
				}
			)
		)
	})

	test("ground level", () => {
		fc.assert(
			fc.property(
				arb.GroundLevel,
				/** @param {number} actual */
				actual => {
					const expected = GroundLevel.decode(GroundLevel.encode(actual))
					expect(actual).toEqual(expected)
				}
			)
		)
	})

	test("storey", () => {
		fc.assert(
			fc.property(
				arb.Storey,
				/** @param {number} actual */
				actual => {
					const expected = Storey.decode(Storey.encode(actual))
					expect(actual).toEqual(expected)
				}
			)
		)
	})
})
