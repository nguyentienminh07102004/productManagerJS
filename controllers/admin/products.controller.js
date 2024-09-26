const index = (req, res) => {
	res.render("admin/pages/products/index.pug", {
		title: "Trang sản phẩm"
	});
}

module.exports = { index };