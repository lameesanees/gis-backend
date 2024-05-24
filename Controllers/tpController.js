const touristreports = require("../Models/tpSchema");
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
    subject: "Report Created Successfully",
    html: `<p>Dear User</p>
    <p>We are pleased to inform you that your requested report has been successfully generated.</p>
    Your Tracking Id is : <strong>${reportDetails.userId} </strong>
           <ul>
             <li>Full Name: ${reportDetails.fullname}</li>
             <li>Location: ${reportDetails.location}</li>
             <li>Description: ${reportDetails.description}</li>
             <li>Contact: ${reportDetails.contact}</li>
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
exports.addTp = async (req, res) => {
  console.log("Inside the add tourist report method");
  const { fullname, location, contact, description } = req.body;
  const tpImage = req.file.filename;
  const userId = req.payload;
  console.log(fullname, location, contact, description, tpImage);
  console.log(userId);

  try {
    const existingTouristReport = await touristreports.findOne({ contact });
    if (existingTouristReport) {
      res.status(404).json("Already exists");
    } else {
      const newTpReports = new touristreports({
        fullname,
        location,
        contact,
        description,
        tpImage,
        userId
      });
      await newTpReports.save();
      res.status(200).json(newTpReports);
      const user = await users.findById(userId);
      if (user) {
        sendEmailNotification(user.email, newTpReports); // Pass user's email to sendEmailNotification
      };
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.getATpReport = async (req, res) => {
  const searchKey = req.query.search;
  console.log(searchKey);

  const query = {
    userId: { $regex: searchKey, $options: "i" },
  };

  const userId = req.payload;
  try {
    const ATpReport = await touristreports.find(query);
    if (ATpReport) {
      res.status(200).json(ATpReport);
    } else {
      res.status(401).json("Can't find tourist reports");
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.deleteTp = async (req, res) => {
  const { uId } = req.params;
  try {
    const deletedTourist = await touristreports.findOneAndDelete({ _id: uId });
    if (deletedTourist) {
      res.status(200).json(deletedTourist);
    } else {
      res.status(404).json({ message: "Report not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Update a report
exports.updatetp = async (req, res) => {
  const { tpId } = req.params;
  const { fullname, location, contact, description, status } = req.body;
  const updatedFields = { fullname, location, contact, description, status };

  try {
    const updatedReport = await touristreports.findOneAndUpdate(
      { _id: tpId },
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
