// Import the Express library for creating the router
const express = require("express");

// Import controller functions from the userController module
const {
  loginController,
  registerController
} = require("./../controllers/userController");//these controller functions contain logic for routing

// Create an Express router instance
const router = express.Router();

// Define routes and associate them with controller functions
//basically defining end points

// POST route for user login
router.post("/login", loginController);

// POST route for user registration
router.post("/register", registerController);

// Export the router so it can be used in other parts of the application
module.exports = router;
