const mongoose = require("mongoose");

const Class = mongoose.model(
  "Class",
  new mongoose.Schema({
    name: String,
    glv: String,
    students: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student"
        }
      ],
  })
);

module.exports = Class;