import { clsx } from 'clsx';

export const Button = ({ onClick, children, classNames, ...props }) => {
	return (
		<button
			{...props}
			className={clsx(
				'size-17 cursor-pointer rounded-full',
				'flex items-center text-2xl',
				'justify-center',
				classNames,
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
