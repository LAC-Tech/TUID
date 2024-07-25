import { expect, test, describe } from "vitest"
import fc from "fast-check"
import { GroundLevel, Latitude, Longitude } from "./geography.js"

test("Latitude encoding examples from ISO", () => {
	expect(new Latitude(0).encode()).toBe("660")
	expect(new Latitude(-90).encode()).toBe("00")
	expect(new Latitude(90).encode()).toBe("CC0")
})

test("Longitude encoding examples from ISO", () => {
	expect(new Longitude(0).encode()).toBe("990")
	expect(new Longitude(-180).encode()).toBe("00")
	expect(new Longitude(180).encode()).toBe("YY0")
})

test("Ground level encoding examples from ISO", () => {
	expect(GroundLevel.encode(0)).toBe("H00")
	expect(GroundLevel.encode(1000)).toBe("HTE")
	expect(GroundLevel.encode(-1000)).toBe("G4K")
})
