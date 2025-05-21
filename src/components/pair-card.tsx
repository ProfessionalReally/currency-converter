import { CurrencyInput } from './currency-input'
import { Button } from './ui/button'
import { ArrowRightLeft, X } from 'lucide-react'

export const PairCard = () => {
	return (
		<div
			className={
				'relative flex justify-between gap-10 rounded-lg bg-gray-50 p-5 shadow-md max-sm:flex-col max-sm:gap-2'
			}
		>
			<CurrencyInput />
			<div className='flex items-center justify-center'>
				<Button
					onClick={() => {}}
					className='rounded-full bg-blue-600 p-2.5 text-white hover:scale-105 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 max-sm:rotate-90'
				>
					<ArrowRightLeft />
				</Button>
			</div>
			<CurrencyInput />
			<Button
				onClick={() => {}}
				className='absolute top-0 right-0 rounded-full hover:scale-105 hover:bg-gray-300'
			>
				<X size={'22'} />
			</Button>
		</div>
	)
}
