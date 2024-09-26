const controllers = require("../../controllers/admin/dashboard.controller.js");
const express = require("express");
const routes = express.Router();

routes.get("/", controllers.dashboard);

module.exports = routes;