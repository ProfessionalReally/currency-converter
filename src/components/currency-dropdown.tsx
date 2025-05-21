export const CurrencyDropdown = () => {
	return (
		<div className='flex w-full rounded-md border border-2 border-gray-300 bg-white px-3 py-2.5 shadow-sm transition duration-100 ease-in-out focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 hover:border-blue-400'>
			<div className='pointer-events-none flex items-center'>
				<img src='https://flagcdn.com/w40/us.webp' alt='flag-icon' />
			</div>
			<select className='text-md w-full cursor-pointer appearance-none text-center font-bold focus:outline-none'>
				<option value='USD'>USD</option>
				<option value='EUR'>EUR</option>
				<option value='RUB'>RUB</option>
				<option value='GBP'>GBP</option>
			</select>
		</div>
	)
}
