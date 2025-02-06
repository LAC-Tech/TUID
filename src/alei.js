/**
 * @param {import("./types.ts").ALEI} alei
 * @return {string}
 */
export const encode = alei => {
	// US-DE.BER:3031657
	const {
		prefix: {
			jurisdiction: { country, subdivision },
			register,
		},
		identifier,
	} = alei

	const jurisdiction = [country, subdivision ?? ""].join("-")
	return `${jurisdiction}.${register}:${identifier}`
}

/**
 * @param {string} s
 * @return {import("./types.ts").ALEI}
 */
export const decode = s => {
	// US-DE.BER:3031657
	const [prefix, identifier] = s.split(":")
	const [jurisdiction, register] = prefix.split(".")
	const [country, subdivision] = jurisdiction.split("-")

	return {
		prefix: {
			jurisdiction: {
				country,
				subdivision: subdivision.length === 0 ? undefined : subdivision,
			},
			register,
		},
		identifier,
	}
}
