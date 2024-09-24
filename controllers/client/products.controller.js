const index = (req, res) => {
	res.render("client/pages/products/index.pug", {
		"title": "Trang sản phẩm"
	});
}

module.exports = {index};