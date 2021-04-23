const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(

{
   
    rating: {
        type: Number,
        required: true,
      }

})


module.exports = mongoose.model("Rating", ratingSchema);