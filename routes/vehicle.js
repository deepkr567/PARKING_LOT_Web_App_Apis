const express = require('express');
const bodyParser =require('body-parser');
var shortid = require('shortid');
const router = express.Router();

const ParkingLots = require("../models/parkingLots");
const Vehicle = require("../models/vehicle");
const RateCard = require("../models/rateCard");

const dbService = require("../service/db/db");

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.get("/", function(req, res) {
  res.sendFile(__dirname + "/templates/html/index.html");
});

router.post("/", function(req,res) {
  var action = req.body.action;
  if(action=='park')
    res.redirect("/park");
  if(action=='exit')
    res.redirect("/leave");
  if(action=='history')
    res.redirect('/getparkinghistory')
});

router.get("/park", function(req,res){
  res.sendFile(__dirname + "/templates/html/park.html");
});

router.post("/park", async function(req, res) {
  const vehicleType = req.body.vehicleType;
  const plateNumber = req.body.plateNumber;

  const parkingLots = await ParkingLots.find();

  var flag = 0;

  for (var i = 0; i < parkingLots.length; i++) {
    for(key in parkingLots[i].capacity){
      if(key==vehicleType){
        if(parkingLots[i].capacity[key]!=0){
          var lotNumber = parkingLots[i].lotNumber;
          var cap = parkingLots[i].capacity;
          cap[key] = parkingLots[i].capacity[key] - 1;
          await ParkingLots.updateOne({'lotNumber': lotNumber}, {'capacity': cap});
          flag = 1;
          break;
        }
      }
    }
    if(flag==1){
      break;
    }
  }

  if(flag==0){
    res.json({message:"All parking lots are full!!!!"})
  }

  var registrationNumber = shortid.generate();

  var vehicle = {
      lotNumber: lotNumber,
      vehicleType: vehicleType,
      registrationNumber: registrationNumber,
      plateNumber: plateNumber
    };
  dbService.writeVehicle(vehicle);

  res.send("Vehicle " + plateNumber + "(" + vehicleType + ")" + " is parked in parkingLot " + lotNumber + " with regitrstion id " + registrationNumber + " .")
});

router.get("/leave", function(req,res){
  res.sendFile(__dirname + "/templates/html/exit.html");
});

router.post("/leave", async function(req,res){
  var registrationNo = req.body.registrationNo;

  const vehicle = await Vehicle.find({registrationNumber: registrationNo});
  const parkingLot = await ParkingLots.find({lotNumber: vehicle[0].lotNumber});
  const rates = await RateCard.find();

  var duration = Math.round((Date.now() - vehicle[0].entryTime) / 3600 / 1000);
  var rate = rates[0][vehicle[0].vehicleType];
  if(duration <= 2){
    var fare = rate.first;
  } else if (duration > 2 && duration <= 4) {
    var fare = rate.second;
  } else {
    var fare = rate.third;
  }

  var history = {
      lotNumber: vehicle[0].lotNumber,
      vehicleType: vehicle[0].vehicleType,
      registrationNumber: vehicle[0].registrationNumber,
      plateNumber: vehicle[0].plateNumber,
      entryTime:vehicle[0].entryTime,
      duration:duration,
      amountPaid:fare
    };
  dbService.writeHistory(history);

  await Vehicle.deleteOne({'registrationNumber': registrationNo});

  var cap = parkingLot[0].capacity;
  cap[vehicle[0].vehicleType] = parkingLot[0].capacity[vehicle[0].vehicleType] + 1;
  await ParkingLots.updateOne({'lotNumber': vehicle[0].lotNumber}, {'capacity': cap});

  res.send("Vehicle(" + vehicle[0].plateNumber + ") with registrationNumber " + vehicle[0].registrationNumber + " exited from the parking lot number " + vehicle[0].lotNumber + ". Total amount due for parking is: " + fare + ".");


});

router.get("/getparkinghistory", function (req,res) {
  res.sendFile(__dirname + "/templates/html/history.html");
});

router.post("/getparkinghistory", async function(req,res){
  const plateNumber = req.body.plateNumber;
  const history = await History.find({'plateNumber': plateNumber});
  res.json(history);
});

module.exports = router;
