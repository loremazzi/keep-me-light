const mongoose = require('mongoose'); //import mongoose

const User = mongoose.model(
    'user',
    new mongoose.Schema({
        user_id: Number,
        name: String,
        bithday: Date,
        sport: Number,
    })
);
module.exports = User;


