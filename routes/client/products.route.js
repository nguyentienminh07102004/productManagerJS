const express = require("express");
const controllers = require("../../controllers/client/products.controller.js");

const routes = express.Router();

routes.get("/", controllers.index);

module.exports = routes;