import * as nli from "./nli.js"

// Following the JSON api in the standard library
/**
 * This is the reference implementation for the The Transport Unit Identifier,
 * or TUID. TUIDs are an ISO standard ID that identifies loads in the
 * logistics industry.
 *
 * @typedef {import("./types.d.ts").NLI} NLI
 * @typedef {import("./types.d.ts").TUID} TUID
 */

/** @type {(tuid: TUID) => string} */
export const encode = ({
	date,
	origin,
	destination,
	registeredPrefix,
	txnRef,
}) => {
	const time = date.toISOString()
	const nlis = [origin, destination].map(nli.encode)

	return `ISO.TUID:${time}${nlis[0]}${nlis[1]}${registeredPrefix}:${txnRef}`
}

/** @type {(s: string) => TUID} */
export const decode = s => {
	const [time, origin, destination, registeredPrefix, txnRef] = s
		.replace("ISO.TUID:", "")
		.split(/(?<=Z)(?=[A-Z])/)
	return {
		date: new Date(time),
		origin: nli.decode(origin),
		destination: nli.decode(destination),
		registeredPrefix: registeredPrefix.split(":")[0],
		txnRef,
	}
}
