import * as nli from "./nli.js"

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
	const nlis = [tuid.origin, tuid.destination].map(nli.encode)
	const { registeredPrefix, txnRef } = tuid

	return `${prefix}:${date}${nlis[0]}${nlis[1]}${registeredPrefix}:${txnRef}`
}

const prefix = "ISO,TUID"

/** @type {(s: string) => TUID} */
export const decode = s => {
	const dateStr = s.slice(9, 22)

	const year = parseInt(dateStr.slice(0, 4), 10)
	const month = parseInt(dateStr.slice(4, 6), 10) - 1
	const day = parseInt(dateStr.slice(6, 8), 10)
	const hours = parseInt(dateStr.slice(9, 11), 10)
	const minutes = parseInt(dateStr.slice(11, 13), 10)

	const date = new Date(Date.UTC(year, month, day, hours, minutes))

	const origin = nli.decodeTUID(s.slice(22, 36))
	const destination = nli.decodeTUID(s.slice(36, 50))
	const [registeredPrefix, txnRef] = s.slice(50).split(":")

	return { date, origin, destination, registeredPrefix, txnRef }
}
