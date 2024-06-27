import * as nlis from "./nlis";
export { Encode as encodeNLIS } from "./nlis";

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

	return `ISO.TUID:${time}${nlis.EncodeWithoutPrefix(origin)}${nlis.EncodeWithoutPrefix(destination)}${registeredPrefix}:${txnRef}`;
};
