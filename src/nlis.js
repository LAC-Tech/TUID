/**
 * @typedef {"storey" | "ground"} ElevationType
 * @param {number} longitude
 * @param {number} latitude
 * @param {number} elevation
 * @param {ElevationType} elevationType
 */
export const Identifier = (longitude, latitude, elevation, elevationType) =>
	"ISO.NLI"
		.concat(encodePoint(latitude, longitude))
		.concat(encodeElevation(elevation, elevationType))

const encodePoint = (longitude, latitude) => 
	encodeLatitude(latitude).concat(encodeLongitude(longitude))

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
const getDecimal = n => n - Math.floor(n);

/** @param {number} decimalPortion */
const encodeDecimal = decimalPortion => 
	chunkSubstr(decimalPortion.toString(), 3)
		.map(s => encodeBase(32)(s.padEnd(3, '0')))
		.join()

/** @param {number} latitude */
const encodeLatitudeNumeral = latitude => 
	encodeBase(14)(getDecimal(Math.floor(latitude) + 90))

const encodeLatitude = latitude => { 
	checkBounds(latitude, 'latitude', [-90, 90])

	return encodeLatitudeNumeral(latitude)
		.concat(encodeDecimal(getDecimal(latitude)))
}

/** @param {number} longitude */
const encodeLongitudeNumeral = longitude => 
	encodeBase(19)(getDecimal(Math.floor(longitude) + 180))

const encodeLongitude = longitude => {
	checkBounds(longitude, 'longitude', [-180, 180])

	return encodeLongitudeNumeral(longitude)
		.concat(encodeDecimal(getDecimal(longitude)))
}

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
	return encodeBase(34)(storey + 578)
}

const encodeGroundLevel = groundLevel => {
	checkBounds(groundLevel, 'groundLevel', [-19652, 19651])
	return encodeBase(34)(groundLevel + 19652)
}

const encodingChars = [
	'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'Y', 
	'J', 'K', 'L', 'M', 'N', 'Z', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'
]

const encodeBase = base => n => {
    let result = '';
    while (n > 0) {
        result = encodingChars[n % base] + result;
        n = Math.floor(n / base);
    }
    return result || '0';
}
