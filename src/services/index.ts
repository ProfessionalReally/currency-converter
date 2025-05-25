const API_BASE_URL = 'https://latest.currency-api.pages.dev/v1/currencies/'

export const fetchRates = async (baseCurrency: string) => {
	const response = await fetch(`${API_BASE_URL}${baseCurrency}.json`)
	return await response.json()
}
