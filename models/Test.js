const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema({
  
  time : { 
    type : Date,
    default: Date.now }

});

module.exports = mongoose.model("DAILY_TESTS", testSchema, 'DAILY_TESTS');
