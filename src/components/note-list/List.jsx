import { useLiveQuery } from 'dexie-react-hooks';
import { useContext, Children, cloneElement, isValidElement } from 'react';
import { db, SORT_DATE_FIELD, PAGE_SIZE } from '@lib/Notes';
import { Note } from '../note-item/Note';
import { clsx } from 'clsx';
import { AnimatePresence } from 'motion/react';
import { SelectedContext } from '@context/SelectedContextProvider';
import { searchContext } from '@context/SearchContextProvider';
import { EmptyList } from './EmptyList';
import { useSearchParams } from 'react-router';

export const List = ({ children }) => {
	const { selectSort, noteItemsMap, newInputValue } = useContext(searchContext);
	const { selectedIds, isSelectionMode, setSelectedIds } = useContext(SelectedContext);
	const [searchParams] = useSearchParams();
	const page = parseInt(searchParams.get('page') || '1');

	const data = useLiveQuery(async () => {
		let notes = await db.notes.toArray();

		if (selectSort === SORT_DATE_FIELD) {
			notes = notes.sort((a, b) => b.date - a.date);
		}

		if (newInputValue.trim()) {
			const lower = newInputValue.toLowerCase();
			notes = notes.filter(n => n.title.toLowerCase().includes(lower));
		}

		const totalCount = notes.length;

		if (!newInputValue.trim()) {
			notes = notes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
		}

		return { notes, totalCount };
	}, [selectSort, page, newInputValue]);

	const { notes = [], totalCount = 0 } = data || {};

	const toggleSelection = id => {
		setSelectedIds(prev => {
			if (prev.includes(id)) {
				return prev.filter(itemId => itemId !== id);
			} else {
				return [...prev, id];
			}
		});
	};

	return (
		<>
			{totalCount === 0 ? (
				<EmptyList text={newInputValue ? 'Нетю' : 'Добавьте'} />
			) : (
				<AnimatePresence>
					<ul
						className={clsx(
							'grid grid-cols-2 md:grid-cols-4',
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
								setSelectedIds={setSelectedIds}
								onToggle={toggleSelection}
								ref={noteItemsMap}
							/>
						))}
					</ul>
				</AnimatePresence>
			)}

			{children({ totalCount })}
		</>
	);
};
