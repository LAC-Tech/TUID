import { expect, test, describe } from "vitest"
import fc from "fast-check"
import { Latitude } from "./geography.js"

test("Latitude encoding, according to spec", () => {
	expect(new Latitude(0).encode()).toBe("66")
	expect(new Latitude(-90).encode()).toBe("00")
	expect(new Latitude(90).encode()).toBe("CC")
})
