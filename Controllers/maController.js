const accidentreport = require("../Models/maSchema");
const nodemailer = require("nodemailer");
const users = require("../Models/userSchema");
// add uaReport logic
const sendEmailNotification = (email, reportDetails) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "lamees.anees@gmail.com",
      pass: "lkxh zkrv slgj sfhz", // Ensure the correct password or app-specific password is used
    },
  });

  const mailOptions = {
    to: email,
    subject: `${reportDetails.accidentype} Created Successfully` ,
    html: `<p>Dear User</p>
    <p>We are pleased to inform you that your requested report has been successfully generated.</p>
    Your Tracking Id is : <strong>${reportDetails.userId} </strong>
           <ul>
             <li>Full Name: ${reportDetails.fullname}</li>
             <li>Aadhaar Number: ${reportDetails.youraadhaar}</li>
             <li>Contact: ${reportDetails.contact}</li>
             <li>Number Plate: ${reportDetails.yournoplate}</li>
             <li>Insurance: ${reportDetails.insurance}</li>
             <li>Accident Type: ${reportDetails.accidentype}</li>
             <li>Date: ${reportDetails.date}</li>
             <p>Oponent Details</p>
             <li>Name: ${reportDetails.oppfullname}</li>
             <li>Contact: ${reportDetails.oppcontact}</li>
             <li>Aadhaar: ${reportDetails.oppadhaar}</li>        
            <li>Number Plate: ${reportDetails.oppnoplate}</li>

           </ul>
           <p>The complete report is attached for your reference.

           Should you require any further assistance or have any queries, please feel free to contact us. We are here to help.
           
           Thank you for choosing our services. We look forward to serving you again in the future.
           </br>
           Best regards,</p> </br>
           <p>GuardIndiaSeva.com</p>`,
  };

  transporter
    .sendMail(mailOptions)
    .then(() => {
      console.log("Email sent with report details");
    })
    .catch((err) => {
      console.log("Error sending email:", err);
    });
};
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
      const user = await users.findById(userId);
      if (user) {
        sendEmailNotification(user.email, newMaReport); // Pass user's email to sendEmailNotification
      }
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
    userId: { $regex: searchKey, $options: "i" },
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