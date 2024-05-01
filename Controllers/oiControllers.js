const otherinfo = require("../Models/oiSchema");

// add missing info logic

exports.addOi = async (req, res) => {
  console.log("Inside the add other information method");
  const { infotype, location, date, description, contact } = req.body;
  const oiImage = req.file.filename;
  const userId = req.payload;
  console.log(infotype, location, date, description, contact, oiImage);

  console.log(userId);

  try {
    const existingOtherInfoReport = await otherinfo.findOne({ date });
    if (existingOtherInfoReport) {
      res.status(404).json("Already exists");
    } else {
      const newOtherInfo = new otherinfo({
        infotype,
        location,
        date,
        description,
        contact,
        oiImage,
        userId,
      });
      await newOtherInfo.save();
      res.status(200).json(newOtherInfo);
      newOtherInfo;
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

// get a particular other info reports
exports.getAOtherInfo = async(req,res)=>{
    const searchKey=req.query.search;
    console.log(searchKey);

    const query={
        infotype:{$regex:searchKey,$options:"i"}
    };
    const userId=req.payload
    try{
        const AOtherInfo = await otherinfo.find(query);
        if(AOtherInfo){
            res.status(200).json(AOtherInfo);
        }else{
            res.status(401).json("Can't find other reports")
        }
    }
    catch(err){
        res.status(401).json({message:err.message})
    }
}
