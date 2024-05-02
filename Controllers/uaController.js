const reports = require("../Models/uaSchema");

// add uaReport logic
exports.addUa = async (req, res) => {
  console.log("Inside the add project method");
  const { fullname, aadhaar, state, location, date, description, contact } =
    req.body;
  const uaImage = req.file.filename;
  const userId = req.payload;
  console.log(
    fullname,
    aadhaar,
    state,
    location,
    date,
    description,
    contact,
    uaImage
  );
  console.log(userId);

  try {
    const existingReport = await reports.findOne({ date });
    if (existingReport) {
      res.status(404).json("already exists");
    } else {
      const newReport = new reports({
        fullname,
        aadhaar,
        state,
        location,
        date,
        description,
        contact,
        uaImage,
        userId,
      });
      await newReport.save();
      res.status(200).json(newReport);
      newReport;
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

// get a particular report
exports.getAReport = async (req, res) => {
  const searchKey = req.query.search;
  console.log(searchKey);

  // case sensitive
  const query = {
    aadhaar: { $regex: searchKey, $options: "i" },
  };
  // get userId
  const userId = req.payload
  try {
    const AReport = await reports.find( query );
    if (AReport) {
      res.status(200).json(AReport);
    } else {
      res.status(401).json("Can't find reports");
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
