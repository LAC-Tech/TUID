import * as check from "./check.js"
import { Base14, Base19, Base32 } from "./base.js"

export const Decimal = {
	/** @param {number} n */
	encode: n => {
		if (n > 999999) {
			throw new Error(`expected n with less than 6 digits, given ${n}`)
		}

		if (!Number.isSafeInteger(n)) {
			throw new Error(`expected safe integer, given ${n}`)
		}

		if (n % 10 == 0) {
			throw new Error(`expected int with no trailing 0s, given ${n}`)
		}
		check.isInt(n, "decimal encoding input")
		const sixDigits = n.toString().padEnd(6, "0")
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
		const n = 1000 * decodedParts[0] + decodedParts[1]
		return removeTrailingZeros(n)
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
