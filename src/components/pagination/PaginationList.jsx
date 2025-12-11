import { clsx } from 'clsx';

export const PaginationList = ({ paginationList, handleChangePage, currentPage }) => {
	return (
		<ul className="flex items-center justify-center gap-0.5">
			{paginationList?.map(page => (
				<li className="flex items-center justify-center" key={page}>
					<button
						onClick={() => handleChangePage(page)}
						className={clsx(
							'dark:hover:bg-cool-50 flex-1 cursor-pointer hover:bg-gray-200',
							'flex aspect-square w-10 items-center justify-center rounded-md',
							currentPage === page ? 'dark:bg-cool-50 bg-gray-200' : '',
						)}
					>
						{page}
					</button>
				</li>
			))}
		</ul>
	);
};
