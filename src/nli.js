import { Latitude, Longitude, Storey, GroundLevel } from "./geography"

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
		`${Point.encode(location)}-${Elevation.encode(location.elevation)}`,
}

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
