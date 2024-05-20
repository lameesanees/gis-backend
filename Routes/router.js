// Import express
const express = require("express");
const userController = require("../Controllers/userController");
const uaController = require("../Controllers/uaController");
const mcController = require("../Controllers/mcController");
const oiControllers = require("../Controllers/oiControllers");
const tpController = require("../Controllers/tpController");
const maController = require("../Controllers/maController");
const trafController = require("../Controllers/trafController")
const jwtMiddleware = require("../Middlewares/jwtMiddleware");
const multerConfig = require("../Middlewares/multerMiddleware");

// Create router object of express to define path
const router = express.Router();

// User Routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/users", userController.getUsers);
router.delete('/delete-user/:userId', jwtMiddleware, userController.deleteUser);

// Unknown Accident Report Routes
router.post(
  "/report/unknown-accident",
  jwtMiddleware,
  multerConfig.single("uaImage"),
  uaController.addUa
);
router.get("/report/get-a-report", jwtMiddleware, uaController.getAReport);
router.delete('/delete-unknown-accident/:uId', jwtMiddleware, uaController.deleteUa);
router.put(
  "/report/update-unknown-accident/:uId",
  jwtMiddleware,
  multerConfig.single("uaImage"),
  uaController.updateUa
);

// traffic fine
router.post(
  "/add-traffic-fine",
  jwtMiddleware,
  multerConfig.single("tImage"),
  trafController.addTraffic
);
router.get("/get-a-traffic", jwtMiddleware, trafController.getTrafficReport);
router.delete('/delete-traffic/:uId', jwtMiddleware, trafController.deleteTraffic);

// Missing Cases Report Routes
router.post(
  "/missingcases/missing-case",
  jwtMiddleware,
  multerConfig.single("mcImage"),
  mcController.addMc
);
router.get("/missingcases/get-missing-case", jwtMiddleware, mcController.getAMissingReport);
router.delete('/delete-missing/:uId', jwtMiddleware, mcController.deleteMc);
router.put(
  "/report/update-missing/:mcId",
  jwtMiddleware,
  multerConfig.single("mcImage"),
  mcController.updateMc
);

// Other Info Report Routes
router.post(
  "/otherinfo/other-information",
  jwtMiddleware,
  multerConfig.single("oiImage"),
  oiControllers.addOi
);
router.get("/otherinfo/get-other-info", jwtMiddleware, oiControllers.getAOtherInfo);
router.delete('/delete-other/:uId', jwtMiddleware, oiControllers.deleteOi);
router.put(
  "/report/update-other/:oId",
  jwtMiddleware,
  multerConfig.single("oiImage"),
  oiControllers.updateOi
);

// Tourist Reports Routes
router.post(
  "/touristpolice/tourist-report",
  jwtMiddleware,
  multerConfig.single("tpImage"),
  tpController.addTp
);
router.get("/touristpolice/get-tourist-report", jwtMiddleware, tpController.getATpReport);
router.delete('/delete-tourist/:uId', jwtMiddleware, tpController.deleteTp);
router.put(
  "/report/update-tourist/:tpId",
  jwtMiddleware,
  multerConfig.single("tpImage"),
  tpController.updatetp
);

// Accident Reports Routes
router.post(
  "/accidentreport/accident-report",
  jwtMiddleware,
  multerConfig.single("maImage"),
  maController.addMa
);
router.get("/accidentreport/get-accident-report", jwtMiddleware, maController.getAMaReport);
router.delete('/delete-accident/:uId', jwtMiddleware, maController.deleteMa);
router.put(
  "/report/update-acc/:mId",
  jwtMiddleware,
  multerConfig.single("maImage"),
  maController.updatema
);


module.exports = router;
