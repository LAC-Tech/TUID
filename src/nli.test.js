import fc from "fast-check"

import { describe, expect, test } from "vitest"
import { NLI } from "./nli.js"

/** @typedef {import('./types.d.ts').Elevation} Elevation */
// Testing against data from https://e-nli.org/

test("Embassy of New Zealand in Washington DC", () => {
	const actual = NLI.create({
		lat: 38.918966,
		long: -77.064241,
		elevation: { storey: 0 },
	}).encode()
	expect(actual).toBe("ISO.NLI:92SMU6-58207H-H0")
})

test("Ikamatua Hotel", () => {
	const actual = NLI.create({
		lat: -42.271374,
		long: 171.684597,
		elevation: { storey: 0 },
	}).encode()
	expect(actual).toBe("ISO.NLI:368FBM-Y9LCYL-H0")
})

describe("encoding/decoding is reversible", () => {
	test("NLI", () =>
		fc.assert(
			fc.property(
				fc.double({ min: -90, max: 90, noNaN: true }),
				fc.double({ min: -180, max: 180, noNaN: true }),
				fc.oneof(
					fc.record({ storey: fc.integer({ min: -578, max: 577 }) }),
					fc.record({ ground: fc.integer({ min: -1000, max: 1000 }) })
				),
				/**
				 * @param {number} lat
				 * @param {number} long
				 * @param {Elevation} elevation
				 */
				(lat, long, elevation) => {
					const actual = NLI.create({ lat, long, elevation })
					const encoded = actual.encode()
					const expected = NLI.decode(encoded)
					expect(actual.elevation).toEqual(expected.elevation)
					expect(actual.lat).toEqual(expected.lat)
					expect(actual.long).toEqual(expected.long)
				}
			)
		))
})
