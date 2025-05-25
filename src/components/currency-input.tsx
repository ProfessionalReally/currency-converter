import { CurrencyDropdown } from './currency-dropdown'
import { Input } from './ui/input'
import { CURRENCIES as currencies } from '../constants'
import React, { useCallback } from 'react'

type CurrencyInputProps = {
	currency: string
	value: number
	onChangeCurrency: (currency: string) => void
	onChangeValue: (value: number) => void
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
	value,
	currency,
	onChangeCurrency,
	onChangeValue,
}) => {
	const handleChangeCurrency = useCallback(
		(currency: string) => {
			onChangeCurrency(currency)
		},
		[currency],
	)

	const handleChangeValue = useCallback(
		(value: number) => {
			onChangeValue(value)
		},
		[value],
	)

	return (
		<div className={'flex flex-col gap-2'}>
			<CurrencyDropdown
				currencies={currencies}
				currency={currency}
				onChange={handleChangeCurrency}
			/>
			<Input
				type='number'
				onChange={handleChangeValue}
				value={value.toString()}
				className='no-spinner border-2 hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
			/>
		</div>
	)
}
