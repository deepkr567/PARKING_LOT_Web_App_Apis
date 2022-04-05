const mongoose = require("mongoose");

const RateCardSchema = new mongoose.Schema({
  twoWheeler: {
    first: {
      type: Number,
      required: true,
    },
    second: {
      type: Number,
      required: true,
    },
    third: {
      type: Number,
      required: true,
    },
  },
  hatchBack: {
    first: {
      type: Number,
      required: true,
    },
    second: {
      type: Number,
      required: true,
    },
    third: {
      type: Number,
      required: true,
    },
  },
  suv: {
    first: {
      type: Number,
      required: true,
    },
    second: {
      type: Number,
      required: true,
    },
    third: {
      type: Number,
      required: true,
    },
  },
});

// first lies between 0-2hrs
// second lies between 2-4hrs
// third is more than 4hrs

module.exports = RateCard = mongoose.model("rateCard", RateCardSchema);
