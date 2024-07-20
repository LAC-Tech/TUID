const encodingAlphabet = [
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"Y",
	"J",
	"K",
	"L",
	"M",
	"N",
	"Z",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
]

/** @type {(radix: number) => (n: number) => string} */
const encodeBase = radix => n => {
	const alphabet = encodingAlphabet.slice(0, radix)

	if (n === 0) return alphabet[0]

	let result = ""
	const base = alphabet.length

	while (n > 0) {
		result = alphabet[n % base] + result
		n = Math.floor(n / base)
	}

	return result
}

/** @type {(radix: number) => (str: string) => number} */
const decodeBase = radix => str => {
	const alphabet = encodingAlphabet.slice(0, radix)
	const base = alphabet.length
	let number = 0

	for (let i = 0; i < str.length; i++) {
		number = number * base + alphabet.indexOf(str[i])
	}

	return number
}

export const Base14 = {
	encode: encodeBase(14),
	decode: decodeBase(14),
}

export const Base19 = {
	encode: encodeBase(19),
	decode: decodeBase(19),
}

export const Base32 = {
	encode: encodeBase(32),
	decode: decodeBase(32),
}

export const Base34 = {
	encode: encodeBase(34),
	decode: decodeBase(34),
}
