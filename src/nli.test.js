import fc from "fast-check"

import { describe, expect, test } from "vitest"
import { Point } from "./nli.js"
import { NLI } from "./index.js"

// Testing against data from https://e-nli.org/

test("Embassy of New Zealand in Washington DC", () => {
	const actual = new NLI({
		lat: 38.918966,
		long: -77.064241,
		elevation: { storey: 0 },
	}).encode()
	expect(actual).toBe("ISO.NLI92SMU6-58207H-H0")
})

test("Ikamatua Hotel", () => {
	const actual = new NLI({
		lat: -42.271374,
		long: 171.684597,
		elevation: { storey: 0 },
	}).encode()
	expect(actual).toBe("ISO.NLI368FBM-Y9LCYL-H0")
})

describe("encoding/decoding is reversible", () => {
	test("Point", () =>
		fc.assert(
			fc.property(
				fc.float({ min: -90, max: 90 }),
				fc.float({ min: -180, max: 180 }),
				/**
				 * @param {number} lat
				 * @param {number} long
				 */
				(lat, long) => {
					const actual = Point.fromNumbers({ lat, long })
					const expected = Point.decode(actual.encode())
					expect(actual).toStrictEqual(expected)
				}
			)
		))
})
