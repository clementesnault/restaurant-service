const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Users = require("./restaurantusermodel");

const db = {};
db.mongoose = mongoose;

module.exports = db;

