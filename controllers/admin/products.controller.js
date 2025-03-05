const Products = require("../../Models/products.model.js");
const filterStatusHelper = require("../../helpers/filterStatus.helper.js");
const keywordHelper = require("../../helpers/search.helper.js");
const paginationHelper = require("../../helpers/pagination.helper.js");

// [GET] /admin/products/
const index = async (req, res) => {
	const find = { deleted: false };

	// Bộ lọc theo trạng thái
	const filterStatus = filterStatusHelper(req.query);

	// truy vấn status bằng query
	if (req.query.status) {
		find.status = req.query.status;
	}
	// lọc theo keyword
	const keyword = keywordHelper(req.query);
	if (keyword.regex) find.title = keyword.regex;
	// Pagination
	// Lấy số lượng sản phẩm
	const countProducts = await Products.countDocuments(find);
	let objectPagination = paginationHelper(
		{ limitItem: 4 },
		req.query,
		countProducts
	);
	// Lấy data
	const products = await Products.find(find)
		.sort({ position: "desc" })
		.limit(objectPagination.limitItem)
		.skip(objectPagination.skip);

	res.render("admin/pages/products/index.pug", {
		title: "Trang sản phẩm",
		products: products,
		filterStatus: filterStatus,
		keyword: keyword.keyword,
		pagination: objectPagination,
	});
};

// [PATCH] /admin/products/change-status/:status/:id/
const changeStatus = async (req, res) => {
	let { status, id } = req.params;
	status = status === "active" ? "inactive" : "active";
	await Products.updateOne({ _id: id }, { status: status });
	res.redirect(req.get("Referrer") || "/admin/products/");
};

// [PATCH] /admin/products/change-multi
const changeMultiStatus = async (req, res) => {
	const { status, ids } = req.body;
	if (status === "delete-all") {
		await Products.updateOne(
			{ _id: { $in: ids.split(/\s+/) } },
			{ deleted: true, deleteAt: new Date() }
		);
	} else if (status === "change-position") {
		const Ids = ids.split(/\s+/);
		Ids.forEach(async (id) => {
			const [ID, position] = id.split("-");
			await Products.updateOne(
				{ _id: ID },
				{ position: parseInt(position) }
			);
		});
	} else {
		await Products.updateMany(
			{ _id: { $in: ids.split(/\s+/) } },
			{ status: status }
		);
	}
	res.redirect(req.get("Referrer"));
};

// [DELETE] /admin/products/delete/:id
const deleteProduct = async (req, res) => {
	const { id } = req.params;
	await Products.deleteOne({ _id: id });
	res.redirect(req.get("Referrer"));
};

// [DELETE] /admin/products/delete/:id
const deleteSoftProduct = async (req, res) => {
	const { id } = req.params;
	await Products.updateOne(
		{ _id: id },
		{ deleteAt: new Date(), deleted: true }
	);
	res.redirect(req.get("Referrer"));
};

// [GET] /admin/products/create
const create = async (_, res) => {
	res.render("admin/pages/products/create.pug", {
		title: "Create Product",
	});
};

// [POST] /admin/products/create
const createProduct = async (req, res) => {
	// validate
	if (req.body.stock) {
		req.body.stock = parseInt(req.body.stock);
	}
	if (req.body.price) {
		req.body.price = parseFloat(req.body.price);
	}
	if (req.body.discountPercentage) {
		req.body.discountPercentage = parseFloat(req.body.discountPercentage);
	}
	if (req.body.position) {
		req.body.position = parseInt(req.body.position);
	} else {
		req.body.position = (await Products.countDocuments()) + 1;
	}
	if (req.file) {
		req.body.thumbnail = `/admin/images/${req.file.filename}`;
	}
	try {
		await Products.create(req.body);
		req.flash("success", "Tạo sản phẩm thành công!");
	} catch (err) {
		req.flash("error", err.errors.title.properties.message);
	}
	res.redirect(req.get("Referrer"));
};

// [GET] /admin/update/:id
const update = async (req, res) => {
	try {
		const { id } = req.params;
		const find = { deleted: false, _id: id };
		const product = await Products.findOne(find);
		res.render("admin/pages/products/update.pug", {
			title: "Cập nhập sản phẩm",
			product: product,
		});
	} catch (error) {
		res.redirect("/admin/products/");
	}
};

// [PATCH] /admin/update/:id
const updateProduct = async (req, res) => {
	try {
		const product = req.body;
		if (product.price) {
			product.price = parseFloat(product.price);
		}
		if (product.stock) {
			product.stock = parseInt(product.stock);
		}
		if (product.discountPercentage) {
			product.discountPercentage = parseFloat(product.discountPercentage);
		}
		if (req.file) {
			product.thumbnail = `/admin/images/${req.file.filename}`;
		}
		await Products.updateOne({ _id: req.params.id }, product);
		res.redirect(req.get("Referrer"));
	} catch (err) {
		res.redirect("/admin/products/");
	}
};

// [GET] /admin/products/detail/:id
const detailProduct = async (req, res) => {
	const { id } = req.params;
	const find = { deleted: false, _id: id };
	const product = await Products.findOne(find);
	res.render("admin/pages/products/detail.pug", {
		title: "Chi tiết sản phẩm " + id,
		product: product,
	});
};

module.exports = {
	index,
	changeStatus,
	changeMultiStatus,
	deleteProduct,
	deleteSoftProduct,
	createProduct,
	create,
	update,
	updateProduct,
	detailProduct,
};
