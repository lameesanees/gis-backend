// authController.js

// Import userSchema or model
const users = require("../Models/userSchema");
const jwt = require('jsonwebtoken');

// Register logic
exports.register = async (req, res) => {
  // Accept data from client
  const { username, email, password, aadhaar, role } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(406).json("User Already Exists");
    } else {
      // Create a new user
      const newUser = new users({
        username,
        email,
        password,
        aadhaar,
         role,
        profile: "",
       
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
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