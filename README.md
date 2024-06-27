<a name="encodeTUID"></a>

## encodeTUID ⇒ <code>string</code>
This is the reference implementation for the The Transport Unit Identifier,
or TUID. TUIDs are an ISO standard ID that identifies loads in the
logistics industry.

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | When the load is ready to be shipped |
| origin | <code>Location</code> | Where the load is being sent from. |
| destination | <code>Location</code> | Where the load is being sent to. |
| registeredPrefix | <code>string</code> | Registered business number of the buyer or shipper. |
| txnRef | <code>number</code> | Internal transaction reference number of the buyer or shipper. |

