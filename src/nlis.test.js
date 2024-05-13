import { expect, test } from 'vitest'
import { Identifier } from './nlis'

test("Embassy of New Zealand in Washington DC", () => {
	const actual = 
		Identifier({latitude: 38.918966, longitude: -77.064241}, 0, 'ground')
	expect(actual).toBe("ISO.NLI92SMU6-58207H-H0")
})
