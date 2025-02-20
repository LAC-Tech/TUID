import fc from "fast-check"
import { describe, expect, test } from "vitest"
import * as datetime from "./datetime.js"
import * as arb from "./arbitraries.js"

describe("encoding/decoding is reversible", () => {
	test("TUID", () =>
		fc.assert(
			fc.property(
				arb.date,
				/** @param {Date} expected */
				expected => {
					const encoded = datetime.encode(expected)
					const actual = datetime.decode(encoded)
					expect(actual).toEqual(expected)
				}
			)
		))
})
