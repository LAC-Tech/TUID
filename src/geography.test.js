import { expect, test, describe } from "vitest"
import fc from "fast-check"
import { GroundLevel, Storey } from "./geography.js"

test("Storey encoding examples from ISO", () => {
	expect(Storey.encode(0)).toBe("H0")
	expect(Storey.encode(5)).toBe("H5")
	expect(Storey.encode(-2)).toBe("GW")
})

test("Ground level encoding examples from ISO", () => {
	expect(GroundLevel.encode(0)).toBe("H00")
	expect(GroundLevel.encode(1000)).toBe("HTE")
	expect(GroundLevel.encode(-1000)).toBe("G4K")
})
