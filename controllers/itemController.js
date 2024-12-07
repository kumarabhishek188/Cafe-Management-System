// Import the itemModel for interacting with the items collection in MongoDB
const itemModel = require("../models/itemModel");

// Controller to handle retrieving all items
const getItemController = async (req, res) => {
  try {
    // Fetch all items from the database
    const items = await itemModel.find();
    
    // Send the fetched items as the response with status code 200 (OK)
    res.status(200).send(items);
  } catch (error) {
    // Log the error and send an error response with status code 500 (Internal Server Error)
    console.log(error);
    res.status(500).send("Error retrieving items");
  }
};

// Controller to handle adding a new item
const addItemController = async (req, res) => {
  try {
    // Create a new item instance with the data from the request body
    const newItem = new itemModel(req.body);
    
    // Save the new item to the database
    await newItem.save();
    
    // Send a success response with status code 201 (Created)
    res.status(201).send("Item Created Successfully!");
  } catch (error) {
    // Log the error and send an error response with status code 400 (Bad Request)
    console.log(error);
    res.status(400).send("Error creating item");
  }
};

// Controller to handle updating an existing item
const editItemController = async (req, res) => {
  try {
    // Extract itemId from the request body
    const { itemId } = req.body;
    console.log(itemId);
    
    // Find and update the item in the database using itemId
    await itemModel.findOneAndUpdate({ _id: itemId }, req.body, {
      new: true, // Return the updated document
    });
    
    // Send a success response with status code 200 (OK)
    res.status(200).send("Item Updated");
  } catch (error) {
    // Log the error and send an error response with status code 400 (Bad Request)
    console.log(error);
    res.status(400).send("Error updating item");
  }
};

// Controller to handle deleting an item
const deleteItemController = async (req, res) => {
  try {
    // Extract itemId from the request body
    const { itemId } = req.body;
    
    // Find and delete the item in the database using itemId
    await itemModel.findOneAndDelete({ _id: itemId });
    
    // Send a success response with status code 200 (OK)
    res.status(200).send("Item Deleted");
  } catch (error) {
    // Log the error and send an error response with status code 400 (Bad Request)
    console.log(error);
    res.status(400).send("Error deleting item");
  }
};

// Export the controller functions to be used in route definitions
module.exports = {
  getItemController,
  addItemController,
  editItemController,
  deleteItemController,
};

