// Import userSchema or model
const users = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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
      pass: "lkxh zkrv slgj sfhz",
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
      console.log(err);
    });
};

// Register logic
exports.register = async (req, res) => {
  // Accept data from client
  const { username, email, password, aadhaar, role } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(406).json("User Already Exists");
    }

    // Generate OTP
    const otp = generateOTP();

    // Send OTP via email
    sendEmailWithOTP(email, otp);

    // Create a new user
    const newUser = new users({
      username,
      email,
      password,
      aadhaar,
      role,
      otp, // Save OTP in the user document
      profile: "",
    });
    await newUser.save();

    res.status(200).json(newUser);
  } catch (err) {
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
    // Find user by email
    const user = await users.findOne({ email });

    // Check if user exists and OTP matches
    if (user && user.otp === otp) {
      // Update user's OTP verification status
      await users.findOneAndUpdate({ email }, { isOTPVerified: true });
      res.status(200).json({ message: "OTP verification successful" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
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
