const mongoose = require("mongoose");

const Student = mongoose.model(
  "Student",
  new mongoose.Schema({
    name: String,
    age: String,
    class: String,
    fatherName: String,
    motherName: String,
    phoneNumber: Number,
    address: String,
    score:{
        test1:Number,
        test2:Number,
        finalTest:Number
    }
  })
);

module.exports = Student;