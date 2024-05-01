// import express
const express = require("express");

const userController = require("../Controllers/userController");
const uaController = require("../Controllers/uaController");
const mcController = require("../Controllers/mcController");
const oiControllers = require("../Controllers/oiControllers");
const tpController = require("../Controllers/tpController");
const maController = require("../Controllers/maController");
const csController=require("../Controllers/csController")
const jwtMiddleware = require("../Middlewares/jwtMiddleware");
const multerConfig = require("../Middlewares/multerMiddleware");

// create router object of express to define path
const router = express.Router();

// register api call
router.post("/register", userController.register);

// login api call
router.post("/login", userController.login);

// UNKNOWN ACCIDENT REPORT
// uknown accident report api call
router.post(
  "/report/unknown-accident",
  jwtMiddleware,
  multerConfig.single("uaImage"),
  uaController.addUa
);
//  get a report (unknown accident)
router.get("/report/get-a-report", jwtMiddleware, uaController.getAReport);

// MISSSING CASES REPORT
// missing report API call
router.post(
  "/missingcases/missing-case",
  jwtMiddleware,
  multerConfig.single("mcImage"),
  mcController.addMc
);
// get a missing case report
router.get(
  "/missingcases/get-missing-case",
  jwtMiddleware,
  mcController.getAMissingReport
);

// OTHER INFO REPORT
// api calls
router.post(
  "/otherinfo/other-information",
  jwtMiddleware,
  multerConfig.single("oiImage"),
  oiControllers.addOi
);
// get a other info report
router.get(
  "/otherinfo/get-other-info",
  jwtMiddleware,
  oiControllers.getAOtherInfo
);

// TOURIST REPORTS
// api calls
router.post(
  "/touristpolice/tourist-report",
  jwtMiddleware,
  multerConfig.single("tpImage"),
  tpController.addTp
);
// get a other info report
router.get(
  "/touristpolice/get-tourist-report",
  jwtMiddleware,
  tpController.getATpReport
);

// ACCIDENT REPORTS
// api calls
router.post(
  "/accidentreport/accident-report",
  jwtMiddleware,
  multerConfig.single("maImage"),
  maController.addMa
);
// get a report
router.get(
  "/accidentreport/get-accident-report",
  jwtMiddleware,
  maController.getAMaReport
);

// SOCIAL CHAIRTY
router.get("/charityreport/get-charity-report",
jwtMiddleware,
csController.getACharity)

// add
router.post('/charityreport/charity-report',jwtMiddleware,csController.addCharity)
module.exports = router;
