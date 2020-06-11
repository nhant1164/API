const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./config/db.config") 
const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models/");

const Role = db.role;
const Class = db.class;
const GLV = db.glv;
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
  GLV.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new GLV({
        name: "Hieu Truong",
        age: 22,
        phoneNumber: 786441103,
        address: 'String',
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Hieu Truong' to GLV collection");
      });

      new GLV({
        name: "Nguyen Tran Thien An",
        age: 22,
        phoneNumber: 786441103,
        address: 'String',
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Nguyen Tran Thien An' to GLV collection");
      });

      new GLV({
        name: "Nguyen Xuan Linh",
        age: 22,
        phoneNumber: 786441103,
        address: 'String',
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Nguyen Xuan Linh' to GLV collection");
      });
    }
  });
  // Class.estimatedDocumentCount((err, count) => {
  //   if (!err && count === 0) {
  //     new Class({
  //       name: "1A",
  //     }).save(err => {
  //       if (err) {
  //         console.log("error", err);
  //       }
        
  //       console.log("added 'user' to roles collection");
  //     });

  //   }
  // });
}
// routes

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});