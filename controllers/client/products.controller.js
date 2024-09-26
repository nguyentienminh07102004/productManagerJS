const Products = require("../../Models/products.model.js");

// [GET] /products
const index = async (req, res) => {
	const find = {
		status: "active",
		deleted: false
	}
	const products = await Products.find(find);
	products.forEach(element => {
		element["priceNew"] = (element.price * 100 / (100 - element.discountPercentage)).toFixed(0);
	});
	res.render("client/pages/products/index.pug", {
		title: "Trang sản phẩm",
		products: products
	});
}

module.exports = {index};