/**
 * @typedef {"storey" | "ground"} ElevationType
 *
 * @type {(longitude: number, latitude: number, elevation: )}
 */
const Identifier = (longitude, latitude, elevation, elevationType) => {
	throw 'TODO'
}

const encodePoint = (longitude, latitude) => {
	throw 'TODO'
}

const encodeLongitude = longitude => { throw 'TODO '}

const encodeLongitudeNumeral = longitude => 
	encodeBase19(getDecimal(Math.floor(longitude) + 180))

const encodeLatitude = latitude => { 
	if (latitude > 90 || latitude < -90) {
		throw 'out of bounds error'
	}

}

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
