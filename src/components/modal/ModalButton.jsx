import { clsx } from 'clsx';

export const ModalButton = ({ children, onClick, color }) => {
	return (
		<button
			className={clsx(
				'w-1/2 cursor-pointer rounded-lg py-2.5 text-xl',
				'select-none hover:brightness-125 active:brightness-125',
				color,
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
