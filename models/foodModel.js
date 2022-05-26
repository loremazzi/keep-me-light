const mongoose = require('mongoose'); //import mongoose

const Food = mongoose.model(
	'food',
	new mongoose.Schema({
		food_id: Number,
		name: String,
		calories_hundred: Number,
		calories_piece: Number,
		um: String,
		fk_class: Number,
	})
);

module.exports = Food;

