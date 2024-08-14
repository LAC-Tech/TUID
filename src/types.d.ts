/**
 * @module types
 */

import type { Latitude, Longitude } from "./geography.js"
export type Elevation = { storey: number } | { ground: number }
export type NLI = { lat: Latitude; long: Longitude; elevation: Elevation }

export type TUID = {
	/** When the load is ready to be shipped */
	date: Date
	/** Where the load is being sent from */
	origin: NLI
	/** Where the load is being sent to */
	destination: NLI
	/** Registered business number of the buyer */
	registeredPrefix: string
	/** Internal transaction reference number of the buyer or shipper */
	txnRef: string
}
