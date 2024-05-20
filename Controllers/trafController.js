const TrafficFine = require("../Models/trafSchema");

exports.addTraffic = async (req, res) => {
  console.log("Inside the add Traffic method");
  const { vehicleNumber, fineAmount, violationType, location, date } = req.body;
  const tImage = req.file.filename;
  const userId = req.payload;
  console.log(vehicleNumber, fineAmount, violationType, location, date, tImage);
  console.log(userId);

  try {
    const existingReport = await TrafficFine.findOne({ vehicleNumber });
    if (existingReport) {
      return res.status(409).json({ message: "Report already exists" });
    } else {
      const newReport = new TrafficFine({
        vehicleNumber,
        fineAmount,
        violationType,
        location,
        date,
        tImage,
        userId,
      });
      await newReport.save();
      return res.status(200).json(newReport);
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getTrafficReport = async (req, res) => {
  const searchKey = req.query.search;
  console.log(searchKey);

  const query = {
    vehicleNumber: { $regex: searchKey, $options: "i" },
  };
  const userId = req.payload;
  try {
    const trafficReports = await TrafficFine.find(query);
    return res.status(200).json(trafficReports);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteTraffic = async (req, res) => {
  const { uId } = req.params;
  try {
    const deletedReport = await TrafficFine.findOneAndDelete({ _id: uId });
    if (deletedReport) {
      return res.status(200).json(deletedReport);
    } else {
      return res.status(404).json({ message: "Report not found" });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
