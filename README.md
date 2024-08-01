
<a name="readmemd"></a>

**tuid** • **Docs**

***

# tuid

## Classes

- [NLI](#classesnlimd)

## Variables

- [TUID](#variablestuidmd)


<a name="classesnlimd"></a>

[**tuid**](#readmemd) • **Docs**

***

[tuid](#readmemd) / NLI

# Class: NLI

Natural location identifier.

## Properties

### elevation

> **elevation**: `Elevation`

#### Defined in

[nli.js:9](https://github.com/LAC-Tech/TUID/blob/e724bcbe704c9f78789954ef8047d4c62c5721e3/src/nli.js#L9)

***

### prefix

> `static` **prefix**: `string` = `"ISO.NLI:"`

#### Defined in

[nli.js:38](https://github.com/LAC-Tech/TUID/blob/e724bcbe704c9f78789954ef8047d4c62c5721e3/src/nli.js#L38)

## Accessors

### lat

> `get` **lat**(): `number`

#### Returns

`number`

#### Defined in

[nli.js:30](https://github.com/LAC-Tech/TUID/blob/e724bcbe704c9f78789954ef8047d4c62c5721e3/src/nli.js#L30)

***

### long

> `get` **long**(): `number`

#### Returns

`number`

#### Defined in

[nli.js:34](https://github.com/LAC-Tech/TUID/blob/e724bcbe704c9f78789954ef8047d4c62c5721e3/src/nli.js#L34)

## Methods

### encode()

> **encode**(): `string`

Produces a stand alone NLI (with prefix)

#### Returns

`string`

#### Defined in

[nli.js:44](https://github.com/LAC-Tech/TUID/blob/e724bcbe704c9f78789954ef8047d4c62c5721e3/src/nli.js#L44)

***

### encodeWithoutPrefix()

> **encodeWithoutPrefix**(): `string`

Used as a part of TUID or another identifier.

#### Returns

`string`

#### Defined in

[nli.js:52](https://github.com/LAC-Tech/TUID/blob/e724bcbe704c9f78789954ef8047d4c62c5721e3/src/nli.js#L52)

***

### toString()

> **toString**(): `string`

#### Returns

`string`

#### Defined in

[nli.js:67](https://github.com/LAC-Tech/TUID/blob/e724bcbe704c9f78789954ef8047d4c62c5721e3/src/nli.js#L67)

***

### create()

> `static` **create**(`args`): [`NLI`](#classesnlimd)

#### Parameters

• **args**

• **args.elevation**: `Elevation`

• **args.lat**: `number`

• **args.long**: `number`

#### Returns

[`NLI`](#classesnlimd)

#### Defined in

[nli.js:12](https://github.com/LAC-Tech/TUID/blob/e724bcbe704c9f78789954ef8047d4c62c5721e3/src/nli.js#L12)

***

### decode()

> `static` **decode**(`s`): [`NLI`](#classesnlimd)

#### Parameters

• **s**: `string`

#### Returns

[`NLI`](#classesnlimd)

#### Defined in

[nli.js:57](https://github.com/LAC-Tech/TUID/blob/e724bcbe704c9f78789954ef8047d4c62c5721e3/src/nli.js#L57)


<a name="variablestuidmd"></a>

[**tuid**](#readmemd) • **Docs**

***

[tuid](#readmemd) / TUID

# Variable: TUID

> `const` **TUID**: `object`

This is the reference implementation for the The Transport Unit Identifier,
or TUID. TUIDs are an ISO standard ID that identifies loads in the
logistics industry.

## Type declaration

### encode()

> **encode**: (`date`, `origin`, `destination`, `registeredPrefix`, `txnRef`) => `string`

#### Parameters

• **date**: `Date`

When the load is ready to be shipped

• **origin**: [`NLI`](#classesnlimd)

Where the load is being sent from.

• **destination**: [`NLI`](#classesnlimd)

Where the load is being sent to.

• **registeredPrefix**: `string`

Registered business number of the buyer
or shipper.

• **txnRef**: `number`

Internal transaction reference number of the buyer
or shipper.

#### Returns

`string`

## Defined in

[index.js:10](https://github.com/LAC-Tech/TUID/blob/e724bcbe704c9f78789954ef8047d4c62c5721e3/src/index.js#L10)
