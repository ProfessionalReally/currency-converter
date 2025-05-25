export const isRatesExpired = (timestamp: string) => {
	if (!timestamp) return true

	const now = new Date().toISOString().slice(0, 10)
	const saved = new Date(timestamp).toISOString()

	return now !== saved
}
