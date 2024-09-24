const express = require("express");
const routes = express.Router();

routes.get("/", (req, res) => {
	res.render("client/pages/home/index.pug", {
		"title": "Trang chủ"
	});
});

module.exports = routes;