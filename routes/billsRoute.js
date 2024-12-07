// Import the Express library for creating the router
const express = require("express");

// Import controller functions from the billsController module
const {
  addBillsController,
  getBillsController
} = require("./../controllers/billsController");//these controller functions contain logic for routing

// Create an Express router instance
const router = express.Router();

// Define routes and associate them with controller functions
//basically defining end points

// POST route to add new bills
router.post("/add-bills", addBillsController);

// GET route to retrieve bills
router.get("/get-bills", getBillsController);

// Export the router so it can be used in other parts of the application
module.exports = router;
