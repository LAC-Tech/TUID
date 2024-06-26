/**
 * NOTE
 * - ISO inconsistent wrt lat long OR long lat. Point object renders it moot.
 */

type Elevation = {storey: number} | {ground: number}
type Point = {lat: number, long: number}
type Location = Point & {elevation: Elevation}
