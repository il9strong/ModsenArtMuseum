export const getDisplayedPages = (currentPage: number, totalPages: number) => {
	const pages = [];
	const maxPagesToShow = 4;

	let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
	let endPage = startPage + maxPagesToShow - 1;

	if (endPage > totalPages) {
		endPage = totalPages;
		startPage = Math.max(1, endPage - maxPagesToShow + 1);
	}

	for (let i = startPage; i <= endPage; i++) {
		pages.push(i);
	}
	return pages;
};