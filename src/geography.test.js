import { expect, test, describe } from "vitest"
import fc from "fast-check"
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

test("TEMP TEST", () => {
	const actual = new Latitude(0.000001)
	const expected = Latitude.decode(actual.encode())
	expect(actual.n).toEqual(expected.n)
})
//describe("encoding/decoding is reversible", () => {
//	test("latitude", () =>
//		fc.assert(
//			fc.property(
//				fc.double({ min: -90, max: 90, noNaN: true }),
//				/** @param {number} lat */
//				lat => {
//					const actual = new Latitude(lat)
//					const expected = Latitude.decode(actual.encode())
//					expect(actual.n).toEqual(expected.n)
//				}
//			)
//		))
//
//	test("longitude", () => {
//		fc.assert(
//			fc.property(
//				fc.double({ min: -180, max: 180, noNaN: true }),
//				/** @param {number} long */
//				long => {
//					const actual = new Longitude(long)
//					const expected = Longitude.decode(actual.encode())
//					expect(actual.n).toEqual(expected.n)
//				}
//			)
//		)
//	})
//
//	test("ground level", () => {
//		fc.assert(
//			fc.property(
//				fc.integer({ min: -19652, max: 19651 }),
//				/** @param {number} actual */
//				actual => {
//					const expected = GroundLevel.decode(GroundLevel.encode(actual))
//					expect(actual).toEqual(expected)
//				}
//			)
//		)
//	})
//
//	test("storey", () => {
//		fc.assert(
//			fc.property(
//				fc.integer({ min: -578, max: 577 }),
//				/** @param {number} actual */
//				actual => {
//					const expected = Storey.decode(Storey.encode(actual))
//					expect(actual).toEqual(expected)
//				}
//			)
//		)
//	})
//})
