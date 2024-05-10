const mongoose = require("mongoose");

const maSchema = new mongoose.Schema({
  yourname: {
    type: String,
    required: true,
  },
  youraadhaar: {
    type: String,
    required: true,
  },
  yourcontact: {
    type: String,
    required: true,
  },
  yournoplate: {
    type: String,
    required: true,
  },
  insurance: {
    type: String,
    required: true,
  },
  accidentype: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  oppfullname: {
    type: String,
    required: true,
  },
  oppcontact: {
    type: String,
    required: true,
  },
  oppadhaar: {
    type: String,
    required: true,
  },
  oppnoplate: {
    type: String,
    required: true,
  },
  maImage: {
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

const accidentreport = mongoose.model("accidentreport", maSchema);
module.exports = accidentreport;
