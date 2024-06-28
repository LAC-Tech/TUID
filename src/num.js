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
	storeyBase34: encodeBase(34),
	groundBase34: encodeBase(34),
};
