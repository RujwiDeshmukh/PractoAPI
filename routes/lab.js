const router = require("express").Router();
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");
const { validateUserInputLogin } = require("../utils/validateInput");
const { getUserById, getAdvisorById } = require("../utils/idExtractor");


const Lab = require("../models/Lab");


router.param("userId", getUserById);


router.post("/login", async (req, res) => {
  const data = req.body;
  if (!validateUserInputLogin(data)) {
    return res.sendStatus(400);
  }
  try {
    const lab = await Lab.findOne({ email: data.email });
    if (!lab) {
      return res.sendStatus(401);
    }
    if (!lab.authenticate(data.password)) {
      return res.sendStatus(401);
    }
  
    return res.status(200).json({  lab_id: lab.id });
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
    let newlab = new Lab(data);
    newlab = await newlab.save();

    return res.status(200).json({  lab_id: newlab.id });
  } catch (error) {
    console.log(error);
  }
  return res.sendStatus(500);
});


module.exports = router;
