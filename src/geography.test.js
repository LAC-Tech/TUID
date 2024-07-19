import { expect, test, describe } from "vitest"
import fc from "fast-check"
import { Latitude } from "./geography.js"

test("Latitude encoding, according to spec", () => {
	expect(Latitude.encode(0)).toBe("66")
	expect(Latitude.encode(-90)).toBe("00")
	expect(Latitude.encode(90)).toBe("CC")
})
