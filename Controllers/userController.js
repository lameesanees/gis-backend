const users = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Function to generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit OTP
};

// Function to send email with OTP
const sendEmailWithOTP = (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "lamees.anees@gmail.com",
      pass: "lkxh zkrv slgj sfhz", // Ensure the correct password or app-specific password is used
    },
  });

  transporter
    .sendMail({
      to: email,
      subject: "Your One-Time Password (OTP)",
      html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
    })
    .then(() => {
      console.log("Email sent with OTP");
    })
    .catch((err) => {
      console.log("Error sending email:", err);
    });
};

exports.register = async (req, res) => {
  const { username, email, password, aadhaar, role } = req.body;

  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(406).json("User Already Exists");
    }

    const otp = generateOTP();
    sendEmailWithOTP(email, otp);

    const newUser = new users({
      username,
      email,
      password,
      aadhaar,
      role,
      otp,
      isOTPVerified: false, // Initial OTP verification status
      profile: "",
    });
    await newUser.save();

    res.status(200).json({ message: "User registered, please verify OTP" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json("Registration Failed");
  }
};

// Login logic
exports.login = async (req, res) => {
  // Accept data from client
  const { email, password } = req.body;
  try {
    // Check if email and password match in the database
    const existingUser = await users.findOne({ email, password });
    if (existingUser) {
      // If user exists, generate a JWT token
      const token = jwt.sign({ userId: existingUser._id }, "superkey");
      res.status(200).json({ existingUser, token });
    } else {
      res.status(404).json("Invalid email or password");
    }
  } catch (err) {
    res.status(500).json("Login failed" + err);
  }
};


exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isOTPVerified) {
      return res.status(400).json({ message: "OTP already verified" });
    }

    if (user.otp === otp) {
      await users.findOneAndUpdate({ email }, { isOTPVerified: true, otp: null }); // Clear OTP after verification
      res.status(200).json({ message: "OTP verification successful" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



exports.getUsers = async (req, res) => {
  const searchKey = req.query.search || ""; // Handle undefined or empty search key

  const query = {
    email: { $regex: searchKey, $options: "i" },
  };

  try {
    const Auser = await users.find(query);
    if (Auser) {
      res.status(200).json(Auser);
    } else {
      res.status(404).json("No users found");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const deleteUser = await users.findOneAndDelete({ _id: userId });
    res.status(200).json(deleteUser);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
