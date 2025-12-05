import { Icon } from '@iconify/react';
import { clsx } from 'clsx';
import { useContext } from 'react';
import { SORT_DATE_FIELD } from '../../lib/Notes';
import { searchContext } from '../../context/SearchContextProvider';

export const SortPanel = () => {
	const { selectSort, selectHandler } = useContext(searchContext);
	return (
		<button
			type="button"
			className={clsx(
				'flex aspect-square size-15 h-full items-center justify-center',
				'dark:bg-cool-100 cursor-pointer rounded-full hover:brightness-95',
				'flex bg-blue-200 dark:hover:brightness-125',
				selectSort === SORT_DATE_FIELD ? 'bg-blue-500!' : '',
			)}
			onClick={() => selectHandler(SORT_DATE_FIELD)}
			title="Сортировать по дате"
		>
			<Icon icon="ic:baseline-calendar-month" width={24} />
		</button>
	);
};
