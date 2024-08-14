// This module was made purely so I could test more code.
// It should rightfully be in nli.js
import { Decimal, Integer, CheckedBase34 } from "./num.js"
import * as check from "./check.js"

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
		const embiggened = n * 1e6
		const truncated = Math.trunc(embiggened)
		const normalized = truncated / 1e6
		const notNegativeZero = normalized == -0 ? 0 : normalized

		return notNegativeZero
	},

	/**
	 * @param {(n: number) => string} numeralEncode
	 * @param {number} n
	 */
	encode: (numeralEncode, n) => {
		const numeral = Math.floor(n)
		const encodedNumeral = numeralEncode(Math.floor(n))
		const decimal = extractDecimal(n)
		const encodedDecimal = Decimal.encode(decimal)
		const result = encodedNumeral.concat(encodedDecimal).padStart(6, "0")
		check.len(result, "result", 6)
		return result
	},

	/**
	 * @param {(s: string) => number} numeralDecode
	 * @param {string} s
	 */
	decode: (numeralDecode, s) => {
		check.len(s, "s", 6)
		const numeralPart = s.slice(0, 2)
		const decimalPart = s.slice(2)
		const numeral = numeralDecode(numeralPart)
		const decimal = Decimal.decode(decimalPart ?? "000")
		const result = createNumber(numeral, decimal)
		return result
	},
}

/**
 * TODO: horrible hack job
 * @param {number} numeral
 * @param {number} decimal
 */
const createNumber = (numeral, decimal) => {
	const paddedDecimal = decimal.toString().padStart(6, "0")
	if (0 > numeral && decimal != 0) {
		const adjustedNumeral = numeral + 1
		const sign = adjustedNumeral == 0 ? "-" : ""
		return parseFloat(`${sign}${adjustedNumeral}.${paddedDecimal}`)
	} else {
		return parseFloat(`${numeral}.${paddedDecimal}`)
	}
}
/** @param {number} n */
const extractDecimal = n => parseInt(n.toFixed(6).split(".")[1] || "0", 10)

export class Latitude {
	n

	/**
	 * @param {number} n
	 * @private
	 */
	constructor(n) {
		this.n = n
	}

	/** @param {number} n */
	static fromNum(n) {
		check.bounds(n, "longitude", [-180, 180])
		return new Latitude(Coord.normalize(n))
	}

	encode() {
		return Coord.encode(Integer.latitude.encode, this.n)
	}

	/** @param {string} s */
	static decode(s) {
		const n = Coord.decode(Integer.latitude.decode, s)
		const lat = new Latitude(n)
		check.bounds(lat.n, "latitude", [-90, 90])
		return lat
	}
}

export class Longitude {
	n

	/**
	 * @param {number} n
	 * @private
	 */
	constructor(n) {
		this.n = n
	}

	/** @param {number} n */
	static fromNum(n) {
		check.bounds(n, "longitude", [-180, 180])
		return new Longitude(Coord.normalize(n))
	}

	encode() {
		return Coord.encode(Integer.longitude.encode, this.n)
	}

	/** @param {string} s */
	static decode(s) {
		const n = Coord.decode(Integer.longitude.decode, s)
		const long = new Longitude(n)
		check.bounds(long.n, "longitude", [-180, 180])
		return long
	}
}

/** @param {number} n */
const normalizeNegZero = n => (n == -0 ? 0 : n)

export const Storey = {
	/** @param {number} storey */
	encode: storey => {
		check.isInt(storey, "storey")
		check.bounds(storey, "storey", [-578, 577])
		return StoreyBase34.encode(normalizeNegZero(storey + 578))
	},

	/** @type {(s: string) => number} */
	decode: s => {
		const decodedValue = StoreyBase34.decode(s)
		check.bounds(decodedValue, "decodedValue", [0, 1156])
		return decodedValue - 578
	},
}

export const GroundLevel = {
	/** @param {number} groundLevel */
	encode: groundLevel => {
		check.isInt(groundLevel, "groundLevel")
		check.bounds(groundLevel, "groundLevel", [-19652, 19651])
		return GroundBase34.encode(normalizeNegZero(groundLevel + 19652))
	},

	/** @type {(s: string) => number} */
	decode: s => {
		const decodedValue = GroundBase34.decode(s)
		check.bounds(decodedValue, "decodedValue", [0, 39304])
		return decodedValue - 19652
	},
}

const StoreyBase34 = CheckedBase34("storey", [0, 1156], 2)
const GroundBase34 = CheckedBase34("ground", [0, 39304], 3)
