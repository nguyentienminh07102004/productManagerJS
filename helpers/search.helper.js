module.exports = (query) => {
	const keyword = { keyword: "" };
	if(query.title) {
		keyword.keyword = query.title;
		keyword.regex = new RegExp(query.title, "i");
	}
	return keyword;
}