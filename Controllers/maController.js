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
    const existingMaReport = await accidentreport.findOne({ date });
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
    yourname: { $regex: searchKey, $options: "i" },
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
