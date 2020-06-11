const mongoose = require("mongoose");

const GLV = mongoose.model(
  "GLV",
  new mongoose.Schema({
    name: String,
    age: String,
    phoneNumber: Number,
    address: String,
  })
);

module.exports = GLV;