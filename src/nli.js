import { Latitude, Longitude, Storey, GroundLevel } from "./geography.js"
/**
 * Natural Location Identifier
 *
 * @typedef {Object} NLI
 * @property {Latitude} lat
 * @property {Longitude} long
 * @property {Elevation} elevation
 *
 * @typedef {import('./types.d.ts').Elevation} Elevation
 */

/**
 * Produces a stand alone ISO NLI (with prefix)
 * @type {(nli: NLI) => string}
 */
export const encodeISO = nli => `${prefix}${encode(nli)}`

/**
 * Used as a part of TUID or another identifier.
 * @type {(nli: NLI) => string}
 */
export const encode = ({ lat, long, elevation }) => {
	return `${lat.encode()}-${long.encode()}-${Elevation.encode(elevation)}`
}

/**
 * Works whether there is a prefix or not
 * @type {(s: string) => NLI}
 */
export const decode = s => {
	const [latPart, longPart, elevationPart] = s.replace(prefix, "").split("-")
	const lat = Latitude.decode(latPart)
	const long = Longitude.decode(longPart)
	const elevation = Elevation.decode(elevationPart)
	return { lat, long, elevation }
}

const prefix = "ISO.NLI:"

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
