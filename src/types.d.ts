/**
 * @module types
 */

// TODO: get all of these from outdata module
import type { StoreyNLI, Elevation } from "@outdata/nli"
export type Point = { lat: Latitude; long: Longitude }
export type { StoreyNLI, Elevation }
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
	registeredPrefix: ALEI // TODO: ALEI or GLEIF
	/** Internal transaction reference number of the buyer or shipper */
	txnRef: string
}

export type ALEI = {
	prefix: {
		jurisdiction: {
			/** ISO 3116-1, A-Z, two chars */
			country: string
			/**
			 * ISO 3116-2, A-Z and 0-9, 2-3 chars
			 * This is a subset, only subdivisions that issue LEIs are used
			 */
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
