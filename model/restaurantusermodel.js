const mongoose = require("mongoose");

const Users = mongoose.model(
  "Users",
  new mongoose.Schema({
    _id: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true
    },
    id_restaurant: {
      type: String,
      required: true
    }
  })
);

module.exports = Users;
