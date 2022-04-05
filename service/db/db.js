const fs = require("fs");
const ParkingLots = require("../../models/parkingLots");
const RateCard = require("../../models/rateCard");
const Vehicle = require("../../models/vehicle.js");
const History = require("../../models/parkingHistory.js");


// Read JSON files
const parkingLots = JSON.parse(
  fs.readFileSync("_data/parkingLots.json", "utf-8")
);

const rateCard = JSON.parse(
  fs.readFileSync("_data/rateCard.json", "utf-8")
);

// Import into DB
const seedDB = async () => {
  try {
    await ParkingLots.deleteMany({});
    await RateCard.deleteMany({});
    // await Vehicle.deleteMany({});
    // await History.deleteMany({});
    await ParkingLots.create(parkingLots);
    await RateCard.create(rateCard);

    console.log("Data Imported...");
  } catch (err) {
    console.error(err);
  }
}

// Write to DB
async function writeVehicle(vehicleJson) {
  const vehicle = new Vehicle({
    lotNumber: vehicleJson.lotNumber,
    registrationNumber: vehicleJson.registrationNumber,
    vehicleType: vehicleJson.vehicleType,
    plateNumber: vehicleJson.plateNumber
  });

  await vehicle.save();
}

async function writeHistory(historyJson) {
  const history = new History({
    lotNumber: historyJson.lotNumber,
    vehicleType: historyJson.vehicleType,
    registrationNumber: historyJson.registrationNumber,
    entryTime: historyJson.entryTime,
    duration: historyJson.duration,
    amountPaid: historyJson.amountPaid,
    plateNumber: historyJson.plateNumber
  });

  await history.save();
}

module.exports = {
  seedDB,
  writeVehicle,
  writeHistory,
};
