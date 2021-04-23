  const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    licenseNo: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    contactNo:{
        type: String,
        required: true
    },
    qualification:{
        type: String,
        required: true
    },
    sex:{
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true
    },
    specialisation:{
       type: String,
       tequired: true
    },
    enc_password: {
      type: String,
      required: true,
    },
    
    salt: String,
},

{ timestamps: true }
);


doctorSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.enc_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

//  schema methods
doctorSchema.methods = {
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.enc_password;
  },
  securePassword: function (plainPassword) {
    if (!plainPassword) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};





module.exports = doctor = mongoose.model("Doctor",doctorSchema);
