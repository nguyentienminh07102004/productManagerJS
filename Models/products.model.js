import { model, Schema } from "mongoose";
const productSchema = new Schema({
	title: String,
	description: String,
	price: Number,
	stock: Number,
	discountPercentage: Number,
	thumbnail: String,
	status: String,
	position: Number,
	deleted: Boolean
});

const Product = model("products", productSchema, "products");

module.exports = Product;