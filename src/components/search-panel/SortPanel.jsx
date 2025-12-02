import { Icon } from '@iconify/react';
import { clsx } from 'clsx';
import { useContext, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SORT_DATE_FIELD, SORT_TITLE_FIELD } from '../../lib/Notes';
import { searchContext } from '../../context/SearchContextProvider';

const sortItems = [
	{
		id: 1,
		value: SORT_TITLE_FIELD,
		name: 'По алфавиту',
		icon: 'mdi:format-letter-case',
	},
	{
		id: 2,
		value: SORT_DATE_FIELD,
		name: 'По дате',
		icon: 'ic:baseline-calendar-month',
	},
];

const buttonStyle = clsx(
	'aspect-square flex items-center justify-center h-full size-15',
	'rounded-full bg-cool-100 cursor-pointer hover:brightness-125',
);

export const SortPanel = () => {
	const [showPanel, setShowPanel] = useState(false);
	const { selectSort, selectHandler } = useContext(searchContext);
	const shouldShowPanel = showPanel || selectSort.length > 0;
	return (
		<div className="flex gap-1">
			<button
				title="Сортировать"
				className={buttonStyle}
				onClick={() => setShowPanel(prev => !prev)}
			>
				<Icon icon="ic:baseline-sort" width={24} />
			</button>
			<AnimatePresence>
				{shouldShowPanel ? (
					<motion.div
						className="grid grid-cols-[repeat(2,1fr)] gap-1 place-content-center"
						initial={{
							opacity: 0,
							transform: 'translateX(-10%)',
						}}
						animate={{
							opacity: 1,
							transform: 'translateX(0)',
						}}
						exit={{
							opacity: 0,
							transform: 'translateX(-10%)',
						}}
					>
						{sortItems.map(({ id, value, name, icon }) => (
							<button
								className={clsx(buttonStyle, selectSort === value ? 'bg-blue-600!' : '')}
								onClick={() => selectHandler(value)}
								title={name}
								key={id}
							>
								<Icon icon={icon} width={24} />
							</button>
						))}
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	);
};
