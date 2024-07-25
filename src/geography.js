// This module was made purely so I could test more code.
// It should rightfully be in nli.js
import {
	Base14,
	Base19,
	Base34,
	Decimal,
	getBeforeLastSixDigits,
	normalization_factor,
} from "./num.js"

/**
 * According to the ISO standard:
 * - we need 6 decimal points
 * - we're not encoding the sign in the string
 *
 * Therefore some processing must be applied to user supplied IEE754 numbers
 * @param {number} n
 */
const normalize = n => (n == -0 ? 0 : Math.floor(n * normalization_factor))

export class Latitude {
	#n
	/** @param {number} n */
	constructor(n) {
		checkBounds(n, "latitude", [-90, 90])
		this.#n = normalize(n)
	}

	get n() {
		return this.#n / normalization_factor
	}

	encode() {
		const numeral = LatitudeNumeral.encode(this.#n)
		const decimal = Decimal.encode(this.#n)
		const result = numeral.concat(decimal === "0" ? "" : decimal).padEnd(2, "0")
		checkLen(result, "encoded decimal", 2)
		return result
	}
	/** @param {string} s */
	static decode(s) {
		const [numeralPart, decimalPart] = s.split(".")
		const latNumeral = LatitudeNumeral.decode(numeralPart)
		const latDecimal = Decimal.decode(decimalPart ?? "000")
		const lat = new Latitude(latNumeral + latDecimal)
		checkBounds(lat.n, "latitude", [-90, 90])
		return lat
	}
}

export class Longitude {
	#n
	/** @param {number} n */
	constructor(n) {
		checkBounds(n, "longitude", [-180, 180])
		this.#n = normalize(n)
	}

	get n() {
		return this.#n / normalization_factor
	}

	encode() {
		const numeral = LongitudeNumeral.encode(this.#n)
		const decimal = Decimal.encode(this.#n)
		const result = numeral.concat(decimal === "0" ? "" : decimal).padEnd(2, "0")
		checkLen(result, "encoded decimal", 2)
		return result
	}
	/** @param {string} s */
	static decode(s) {
		const [numeralPart, decimalPart] = s.split(".")
		const longNumeral = LongitudeNumeral.decode(numeralPart)
		const longDecimal = Decimal.decode(decimalPart ?? "000")
		const long = new Longitude(longNumeral + longDecimal)
		checkBounds(long.n, "longitude", [-180, 180])
		return long
	}
}

const LongitudeNumeral = {
	/** @param {number} longitude */
	encode: longitude => Base19.encode(getBeforeLastSixDigits(longitude) + 180),
	/** @type {(s: string) => number} */
	decode: s => {
		const decodedValue = Base19.decode(s)
		return decodedValue - 180
	},
}

const LatitudeNumeral = {
	/** @param {number} latitude */
	encode: latitude => Base14.encode(getBeforeLastSixDigits(latitude) + 90),
	/** @type {(s: string) => number} */
	decode: s => {
		const decodedValue = Base14.decode(s)
		return decodedValue - 90
	},
}

export const Storey = {
	/** @param {number} storey */
	encode: storey => {
		// TODO: where are these numbers from?
		checkBounds(storey, "storey", [-578, 577])
		return StoreyBase34.encode(storey + 578)
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
		checkBounds(groundLevel, "groundLevel", [-19652, 19651])
		return GroundBase34.encode(groundLevel + 19652)
	},

	/** @type {(s: string) => number} */
	decode: s => {
		const decodedValue = GroundBase34.decode(s)
		checkBounds(decodedValue, "decodedValue", [0, 39304])
		return decodedValue - 19652
	},
}

const StoreyBase34 = {
	/** @param {number} n */
	encode: n => {
		checkBounds(n, "n", [0, 1156])
		const result = Base34.encode(n)
		checkLen(result, "storey", 2)
		return result
	},
	/** @type {(s: string) => number} */
	decode: s => {
		checkLen(s, "storey", 2)
		const result = Base34.decode(s)
		checkBounds(result, "result", [0, 1156])
		return result
	},
}

const GroundBase34 = {
	/** @param {number} n */
	encode: n => {
		checkBounds(n, "n", [0, 39304])
		const result = Base34.encode(n)
		checkLen(result, "ground", 3)
		return result
	},

	/** @type {(s: string) => number} */
	decode: s => {
		checkLen(s, "ground", 3)
		const result = Base34.decode(s)
		checkBounds(result, "result", [0, 39304])
		return result
	},
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
