import { expect, test, describe } from "vitest"
import fc from "fast-check"

import { Decimal, Integer } from "./num.js"

describe("encoding/decoding is reversible", () => {
	test("Decimal portion of lat or long", () => {
		fc.assert(
			fc.property(
				fc.nat({ max: 999999 }),
				/** @param {number} n */
				n => {
					const actual = Decimal.decode(Decimal.encode(n))
					expect(actual).toEqual(n)
				}
			)
		)
	})

	test("latitude integer", () =>
		fc.assert(
			fc.property(
				fc.integer({ min: -90, max: 90 }),
				/** @param {number} n */
				n => {
					const actual = Integer.latitude.decode(Integer.latitude.encode(n))
					expect(actual).toEqual(n)
				}
			)
		))

	test("longitude integer", () =>
		fc.assert(
			fc.property(
				fc.integer({ min: -180, max: 180 }),
				/** @param {number} n */
				n => {
					const actual = Integer.longitude.decode(Integer.longitude.encode(n))
					expect(actual).toEqual(n)
				}
			)
		))
})
