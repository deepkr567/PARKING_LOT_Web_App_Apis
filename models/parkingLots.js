const mongoose = require("mongoose");

const ParkingLotsSchema = new mongoose.Schema({
  lotNumber: {
    type: String,
    required: true,
  },
  capacity: {
    twoWheeler: {
      type: Number,
      required: true,
    },
    hatchBack: {
      type: Number,
      required: true,
    },
    suv: {
      type: Number,
      required: true,
    },
  },
});

module.exports = ParkingLots = mongoose.model("parkingLots", ParkingLotsSchema);
