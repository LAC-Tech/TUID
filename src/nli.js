import * as num from "./num"

export const Point = {
	/** @param {Point} point */
	encode: ({ lat, long }) =>
		`${Latitude.encode(lat)}-${Longitude.encode(long)}`,

	/** @param {string} s */
	decode: s => {
		const [latPart, longPart] = s.split("-")
		const lat = Latitude.decode(latPart)
		const long = Longitude.decode(longPart)
		return { lat, long }
	},
}

const Latitude = {
	/** @param {number} lat */
	encode: lat => {
		checkBounds(lat, "latitude", [-90, 90])
		const result = LatitudeNumeral.encode(lat).concat(Decimal.encode(lat))
		checkLen(result, "latitude", 6)
		return result
	},

	/** @param {string} s */
	decode: s => {
		checkLen(s, "longitude", 6)
		const numeralPart = s.slice(0, 2)
		const decimalPart = s.slice(2)
		const longNumeral = LongitudeNumeral.decode(numeralPart)
		const longDecimal = Decimal.decode(decimalPart)
		const long = longNumeral + longDecimal
		checkBounds(long, "longitude", [-180, 180])
		return long
	},
}

const Longitude = {
	/** @param {number} long */
	encode: long => {
		checkBounds(long, "longitude", [-180, 180])
		const result = LongitudeNumeral.encode(long).concat(Decimal.encode(long))
		checkLen(result, "longitude", 6)
		return result
	},
	/** @type {(s: string) => number} */
	decode: s => {
		checkLen(s, "latitude", 6)
		const numeralPart = s.slice(0, 2)
		const decimalPart = s.slice(2)
		const latNumeral = LatitudeNumeral.decode(numeralPart)
		const latDecimal = Decimal.decode(decimalPart)
		const lat = latNumeral + latDecimal
		checkBounds(lat, "latitude", [-90, 90])
		return lat
	},
}

const LongitudeNumeral = {
	/** @param {number} longitude */
	encode: longitude => num.encode.base19(Math.trunc(longitude) + 180),
	/** @type {(s: string) => number} */
	decode: s => {
		const decodedValue = num.decode.base19(s)
		return decodedValue - 180
	},
}

const LatitudeNumeral = {
	/** @param {number} latitude */
	encode: latitude => num.encode.base14(Math.trunc(latitude) + 90),
	/** @type {(s: string) => number} */
	decode: s => {
		const decodedValue = num.decode.base14(s)
		return decodedValue - 90
	},
}

export const Elevation = {
	/** @param {Elevation} elevation */
	encode: elevation => {
		if ("storey" in elevation) {
			return Storey.encode(elevation.storey)
		} else if ("ground" in elevation) {
			return GroundLevel.encode(elevation.ground)
		} else {
			throw new Error("unknown elevation type")
		}
	},

	/** @type {(s: string) => Elevation} */
	decode: s => {
		throw "TODO"
	},
}

const Storey = {
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

const GroundLevel = {
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
		const result = num.encode.base34(n)
		checkLen(result, "storey", 2)
		return result
	},
	/** @type {(s: string) => number} */
	decode: s => {
		checkLen(s, "storey", 2)
		const result = num.decode.base34(s)
		checkBounds(result, "result", [0, 1156])
		return result
	},
}

const GroundBase34 = {
	/** @param {number} n */
	encode: n => {
		checkBounds(n, "n", [0, 39304])
		const result = num.encode.base34(n)
		checkLen(result, "ground", 3)
		return result
	},

	/** @type {(s: string) => number} */
	decode: s => {
		checkLen(s, "ground", 3)
		const result = num.decode.base34(s)
		checkBounds(result, "result", [0, 39304])
		return result
	},
}

const Decimal = {
	/** @param {number} n */
	encode: n => {
		const decimalPortion = n.toString().split(".")[1] ?? "000"

		const threeDigitChunks = chunkSubstr(decimalPortion.toString(), 3).map(s =>
			s.padEnd(3, "0")
		)

		return threeDigitChunks.map(s => num.encode.base32(parseInt(s))).join("")
	},
	/** @type {(s: string) => number} */
	decode: s => {
		const threeDigitChunks = chunkSubstr(s, 1)
		const decimalDigits = threeDigitChunks
			.map(ch => num.decode.base32(ch).toString().padStart(3, "0"))
			.join("")
		return parseFloat(`0.${decimalDigits}`)
	},
}

// Helper Functions, not defined in ISO

/** @type {(str: string, size: number) => string[]} */
const chunkSubstr = (str, size) => {
	const numChunks = Math.ceil(str.length / size)
	const chunks = new Array(numChunks)

	for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
		chunks[i] = str.substring(o, o + size)
	}

	return chunks
}

/** @type {(value: string, name: string, expectedLen: number) => void} */
const checkLen = (value, name, expectedLen) => {
	if (value.length != expectedLen) {
		throw new Error(`encoded ${name} should be ${expectedLen} digits`)
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
