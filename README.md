Example usage:

```js
import { NLI } from "./index.js"

const nli = const actual = NLI.create({
  lat: 38.918966,
  long: -77.064241,
  elevation: { storey: 0 },
})

nli.encode() // "ISO.NLI:92SMU6-58207H-H0")
NLI.decode(nli.encode()).toString()
NLI.decode(nli.encode()).toString()
