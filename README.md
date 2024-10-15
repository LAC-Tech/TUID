This is the reference implementation for the The Transport Unit Identifier, or TUID. TUIDs are an ISO standard ID that identifies loads in the logistics industry.

# API Documentation

This library exposes two top level functions.

## encode

`encode(tuid: TUID) => string`

Transforms a `TUID` object into a string for transmission. The string includes a formatted date, origin, destination, registered business number, and transaction reference.

### Parameters

- `tuid: TUID`: The object representing transaction information, including:
  - `date: Date`: The shipment date. Must be between `0000-01-01T00:00:00Z` and `9999-12-31T23:59:59.999Z`, with minute precision.
  - `origin: StoreyNLI`: The origin of the shipment, defined by:
    - `lat: Latitude`: Latitude must be between -90 and 90 degrees.
    - `long: Longitude`: Longitude must be between -180 and 180 degrees.
    - `storey: number`: Storey must be between -578 and 577.
  - `destination: StoreyNLI`: The destination of the shipment, defined the same way as `origin`.
  - `registeredPrefix: string`: The registered business number. Currently, there is no validation regex.
  - `txnRef: string`: The internal transaction reference. Should match the pattern `^[A-Za-z0-9-]+$`, which allows uppercase and lowercase letters, digits, and dashes.

### Returns

- `string`: Encoded string in the format `ISO,TUID:{date}{origin}{destination}{registeredPrefix}:{txnRef}`.

This function will throw an error if the input values do not meet the specified constraints.

## decode

`decode(s: string) => TUID`

Converts an encoded string back into a `TUID` object.

### Parameters

- `s: string`: The encoded string to be parsed.

### Returns

- `TUID`: The decoded object.
