import { useSearchParams } from 'react-router';
import { isMobile } from '@lib/isMobile';
import { PAGE_SIZE } from '@lib/Notes';

const VIEW_OFFSET_DESKTOP = 6;
const VIEW_OFFSET_MOBILE = 4;
const VIEW_OFFSET = isMobile ? VIEW_OFFSET_MOBILE : VIEW_OFFSET_DESKTOP;

export const usePagination = totalCount => {
	const [searchParams, setSearchParams] = useSearchParams();

	const handleChangePage = page => {
		setSearchParams({ page });
	};

	const pageCount = Math.ceil(totalCount / PAGE_SIZE);
	const currentPage = Number(searchParams.get('page')) || 1;

	const maxVisiblePages = VIEW_OFFSET;
	let startPage = 1;
	let endPage = Math.min(pageCount, maxVisiblePages);

	if (currentPage > Math.floor(maxVisiblePages / 2)) {
		startPage = currentPage - Math.floor(maxVisiblePages / 2);
		endPage = Math.min(startPage + maxVisiblePages - 1, pageCount);
		startPage = Math.max(1, endPage - maxVisiblePages + 1);
	}

	const paginationList = [];
	for (let i = startPage; i <= endPage; i++) {
		paginationList.push(i);
	}

	return {
		handleChangePage,
		paginationList,
		pageCount,
		currentPage,
	};
};
