const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.student = require("./student.model");
db.class = require("./class.model");
db.glv = require("./glv.model")
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;