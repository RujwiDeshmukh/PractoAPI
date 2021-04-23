const router = require("express").Router();
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");
const { validateUserInputLogin } = require("../utils/validateInput");
const { getUserById, getAdvisorById } = require("../utils/idExtractor");

const User = require("../models/User");

router.param("userId", getUserById);


router.post("/login", async (req, res) => {
  const data = req.body;
  if (!validateUserInputLogin(data)) {
    return res.sendStatus(400);
  }
  try {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return res.sendStatus(401);
    }
    if (!user.authenticate(data.password)) {
      return res.sendStatus(401);
    }
  
    return res.status(200).json({  user_id: user.id });
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
    let newuser = new User(data);
    newuser = await newuser.save();
    

    return res.status(200).json({  user_id: newuser.id });
  } catch (error) {
    console.log(error);
  }
  return res.sendStatus(500);
});


module.exports = router;
