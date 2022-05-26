const mongoose = require('mongoose'); //import mongoose

const ClassOfWhat = mongoose.model(
	'class_of_what',
	new mongoose.Schema({
        class_id: Number,
		name: String,
	})
);
module.exports = ClassOfWhat;

