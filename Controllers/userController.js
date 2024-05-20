// authController.js

// Import userSchema or model
const users = require("../Models/userSchema");
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// OTP verification logic
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the user by email
    const user = await users.findOne({ email });

    if (!user) {
      return res.status(404).json("User not found");
    }

    // Check if OTP matches
    if (user.otp !== otp) {
      return res.status(400).json("Invalid OTP");
    }

    // Clear OTP from user document
    user.otp = null;
    await user.save();

    // Optionally mark email as verified (if needed)
    // user.emailVerified = true;
    // await user.save();

    res.status(200).json("OTP verified successfully");
  } catch (err) {
    console.error("OTP verification failed:", err);
    res.status(500).json("OTP verification failed");
  }
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

    // Send OTP via Email
    sendOTP(email, otp);

    // Create a new user
    const newUser = new users({
      username,
      email,
      password,
      aadhaar,
      role,
      profile: "",
      otp: otp  // Save OTP in the user document
    });
    await newUser.save();
    
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json("Registration Failed");
  }
};

// Function to generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

// Function to send OTP via email
const sendOTP = (email, otp) => {
  const msg = {
    to: email,
    from: 'your@email.com',
    subject: 'OTP for Registration',
    text: `Your OTP for registration is: ${otp}`,
  };
  sgMail.send(msg);
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
exports.getUsers = async (req, res) => {
  const searchKey = req.query.search || ""; // Handle undefined or empty search key

  const query = {
    email: { $regex: searchKey, $options: "i" }
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

exports.deleteUser = async(req,res)=>{
  const{userId}=req.params;
  try{
    const deleteUser=await users.findOneAndDelete({_id:userId});
    res.status(200).json(deleteUser);
  }catch (err) {
    res.status(401).json({ message: err.message });
  }
};

