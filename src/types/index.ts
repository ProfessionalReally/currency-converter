export type Pair = {
	id: string
	fromCurrency: string
	toCurrency: string
	amountFromCurrency: number
	amountToCurrency: number
}

export type Rate = Record<string, number>
