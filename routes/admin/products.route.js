const express = require("express");
const routes = express.Router();
const controllers = require("../../controllers/admin/products.controller.js");
const multer = require("multer");
//const storage = require("../../helpers/storageMulter.helper.js");
const upload = multer();
const middleware = require("../../middleware/Product.middleware.js");
const { uploadCloud } = require("../../middleware/UploadCloud.middleware.js");

routes.get("/", controllers.index);
routes.get("/create", controllers.create);
routes.post(
	"/create",
	middleware.ProductMiddleware,
	upload.single("thumbnail"),
	uploadCloud,
	controllers.createProduct
);
routes.patch("/change-status/:status/:id", controllers.changeStatus);
routes.patch("/change-status/change-multi", controllers.changeMultiStatus);
routes.delete("/delete/:id", controllers.deleteSoftProduct);
routes.get("/update/:id", controllers.update);
routes.patch(
	"/update/:id",
	middleware.ProductMiddleware,
	upload.single("thumbnail"),
	uploadCloud,
	controllers.updateProduct
);
routes.get("/detail/:id", controllers.detailProduct);

module.exports = routes;
