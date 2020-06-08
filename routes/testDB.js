const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const  User = require('./model')
// Variable to be sent to Frontend with Database status
let databaseConnection = "Waiting for Database response...";
var chris = new User({
    name: 'Chris',
    username: 'sevilayha',
    password: 'password' 
  });
router.get("/", function(req, res, next) {
    res.send(chris.name);
});
// Connecting to MongoDB
var mongoDB = 'mongodb://mongoDB:27017/my_database';

// mongoose.connect(mongoDB
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// If there is a connection error send an error message
mongoose.connection.on("error", error => {
    console.log("Database connection error:", error);
    databaseConnection = "Error connecting to Database";
});
// If connected to MongoDB send a success message
mongoose.connection.once("open", () => {
    console.log("Connected to Database!");
    databaseConnection = "Connected to Database";
});
module.exports = router;