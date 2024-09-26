const express = require("express");
// routes client
const routes = require("./routes/client/index.route.js");
// route admin
const routeAdmin = require("./routes/admin/index.route.js");
//Các biến tĩnh constants
const systemConstants = require("./config/system.config.js");
// Cấu hình thư viện cho dotenv
require("dotenv").config();
// cấu hình mongoose
const mongoose = require("./config/database.config.js");
mongoose.connect();

//Cấu hình port và app express
const app = express();
const port = process.env.PORT;

// Cấu hình template(pug)
app.set("views", "./views");
app.set("view engine", "pug");
// Cấu hình file tĩnh là các file public như css js
app.use(express.static("public"));
// Cấu hình biến toàn cục (local) trong các file pug
app.locals.PATH_ADMIN = systemConstants.PATH_ADMIN;

// Cấu hình routes
routes(app); // client
routeAdmin(app); // admin


app.listen(port, () => {
	console.log(`App open in port ${port}`)
});