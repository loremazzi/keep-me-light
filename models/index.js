const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./foodModel');
db.role = require('./DailyIntakeModelkeModel');
db.game = require('./intakeFoodModeldModel');

db.ROLES = ['user', 'admin', 'moderator'];

module.exports = db;
