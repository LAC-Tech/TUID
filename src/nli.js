import * as encode from "./encode.js";

/** @param {Point} point */
export const encodePoint = ({ lat, long }) =>
	`${encodeLatitude(lat)}-${encodeLongitude(long)}`;

/** @param {number} latitude */
const encodeLatitude = latitude => {
	checkBounds(latitude, "latitude", [-90, 90]);

	const result = encodeLatitudeNumeral(latitude).concat(
		encodeDecimal(getDecimal(latitude))
	);

	if (result.length != 6) {
		throw new Error("encoded latitude should be 6 digits");
	}

	return result;
};

/** @param {number} latitude */
const encodeLatitudeNumeral = latitude =>
	encode.base14(Math.trunc(latitude) + 90);

/** @param {number} longitude */
const encodeLongitude = longitude => {
	checkBounds(longitude, "longitude", [-180, 180]);

	const result = encodeLongitudeNumeral(longitude).concat(
		encodeDecimal(getDecimal(longitude))
	);

	if (result.length != 6) {
		throw new Error("encoded longitude should be 6 digits");
	}

	return result;
};

/** @param {number} longitude */
const encodeLongitudeNumeral = longitude =>
	encode.base19(Math.trunc(longitude) + 180);

/** @param {Elevation} elevation */
export const encodeElevation = elevation => {
	if ("storey" in elevation) {
		return encodeStorey(elevation.storey);
	} else if ("ground" in elevation) {
		return encodeGroundLevel(elevation.ground);
	} else {
		throw new Error("unknown elevation type");
	}
};

/** @param {number} storey */
const encodeStorey = storey => {
	// TODO: where are these numbers from?
	checkBounds(storey, "storey", [-578, 577]);
	return encode.storeyBase34(storey + 578);
};

/** @param {number} groundLevel */
const encodeGroundLevel = groundLevel => {
	checkBounds(groundLevel, "groundLevel", [-19652, 19651]);
	return encode.groundBase34(groundLevel + 19652);
};

/** @param {string} decimalPortion */
const encodeDecimal = decimalPortion => {
	const threeDigitChunks = chunkSubstr(decimalPortion.toString(), 3).map(s =>
		s.padEnd(3, "0")
	);

	return threeDigitChunks.map(s => encode.base32(parseInt(s))).join("");
};

// Helper Functions, not defined in ISO

/** @type {(str: string, size: number) => string[]} */
const chunkSubstr = (str, size) => {
	const numChunks = Math.ceil(str.length / size);
	const chunks = new Array(numChunks);

	for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
		chunks[i] = str.substring(o, o + size);
	}

	return chunks;
};

/**
 * @type {(value: number, paramName: string, bounds: [number, number]) => void}
 */
const checkBounds = (value, paramName, [min, max]) => {
	if (value >= -578 && value <= 577) return;

	const msg = `out of bounds error for ${paramName}. expecting value between ${min} and ${max}, given ${value}`;

	throw new Error(msg);
};

/** @param {number} n */
const getDecimal = n => n.toString().split(".")[1] ?? "000";
