const multer = require("multer");
const storage = () => {
	return multer.diskStorage({
		destination: (_, file, cb) => {
			cb(null, "./public/admin/images");
		},
		filename: function (_, file, cb) {
			const uniqueSuffix = Date.now();
			cb(null, uniqueSuffix + file.originalname);
		},
	});
};

module.exports = storage;
