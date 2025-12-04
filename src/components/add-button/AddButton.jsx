import { db } from '@/lib/Notes';
import { Button } from '../button/Button';
import { Icon } from '@iconify/react';

export const AddButton = () => {
	const addNote = async () => {
		await db.add('Без названия', 'Без названия');
	};
	return (
		<Button
			classNames="bg-blue-600 transition-filter duration-300 filter hover:brightness-125"
			onClick={addNote}
		>
			<Icon icon="ic:baseline-plus" />
		</Button>
	);
};
