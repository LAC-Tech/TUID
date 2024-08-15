This is the reference implementation for the The Transport Unit Identifier, or TUID. TUIDs are an ISO standard ID that identifies loads in the logistics industry.

A TUID contains two NLIS. Example of creating an NLI, from the node REPL:

```js
let nli = await import("./src/nli.js")
let location = nli.create(-48.456645646464798, 98.976453123216378989, {
	storey: 24,
})

nli.encode(location) // 2DE8K5-ECUGE5-HZ
```
