/** @type {(value: string, name: string, expectedLen: number) => void} */
export const len = (value, name, expectedLen) => {
	if (value.length != expectedLen) {
		throw new Error(
			`${name} should have length ${expectedLen} digits, but given length ${value.length}`
		)
	}
}
/**
 * @type {(value: number, paramName: string, bounds: [number, number]) => void}
 */
export const bounds = (value, paramName, [min, max]) => {
	if (value >= min && value <= max) return

	const msg = `out of bounds error for ${paramName}: expecting value between ${min} and ${max}, given ${value}`

	throw new Error(msg)
}

/** @type {(n: number, paramName: string) => void} */
export const isInt = (n, paramName) => {
	if (!Number.isSafeInteger(n)) {
		throw new Error(`${paramName} (${n}) is not an integer`)
	}
}
