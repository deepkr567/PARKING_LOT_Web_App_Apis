const express = require('express');
const vehicleRoutes = require('./routes/vehicle.js');

const connectDB = require('./config/db');
const dbService = require("./service/db/db");

const db=connectDB();
const app = express();

app.use("/", vehicleRoutes);

app.listen(3000, function() {
  console.log("Server started at port 3000:");
});

dbService.seedDB();
