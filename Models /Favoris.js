
const mongoose = require("mongoose");

const Favoris = mongoose.model("Favoris", {
  title: String,
  description: String,
  thumbnail: Object,
  _id: String,
});

module.exports = Favoris