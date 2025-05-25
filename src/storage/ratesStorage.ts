import type { Rate } from '../types'

export const LOCAL_STORAGE_KEY_RATES = 'rates'

type RatesStorage = {
	[currency: string]: {
		timestamp: string
		rate: Rate
	}
}

export const saveRates = (
	rates: Record<string, Rate>,
	timestamps: Record<string, string>,
) => {
	const stored: RatesStorage = Object.keys(rates).reduce((acc, currency) => {
		acc[currency] = {
			timestamp: timestamps[currency],
			rate: rates[currency],
		}

		return acc
	}, {} as RatesStorage)

	localStorage.setItem(LOCAL_STORAGE_KEY_RATES, JSON.stringify(stored))
}
