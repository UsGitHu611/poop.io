import { Icon } from '@iconify/react';
import { clsx } from 'clsx';

export const EmptyList = () => {
	return (
		<li
			key="empty-message"
			className={clsx(
				'absolute inset-1/2 h-fit w-fit -translate-1/2',
				'text-cool-50 pointer-events-none text-4xl',
				'flex items-center gap-2',
			)}
		>
			Добавьте
			<Icon icon="nrk:super-emoji-poop-angry" />
		</li>
	);
};
