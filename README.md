Example usage, in the node repl:

```js
let nli = await import("./src/nli.js")
let location = nli.create(-48.456645646464798, 98.976453123216378989, {
	storey: 24,
})

nli.encode(location) // 2DE8K5-ECUGE5-HZ
```
