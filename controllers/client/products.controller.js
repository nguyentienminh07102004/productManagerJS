const Products = require("../../Models/products.model.js");

// [GET] /products
const index = async (req, res) => {
	const find = {
		status: "active",
		deleted: false,
	};
	const products = await Products.find(find);
	products.forEach((element) => {
		element["priceNew"] = (
			(element.price * 100) /
			(100 - element.discountPercentage)
		).toFixed(0);
	});
	res.render("client/pages/products/index.pug", {
		title: "Trang sản phẩm",
		products: products,
	});
};

const detail = async (req, res) => {
	const { slug } = req.params;
	const find = { slug };
	const product = await Products.findOne(find);
	res.render("client/pages/products/detail.pug", {
		title: "Sản phẩm",
		product: product
	});
};

module.exports = { index, detail };
