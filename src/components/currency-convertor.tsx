import { PairCard } from './pair-card'
import { Button } from './ui/button'
import { ListPlus } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { converterStore } from '../stores/converter-store'
import { useCallback } from 'react'
import type { Pair } from '../types'

export const CurrencyConvertor = observer(() => {
	const { pairs, addPair } = converterStore

	const handleAddPair = useCallback(() => addPair(), [])

	return (
		<div
			className={
				'mx-auto my-5 flex max-w-xl flex-col gap-5 rounded-lg bg-white p-8 shadow-xl'
			}
		>
			{pairs.length > 0 &&
				pairs.map((pair: Pair) => (
					<PairCard pair={pair} key={pair.id} />
				))}

			<Button
				onClick={handleAddPair}
				className='border-md rounded-xl bg-blue-600 px-3 py-2 text-xl text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'
			>
				<ListPlus />
				Add a currency pair
			</Button>
		</div>
	)
})
