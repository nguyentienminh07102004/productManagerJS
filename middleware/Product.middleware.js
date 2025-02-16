const ProductMiddleware = (req, res, next) => {
	if (req.body.title) {
		req.flash("error", "Vui lòng nhập tiêu đề!");
		res.redirect(req.get("Referrer"));
		return;
	}
	next();
};

module.exports = { ProductMiddleware };