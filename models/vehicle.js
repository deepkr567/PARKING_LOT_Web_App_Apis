const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  lotNumber: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    unique: true,
    required: true,
  },
  plateNumber: {
    type: String,
    required: true,
  },
  entryTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Vehicle = mongoose.model("vehicle", VehicleSchema);
