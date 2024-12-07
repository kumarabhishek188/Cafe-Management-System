//this file is to check whether data is correctly getting loaded into database or not
//here we are not making using of app we are just trying to send data into items collection in database as a connection test
//this is not part of original application created just to test database connectivity
//to test use command    node seeder.js    in console

// Import necessary modules
const mongoose = require("mongoose"); // Mongoose for MongoDB object modeling
const dotenv = require("dotenv"); // Dotenv for loading environment variables from a .env file
const connectDb = require("./config/config"); // Custom module to connect to MongoDB
const itemModel = require("./models/itemModel"); // Mongoose model for item documents
const items = require("./utils/data"); // Data to be imported into the database
require("colors"); // Colors library for adding color to console output

// Load environment variables from .env file into process.env
dotenv.config();

// Connect to the MongoDB database using the configuration in connectDb
connectDb();

// Define an asynchronous function to seed the database with initial data
const importData = async () => {
  try {
    // Remove all existing items from the 'items' collection
    await itemModel.deleteMany();

    // Insert new items into the 'items' collection
    const itemsData = await itemModel.insertMany(items);

    // Log success message in green color if items are added successfully
    console.log("All Items Added".bgGreen);

    // Exit the process successfully
    process.exit();
  } 
  catch (error) {
    // Log error message in red color if an error occurs during the process
    console.log(`${error}`.bgRed.inverse);

    // Exit the process with an error status code
    process.exit(1);
  }
};

// Call the importData function to execute the data seeding
importData();

