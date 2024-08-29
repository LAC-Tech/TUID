import fc from "fast-check"
import { describe, expect, test } from "vitest"
import * as tuid from "./index.js"

import * as arb from "./arbitraries.js"

describe("encoding/decoding is reversible", () => {
	test("TUID", () =>
		fc.assert(
			fc.property(
				arb.tuid,
				/** @param {import("./types.d.ts").TUID} actual */
				actual => {
					console.log("Actual:")
					console.log(actual)
					// TODO: test
					const expected = tuid.decode(tuid.encode(actual))
					console.log("Expected:")
					console.log(expected)
					expect(actual).toEqual(expected)
				}
			)
		))
})
