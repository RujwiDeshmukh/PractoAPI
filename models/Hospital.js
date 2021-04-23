const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
     address:{
        type: String,
        required: true
    },
    contactNo:{
        type: String,
        required: true
    },
    doctorName :
    {
      type: String,
      required: true
    },
    doctorQualification : {
     type : String,
     required : true
    },
    NoofEmployees : {
      type : Number,
    },
    email: {
      type: String,
      required: true,

      trim: true,
      unique: true,
    },
     enc_password: {
      type: String,
      required: true,
    },
    
    salt: String,
  },
  { timestamps: true }
);

//  Virutuals for schema  to encrypt the password
hospitalSchema
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
hospitalSchema.methods = {
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

module.exports = mongoose.model("Hospital", hospitalSchema);
