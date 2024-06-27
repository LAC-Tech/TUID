## Constants

<dl>
<dt><a href="#TUID">TUID</a></dt>
<dd><p>This is the reference implementation for the The Transport Unit Identifier,
or TUID. TUIDs are an ISO standard ID that identifies loads in the
logistics industry.</p>
</dd>
<dt><a href="#NLI">NLI</a></dt>
<dd><p>Natural location identifier.</p>
</dd>
</dl>

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
| origin | <code>Location</code> | Where the load is being sent from. |
| destination | <code>Location</code> | Where the load is being sent to. |
| registeredPrefix | <code>string</code> | Registered business number of the buyer or shipper. |
| txnRef | <code>number</code> | Internal transaction reference number of the buyer or shipper. |

<a name="NLI"></a>

## NLI
Natural location identifier.

**Kind**: global constant  

* [NLI](#NLI)
    * [.encode(location)](#NLI.encode) ⇒ <code>string</code>
    * [.encodeWithoutPrefix(location)](#NLI.encodeWithoutPrefix) ⇒ <code>string</code>

<a name="NLI.encode"></a>

### NLI.encode(location) ⇒ <code>string</code>
Produces a stand alone NLI (with prefix)

**Kind**: static method of [<code>NLI</code>](#NLI)  

| Param | Type |
| --- | --- |
| location | <code>Location</code> | 

<a name="NLI.encodeWithoutPrefix"></a>

### NLI.encodeWithoutPrefix(location) ⇒ <code>string</code>
Used as a part of TUID or another identifier.

**Kind**: static method of [<code>NLI</code>](#NLI)  

| Param | Type |
| --- | --- |
| location | <code>Location</code> | 

