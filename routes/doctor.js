const router = require("express").Router();
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");
const { validateUserInputLogin } = require("../utils/validateInput");
const { getUserById, getAdvisorById } = require("../utils/idExtractor");


const Doctor = require("../models/Doctor");


router.param("userId", getUserById);


router.post("/login", async (req, res) => {
  const data = req.body;
  if (!validateUserInputLogin(data)) {
    return res.sendStatus(400);
  }
  try {
    const doctor = await Doctor.findOne({ email: data.email });
    if (!doctor) {
      return res.sendStatus(401);
    }
    if (!doctor.authenticate(data.password)) {
      return res.sendStatus(401);
    }
  
    return res.status(200).json({  doctor_id: doctor.id });
  } catch (error) {
    console.log(error);
  }
  return res.sendStatus(500);
});



router.post("/register", async (req, res) => {
  const data = req.body;
  try {
    if (!data.name || !data.email || !data.password) {
      return res.sendStatus(400);

    }
    let newdoctor = new Doctor(data);
    newdoctor = await newdoctor.save();
    

    return res.status(200).json({  doctor_id: newdoctor.id });
  } catch (error) {
    console.log(error);
  }
  return res.sendStatus(500);
});


module.exports = router;
