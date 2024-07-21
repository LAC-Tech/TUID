/**
 * @module types
 * NOTE
 * - ISO inconsistent wrt lat long OR long lat. Point object renders it moot.
 */

import type { Point } from "./geography.js"

export type Elevation = { storey: number } | { ground: number }
