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
	const jurisdiction = subdivision ? `${country}-${subdivision}` : country
	return `${jurisdiction}.${register}:${identifier}`
}

/**
 * @param {string} s
 * @return {import("./types.ts").ALEI}
 */
export const decode = s => {
	// US-DE.BER:3031657
	const [prefix, identifier] = s.split(":")
	//console.log(`s = ${s}, identifier = ${identifier}`)
	const [jurisdiction, register] = prefix.split(".")
	const [country, subdivision] = jurisdiction.split("-")

	return {
		prefix: {
			jurisdiction: {
				country,
				subdivision:
					subdivision === undefined || subdivision.length === 0
						? undefined
						: subdivision,
			},
			register,
		},
		identifier,
	}
}
