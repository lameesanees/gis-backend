// import mongoose
const mongoose = require("mongoose");

// schema creation
const oiSchema = new mongoose.Schema({
  infotype: {
    type: String,
    required: true,
  },
  location:{
    type:String,
    required:true,
  },
  date:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  contact: {
    type: String,
    required: true,
  },
  oiImage: {
    type: String,
    required: true,
  },
  userId:{
    type:String,
    required:true
  },status: {
    type: String,
  },
});

const otherinfo = mongoose.model("otherinfo",oiSchema);
module.exports = otherinfo