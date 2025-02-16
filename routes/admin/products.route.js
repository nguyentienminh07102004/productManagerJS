const express = require("express");
const routes = express.Router();
const controllers = require("../../controllers/admin/products.controller.js");
const multer = require("multer");
const storage = require("../../helpers/storageMulter.helper.js");
const upload = multer({ storage: storage() });
const middleware = require("../../middleware/Product.middleware.js");

routes.get("/", controllers.index);
routes.get("/create", controllers.create);
routes.post("/create", middleware.ProductMiddleware, upload.single('thumbnail'), controllers.createProduct);
routes.patch("/change-status/:status/:id", controllers.changeStatus);
routes.patch("/change-status/change-multi", controllers.changeMultiStatus);
routes.delete("/delete/:id", controllers.deleteSoftProduct);
routes.get("/update/:id", controllers.update);

module.exports = routes;