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
    console.log(status, id);
    status = status === "active" ? "inactive" : "active";
    await Products.updateOne({ _id: id }, { status: status });
    res.redirect(req.get("Referrer") || "/admin/products/");
};
module.exports = { index, changeStatus };
