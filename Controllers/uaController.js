const reports = require("../Models/uaSchema");
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
             <li>Aadhaar: ${reportDetails.aadhaar}</li>
             <li>State: ${reportDetails.state}</li>
             <li>Location: ${reportDetails.location}</li>
             <li>Date: ${reportDetails.date}</li>
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
      res.status(404).json("Report already exists for this date");
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

      // Fetch the user's email from the users collection
      const user = await users.findById(userId);
      if (user) {
        sendEmailNotification(user.email, newReport); // Pass user's email to sendEmailNotification
      }
    }
  } catch (err) {
    console.error("Error adding report:", err);
    res.status(500).json({ message: "Failed to add report" });
  }
};

// get a particular report
exports.getAReport = async (req, res) => {
  const searchKey = req.query.search;
  console.log(searchKey);

  // case sensitive
  const query = {
    userId: { $regex: searchKey, $options: "i" },
  };
  // get userId
  const userId = req.payload;
  try {
    const AReport = await reports.find(query);
    if (AReport) {
      res.status(200).json(AReport);
    } else {
      res.status(401).json("Can't find reports");
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
exports.deleteUa = async (req, res) => {
  const { uId } = req.params;
  try {
    const deletedReport = await reports.findOneAndDelete({ _id: uId });
    if (deletedReport) {
      res.status(200).json(deletedReport);
    } else {
      res.status(404).json({ message: "Report not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a report
exports.updateUa = async (req, res) => {
  const { uId } = req.params;
  const {
    fullname,
    aadhaar,
    state,
    location,
    date,
    description,
    contact,
    status,
  } = req.body;
  const updatedFields = {
    fullname,
    aadhaar,
    state,
    location,
    date,
    description,
    contact,
    status,
  };

  try {
    const updatedReport = await reports.findOneAndUpdate(
      { _id: uId },
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
