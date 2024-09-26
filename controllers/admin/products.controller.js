const Products = require("../../Models/products.model.js");

// [GET] /admin/products/
const index = async (req, res) => {
	const find = { deleted: false };
	// Lấy data
	const products = await Products.find(find);

	res.render("admin/pages/products/index.pug", {
		title: "Trang sản phẩm",
		products: products
	});
}

module.exports = { index };