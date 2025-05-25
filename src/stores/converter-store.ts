import { makeAutoObservable, reaction, runInAction } from 'mobx'
import type { Pair, Rate } from '../types'
import { fetchRates } from '../services'
import { LOCAL_STORAGE_KEY_RATES, saveRates } from '../storage/ratesStorage'
import { loadFromStorage } from '../utils/storage'
import { LOCAL_STORAGE_KEY_PAIRS, savePairs } from '../storage/pairsStorage'
import { isRatesExpired } from '../utils/date.ts'

const defaultValues = (): Pair => {
	return {
		id: Date.now().toString(),
		fromCurrency: 'rub',
		toCurrency: 'usd',
		amountFromCurrency: 0,
		amountToCurrency: 0,
	}
}

class ConverterStore {
	pairs: Pair[] = []
	isLoading = false
	error: string | null = null
	rates: Record<string, Rate> = {}
	private ratesTimestamp: Record<string, string> = {}
	private debouncedTimer: ReturnType<typeof setTimeout> | null = null

	constructor() {
		makeAutoObservable(this)
		this.initialize()
	}

	private initialize = async () => {
		await this.initRates()
		this.initPairs()
		this.setupAutoSavePairs()
	}

	private initPairs = () => {
		const pairs = loadFromStorage(LOCAL_STORAGE_KEY_PAIRS)
		if (pairs && pairs.length > 0) {
			runInAction(() => {
				this.pairs = pairs
			})
		} else {
			runInAction(() => {
				this.addPair(defaultValues())
				this.addPair({
					...defaultValues(),
					toCurrency: 'eur',
					id: String(Date.now() + 1),
				})
			})
		}
	}

	private initRates = async () => {
		const rates = await loadFromStorage(LOCAL_STORAGE_KEY_RATES)
		if (rates) {
			runInAction(() => {
				for (const rate in rates) {
					if (!isRatesExpired(rates[rate].timestamp)) {
						this.rates[rate] = rates[rate].rate
						this.ratesTimestamp[rate] = rates[rate].timestamp
					}
				}
			})
		} else {
			runInAction(() => {
				this.rates = {}
				this.ratesTimestamp = {}
			})
		}
	}

	private setupAutoSavePairs = () => {
		reaction(
			() => this.pairs.map((pair) => ({ ...pair })),
			() => {
				if (this.debouncedTimer) clearTimeout(this.debouncedTimer)

				this.debouncedTimer = setTimeout(() => {
					savePairs(this.pairs)
				}, 400)
			},
		)
	}

	addPair = (pair?: Pair) => {
		const newPair = pair || defaultValues()

		runInAction(() => {
			this.pairs.push(newPair)
			this.convertPair(newPair.id)
		})
	}

	deletePair = (id: string) => {
		if (!id) return

		if (this.pairs.length < 2) return

		runInAction(() => {
			this.pairs = this.pairs.filter((pair) => pair.id !== id)
		})
	}

	setFromCurrency = (id: string, currency: string) => {
		const pair = this.findPair(id)

		if (pair) {
			runInAction(() => {
				pair.fromCurrency = currency
				this.convertPair(id)
			})
		}
	}

	setToCurrency = (id: string, currency: string) => {
		const pair = this.findPair(id)

		if (pair) {
			runInAction(() => {
				pair.toCurrency = currency
				this.convertPair(id)
			})
		}
	}

	setAmountFromCurrency = (id: string, amount: number) => {
		const pair = this.findPair(id)

		if (pair) {
			runInAction(() => {
				pair.amountFromCurrency = amount
				this.convertPair(id)
			})
		}
	}

	setAmountToCurrency = (id: string, amount: number) => {
		const pair = this.findPair(id)

		if (pair) {
			runInAction(() => {
				pair.amountToCurrency = amount
				this.convertPair(id, true)
			})
		}
	}

	swapPair = (id: string) => {
		const pair = this.findPair(id)

		if (pair) {
			runInAction(() => {
				const { fromCurrency, toCurrency } = pair
				pair.fromCurrency = toCurrency
				pair.toCurrency = fromCurrency
				this.convertPair(id)
			})
		}
	}

	private fetchRatesForBase = async (baseCurrency: string) => {
		try {
			runInAction(() => {
				this.isLoading = true
				this.error = null
			})

			const data = await fetchRates(baseCurrency)
			const rates: Rate = data[baseCurrency]

			runInAction(() => {
				this.rates[baseCurrency] = rates
				this.ratesTimestamp[baseCurrency] = new Date()
					.toISOString()
					.slice(0, 10)
				saveRates(this.rates, this.ratesTimestamp)
			})
		} catch (error) {
			runInAction(() => {
				this.error = 'Failed to fetch rates'
			})
		} finally {
			runInAction(() => {
				this.isLoading = false
			})
		}
	}

	private findPair = (id: string): Pair | undefined => {
		return this.pairs.find((pair) => pair.id === id)
	}

	private getRate = async (
		fromCurrency: string,
		toCurrency: string,
	): Promise<number | null> => {
		if (!fromCurrency || !toCurrency) return null

		if (fromCurrency === toCurrency) return 1

		const cached = this.rates[fromCurrency]?.[toCurrency]
		if (cached && !isRatesExpired(this.ratesTimestamp[fromCurrency]))
			return cached

		await this.fetchRatesForBase(fromCurrency)

		return this.rates[fromCurrency]?.[toCurrency]
	}

	private convertPair = async (id: string, reverse = false) => {
		const pair = this.findPair(id)
		if (!pair) return

		const {
			fromCurrency,
			toCurrency,
			amountFromCurrency,
			amountToCurrency,
		} = pair

		const rate = await this.getRate(
			reverse ? toCurrency : fromCurrency,
			reverse ? fromCurrency : toCurrency,
		)

		const field = reverse ? 'amountFromCurrency' : 'amountToCurrency'
		const amount = reverse ? amountToCurrency : amountFromCurrency

		runInAction(() => {
			pair[field] = rate ? Number((amount * rate).toFixed(2)) : 0
		})
	}
}

export const converterStore = new ConverterStore()
