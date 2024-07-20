import { expect, test, describe } from "vitest"
import { Base14, Base19, Base32, Base34 } from "./num.js"
import fc from "fast-check"

test("encode 0 as base14", () => expect(Base14.encode(0)).toBe("0"))
test("encode 13 as base14", () => expect(Base14.encode(13)).toBe("D"))
test("encode 13 as base14", () => expect(Base14.encode(14)).toBe("10"))
test("encode 0 as base19", () => expect(Base19.encode(0)).toBe("0"))
test("encode 18 as base14", () => expect(Base19.encode(18)).toBe("Y"))
test("encode 0 as base32", () => expect(Base32.encode(0)).toBe("0"))
test("encode 31 as base32", () => expect(Base32.encode(31)).toBe("V"))

test("encode number part of latitude", () => {
	expect(Base14.encode(38 + 90)).toBe("92")
})

test("encode number part of longitude", () => {
	expect(Base19.encode(-77 + 180)).toBe("58")
})

/**
 * @param {{encode: (n: number) => string, decode: (s: string) => number}} base
 */
const assertNoInfoLoss = ({ encode, decode }) => {
	fc.assert(
		fc.property(
			fc.nat(),
			/** @type {number} */ n => {
				expect(n).toBe(decode(encode(n)))
			}
		)
	)
}

describe("encoding/decoding is reversible", () => {
	test("base14", () => assertNoInfoLoss(Base14))
	test("base19", () => assertNoInfoLoss(Base19))
	test("base32", () => assertNoInfoLoss(Base32))
	test("base34", () => assertNoInfoLoss(Base34))
})
