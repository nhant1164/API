const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
let  User = require("../models/user.model");
// Variable to be sent to Frontend with Database status
let databaseConnection = "Waiting for Database response...";
var chris = new User({
    email: 'chris',
    username: 'sevilayha',
    // password: 'password' 
  });
router.get("/", function(req, res, next) {
    console.log(User)
    res.send(chris.username+ " " + chris.email);
});
// Connecting to MongoDB
var mongoDB = 'mongodb://localhost:27017/my_database';
//Handle khi user signup, ở đây chỉ demo nên mình sẽ không thực hiện validate nhé.
router.post('/signup', function(req, res){
    var user = new User();
 
    user.username = req.body.username;
    user.email = req.body.email;
    user.setPassword(req.body.password);
  
  user.save().then(function(){
    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});
router.post('/login', function(req, res, next){
    // passport.authenticate sẽ nhận vào callback cho method successs ở phần config passport
      passport.authenticate('local', {session: false}, function(err, user, info){
        if(err){ return next(err); }
     
    //Nếu thông tin user là đúng thực hiện tạo JWT và trả dữ liệu về.
        if(user){
          user.token = user.generateJWT();
          return res.json({user: user.toAuthJSON()});
        } else {
          return res.status(422).json(info);
        }
      })(req, res, next);
    });
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