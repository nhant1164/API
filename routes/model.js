var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Define a schema
var userSchema = new Schema(
  {
    name: String,
    username: { 
      type: String,
      require: true,
      unique: true,
    },
    password:{
      type:String,
      require:true,
    },
    admin: Boolean,
    location:String,
    meta:{
      age:Number,
    },
    create_at: Date,
    updated_at: Date,
  })

var User = mongoose.model('User', userSchema);

module.exports = User;
