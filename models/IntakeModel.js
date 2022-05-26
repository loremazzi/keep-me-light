const mongoose = require('mongoose'); //import mongoose

const DailyIntake = mongoose.model(
	'daily_intake',
	new mongoose.Schema({
		day_id: Number,
		date:Date,
		Kcal_total: String
	})
);
module.exports = DailyIntake;
