const mongoose = require("mongoose");

const trafSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: true,
  },
  fineAmount: {
    type: String,
    required: true,
  },
  violationType: {
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
  status: {
    type: String,
    default: "Pending",
  },
  tImage: {
    type: String,
    required: true,
  },
 
});

const TrafficFine = mongoose.model("TrafficFine", trafSchema);
module.exports = TrafficFine;
