import { db } from '@/lib/Notes';
import { Icon } from '@iconify/react';
import { clsx } from 'clsx';

export const AddButton = () => {
	const addNote = async () => {
		await db.add('Без названия', 'Без названия');
	};
	return (
		<button
			className={clsx(
				'transition-filter size-15 bg-blue-500 filter duration-300 md:size-17',
				'flex items-center justify-center rounded-full text-2xl hover:brightness-125',
				'cursor-pointer',
			)}
			onClick={addNote}
		>
			<Icon icon="ic:baseline-plus" />
		</button>
	);
};
