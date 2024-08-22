import fc from "fast-check"

import { describe, expect, test } from "vitest"
import * as nli from "./nli.js"

import * as arb from "./arbitraries.js"
import { Latitude, Longitude } from "./geography.js"

/** @typedef {import('./types.d.ts').Elevation} Elevation */
// Testing against data from https://e-nli.org/

//test("Embassy of New Zealand in Washington DC", () => {
//	const actual = NLI.create({
//		lat: 38.918966,
//		long: -77.064241,
//		elevation: { storey: 0 },
//	}).encode()
//	expect(actual).toBe("ISO.NLI:92SMU6-58207H-H0")
//})
//
//test("Ikamatua Hotel", () => {
//	const actual = NLI.create({
//		lat: -42.271374,
//		long: 171.684597,
//		elevation: { storey: 0 },
//	}).encode()
//	expect(actual).toBe("ISO.NLI:368FBM-Y9LCYL-H0")
//})

/** @param {import("./types.d.ts").NLI} actual */
const testIfISOReversible = actual => {
	const encoded = nli.encodeISO(actual)
	const expected = nli.decodeISO(encoded)
	expect(actual).toStrictEqual(expected)
}

/** @param {import("./types.d.ts").StoreyNLI} actual */
const testIfTUIDReversible = actual => {
	const encoded = nli.encodeTUID(actual)
	const expected = nli.decodeTUID(encoded)
	expect(actual).toStrictEqual(expected)
}

// NW quadrant
test("Federal Maritime Commission, Washington DC", () => {
	testIfISOReversible({
		lat: Latitude.fromNum(38.900542),
		long: Longitude.fromNum(-77.0102704),
		storey: 0,
	})
})

test("Embassy of New Zealand in Washington DC", () => {
	testIfISOReversible({
		lat: Latitude.fromNum(38.918966),
		long: Longitude.fromNum(-77.064241),
		storey: 0,
	})
})

// SW Quadrant
test("Falkland Islands Tourist Board, Stanley", () => {
	testIfISOReversible({
		lat: Latitude.fromNum(-51.692207),
		long: Longitude.fromNum(-57.8589238),
		storey: 0,
	})
})

// NE Quadrant
test("Xinyi Anhe Station, Taipei", () => {
	testIfISOReversible({
		lat: Latitude.fromNum(25.0331425),
		long: Longitude.fromNum(121.5499456),
		storey: 0,
	})
})

// SE Quadrant
test("Ikamatua Hotel, Ikamatua", () => {
	testIfISOReversible({
		lat: Latitude.fromNum(-42.271374),
		long: Longitude.fromNum(171.684597),
		storey: 0,
	})
})

describe("ISO encoding/decoding is reversible", () => {
	test("Storey", () =>
		fc.assert(fc.property(arb.storeyNli, testIfISOReversible)))
	test("Ground Level", () =>
		fc.assert(fc.property(arb.groundLevelNli, testIfISOReversible)))
})

test("TUID encoding/decoding is reversible", () =>
	fc.assert(fc.property(arb.storeyNli, testIfTUIDReversible)))
