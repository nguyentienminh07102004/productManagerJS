const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
require("dotenv").config();

function uploadCloud(req, _, next) {
	if (!req.file) {
		next();
	}
	let streamUpload = (req) => {
		return new Promise((resolve, reject) => {
			let stream = cloudinary.uploader.upload_stream((error, result) => {
				if (result) {
					resolve(result);
				} else {
					reject(error);
				}
			});
			streamifier.createReadStream(req.file.buffer).pipe(stream);
		});
	};
	async function upload(req) {
		let result = await streamUpload(req);
		req.body[req.file.fieldname] = result.url;
		next();
	}
	upload(req);
}

module.exports = { uploadCloud };
