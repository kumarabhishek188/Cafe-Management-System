// Import Mongoose for MongoDB operations
const mongoose = require("mongoose");

// Import the 'colors' module to style console output
require("colors");

// Mongoose is a JavaScript library for performing CRUD operations in MongoDB

// Define the connectDb function to handle database connection
const connectDb = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Log a success message if the connection is successful
    // conn.connection.host provides the hostname of the connected MongoDB instance
    console.log(`MongoDB Connected ${conn.connection.host}`.bgYellow);
  } 
  catch (error) {
    // Log an error message if the connection fails
    // error.message provides details about the connection error
    console.log(`Error: ${error.message}`.bgRed);

    // Exit the process with a failure code (1) if the connection fails
    process.exit(1);
  }
};

// Export the connectDb function so it can be used in other parts of the application
module.exports = connectDb;
