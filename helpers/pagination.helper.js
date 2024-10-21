const pagination = (objectPagination, query, countProducts) => {
	if(isNaN(query.page)) objectPagination.currentPage = 1;
	else objectPagination.currentPage = parseInt(query.page) || 1;
	objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;
	const totalPages = Math.ceil(countProducts / objectPagination.limitItem);
	objectPagination.totalPages = totalPages;
	return objectPagination;
}

module.exports = pagination;