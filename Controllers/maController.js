const accidentreport = require("../Models/maSchema");

// add uaReport logic
exports.addMa= async (req, res) => {
  console.log("Inside the add accident method");
  const { 
    yourname,
    youraadhaar,
    yourcontact,
    yournoplate,
    insurance,
    accidentype,
    date,
    oppfullname,
    oppcontact,
    oppadhaar,
    oppnoplate,
   } =
    req.body;
  const maImage = req.file.filename;
  const userId = req.payload;
  console.log(
    yourname,
    youraadhaar,
    yourcontact,
    yournoplate,
    insurance,
    accidentype,
    date,
    oppfullname,
    oppcontact,
    oppadhaar,
    oppnoplate,
    maImage
  );
  console.log(userId);

  try {
    const existingMaReport = await accidentreport.findOne({ yournoplate });
    if (existingMaReport) {
      res.status(404).json("already exists");
    } else {
      const newMaReport = new accidentreport({
        yourname,
        youraadhaar,
        yourcontact,
        yournoplate,
        insurance,
        accidentype,
        date,
        oppfullname,
        oppcontact,
        oppadhaar,
        oppnoplate,
        maImage,
        userId
      });
      await newMaReport.save();
      res.status(200).json(newMaReport);
      newMaReport;
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

// get a particular report
exports.getAMaReport = async (req, res) => {
  const searchKey = req.query.search;
  console.log(searchKey);

  // case sensitive
  const query = {
    yournoplate: { $regex: searchKey, $options: "i" },
  };
  // get userId
  const userId = req.payload
  try {
    const AMareport = await accidentreport.find( query );
    if (AMareport) {
      res.status(200).json(AMareport);
    } else {
      res.status(401).json("Can't find reports");
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
exports.deleteMa = async (req, res) => {
  const { uId } = req.params;
  try {
    const deletedAccident = await accidentreport.findOneAndDelete({ _id: uId });
    if (deletedAccident) {
      res.status(200).json(deletedAccident);
    } else {
      res.status(404).json({ message: "Report not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.updatema = async (req, res) => {
  const { mId } = req.params;
  const {  yourname,
    youraadhaar,
    yourcontact,
    yournoplate,
    insurance,
    accidentype,
    date,
    oppfullname,
    oppcontact,
    oppadhaar,
    oppnoplate,status } = req.body;
  const updatedFields = {yourname,
    youraadhaar,
    yourcontact,
    yournoplate,
    insurance,
    accidentype,
    date,
    oppfullname,
    oppcontact,
    oppadhaar,
    oppnoplate,status};

  try {
    const updatedReport = await accidentreport.findOneAndUpdate({ _id: mId }, updatedFields, { new: true });
    if (updatedReport) {
      res.status(200).json(updatedReport);
    } else {
      res.status(404).json({ message: "Report not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};