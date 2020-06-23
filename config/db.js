const mongoose = require("mongoose");

const dbURI = process.env.DB_conString
const options = {
  reconnectTries: Number.MAX_VALUE,
  useNewUrlParser: true ,
  poolSize: 10
};

mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

// require any models

require("../models/Test");
