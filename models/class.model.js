const mongoose = require("mongoose");

const Class = mongoose.model(
  "Class",
  new mongoose.Schema({
    name: String,
    glv: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "GLV"
    }],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
      }
    ],
  })
);

module.exports = Class;