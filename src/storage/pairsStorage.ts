import type { Pair } from '../types'

export const LOCAL_STORAGE_KEY_PAIRS = 'pairs'

export const savePairs = (pairs: Pair[]) => {
	localStorage.setItem(LOCAL_STORAGE_KEY_PAIRS, JSON.stringify(pairs))
}
