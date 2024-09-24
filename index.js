const express = require("express");
const routes = require("./routes/client/index.route.js");
// Cấu hình thư viện cho dotenv
require("dotenv").config();

//Cấu hình port và app express
const app = express();
const port = process.env.PORT;

// Cấu hình template(pug)
app.set("views", "./views");
app.set("view engine", "pug");

// Cấu hình routes
routes(app);


app.listen(port, () => {
	console.log(`App open in port ${port}`)
});