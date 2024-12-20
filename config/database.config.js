const mongoose = require('mongoose');
const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log("Connect success");
	} catch (error) {
		console.log(error);
	}
}

module.exports = {connect};