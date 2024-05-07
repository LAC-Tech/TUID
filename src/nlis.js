/**
 * @typedef {"storey" | "ground"} ElevationType
 * @param {number} longitude
 * @param {number} latitude
 * @param {number} elevation
 * @param {ElevationType} elevationType
 */
const Identifier = (longitude, latitude, elevation, elevationType) => {
	throw 'TODO'
}

const encodePoint = (longitude, latitude) => {
	throw 'TODO'
}

const encodeLongitude = longitude => { throw 'TODO '}

/** @param {number} n */
const getDecimal = n => n - Math.floor(n);

/** @type {(str: string, size: number) => string[]} */
const chunkSubstr = (str, size) => {
  const numChunks = Math.ceil(str.length / size)
  const chunks = new Array(numChunks)

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substring(o, o + size)
  }

  return chunks
}
/** @param {number} decimalPortion */
const encodeDecimal = decimalPortion => {
	let encoding = "";
	const padZeroes = str => str.padEnd(3, '0');
	for (let i = 0; i < decimalPortion.length; i += 3) {
			const digitGroup = decimalPortion.slice(i, i + 3);
			const encodedGroup = encodeBase32(padZeroes(digitGroup));
			encoding += encodedGroup;
	}
	return encoding;
};

/** @param {number} latitude */
const encodeLatitudeNumeral = latitude => 
	encodeBase14(getDecimal(Math.floor(latitude) + 90))

const encodeLatitude = latitude => { 
	if (latitude > 90 || latitude < -90) {
		throw 'out of bounds error'
	}

	return encodeLatitudeNumeral(latitude)
		.concat(encodeDecimal(getDecimal(latitude)))
}

/** @param {number} longitude */
const encodeLongitudeNumeral = longitude => 
	encodeBase19(getDecimal(Math.floor(longitude) + 180))


const encodeElevation = (elevation, elevationType) => { throw 'TODO' }

const encodeStorey = elevation => { throw 'TODO' }

const encodeGroundLevel = elevation => { throw 'TODO' }

const normalizeEncoding = encoding => { throw 'TODO' }

const encodingTableBase = {
	'14': [
		'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
		'A', 'B', 'C', 'D'
	],
	'19': [
		'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'Y'
	],
	'32': [
		'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'Y', 
		'J', 'K', 'L', 'M', 'N', 'Z', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'
	],
	'34': [
		'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'Y', 
		'J', 'K', 'L', 'M', 'N', 'Z', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'
	],
}

const encodeBase = base => n => {
    const encodingTable = encodingTableBase[base.toString()];
    let result = '';
    while (n > 0) {
        result = encodingTable[n % base] + result;
        n = Math.floor(n / base);
    }
    return result || '0';
}

const encodeBase14 = encodeBase(14);
const encodeBase19 = encodeBase(19);
const encodeBase32 = encodeBase(32);
const encodeBase34 = encodeBase(34);
