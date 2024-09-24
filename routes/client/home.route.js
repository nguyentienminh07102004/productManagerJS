const express = require("express");
const controllers = require("../../controllers/client/home.controller.js");

const routes = express.Router();

routes.get("/", controllers.index);

module.exports = routes;