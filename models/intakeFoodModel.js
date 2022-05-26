const mongoose = require('mongoose'); //import mongoose

const DailyIntakeFood = mongoose.model(
	'daily_intake_food',
	new mongoose.Schema({
		intake_food_id: Number,
		quantity: Number,
		fk_food: Number,
		fk_day: Number,
	})
);

module.exports = DailyIntakeFood;