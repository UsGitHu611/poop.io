import { Icon } from '@iconify/react';
import { clsx } from 'clsx';

export const ResetButton = ({ showModalHandler }) => {
	return (
		<button
			className={clsx(
				'group rounded-full bg-red-700 transition-colors',
				'flex cursor-pointer items-center justify-center text-2xl',
				'size-15 hover:brightness-125 active:brightness-125 md:size-17',
			)}
			onClick={showModalHandler}
			title="Удалить все"
		>
			<Icon className="group-hover:brightness-150" icon="ri:reset-left-fill" />
		</button>
	);
};
