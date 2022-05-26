const mongoose = require('mongoose'); //import mongoose

const ListOfWhat = mongoose.model(
    'list_of_what',
    new mongoose.Schema({
        what_id: Number,
        name: String,
        fk_class: Number,
        equivalent: Number
    })
);
module.exports = ListOfWhat;

