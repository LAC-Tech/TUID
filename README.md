<a name="TUID"></a>

## TUID
This is the reference implementation for the The Transport Unit Identifier,
or TUID. TUIDs are an ISO standard ID that identifies loads in the
logistics industry.

**Kind**: global constant  
<a name="TUID.encode"></a>

### TUID.encode(date, origin, destination, registeredPrefix, txnRef) ⇒ <code>string</code>
**Kind**: static method of [<code>TUID</code>](#TUID)  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | When the load is ready to be shipped |
| origin | <code>NLI</code> | Where the load is being sent from. |
| destination | <code>NLI</code> | Where the load is being sent to. |
| registeredPrefix | <code>string</code> | Registered business number of the buyer or shipper. |
| txnRef | <code>number</code> | Internal transaction reference number of the buyer or shipper. |

