import { expect, test, describe } from "vitest";
import { encode, decode } from "./num";
import fc from "fast-check";

test("encode 0 as base14", () => {
	expect(encode.base14(0)).toBe("0");
});

test("encode 13 as base14", () => {
	expect(encode.base14(13)).toBe("D");
});

test("encode 13 as base14", () => {
	expect(encode.base14(14)).toBe("10");
});

test("encode 0 as base19", () => {
	expect(encode.base19(0)).toBe("0");
});

test("encode 18 as base14", () => {
	expect(encode.base19(18)).toBe("Y");
});

test("encode 0 as base32", () => {
	expect(encode.base32(0)).toBe("0");
});

test("encode 31 as base32", () => {
	expect(encode.base32(31)).toBe("V");
});

test("encode number part of latitude", () => {
	expect(encode.base14(38 + 90)).toBe("92");
});

test("encode number part of longitude", () => {
	expect(encode.base19(-77 + 180)).toBe("58");
});

/**
 * @param {(n: number) => string} encodeFn
 * @param {(s: string) => number} decodeFn
 */
const testBaseEncoding = (encodeFn, decodeFn) => {
	fc.assert(
		fc.property(
			fc.nat(),
			/** @type {number} */ n => {
				expect(n).toBe(decodeFn(encodeFn(n)));
			}
		)
	);
};

describe("can encode and decode a number, and get the same number out", () => {
	test("base14", () => {
		testBaseEncoding(encode.base14, decode.base14);
	});

	test("base19", () => {
		testBaseEncoding(encode.base19, decode.base19);
	});

	test("base32", () => {
		testBaseEncoding(encode.base32, decode.base32);
	});

	test("storeyBase34", () => {
		testBaseEncoding(encode.groundBase34, decode.groundBase34);
	});

	test("groundBase34", () => {
		testBaseEncoding(encode.storeyBase34, decode.storeyBase34);
	});
});
