import { Icon } from '@iconify/react';
import { clsx } from 'clsx';

export const SortPanel = () => {
	return (
		<button
			title="Сортировать"
			className={clsx(
				'h-full aspect-square flex items-center justify-center',
				'rounded-full bg-cool-100 cursor-pointer hover:brightness-125',
			)}
		>
			<Icon icon="ic:baseline-sort" width={24} />
		</button>
	);
};
