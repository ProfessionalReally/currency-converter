import { CurrencyConvertor } from './components/currency-convertor'

export default function App() {
	return (
		<div
			className={
				'flex min-h-screen flex-col items-center justify-center bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-400'
			}
		>
			<div
				className={
					'container flex flex-col items-center justify-center'
				}
			>
				<h1
					className={
						'mx-auto text-3xl font-bold text-white max-sm:text-2xl'
					}
				>
					Currency Converter
				</h1>
				<CurrencyConvertor />
			</div>
		</div>
	)
}
