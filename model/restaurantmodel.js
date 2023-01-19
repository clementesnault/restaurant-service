const mongoose = require("mongoose");

const Restaurants = mongoose.model(
  "Restaurants",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    zone: {
      type: [String, String],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    notes: {
      type: Number,
      required: true,
    },
    openingTime: {
      type: Date,
      required: true,
    },
    closingTime: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    display: {
      type: Array,
      required: true,
    },
  })
);

module.exports = Restaurants;
