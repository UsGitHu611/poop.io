import { useLiveQuery } from 'dexie-react-hooks';
import { memo, useCallback, useContext } from 'react';
import { db, SORT_DATE_FIELD } from '../../lib/Notes';
import { Note } from '../note-item/Note';
import { clsx } from 'clsx';
import { AnimatePresence } from 'motion/react';
import { SelectedContext } from '@/context/SelectedContextProvider';
import { searchContext } from '../../context/SearchContextProvider';
import { EmptyList } from './EmptyList';

export const List = memo(() => {
	const { selectSort, noteItemsMap } = useContext(searchContext);
	const { selectedIds, isSelectionMode, setSelectedIds } = useContext(SelectedContext);

	const notes = useLiveQuery(async () => {
		let collection = db.notes.toCollection();

		if (selectSort === SORT_DATE_FIELD) {
			collection = db.notes.orderBy(SORT_DATE_FIELD);
		}

		return collection.reverse().toArray();
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

	if (!notes?.length) {
		return <EmptyList />;
	}

	return (
		<AnimatePresence>
			<ul
				className={clsx(
					'grid grid-cols-2 md:grid-cols-5',
					'peer w-full flex-1 gap-3 md:gap-4',
					'place-content-start content-start',
				)}
			>
				{notes?.map(note => (
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
