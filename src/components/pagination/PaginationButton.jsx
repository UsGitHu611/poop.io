import { Icon } from '@iconify/react';
import { clsx } from 'clsx';

export const PaginationButton = ({
	direction,
	handleChangePage,
	currentPage,
	pageCount,
}) => {
	const newPage = direction === 'right' ? currentPage + 1 : currentPage - 1;
	const isDisabled = direction === 'right' ? currentPage >= pageCount : currentPage <= 1;

	const handleClick = () => {
		if (!isDisabled) {
			handleChangePage(newPage);
		}
	};
	return (
		<button
			className={clsx(
				'dark:hover:bg-cool-50 cursor-pointer',
				'flex aspect-square w-10 items-center justify-center rounded-md',
				'hover:bg-gray-200 disabled:opacity-30',
				'disabled:cursor-not-allowed',
			)}
			disabled={isDisabled}
			onClick={handleClick}
		>
			<Icon
				icon={
					direction === 'left'
						? 'ic:outline-arrow-back-ios'
						: 'ic:outline-arrow-forward-ios'
				}
			/>
		</button>
	);
};
