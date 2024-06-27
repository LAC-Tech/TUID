import * as nli from "./nli.js";

/**
 * This is the reference implementation for the The Transport Unit Identifier,
 * or TUID. TUIDs are an ISO standard ID that identifies loads in the
 * logistics industry.
 *
 * @param {Date} date - When the load is ready to be shipped
 * @param {Location} origin - Where the load is being sent from.
 * @param {Location} destination - Where the load is being sent to.
 * @param {string} registeredPrefix - Registered business number of the buyer
 * or shipper.
 * @param {number} txnRef - Internal transaction reference number of the buyer
 * or shipper.
 *
 * @return {string}
 */
export const encodeTUID = (
	date,
	origin,
	destination,
	registeredPrefix,
	txnRef
) => {
	const time = date.toISOString();

	return `ISO.TUID:${time}${encodeNLIWithoutPrefix(origin)}${encodeNLIWithoutPrefix(destination)}${registeredPrefix}:${txnRef}`;
};

/**
 * Used as a stand alone NLI
 *
 * @param {Location} location
 */
export const encodeNLI = location =>
	`ISO.NLI${encodeNLIWithoutPrefix(location)}`;

/**
 * Used as a part of TUID or another identifier.
 * @param {Location} location
 */
export const encodeNLIWithoutPrefix = location =>
	`${nli.encodePoint(location)}-${nli.encodeElevation(location.elevation)}`;
