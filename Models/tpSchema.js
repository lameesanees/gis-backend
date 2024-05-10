const mongoose = require("mongoose");

const tpSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  description:{
    type:String,
    required:true
  },
  tpImage: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
});

const touristreports = mongoose.model("touristreports", tpSchema);
module.exports = touristreports;
