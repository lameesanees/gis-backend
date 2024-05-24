const missingcases = require("../Models/mcSchema");
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
    subject: "Missing Cases Report Created Successfully",
    html: `<p>Dear User</p>
    <p>We are pleased to inform you that a missing cases report has been successfully created.</p>
    Your Tracking Id is : <strong>${reportDetails.userId} </strong>
           <ul>
             <li>Full Name: ${reportDetails.fullname}</li>
             <li>Age: ${reportDetails.age}</li>
             <li>Gender: ${reportDetails.gender}</li>
             <li>Last Location: ${reportDetails.lastlocation}</li>
             <li>Date: ${reportDetails.date}</li>
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
      res.status(404).json("Report already exists");
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

      // Fetch the user's email from the users collection
      const user = await users.findById(userId);
      if (user) {
        sendEmailNotification(user.email, newMissingReport); // Pass user's email to sendEmailNotification
      }
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
    userId: { $regex: searchKey, $options: "i" },
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
