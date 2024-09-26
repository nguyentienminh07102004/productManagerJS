const Products = require("../../Models/products.model.js");
const filterStatusHelper = require("../../helpers/filterStatus.helper.js");
const keywordHelper = require("../../helpers/search.helper.js");

// [GET] /admin/products/
const index = async (req, res) => {
	const find = { deleted: false };

	// Bộ lọc theo trạng thái
	const filterStatus = filterStatusHelper(req.query);

	// truy vấn status bằng query
	if(req.query.status) {
		find.status = req.query.status;
	}
	// lọc theo keyword
	const keyword = keywordHelper(req.query);
	if(keyword.regex) find.title = keyword.regex;
	// Lấy data
	const products = await Products.find(find);

	res.render("admin/pages/products/index.pug", {
		title: "Trang sản phẩm",
		products: products,
		filterStatus: filterStatus,
		keyword: keyword.keyword
	});
}

module.exports = { index };