const activities = require("../Models/activitySchema");

exports.addAcc = async (req, res) => {
  console.log("Inside the add activity method");
  const { activityname, location, description, date, time, type } = req.body;
  const userId = req.payload;
  console.log(activityname, location, description, date, time, type, userId);

  try {
    const existingAcReport = await activities.findOne({ location });
    if (existingAcReport) {
      res.status(404).json("already exists");
    } else {
      const newAcReport = new activities({
        activityname,
        location,
        description,
        date,
        time,
        type,
        userId,
      });
      await newAcReport.save();
      res.status(200).json(newAcReport);
      newAcReport;
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

// get a particular report
exports.getActivityReport = async (req, res) => {
  const searchKey = req.query.search;
  console.log(searchKey);

  // case sensitive
  const query = {
    location: { $regex: searchKey, $options: "i" },
  };
  // get userId
  const userId = req.payload;
  try {
    const ACreport = await activities.find(query);
    if (ACreport) {
      res.status(200).json(ACreport);
    } else {
      res.status(401).json("Can't find reports");
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
exports.deleteAc = async (req, res) => {
  const {acId } = req.params;
  try {
    const deletedActivity = await activities.findOneAndDelete({ _id: acId });
    if (deletedActivity) {
      res.status(200).json(deletedActivity);
    } else {
      res.status(404).json({ message: "Report not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.updateAc = async (req, res) => {
  const { acId } = req.params;
  const {
    yourname,
    activityname,
    location,
    description,
    date,
    time,
    type,
    status,
  } = req.body;
  const updatedFields = {
    yourname,
    activityname,
    location,
    description,
    date,
    time,
    type,
    status,
  };

  try {
    const updatedReport = await activities.findOneAndUpdate(
      { _id: acId },
      updatedFields,
      { new: true }
    );
    if (updatedReport) {
      res.status(200).json(updatedReport);
    } else {
      res.status(404).json({ message: "Report not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
