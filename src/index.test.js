import fc from "fast-check"
import { describe, expect, test } from "vitest"
import * as tuid from "./index.js"

import * as arb from "./arbitraries.js"

describe("encoding/decoding is reversible", () => {
	test("TUID", () =>
		fc.assert(
			fc.property(
				arb.tuid,
				/** @param {import("./types.d.ts").TUID} expected */
				expected => {
					const encoded = tuid.encode(expected)
					const actual = tuid.decode(encoded)
					//console.log({ expected, encoded, actual })
					console.log("EXPECTED:")
					console.log(JSON.stringify(expected, null, 2))
					console.log("EXPECTED AS TUID STRING:")
					console.log(encoded)
					console.log("ACTUAL:")
					console.log(JSON.stringify(actual, null, 2))
					console.log("-----------------------------------")
					expect(actual.date).toEqual(expected.date)
					expect(actual.origin).toEqual(expected.origin)
					expect(actual.destination).toEqual(expected.destination)
					expect(actual.txnRef).toEqual(expected.txnRef)
					expect(actual.registeredPrefix).toEqual(expected.registeredPrefix)
				}
			)
		))
})
