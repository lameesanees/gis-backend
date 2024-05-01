const mongoose = require("mongoose");

const csSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  charity: {
    type: String,
    required: true,
  },
  pay: {
    type: String,
    required: true,
  },
});

const socialcharity = mongoose.model("socialcharity", csSchema);
module.exports = socialcharity;
