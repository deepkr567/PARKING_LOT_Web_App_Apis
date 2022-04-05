# PARKING_LOT_Web_App_Apis
Web based parking lot system

#How to use this repository

Install all dependencies
"npm install"

Run the main program
"node index.js"

Problem Statement:
-----------------------
We want to build a parking lot management application. Multiple parking lots want to use this
application.
1. Platform should be able to support multiple parking lots
2. There are different types of vehicles: Two-Wheeler, Hatchback Car, SUV Car
3. Each parking lot has a separate capacity for each kind of vehicle.
4. There are different hourly rate cards for each kind of vehicle
Ex: (0-2hrs 20Rs, 2-4hrs 40Rs)

Assumptions :
You can seed data for these
1. Parking Lots
2. Capacity of parking lot for each kind of vehicle
3. Rate card for each vehicle kind

Demonstrate:
1. Park a Vehicle at a given parking lot (should fail if the lot is full)
2. Exit from the parking area and tell the amount due for the duration.
3. Given a vehicle no., see complete parking history (Lot, Area, Duration, Amount Paid

Application description:
-----------------------
The app generates and seeds data for various parking lots and rate cards for different vehicle types. In order to park vehicle it's type and plate number is required.

1. Park a Vehicle
 - API - http://localhost:3000/park
 Body - vehicleType (suv, twoWheeler, hatchBack), plateNumber (e.g. WL 678 Y 6)
 
2. Exit from the parking area and tell the amount due
 - API - http://localhost:3000/leave
 Body - registrationNo (Generated while parking the car.)
 
3. See complete parking history of a vehicle
- API - http://localhost:3000/getparkinghistory
 Body - plateNumber (e.g. DL 678 K 8)
