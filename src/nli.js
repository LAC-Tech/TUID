import { Latitude, Longitude, Storey, GroundLevel } from "./geography.js"
/**
 * @typedef {import('./types.d.ts').Elevation} Elevation
 * Natural location identifier.
 */
export class NLI {
	// At this point we are no longer hiding any information, so these are public
	point
	elevation

	/** @param {{lat: number, long: number, elevation: Elevation}} args */
	constructor({ lat, long, elevation }) {
		this.point = Point.fromNumbers({ lat, long })
		this.elevation = elevation
	}

	/**
	 * Produces a stand alone NLI (with prefix)
	 * @return {string}
	 */
	encode() {
		return `ISO.NLI${this.encodeWithoutPrefix()}`
	}

	/**
	 * Used as a part of TUID or another identifier.
	 * @return {string}
	 */
	encodeWithoutPrefix() {
		return `${this.point.encode()}-${Elevation.encode(this.elevation)}`
	}
}

export class Point {
	#lat
	#long

	/**
	 * @param {Latitude} lat
	 * @param {Longitude} long
	 * @private
	 */
	constructor(lat, long) {
		this.#lat = lat
		this.#long = long
	}

	/** @param {{lat: number, long: number}} p */
	static fromNumbers({ lat, long }) {
		return new Point(Latitude.fromNumber(lat), Longitude.fromNumber(long))
	}

	get lat() {
		return this.#lat.n
	}

	get long() {
		return this.#long.n
	}

	encode() {
		return `${this.#lat.encode()}-${this.#long.encode()}`
	}

	/** @param {string} s */
	static decode(s) {
		const [latPart, longPart] = s.split("-")
		const lat = Latitude.decode(latPart)
		const long = Longitude.decode(longPart)
		return new Point(lat, long)
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
