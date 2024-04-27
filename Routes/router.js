// import express
const express = require('express')

const userController = require('../Controllers/userController')
// create router object of express to define path
const router = express.Router()

// register api call
router.post('/register',userController.register)

// login api call
router.post('/login',userController.login)

module.exports = router