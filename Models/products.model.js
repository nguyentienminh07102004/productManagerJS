const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		description: String,
		price: Number,
		stock: Number,
		discountPercentage: Number,
		thumbnail: String,
		status: String,
		position: Number,
		deleted: {
			type: Boolean,
			default: false,
		},
		deleteAt: Date,
		slug: {
			type: String,
			slug: "title",
			unique: true,
		},
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model("products", productSchema, "products");

module.exports = Product;
