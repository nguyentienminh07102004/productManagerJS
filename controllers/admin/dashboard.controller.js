// [GET] /admin/dashboard/
const dashboard = (req, res) => {
	res.render("admin/pages/dashboard/index.pug", {
		title: "Trang admin"
	});
}

module.exports = { dashboard }