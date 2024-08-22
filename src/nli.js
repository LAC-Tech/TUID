import * as check from "./check.js"
import { Latitude, Longitude, Storey, GroundLevel } from "./geography.js"
/**
 * Natural Location Identifier
 *
 * @typedef {import("./types.d.ts").NLI} NLI
 * @typedef {import('./types.d.ts').Elevation} Elevation
 */

/** @type {(lat: number, long: number, elevation: Elevation) => NLI} */
export const create = (lat, long, elevation) => ({
	...point(lat, long),
	...elevation,
})

/** @type {(lat: number, long: number) => import("./types.d.ts").Point} */
const point = (lat, long) => ({
	lat: Latitude.fromNum(lat),
	long: Longitude.fromNum(long),
})

/**
 * Produces a stand alone ISO NLI (with prefix)
 * @type {(nli: NLI) => string}
 */
export const encodeISO = nli => `${prefix}${encode(nli)}`

/**
 * Used as a part of TUID or another identifier.
 * @type {(nli: NLI) => string}
 */
export const encode = ({ lat, long, ...elevation }) =>
	`${lat.encode()}-${long.encode()}-${Elevation.encode(elevation)}`

/**
 * Works whether there is a prefix or not
 * @type {(s: string) => NLI}
 */
export const decode = s => {
	const [latPart, longPart, elevationPart] = s.replace(prefix, "").split("-")
	const lat = Latitude.decode(latPart)
	const long = Longitude.decode(longPart)
	const elevation = Elevation.decode(elevationPart)
	return { lat, long, ...elevation }
}

const prefix = "ISO.NLI:"

const Elevation = {
	/** @param {Elevation} elevation */
	encode: elevation => {
		if ("storey" in elevation) {
			return Storey.encode(elevation.storey)
		} else if ("groundLevel" in elevation) {
			return GroundLevel.encode(elevation.groundLevel)
		} else {
			throw new Error("unknown elevation type")
		}
	},

	/** @type {(s: string) => Elevation} */
	decode: s => {
		if (s.length == 3) {
			return { groundLevel: GroundLevel.decode(s) }
		} else if (s.length == 2) {
			return { storey: Storey.decode(s) }
		} else {
			throw new Error(`expecting a length of 2 or 3, given ${s}`)
		}
	},
}
