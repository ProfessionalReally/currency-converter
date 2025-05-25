export const loadFromStorage = (key: string) => {
	try {
		const raw = localStorage.getItem(key)
		if (!raw) return null

		return JSON.parse(raw)
	} catch {
		return null
	}
}
