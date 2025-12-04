import { Icon } from '@iconify/react';
import { clsx } from 'clsx';
import { memo, useContext } from 'react';
import { SORT_DATE_FIELD } from '../../lib/Notes';
import { searchContext } from '../../context/SearchContextProvider';

const buttonStyle = clsx(
	'aspect-square flex items-center justify-center h-full size-15',
	'rounded-full bg-cool-100 cursor-pointer hover:brightness-125',
);

export const SortPanel = memo(() => {
	const { selectSort, selectHandler } = useContext(searchContext);
	return (
		<button
			className={clsx(buttonStyle, 'flex', selectSort ? 'bg-blue-600!' : '')}
			onClick={() => selectHandler(SORT_DATE_FIELD)}
			title="Сортировать по дате"
			key="sort"
		>
			<Icon icon="ic:baseline-calendar-month" width={24} />
		</button>
	);
});
