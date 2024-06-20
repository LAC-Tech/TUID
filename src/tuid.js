import * as nlis from "./nlis.js"

/**
 * @param {Date} date
 * @param {Location} location
 * @param {string} registeredPrefix
 * @param {number} txnRef
 *
 * @return {string}
 */
export const Identifier = (date, location, registeredPrefix, txnRef) => {
	const time = date.toISOString()
	const {point, elevation} = location
	const place = nlis.Identifier(point, elevation)

	return `ISO.TUID:${time}${place}${registeredPrefix}:${txnRef}`
}
