import * as check from "./check.js"
import { Base14, Base19, Base32, Base34 } from "./base.js"

export const Decimal = {
	/** @param {number} n */
	encode: n => {
		if (n > 999999) {
			throw new Error(`expected n with less than 6 digits, given ${n}`)
		}

		if (!Number.isSafeInteger(n)) {
			throw new Error(`expected safe integer, given ${n}`)
		}

		check.isInt(n, "decimal encoding input")
		const sixDigits = n.toString().padStart(6, "0")
		check.len(sixDigits, "six digits to decimal encode", 6)

		const strParts = [sixDigits.slice(0, 3), sixDigits.slice(3, 6)]

		const result = strParts
			.map(s => Base32.encode(parseInt(s)).padStart(2, "0"))
			.join("")
		check.len(result, "encoded decimal", 4)
		return result
	},

	/** @type {(s: string) => number} */
	decode: s => {
		check.len(s, "decoded decimal", 4)
		const strParts = [s.slice(0, 2), s.slice(2, 4)]
		const decodedParts = strParts.map(Base32.decode)
		return 1000 * decodedParts[0] + decodedParts[1]
	},
}

export const Integer = {
	latitude: {
		/** @param {number} latitude */
		encode: latitude => Base14.encode(Math.floor(latitude) + 90),
		/** @type {(s: string) => number} */
		decode: s => Base14.decode(s) - 90,
	},
	longitude: {
		/** @param {number} longitude */
		encode: longitude => Base19.encode(Math.floor(longitude) + 180),
		/** @type {(s: string) => number} */
		decode: s => Base19.decode(s) - 180,
	},
}

/** @param {number} n */
const removeTrailingZeros = n => {
	while (n % 10 === 0 && n !== 0) {
		n = n / 10
	}
	return n
}

/**
 * @param {string} label
 * @param {[number, number]} bounds
 * @param {number} length
 */
export const CheckedBase34 = (label, bounds, length) => ({
	/** @type {(n: number) => string} */
	encode: n => {
		check.isInt(n, "n")
		check.bounds(n, "n", bounds)
		const result = Base34.encode(n).padStart(length, "0")
		check.len(result, label, length)
		return result
	},

	/** @type {(s: string) => number} */
	decode: s => {
		check.len(s, label, length)
		const result = Base34.decode(s)
		check.bounds(result, "result", bounds)
		return result
	},
})
