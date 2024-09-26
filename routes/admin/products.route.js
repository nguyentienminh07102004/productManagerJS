const express = require("express");
const routes = express.Router();
const controllers = require("../../controllers/admin/products.controller.js");


routes.get("/", controllers.index);

module.exports = routes;
