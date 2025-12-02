import { useLiveQuery } from 'dexie-react-hooks';
import { memo, useCallback, useContext } from 'react';
import { db } from '../../lib/Notes';
import { Note } from '../note-item/Note';
import { clsx } from 'clsx';
import { Icon } from '@iconify/react';
import { AnimatePresence } from 'motion/react';
import { SelectedContext } from '@/context/SelectedContextProvider';
import { searchContext } from '../../context/SearchContextProvider';

export const List = memo(() => {
	const { selectSort, noteItemsMap } = useContext(searchContext);
	const { selectedIds, isSelectionMode, setSelectedIds } = useContext(SelectedContext);

	const notes = useLiveQuery(() => {
		if (selectSort) {
			return db.notes.orderBy(selectSort).toArray();
		}
		return db.notes.toArray();
	}, [selectSort]);

	const toggleSelection = useCallback(id => {
		setSelectedIds(prev => {
			if (prev.includes(id)) {
				return prev.filter(itemId => itemId !== id);
			} else {
				return [...prev, id];
			}
		});
	}, []);

	if (!notes) return null;

	return (
		<AnimatePresence>
			<ul
				className={clsx(
					'grid grid-cols-2 md:grid-cols-5',
					'peer gap-3 md:gap-4 w-full',
					'place-content-start content-start',
				)}
			>
				<li
					key="empty-message"
					className={clsx(
						'absolute inset-1/2 -translate-1/2 w-fit h-fit',
						'text-cool-50 pointer-events-none text-4xl',
						!notes.length ? 'flex items-center gap-2' : 'hidden',
					)}
				>
					Добавьте
					<Icon icon="nrk:super-emoji-poop-angry" />
				</li>

				{notes?.map((note, index) => (
					<Note
						key={note.id}
						id={note.id}
						{...note}
						isSelected={selectedIds.includes(note.id)}
						isSelectionMode={isSelectionMode}
						onToggle={toggleSelection}
						ref={noteItemsMap}
					/>
				))}
			</ul>
		</AnimatePresence>
	);
});
