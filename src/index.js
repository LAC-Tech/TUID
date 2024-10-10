import * as nli from "./nli.js"
import * as datetime from "./datetime.js"

/**
 * This is the reference implementation for the The Transport Unit Identifier,
 * or TUID. TUIDs are an ISO standard ID that identifies loads in the
 * logistics industry.
 *
 * @typedef {import("./types.d.ts").NLI} NLI
 * @typedef {import("./types.d.ts").TUID} TUID
 */

/** @type {(tuid: TUID) => string} */
export const encode = tuid => {
	const year = tuid.date.getUTCFullYear()
	const month = String(tuid.date.getUTCMonth() + 1).padStart(2, "0")
	const day = String(tuid.date.getUTCDate()).padStart(2, "0")
	const hours = String(tuid.date.getUTCHours()).padStart(2, "0")
	const minutes = String(tuid.date.getUTCMinutes()).padStart(2, "0")

	const date = `${year}${month}${day}T${hours}${minutes}`
	const [origin, dest] = [tuid.origin, tuid.destination].map(nli.encodeTUID)
	const { registeredPrefix, txnRef } = tuid

	return `${prefix}:${date}${origin}${dest}${registeredPrefix}:${txnRef}`
}

const prefix = "ISO,TUID"

/** @type {(s: string) => TUID} */
export const decode = s => {
	const dateStr = s.slice(9, 22)
	const date = datetime.decode(dateStr)

	const origin = nli.decodeTUID(s.slice(22, 36))
	const destination = nli.decodeTUID(s.slice(36, 50))
	const [registeredPrefix, txnRef] = s.slice(50).split(":")

	return { date, origin, destination, registeredPrefix, txnRef }
}
