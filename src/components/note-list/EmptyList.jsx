import { Icon } from '@iconify/react';
import { clsx } from 'clsx';

export const EmptyList = ({ text }) => {
	return (
		<li
			key="empty-message"
			className={clsx(
				'block h-fit w-full flex-1 select-none',
				'text-cool-50 pointer-events-none text-4xl',
				'flex items-center justify-center gap-2',
			)}
		>
			{text}
			<Icon icon="nrk:super-emoji-poop-angry" />
		</li>
	);
};
