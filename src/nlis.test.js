import { expect, test } from 'vitest'
import { Identifier } from './nlis'

test("Embassy of New Zealand in Washington DC", () => {
	expect(Identifier(38.918966, -77.064241, 0, 'ground')).toBe("92SMU6-58207H-H0")
})
