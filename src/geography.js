// This module was made purely so I could test more code.
// It should rightfully be in nli.js
import { Base14, Base19, Base34, Decimal } from "./num.js"

// Common functionality for lat and long
const Coord = {
	/**
	 * According to the ISO standard:
	 * - we need 6 decimal points
	 * - we're not encoding the sign in the string
	 *
	 * Therefore some processing must be applied to user supplied IEE754 numbers
	 * @param {number} n
	 */
	normalize: n => {
		const intPart = Math.floor(n)
		checkIsInt(intPart, "intPart")
		const fractionalPart = n - intPart
		const newFractionalPart = Math.trunc(fractionalPart * 1e6) / 1e6
		return intPart + newFractionalPart
	},

	/**
	 * @param {(s: string) => number} numeralDecode
	 * @param {string} s
	 */
	decode: (numeralDecode, s) => {
		checkLen(s, "s", 6)
		const numeralPart = s.slice(0, 2)
		const decimalPart = s.slice(2)
		const numeral = numeralDecode(numeralPart)
		const decimal = Decimal.decode(decimalPart ?? "000")
		return numeral + decimal
	},

	/**
	 * @param {(n: number) => string} numeralEncode
	 * @param {number} n
	 */
	encode: (numeralEncode, n) => {
		const numeral = numeralEncode(n)
		const decimal = Decimal.encode(n)
		const result = numeral.concat(decimal).padStart(6, "0")
		return result
	},
}

export class Latitude {
	n

	/** @param {number} n */
	constructor(n) {
		checkBounds(n, "latitude", [-90, 90])
		this.n = Coord.normalize(n)
	}

	encode() {
		return Coord.encode(LatitudeNumeral.encode, this.n)
	}

	/** @param {string} s */
	static decode(s) {
		const n = Coord.decode(LatitudeNumeral.decode, s)
		const lat = new Latitude(n)
		checkBounds(lat.n, "latitude", [-90, 90])
		return lat
	}
}

export class Longitude {
	n

	/** @param {number} n */
	constructor(n) {
		checkBounds(n, "longitude", [-180, 180])
		this.n = Coord.normalize(n)
	}

	encode() {
		return Coord.encode(LongitudeNumeral.encode, this.n)
	}

	/** @param {string} s */
	static decode(s) {
		const n = Coord.decode(LongitudeNumeral.decode, s)
		const long = new Longitude(n)
		checkBounds(long.n, "longitude", [-180, 180])
		return long
	}
}

const LongitudeNumeral = {
	/** @param {number} longitude */
	encode: longitude => Base19.encode(Math.floor(longitude) + 180),
	/** @type {(s: string) => number} */
	decode: s => Base19.decode(s) - 180,
}

const LatitudeNumeral = {
	/** @param {number} latitude */
	encode: latitude => Base14.encode(Math.floor(latitude) + 90),
	/** @type {(s: string) => number} */
	decode: s => Base14.decode(s) - 90,
}

/** @param {number} n */
const normalizeNegZero = n => (n == -0 ? 0 : n)

export const Storey = {
	/** @param {number} storey */
	encode: storey => {
		checkIsInt(storey, "storey")
		checkBounds(storey, "storey", [-578, 577])
		return StoreyBase34.encode(normalizeNegZero(storey + 578))
	},

	/** @type {(s: string) => number} */
	decode: s => {
		const decodedValue = StoreyBase34.decode(s)
		checkBounds(decodedValue, "decodedValue", [0, 1156])
		return decodedValue - 578
	},
}

export const GroundLevel = {
	/** @param {number} groundLevel */
	encode: groundLevel => {
		checkIsInt(groundLevel, "groundLevel")
		checkBounds(groundLevel, "groundLevel", [-19652, 19651])
		return GroundBase34.encode(normalizeNegZero(groundLevel + 19652))
	},

	/** @type {(s: string) => number} */
	decode: s => {
		const decodedValue = GroundBase34.decode(s)
		checkBounds(decodedValue, "decodedValue", [0, 39304])
		return decodedValue - 19652
	},
}

/**
 * @param {number} n
 * @param {string} label
 * @param {[number, number]} bounds
 * @param {number} length
 * @returns {string}
 */
const encodeBase34 = (n, label, bounds, length) => {
	checkBounds(n, "n", bounds)
	const result = Base34.encode(n).padStart(length, "0")
	checkLen(result, label, length)
	return result
}

/**
 * @param {string} s
 * @param {string} label
 * @param {[number, number]} bounds
 * @param {number} length
 * @returns {number}
 */
const decodeBase34 = (s, label, bounds, length) => {
	checkLen(s, label, length)
	const result = Base34.decode(s)
	checkBounds(result, "result", bounds)
	return result
}

const StoreyBase34 = {
	/** @param {number} n */
	encode: n => encodeBase34(n, "storey", [0, 1156], 2),
	/** @type {(s: string) => number} */
	decode: s => decodeBase34(s, "storey", [0, 1156], 2),
}

const GroundBase34 = {
	/** @param {number} n */
	encode: n => encodeBase34(n, "ground", [0, 39304], 3),
	/** @type {(s: string) => number} */
	decode: s => decodeBase34(s, "ground", [0, 39304], 3),
}

// Helper Functions, not defined in ISO

/** @type {(value: string, name: string, expectedLen: number) => void} */
const checkLen = (value, name, expectedLen) => {
	if (value.length != expectedLen) {
		throw new Error(
			`${name} should have length ${expectedLen} digits, but given length ${value.length}`
		)
	}
}
/**
 * @type {(value: number, paramName: string, bounds: [number, number]) => void}
 */
const checkBounds = (value, paramName, [min, max]) => {
	if (value >= min && value <= max) return

	const msg = `out of bounds error for ${paramName}: expecting value between ${min} and ${max}, given ${value}`

	throw new Error(msg)
}

/** @type {(n: number, paramName: string) => void} */
const checkIsInt = (n, paramName) => {
	if (!Number.isInteger(n)) {
		throw new Error(`${paramName} (${n}) is not an integer`)
	}
}
