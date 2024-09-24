const express = require("express");
const routes = require("./routes/client/index.route.js");

//Cấu hình port và app express
const app = express();
const port = 3000;

// Cấu hình template(pug)
app.set("views", "./views");
app.set("view engine", "pug");

// Cấu hình routes
routes(app);


app.listen(port, () => {
	console.log(`App open in port ${port}`)
});