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
	const year = date.getUTCFullYear()
	const month = String(date.getUTCMonth() + 1).padStart(2, "0")
	const day = String(date.getUTCDate()).padStart(2, "0")
	const hours = String(date.getUTCHours()).padStart(2, "0")
	const minutes = String(date.getUTCMinutes()).padStart(2, "0")

	const d = `${year}${month}${day}T${hours}${minutes}`

	const nlis = [origin, destination].map(nli.encode)

	return `ISO.TUID:${d}${nlis[0]}${nlis[1]}${registeredPrefix}:${txnRef}`
}

/** @type {(s: string) => TUID} */
export const decode = s => {
	const prefix = s.slice(0, 9)
	const date = s.slice(9, 22)
	console.log({ prefix, date })
	const origin = nli.decode(s.slice(22, 36))
	const destination = nli.decode(s.slice(36, 50))
	const [registeredPrefix, txnRef] = s.slice(50).split(":")

	return { date, origin, destination, registeredPrefix, txnRef }
}
