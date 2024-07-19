import { Latitude, Longitude, Storey, GroundLevel } from "./geography.js"

/**
 * Natural location identifier.
 */
export const NLI = {
	/**
	 * Produces a stand alone NLI (with prefix)
	 *
	 * @param {Location} location
	 * @return {string}
	 */
	encode: location => `ISO.NLI${NLI.encodeWithoutPrefix(location)}`,

	/**
	 * Used as a part of TUID or another identifier.
	 * @param {Location} location
	 * @return {string}
	 */
	encodeWithoutPrefix: location =>
		`${new Point(location).encode()}-${Elevation.encode(location.elevation)}`,
}

/**
 * According to the ISO standard:
 * - we need 6 decimal points
 * - we're not encoding the sign in the string
 *
 * Therefore some processing must be applied to user supplied IEE754 numbers
 * @param {number} n
 */
const normalize = n => (n == -0 ? 0 : Math.floor(n * normalization_factor))
const normalization_factor = 1_000_000

export class Point {
	#lat
	#long
	/** @param {{lat: number, long: number}} args */
	constructor({ lat, long }) {
		this.#lat = normalize(lat)
		this.#long = normalize(long)
	}

	get lat() {
		return this.#lat / normalization_factor
	}

	get long() {
		return this.#long / normalization_factor
	}

	encode() {
		return `${Latitude.encode(this.#lat)}-${Longitude.encode(this.#long)}`
	}

	/** @param {string} s */
	static decode(s) {
		const [latPart, longPart] = s.split("-")
		const lat = Latitude.decode(latPart)
		const long = Longitude.decode(longPart)
		return new Point({ lat, long })
	}
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
