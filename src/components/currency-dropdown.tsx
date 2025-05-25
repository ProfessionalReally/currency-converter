import React, { memo } from 'react'
import type { Currency } from '../constants'

type CurrencyDropdownProps = {
	currencies: Currency[]
	currency: string
	onChange: (currency: string) => void
}

export const CurrencyDropdown: React.FC<CurrencyDropdownProps> = memo(
	({ currencies, currency, onChange }) => {
		const code = currencies.find((c) => c.name === currency)?.code

		return (
			<div className='flex w-full rounded-md border border-2 border-gray-300 bg-white px-3 py-2.5 shadow-sm transition duration-100 ease-in-out focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 hover:border-blue-400'>
				<div className='pointer-events-none flex items-center'>
					{code && (
						<img
							src={`https://flagcdn.com/w40/${code}.webp`}
							alt='flag-icon'
						/>
					)}
				</div>
				<select
					value={currency}
					onChange={({ target }) => onChange(target.value)}
					className='text-md w-full cursor-pointer appearance-none text-center font-bold focus:outline-none'
				>
					{currencies.length > 0 &&
						currencies.map(({ name }) => (
							<option key={name} value={name}>
								{name.toUpperCase()}
							</option>
						))}
				</select>
			</div>
		)
	},
)
