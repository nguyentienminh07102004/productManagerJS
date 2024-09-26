const productRoutes = require("./products.route.js");
const dashboardRoutes = require("./dashboard.route.js");
const systemConstant = require("../../config/system.config.js");

const routeAdmin = (app) => {
	const PATH_ADMIN = systemConstant.PATH_ADMIN;
	// Home Page admin
	app.use(`${PATH_ADMIN}/dashboard`, dashboardRoutes);
	// Product Page admin
	app.use(`${PATH_ADMIN}/products`, productRoutes);
}

module.exports = routeAdmin;