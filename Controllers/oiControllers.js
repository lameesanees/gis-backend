const otherinfo = require("../Models/oiSchema");
const nodemailer = require("nodemailer");
const users = require("../Models/userSchema");

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
    subject: `${reportDetails.infotype} Created Successfully` ,
    html: `<p>Dear User</p>
    <p>We are pleased to inform you that a missing cases report has been successfully created.</p>
    Your Tracking Id is : <strong>${reportDetails.userId} </strong>
           <ul>
             <li>InfoType: ${reportDetails.infotype}</li>
             <li>Location: ${reportDetails.location}</li>
             <li>date: ${reportDetails.date}</li>
             <li>Description: ${reportDetails.description}</li>
          <li>Contact: ${reportDetails.contact}</li>
           </ul>
           <p>The complete report is attached for your reference.

           Should you require any further assistance or have any queries, please feel free to contact us. We are here to help.
           
           Thank you for choosing our services. We look forward to serving you again in the future.
           </p> </br>
           <p>Best regards,</p> </br>
           <p>GuardIndiaSeva.com</p>`,
  };

  transporter
    .sendMail(mailOptions)
    .then(() => {
      console.log("Email sent with missing cases report details");
    })
    .catch((err) => {
      console.log("Error sending email:", err);
    });
};
// add missing info logic

exports.addOi = async (req, res) => {
  console.log("Inside the add other information method");
  const { infotype, location, date, description, contact } = req.body;
  const oiImage = req.file.filename;
  const userId = req.payload;
  console.log(infotype, location, date, description, contact, oiImage);

  console.log(userId);

  try {
    const existingOtherInfoReport = await otherinfo.findOne({ contact });
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

      const user = await users.findById(userId);
      if(user){
        sendEmailNotification(user.email, newOtherInfo)
      }
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

// get a particular other info reports
exports.getAOtherInfo = async (req, res) => {
  const searchKey = req.query.search;
  console.log(searchKey);

  const query = {
    userId: { $regex: searchKey, $options: "i" },
  };
  const userId = req.payload;
  try {
    const AOtherInfo = await otherinfo.find(query);
    if (AOtherInfo) {
      res.status(200).json(AOtherInfo);
    } else {
      res.status(401).json("Can't find other reports");
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.deleteOi = async (req, res) => {
  const { uId } = req.params;
  try {
    const deletedOiReport = await otherinfo.findOneAndDelete({ _id: uId }); // Corrected to use missingcases model
    if (deletedOiReport) {
      res.status(200).json(deletedOiReport);
    } else {
      res.status(404).json({ message: "Report not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.updateOi = async (req, res) => {
  const { oId } = req.params;
  const { infotype, location, date, description, contact, status } = req.body;
  const updatedFields = {
    infotype, location, date, description, contact, status
  };

  try {
    const updatedReport = await otherinfo.findOneAndUpdate(
      { _id: oId },
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
