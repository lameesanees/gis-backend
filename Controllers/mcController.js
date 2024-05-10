const missingcases = require("../Models/mcSchema");

// addMissing logic
exports.addMc = async (req, res) => {
  console.log("Inside the add missing cases method");
  const { fullname, age, gender, lastlocation, date, description, contact } =
    req.body;
  const mcImage = req.file.filename;
  const userId = req.payload;
  console.log(
    fullname,
    age,
    gender,
    lastlocation,
    date,
    description,
    contact,
    mcImage
  );
  console.log(userId);

  try {
    const existingMissingReport = await missingcases.findOne({ fullname });
    if (existingMissingReport) {
      res.status(404).json("already exists");
    } else {
      const newMissingReport = new missingcases({
        fullname,
        age,
        gender,
        lastlocation,
        date,
        description,
        contact,
        mcImage,
        userId,
      });
      await newMissingReport.save();
      res.status(200).json(newMissingReport);
      newMissingReport;
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

// get a particular missing report

exports.getAMissingReport = async (req, res) => {
  const searchKey = req.query.search;
  console.log(searchKey);

  // case sensitive
  const query = {
    fullname: { $regex: searchKey, $options: "i" },
  };
  // get userId
  const userId = req.payload;

  try {
    const AMissingReport = await missingcases.find(query);
    if (AMissingReport) {
      res.status(200).json(AMissingReport);
    } else {
      res.status(401).json("Can't find Missing reports");
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
exports.deleteMc = async (req, res) => {
  const { uId } = req.params;
  try {
    const deletedMcReport = await missingcases.findOneAndDelete({ _id: uId }); // Corrected to use missingcases model
    if (deletedMcReport) {
      res.status(200).json(deletedMcReport);
    } else {
      res.status(404).json({ message: "Report not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Update a report
exports.updateMc = async (req, res) => {
  const { mcId } = req.params;
  const {
    fullname,
    age,
    gender,
    lastlocation,
    date,
    description,
    contact,
    status
  } = req.body;
  const updatedFields = {
    fullname,
    age,
    gender,
    lastlocation,
    date,
    description,
    contact,
    status
  };

  try {
    const updatedReport = await missingcases.findOneAndUpdate(
      { _id: mcId },
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
