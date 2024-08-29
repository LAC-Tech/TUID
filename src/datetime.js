/** @param {Date} date */
export const encode = date => {
	// TODO: explicity encode valid date range here
	const year = date.getUTCFullYear().toString().padStart(4, "0")
	// Months are 0-indexed in JS
	const month = (date.getUTCMonth() + 1).toString().padStart(2, "0")
	const day = date.getUTCDate().toString().padStart(2, "0")
	const hours = date.getUTCHours().toString().padStart(2, "0")
	const minutes = date.getUTCMinutes().toString().padStart(2, "0")

	return `${year}${month}${day}T${hours}${minutes}`
}

/** @param {string} s */
export const decode = s => {
	const year = parseInt(s.slice(0, 4), 10)
	// Months are 0-indexed in JS
	const month = parseInt(s.slice(4, 6), 10) - 1
	const day = parseInt(s.slice(6, 8), 10)
	const hours = parseInt(s.slice(9, 11), 10)
	const minutes = parseInt(s.slice(11, 13), 10)

	const date = new Date()
	date.setUTCFullYear(year)
	date.setUTCMonth(month, day)
	date.setUTCHours(hours, minutes, 0, 0)
	return date
}
