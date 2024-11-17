const express = require("express");
const routes = express.Router();
const controllers = require("../../controllers/admin/products.controller.js");

routes.get("/", controllers.index);
routes.patch("/change-status/:status/:id", controllers.changeStatus);
routes.patch("/change-status/change-multi", controllers.changeMultiStatus);

module.exports = routes;
