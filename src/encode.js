
// TODO: just do a slice of one array?
const encodingAlphabet = [
	'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'Y', 
	'J', 'K', 'L', 'M', 'N', 'Z', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'
]

/** @param {number} n */
export const base14 = n => baseGeneral(n, 14, 2)
/** @param {number} n */
export const base19 = n => baseGeneral(n, 19, 2)
/** @param {number} n */
export const base32 = n => baseGeneral(n, 32, 2)
/** @param {number} n */
export const storeyBase34 = n => baseGeneral(n, 34, 2)
/** @param {number} n */
export const groundBase34 = n => baseGeneral(n, 34, 3)

/** @param {number} n */

/** @type {(number: number, radix: number, digits: number) => string} */
const baseGeneral = (number, radix, digits) => {
	let table = encodingAlphabet.slice(0, radix)
	console.assert(table.length == radix)
	let remainderArr = []
	let index = 0
	let quotient = number
	
	// TODO: there's some Array create thing that does this for me
	for (let i = 0; i < digits; i++) {
		remainderArr[i] = 0
	}

	while (quotient != 0) {
		const remainder = quotient % radix
		console.log(index)
		remainderArr[index] = remainder
		quotient = Math.floor(quotient / radix)
		index = index + 1
	}

	let encoding = ""
	for (let i = 0; i < digits; i++) {
		encoding = encoding.concat(table[remainderArr[digits - 1 - i]])
	}

	return encoding
}
