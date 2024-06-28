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
];

/** @type {(radix: number) => (n: number) => string} */
const encodeBase = radix => n => {
	const alphabet = encodingAlphabet.slice(0, radix);

	if (n === 0) return alphabet[0];

	let result = "";
	const base = alphabet.length;

	while (n > 0) {
		result = alphabet[n % base] + result;
		n = Math.floor(n / base);
	}

	return result;
};

export const encode = {
	base14: encodeBase(14),
	base19: encodeBase(19),
	base32: encodeBase(32),
	// TODO: why are these two the same?
	storeyBase34: encodeBase(34),
	groundBase34: encodeBase(34),
};

/** @type {(radix: number) => (str: string) => number} */
const decodeBase = radix => str => {
	const alphabet = encodingAlphabet.slice(0, radix);
	const base = alphabet.length;
	let number = 0;

	for (let i = 0; i < str.length; i++) {
		number = number * base + alphabet.indexOf(str[i]);
	}

	return number;
};

export const decode = {
	base14: decodeBase(14),
	base19: decodeBase(19),
	base32: decodeBase(32),
	// TODO: why are these two the same?
	storeyBase34: decodeBase(34),
	groundBase34: decodeBase(34),
};
