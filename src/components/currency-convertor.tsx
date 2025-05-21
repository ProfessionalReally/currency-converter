import { PairCard } from './pair-card.tsx'
import { Button } from './ui/button'
import { ListPlus } from 'lucide-react'

export const CurrencyConvertor = () => {
	return (
		<div
			className={
				'mx-auto my-5 flex max-w-xl flex-col gap-5 rounded-lg bg-white p-8 shadow-xl'
			}
		>
			<PairCard />
			<PairCard />
			<PairCard />
			<PairCard />
			<PairCard />
			<PairCard />
			<PairCard />
			<PairCard />

			<Button
				onClick={() => {}}
				className='border-md rounded-xl bg-blue-600 px-3 py-2 text-xl text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'
			>
				<ListPlus />
				Add a currency pair
			</Button>
		</div>
	)
}
