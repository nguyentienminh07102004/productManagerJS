const productRoutes = require("./products.route.js");
const homeRoutes = require("./home.route.js");

module.exports = (app) => {
	// Home Page Client
	app.use("/", homeRoutes);
	// Product Page Client
	app.use("/products", productRoutes);
}