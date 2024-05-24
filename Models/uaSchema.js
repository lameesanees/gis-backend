// import mongoose
const mongoose = require("mongoose");

// schema craetion
const uaSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  aadhaar: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  uaImage: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  username:{
    type:String
  },
  status: {
    type: String,
  },
});

// create model
const reports = mongoose.model("reports", uaSchema);
module.exports = reports;
