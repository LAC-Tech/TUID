import * as nlis from "./nlis.js"

/**
 * @param {Date} date
 * @param {Location} origin
 * @param {Location} destination
 * @param {string} registeredPrefix
 * @param {number} txnRef
 *
 * @return {string}
 */
export const Identifier = (date, origin, destination, registeredPrefix, txnRef) => {
	const time = date.toISOString()

	return `ISO.TUID:${time}${nlis.IdentifierSansPrefix(origin)}${nlis.IdentifierSansPrefix(destination)}${registeredPrefix}:${txnRef}`
}
