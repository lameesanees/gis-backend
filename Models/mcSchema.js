const mongoose = require("mongoose")

// schema  creation
const mcSchema = new mongoose.Schema({

    fullname:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    lastlocation:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    mcImage:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

// create model
const missingcases = mongoose.model("missingcases",mcSchema);
module.exports =missingcases; 