// loads .env file contents into process.env by default
require('dotenv').config()

// import express
const express = require ('express')

// import cors
const cors = require('cors')

// import DB
const db=require("./DB/connection")

// import router
const router = require('./Routes/router')

// create app using express
const gsServer = express()

// use
gsServer.use(cors())
gsServer.use(express.json())
gsServer.use(router)

// port creation
const PORT = 5000 || process.env.PORT

gsServer.listen(PORT,()=>{
    console.log('gsServer listening on port '+PORT);
})

gsServer.get('/',(req,res)=>{
    res.send("Welcome to Guard India Seva")
})