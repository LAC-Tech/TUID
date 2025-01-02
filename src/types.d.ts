/**
 * @module types
 */

import type { Latitude, Longitude } from "./geography.js"
export type Point = { lat: Latitude; long: Longitude }
export type Elevation = { storey: number } | { groundLevel: number }
export type StoreyNLI = Point & { storey: number }
export type GroundLevelNLI = Point & { groundLevel: number }
export type NLI = StoreyNLI | GroundLevelNLI

export type TUID = {
	/** When the load is ready to be shipped */
	date: Date
	/** Where the load is being sent from */
	origin: StoreyNLI
	/** Where the load is being sent to */
	destination: StoreyNLI
	/** Registered business number of the buyer */
	registeredPrefix: string
	/** Internal transaction reference number of the buyer or shipper */
	txnRef: string
}

export type ALEI = {
	prefix: {
		jurisdiction: {
			/** ISO 3116-1 */
			country: string
			/** ISO 3116-2 */
			subdivision?: string
		}
		register: string
	}
	/**
	 * Issued by the jurisdiction, ie NZBN
	 * Any char EXCEPT : or .
	 */
	identifier: string
}
