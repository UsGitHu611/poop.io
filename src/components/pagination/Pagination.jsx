import { usePagination } from '@hooks/usePagination';
import { PaginationButton } from './PaginationButton';
import { PaginationList } from './PaginationList';

export const Pagination = ({ totalCount }) => {
	const { handleChangePage, paginationList, pageCount, currentPage } =
		usePagination(totalCount);

	return (
		<>
			{pageCount <= 1 ? null : (
				<div className="flex items-center justify-center gap-2 justify-self-start py-3">
					<PaginationButton
						direction="left"
						pageCount={pageCount}
						currentPage={currentPage}
						handleChangePage={handleChangePage}
					/>
					<PaginationList
						currentPage={currentPage}
						paginationList={paginationList}
						handleChangePage={handleChangePage}
					/>
					<PaginationButton
						direction="right"
						pageCount={pageCount}
						currentPage={currentPage}
						handleChangePage={handleChangePage}
					/>
				</div>
			)}
		</>
	);
};
