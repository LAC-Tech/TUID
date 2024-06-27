/**
 * @module types
 * NOTE
 * - ISO inconsistent wrt lat long OR long lat. Point object renders it moot.
 */

type Point = { lat: number; long: number };
type Elevation = { storey: number } | { ground: number };
type Location = Point & { elevation: Elevation };
