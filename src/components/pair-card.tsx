import { CurrencyInput } from './currency-input'
import { Button } from './ui/button'
import { ArrowRightLeft, X } from 'lucide-react'
import type { Pair } from '../types'
import React, { useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { converterStore } from '../stores/converter-store'

type PairCardProps = {
	pair: Pair
}

export const PairCard: React.FC<PairCardProps> = observer(({ pair }) => {
	const {
		deletePair,
		swapPair,
		setFromCurrency,
		setToCurrency,
		setAmountFromCurrency,
		setAmountToCurrency,
	} = converterStore

	const {
		id,
		fromCurrency,
		toCurrency,
		amountFromCurrency,
		amountToCurrency,
	} = pair

	const handleDeletePair = useCallback(() => {
		deletePair(id)
	}, [id])

	const handleSwapPair = useCallback(() => {
		swapPair(id)
	}, [id])

	const handleChangeFromCurrency = useCallback(
		(currency: string) => {
			setFromCurrency(id, currency)
		},
		[id],
	)

	const handleChangeToCurrency = useCallback(
		(currency: string) => {
			setToCurrency(id, currency)
		},
		[id],
	)

	const handleChangeAmountFromCurrency = useCallback(
		(value: number) => {
			setAmountFromCurrency(id, value)
		},
		[id],
	)

	const handleChangeAmountToCurrency = useCallback(
		(value: number) => {
			setAmountToCurrency(id, value)
		},
		[id],
	)

	return (
		<div
			className={
				'relative flex justify-between gap-10 rounded-lg bg-gray-50 p-5 shadow-md max-sm:flex-col max-sm:gap-2'
			}
		>
			<CurrencyInput
				onChangeCurrency={handleChangeFromCurrency}
				onChangeValue={handleChangeAmountFromCurrency}
				value={amountFromCurrency}
				currency={fromCurrency}
			/>
			<div className='flex items-center justify-center'>
				<Button
					onClick={handleSwapPair}
					className='rounded-full bg-blue-600 p-2.5 text-white hover:scale-105 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 max-sm:rotate-90'
				>
					<ArrowRightLeft />
				</Button>
			</div>
			<CurrencyInput
				onChangeCurrency={handleChangeToCurrency}
				onChangeValue={handleChangeAmountToCurrency}
				value={amountToCurrency}
				currency={toCurrency}
			/>
			<Button
				onClick={handleDeletePair}
				className='absolute top-0 right-0 rounded-full hover:scale-105 hover:bg-gray-300'
			>
				<X size={'22'} />
			</Button>
		</div>
	)
})
