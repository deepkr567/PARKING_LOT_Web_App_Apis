const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  lotNumber: {
    type: String,
    required: false,
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
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
});

module.exports = History = mongoose.model("history", HistorySchema);
