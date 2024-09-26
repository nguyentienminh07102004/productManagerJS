const Products = require("../../Models/products.model.js");

// [GET] /admin/products/
const index = async (req, res) => {
	const find = { deleted: false };
	const filterStatus = [
		{
			name: "Tất cả",
			status: "",
			active: ""
		},
		{
			name: "Hoạt động",
			status: "active",
			active: ""
		},
		{
			name: "Dừng hoạt động",
			status: "inactive",
			active: ""
		}
	];
	if(req.query.status) {
		const index = filterStatus.findIndex(item => item.status == req.query.status);
		if(index >= 0) filterStatus[index].active = "active";
	} else {
		const index = filterStatus.findIndex(item => item.status == "");
		filterStatus[index].active = "active";	
	}
	// truy vấn bằng query
	let keyword = '';
	if(req.query != null) {
		for(let item in req.query) {
			if(req.query[item] && item != "title") {
				find[item] = req.query[item];
			} else if(req.query[item]) {
				keyword = req.query[item];
				find[item] = new RegExp(keyword.trim(), "i"); // tạo regex vì mongoose sẽ so sánh tên bằng nên nếu nhập từ khoá sẽ không có, i là để không phân biệt hoa thường
			}
		}
	}
	// Lấy data
	const products = await Products.find(find);

	res.render("admin/pages/products/index.pug", {
		title: "Trang sản phẩm",
		products: products,
		filterStatus: filterStatus,
		keyword: keyword
	});
}

module.exports = { index };