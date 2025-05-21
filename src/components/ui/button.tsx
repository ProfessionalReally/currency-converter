import React from 'react'

type ButtonProps = {
	className?: string
	children?: React.ReactNode
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: React.FC<ButtonProps> = ({
	className,
	children,
	...props
}) => {
	return (
		<button
			className={
				'flex cursor-pointer items-center justify-center font-medium transition duration-200 ease-in-out focus:outline-none active:scale-98 ' +
				(className || '')
			}
			{...props}
		>
			{children}
		</button>
	)
}
