// import mongoose
const mongoose = require("mongoose");

// define connection string
const connectionString = process.env.DATABASE;

// connection code
mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB atlas connection established");
})
.catch((error)=>{
    console.log("MongoDB atlas connection error",error);
})
