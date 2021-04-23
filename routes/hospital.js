const router = require("express").Router();
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");
const { validateUserInputLogin } = require("../utils/validateInput");
const { getUserById, getAdvisorById } = require("../utils/idExtractor");


const Hospital = require("../models/Hospital");


router.param("userId", getUserById);


router.post("/login", async (req, res) => {
  const data = req.body;
  if (!validateUserInputLogin(data)) {
    return res.sendStatus(400);
  }
  try {
    const hospital = await Hospital.findOne({ email: data.email });
    if (!hospital) {
      return res.sendStatus(401);
    }
    if (!hospital.authenticate(data.password)) {
      return res.sendStatus(401);
    }
  
    return res.status(200).json({  hospital_id: hospital.id });
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
    let newhospital = new Hospital(data);
    newhospital = await newhospital.save();
    
    return res.status(200).json({  hospital_id: newhospital.id });
  } catch (error) {
    console.log(error);
  }
  return res.sendStatus(500);
});


module.exports = router;
