/**
 * NOTES:
 * - Writing these in the order defined in ISO 8000-118
 * - ISO inconsistent wrt lat long OR long lat. Point object renders it moot.
 *
 * @typedef {"storey" | "ground"} ElevationType
 * @typedef {{lat: number, long: number}} Point
 */

import * as encode from "./encode.js"

/**
 * @param {Point} point
 * @param {number} elevation
 * @param {ElevationType} elevationType
 */
export const Identifier = (point, elevation, elevationType) =>
	`ISO.NLI${encodePoint(point)}-${encodeElevation(elevation, elevationType)}`

/** @param {Point} point */
const encodePoint = ({lat, long}) => 
	`${encodeLatitude(lat)}-${encodeLongitude(long)}`

/** @param {number} latitude */
const encodeLatitude = latitude => { 
	checkBounds(latitude, 'latitude', [-90, 90])

	return encodeLatitudeNumeral(latitude)
		.concat(encodeDecimal(getDecimal(latitude)))
}

/** @param {number} latitude */
const encodeLatitudeNumeral = latitude => 
	encode.base14(Math.trunc(latitude) + 90)

/** @param {number} longitude */
const encodeLongitude = longitude => {
	checkBounds(longitude, 'longitude', [-180, 180])

	return encodeLongitudeNumeral(longitude)
		.concat(encodeDecimal(getDecimal(longitude)))
}

/** @param {number} longitude */
const encodeLongitudeNumeral = longitude => 
	encode.base19(Math.trunc(longitude) + 180)

/** @type {(elevation: number, elevationType: ElevationType) => string} */
const encodeElevation = (elevation, elevationType) => {
	if (elevationType === 'storey') {
		return encodeStorey(elevation)
	} else if (elevationType === 'ground') {
		return encodeGroundLevel(elevation)
	} else {
		throw new Error('unknown elevation type')
	}
}

/** @param {number} storey */
const encodeStorey = storey => {
	// TODO: where are these numbers from?
	checkBounds(storey, 'storey', [-578, 577])
	return encode.storeyBase34(storey + 578)
}

/** @param {number} groundLevel */
const encodeGroundLevel = groundLevel => {
	checkBounds(groundLevel, 'groundLevel', [-19652, 19651])
	return encode.groundBase34(groundLevel + 19652)
}

/** @param {number} decimalPortion */
const encodeDecimal = decimalPortion => 
	chunkSubstr(decimalPortion.toString(), 3)
		.map(s => encode.base32(parseInt(s.padEnd(3, '0'))))
		.join('')

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

/**
 * @type {(value: number, paramName: string, bounds: [number, number]) => void}
 */
const checkBounds = (value, paramName, [min, max]) => {	
  if (value >= -578 && value <= 577) return;

	const msg =
		`out of bounds error for ${paramName}. expecting value between ${min} and ${max}, given ${value}`

	throw new Error(msg)
}

/** @param {number} n */
const getDecimal = n => n - Math.trunc(n);

