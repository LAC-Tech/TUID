import { NLI } from "./nli.js"
export { NLI } from "./nli.js"

// Following the JSON api in the standard library
/**
 * This is the reference implementation for the The Transport Unit Identifier,
 * or TUID. TUIDs are an ISO standard ID that identifies loads in the
 * logistics industry.
 */
export const TUID = {
	/**
	 * @param {Date} date - When the load is ready to be shipped
	 * @param {NLI} origin - Where the load is being sent from.
	 * @param {NLI} destination - Where the load is being sent to.
	 * @param {string} registeredPrefix - Registered business number of the buyer
	 * or shipper.
	 * @param {number} txnRef - Internal transaction reference number of the buyer
	 * or shipper.
	 *
	 * @return {string}
	 */
	encode: (date, origin, destination, registeredPrefix, txnRef) => {
		const time = date.toISOString()

		return `ISO.TUID:${time}${origin.encodeWithoutPrefix()}${destination.encodeWithoutPrefix()}${registeredPrefix}:${txnRef}`
	},
}
