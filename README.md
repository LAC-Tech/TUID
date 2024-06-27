## Constants

<dl>
<dt><a href="#encodeTUID">encodeTUID</a> ⇒ <code>string</code></dt>
<dd><p>This is the reference implementation for the The Transport Unit Identifier,
or TUID. TUIDs are an ISO standard ID that identifies loads in the
logistics industry.</p>
</dd>
<dt><a href="#encodeNLI">encodeNLI</a></dt>
<dd><p>Used as a stand alone NLI</p>
</dd>
<dt><a href="#encodeNLIWithoutPrefix">encodeNLIWithoutPrefix</a></dt>
<dd><p>Used as a part of TUID or another identifier.</p>
</dd>
</dl>

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

<a name="encodeNLI"></a>

## encodeNLI
Used as a stand alone NLI

**Kind**: global constant  

| Param | Type |
| --- | --- |
| location | <code>Location</code> | 

<a name="encodeNLIWithoutPrefix"></a>

## encodeNLIWithoutPrefix
Used as a part of TUID or another identifier.

**Kind**: global constant  

| Param | Type |
| --- | --- |
| location | <code>Location</code> | 

