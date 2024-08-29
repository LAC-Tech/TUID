import fc from "fast-check"
import { describe, expect, test } from "vitest"
import * as datetime from "./datetime.js"

describe("encoding/decoding is reversible", () => {
	test("TUID", () =>
		fc.assert(
			fc.property(
				fc.date({
					min: new Date("0000-01-01T00:00:00.000Z"),
					max: new Date("9999-12-31T23:59:59.999Z"),
				}),
				/** @param {Date} expected */
				expected => {
					// We only care about minute precision
					expected.setUTCSeconds(0)
					expected.setUTCMilliseconds(0)

					const encoded = datetime.encode(expected)
					const actual = datetime.decode(encoded)
					expect(actual).toEqual(expected)
				}
			)
		))
})
