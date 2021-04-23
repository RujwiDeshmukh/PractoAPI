const router = require("express").Router();
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");
const { validateUserInputLogin } = require("../utils/validateInput");
const { getUserById, getAdvisorById } = require("../utils/idExtractor");


const Rating = require("../models/Rating");
const Doctor = require("../models/Doctor");
const Hospital = require("../models/Hospital");


router.post("/doctor", async (req, res) => {
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
      let newrating = new Rating(data);
      newrating = await newrating.save();
      
  
      return res.status(200).json({  rating_id: newrating.id });
    } catch (error) {
      console.log(error);
    }
    return res.sendStatus(500);
  });



  router.post("/hospital", async (req, res) => {
    const data = req.body;
    if (!validateUserInputLogin(data)) {
      return res.sendStatus(400);
    }
    try {
        const lab = await Hospital.findOne({ email: data.email });

      if (!lab) {
        return res.sendStatus(401);
      }
      if (!lab.authenticate(data.password)) {
        return res.sendStatus(401);
      }
      let newrating = new Rating(data);
      newrating = await newrating.save();
      
  
      return res.status(200).json({  rating_id: newrating.id });
    } catch (error) {
      console.log(error);
    }
    return res.sendStatus(500);
  });