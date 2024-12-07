// Import the userModel for interacting with the users collection in MongoDB
const userModal = require("../models/userModel");

// Controller function to handle user login
const loginController = async (req, res) => {
  try {
    // Extract userId and password from the request body
    const { userId, password } = req.body;

    // Find a user that matches the provided userId and password, and is verified
    const user = await userModal.findOne({ userId, password, verified: true });

    // Check if a user was found
    if (user) {
      // If a user is found, send the user data with status code 200 (OK)
      res.status(200).send(user);
    } 
    else {
      // If no user is found, send a failure message
      res.status(401).json({
        message: "Login Failed",
        user: null,
      });
    }
  } 
  catch (error) {
    // Log any errors and send an error response with status code 500 (Internal Server Error)
    console.log(error);
    res.status(500).send("Error logging in");
  }
};

// Controller function to handle user registration
const registerController = async (req, res) => {
  try {
    // Create a new user instance with data from the request body and set verified to true
    const newUser = new userModal({ ...req.body, verified: true });
    
    // Save the new user to the database
    await newUser.save();
    
    // Send a success response with status code 201 (Created)
    res.status(201).send("Registered Successfully!");
  } 
  catch (error) {
    // Log any errors and send an error response with status code 400 (Bad Request)
    console.log(error);
    res.status(400).send("Error registering user");
  }
};

// Export the controller functions to be used in route definitions
module.exports = { loginController, registerController };
