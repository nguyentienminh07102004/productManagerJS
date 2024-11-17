const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	title: String,
	description: String,
	price: Number,
	stock: Number,
	discountPercentage: Number,
	thumbnail: String,
	status: String,
	position: Number,
	deleted: Boolean,
	deleteAt: Date
});

const Product = mongoose.model("products", productSchema, "products");

module.exports = Product;