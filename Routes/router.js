// import express
const express = require('express')

const userController = require('../Controllers/userController')
const uaController = require('../Controllers/uaController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')

// create router object of express to define path
const router = express.Router()

// register api call
router.post('/register',userController.register)

// login api call
router.post('/login',userController.login)

// uknown accident report api call
router.post('/report/unknown-accident',jwtMiddleware,multerConfig.single('uaImage'),uaController.addUa)

//  get a report (unknown accident)
router.get('/report/get-a-report',jwtMiddleware,uaController.getAReport)
module.exports = router