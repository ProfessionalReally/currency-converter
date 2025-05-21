import React from 'react'

type InputProps = {
	type?: 'text' | 'number'
	className?: string
	required?: boolean
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export const Input: React.FC<InputProps> = ({
	type = 'text',
	className,
	...props
}) => {
	return (
		<input
			type={type}
			className={
				'text-md block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm transition duration-100 ease-in-out focus:outline-none ' +
				(className || '')
			}
			{...props}
		/>
	)
}
