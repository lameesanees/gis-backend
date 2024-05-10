const mongoose = require("mongoose");

// schema  creation
const activitySchema = new mongoose.Schema({
  activityname: {
    type: String,
    required: true,
  },
  location:{
    type:String,
    required:true
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
});

// create model
const activities = mongoose.model("activities", activitySchema);
module.exports = activities;
