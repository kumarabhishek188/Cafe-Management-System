// Import the billsModel for interacting with the bills collection in MongoDB
const billsModel = require("../models/billsModel");

// Controller function to handle adding new bills
const addBillsController = async (req, res) => {
  try {
    // Create a new bill instance with the data from the request body
    const newBill = new billsModel(req.body);

    // Save the new bill to the database
    await newBill.save();

    // Send a success response with status code 200 (OK)
    res.status(200).send("Bill Generated Successfully!");
  } catch (error) {
    // Log the error and send an error response with status code 500 (Internal Server Error)
    res.status(500).send({ error: error.message });
    console.log(error);
  }
};

// Controller function to handle retrieving all bills
const getBillsController = async (req, res) => {
  try {
    // Fetch all bills from the database
    const bills = await billsModel.find();

    // Send the fetched bills as the response with status code 200 (OK)
    res.status(200).send(bills);
  } catch (error) {
    // Log the error and send an error response with status code 500 (Internal Server Error)
    console.log(error);
    res.status(500).send("Error retrieving bills");
  }
};

// Export the controller functions to be used in route definitions
module.exports = { addBillsController, getBillsController };
