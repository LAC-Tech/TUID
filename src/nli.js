import * as check from "./check.js"
import { Latitude, Longitude, Storey, GroundLevel } from "./geography.js"
/**
 * Natural Location Identifier
 *
 * @typedef {import("./types.d.ts").NLI} NLI
 * @typedef {import("./types.d.ts").StoreyNLI} StoreyNLI
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
export const encodeISO = ({ lat, long, ...elevation }) =>
	`${prefix}:${lat.encode()}-${long.encode()}-${Elevation.encode(elevation)}`

/** @type {(s: string) => NLI} */
export const decodeISO = s => {
	const [_prefix, rest] = s.split(":")
	const [latPart, longPart, elevationPart] = rest.split("-")
	const lat = Latitude.decode(latPart)
	const long = Longitude.decode(longPart)
	const elevation = Elevation.decode(elevationPart)
	return { lat, long, ...elevation }
}

const prefix = "ISO.NLI"

/** @type {(nli: StoreyNLI) => string} */
export const encodeTUID = ({ lat, long, storey }) => {
	const result = `${lat.encode()}${long.encode()}${Storey.encode(storey)}`
	check.len(result, "encoded NLI for a TUID", 14)
	return result
}

/** @type {(s: string) => StoreyNLI} */
export const decodeTUID = s => {
	check.len(s, "encoded NLI for a TUID", 14)
	const lat = Latitude.decode(s.slice(0, 6))
	const long = Longitude.decode(s.slice(6, 12))
	const storey = Storey.decode(s.slice(12))
	return { lat, long, storey }
}

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
