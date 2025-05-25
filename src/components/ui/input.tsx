import React from 'react'

type InputProps = {
	value?: string
	type?: 'text' | 'number'
	className?: string
	required?: boolean
	onChange: (value: number) => void
}
export const Input: React.FC<InputProps> = ({
	type = 'text',
	className,
	onChange,
	...props
}) => {
	return (
		<input
			type={type}
			onChange={({ target }) => onChange(Number(target.value))}
			className={
				'text-md block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm transition duration-100 ease-in-out focus:outline-none ' +
				(className || '')
			}
			{...props}
		/>
	)
}
