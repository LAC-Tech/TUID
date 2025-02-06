import fc from "fast-check"
import { describe, expect, test } from "vitest"
import { encode, decode } from "./alei.js"
import * as arb from "./arbitraries.js"

test("ECMMA ALEI", () => {
	const expected = "US-DE.BER:3031657"
	const decoded = decode(expected)
	const actual = encode(decoded)
	expect(actual).toEqual(expected)
})
//describe("encoding/decoding is reversible", () => {
//	test("ALEI", () =>
//		fc.assert(
//			fc.property(
//				arb.alei,
//				/** @param {import("./types.js").ALEI} expected */
//				expected => {
//					const encoded = encode(expected)
//					const actual = decode(encoded)
//					expect(actual).toEqual(expected)
//				}
//			)
//		))
//})
