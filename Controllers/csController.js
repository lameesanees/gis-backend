const socialcharity = require("../Models/csSchema");

exports.addCharity = async (req, res) => {
  console.log("Inside the add charity method");

  const { fullname, email, amount, chairty, pay } = req.body;
  const userId = req.payload;
  console.log(fullname, email, amount, chairty, pay, userId);

  try {
    const existingCsReport = await socialcharity.findOne({ amount });
    if (existingCsReport) {
      res.status(404).json("already exists");
    } else {
      const newCsReport = new socialcharity({
        fullname,
        email,
        amount,
        chairty,
        pay,
        userId,
      });
      await newCsReport.save();
      res.status(200).json(newCsReport);
      newCsReport;
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

// get a charity particular report
exports.getACharity = async (req, res) => {
    const searchKey = req.query.search;
    console.log(searchKey);
  
    // case sensitive
    const query = {
      fullname: { $regex: searchKey, $options: "i" },
    };
    // get userId
    const userId = req.payload
    try {
      const ACsreport = await socialcharity.find( query );
      if (ACsreport) {
        res.status(200).json(ACsreport);
      } else {
        res.status(401).json("Can't find reports");
      }
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  };
  
