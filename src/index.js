import * as nlis from "./nlis.js";

/**
# Tranposrt Unit IDentifier

Reference implementation for the TUID, a unique identifier for loads in the
logistics industry.
*/

/**
 * @param {Date} date
 * @param {Location} origin
 * @param {Location} destination
 * @param {string} registeredPrefix
 * @param {number} txnRef
 *
 * @return {string}
 */
export const Identifier = (
	date,
	origin,
	destination,
	registeredPrefix,
	txnRef
) => {
	const time = date.toISOString();

	return `ISO.TUID:${time}${nlis.EncodeWithoutPrefix(origin)}${nlis.EncodeWithoutPrefix(destination)}${registeredPrefix}:${txnRef}`;
};
