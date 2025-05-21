import { CurrencyDropdown } from './currency-dropdown'
import { Input } from './ui/input'

export const CurrencyInput = () => {
	return (
		<div className={'flex flex-col gap-2'}>
			<CurrencyDropdown />
			<Input
				type='number'
				onChange={() => {}}
				className='no-spinner border-2 hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
			/>
		</div>
	)
}
