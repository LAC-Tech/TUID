import { expect, test } from 'vitest'
import * as encode from './encode'

test("encode 0 as base14", () => {
	expect(encode.base14(0)).toBe("0")
})

test("encode 13 as base14", () => {
	expect(encode.base14(13)).toBe("D")
})

test("encode 13 as base14", () => {
	expect(encode.base14(14)).toBe("10")
})

test("encode 0 as base19", () => {
	expect(encode.base19(0)).toBe("0")
})

test("encode 18 as base14", () => {
	expect(encode.base19(18)).toBe("Y")
})

test("encode 0 as base32", () => {
	expect(encode.base32(0)).toBe("0")
})

test("encode 31 as base32", () => {
	expect(encode.base32(31)).toBe("V")
})


test("encode number part of latitude", () => {
	expect(encode.base14(38 + 90)).toBe("92")
})

test("encode number part of longitude", () => {
	expect(encode.base19(-77 + 180)).toBe("58")
})
