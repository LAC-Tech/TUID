import fc from "fast-check"
import { describe, expect, test } from "vitest"
import { encode, decode } from "./alei.js"
import * as arb from "./arbitraries.js"

describe("encoding/decoding is reversible", () => {
	test("ALEI", () =>
		fc.assert(
			fc.property(
				arb.alei,
				/** @param {import("./types.js").ALEI} expected */
				expected => {
					const encoded = encode(expected)
					const actual = decode(encoded)
					expect(actual).toEqual(expected)
				}
			)
		))
})
