import * as nli from "./nli.js";

// Following the JSON api in the standard library
/**
 * This is the reference implementation for the The Transport Unit Identifier,
 * or TUID. TUIDs are an ISO standard ID that identifies loads in the
 * logistics industry.
 */
export const TUID = {
	/*
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
	encode: (date, origin, destination, registeredPrefix, txnRef) => {
		const time = date.toISOString();

		return `ISO.TUID:${time}${NLI.encodeWithoutPrefix(origin)}${NLI.encodeWithoutPrefix(destination)}${registeredPrefix}:${txnRef}`;
	},
};

/**
 * Natural location identifier.
 *
 * This can either be used as a standalone identifier.
 *
 * @param {Location} location
 * @return {string}
 */
export const NLI = {
	encode: location => `ISO.NLI${NLI.encodeWithoutPrefix(location)}`,

	/**
	 * Used as a part of TUID or another identifier.
	 * @param {Location} location
	 * @return {string}
	 */
	encodeWithoutPrefix: location =>
		`${nli.encodePoint(location)}-${nli.encodeElevation(location.elevation)}`,
};
