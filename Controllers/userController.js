// import userSchema or model
const users = require("../Models/userSchema");

// jwt
const jwt =require('jsonwebtoken')

// register logic
exports.register = async (req, res) => {
  // accept data from client
  const { username, email, password, aadhaar,role } = req.body;
  console.log(username, email, password, aadhaar,role);

  try {
    // check if the email is already registered
    const existingUser = await users.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      res.status(406).json("User Already Exists");
    } else {
      const newUser = new users({
        username,
        email,
        password,
        aadhaar,
        profile:"",
        role
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(500).json("Registeration Failed!");
  }
};

// login logic
exports.login = async(req,res)=>{
  // accept data from client
  const {email,password}= req.body
  try{
    // check if email and password in db
    const existingUser=await users.findOne({email,password})
    if(existingUser){
      const token = jwt.sign({userId:existingUser._id},"superkey")
      console.log(token);
      res.status(200).json({existingUser,token})
    }
    else{
      res.status(404).json("Invalid email or password")
    }
  }
  catch(err){
    res.status(500).json("Registeration failed"+err)
  }
}
