const express = require("express");
const routes = express.Router();
const controllers = require("../../controllers/admin/products.controller.js");
const multer = require("multer");
//const storage = require("../../helpers/storageMulter.helper.js");
const upload = multer();
const middleware = require("../../middleware/Product.middleware.js");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

routes.get("/", controllers.index);
routes.get("/create", controllers.create);
routes.post(
	"/create",
	middleware.ProductMiddleware,
	upload.single("thumbnail"),
	function (req, _, next) {
		if (!req.file) {
			next();
		}
		let streamUpload = (req) => {
			return new Promise((resolve, reject) => {
				let stream = cloudinary.uploader.upload_stream(
					(error, result) => {
						if (result) {
							resolve(result);
						} else {
							reject(error);
						}
					}
				);
				streamifier.createReadStream(req.file.buffer).pipe(stream);
			});
		};
		async function upload(req) {
			let result = await streamUpload(req);
			req.body[req.file.fieldname] = result.url;
			next();
		}
		upload(req);
	},
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
	function (req, _, next) {
		let streamUpload = (req) => {
			return new Promise((resolve, reject) => {
				let stream = cloudinary.uploader.upload_stream(
					(error, result) => {
						if (result) {
							resolve(result);
						} else {
							reject(error);
						}
					}
				);
				streamifier.createReadStream(req.file.buffer).pipe(stream);
			});
		};
		async function upload(req) {
			let result = await streamUpload(req);
			console.log(result);
		}
		upload(req);
		next();
	},
	controllers.updateProduct
);
routes.get("/detail/:id", controllers.detailProduct);

module.exports = routes;
