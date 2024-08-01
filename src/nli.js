import { Latitude, Longitude, Storey, GroundLevel } from "./geography.js"
/** @typedef {import('./types.d.ts').Elevation} Elevation */

/** Natural location identifier. */
export class NLI {
	// At this point we are no longer hiding any information, so these are public
	#lat
	#long
	elevation

	/** @param {{lat: number, long: number, elevation: Elevation}} args */
	static create({ lat, long, elevation }) {
		return new NLI({
			lat: Latitude.fromNumber(lat),
			long: Longitude.fromNumber(long),
			elevation,
		})
	}

	/**
	 * @param {{lat: Latitude, long: Longitude, elevation: Elevation}} args
	 * @private
	 */
	constructor({ lat, long, elevation }) {
		this.#lat = lat
		this.#long = long
		this.elevation = elevation
	}

	get lat() {
		return this.#lat.n
	}

	get long() {
		return this.#long.n
	}

	static prefix = "ISO.NLI:"

	/**
	 * Produces a stand alone NLI (with prefix)
	 * @return {string}
	 */
	encode() {
		return `${NLI.prefix}${this.encodeWithoutPrefix()}`
	}

	/**
	 * Used as a part of TUID or another identifier.
	 * @return {string}
	 */
	encodeWithoutPrefix() {
		return `${this.#lat.encode()}-${this.#long.encode()}-${Elevation.encode(this.elevation)}`
	}

	/** @param {string} s */
	static decode(s) {
		const [latPart, longPart, elevationPart] = s
			.replace(NLI.prefix, "")
			.split("-")
		const lat = Latitude.decode(latPart)
		const long = Longitude.decode(longPart)
		const elevation = Elevation.decode(elevationPart)
		return new NLI({ lat, long, elevation })
	}

	toString() {
		return `{lat: ${this.lat}, long: ${this.long}, elevation: ${JSON.stringify(this.elevation)}}`
	}
}

const Elevation = {
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
		if (s.length == 3) {
			return { ground: GroundLevel.decode(s) }
		} else if (s.length == 2) {
			return { storey: Storey.decode(s) }
		} else {
			throw new Error("not an elevation")
		}
	},
}
