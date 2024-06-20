import { expect, test } from 'vitest'
import { Identifier } from './nlis'

// Testing against data from https://e-nli.org/

test("Embassy of New Zealand in Washington DC", () => {
	const actual = Identifier({lat: 38.918966, long: -77.064241}, {storey: 0}) 
	expect(actual).toBe("ISO.NLI92SMU6-58207H-H0")
})

test("Ikamatua Hotel", () => {
	const actual = Identifier({lat: -42.271374, long: 171.684597}, {storey: 0})
	expect(actual).toBe("ISO.NLI368FBM-Y9LCYL-H0")
})
