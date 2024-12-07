// Import the Express library for creating the router
const express = require("express");

// Import controller functions from the itemController module
const {
  getItemController,
  addItemController,
  editItemController,
  deleteItemController,
} = require("./../controllers/itemController");//these controller functions contain logic for routing

// Create an Express router instance
const router = express.Router();

// Define routes and associate them with controller functions
//basically defining end points

// GET route to retrieve items
router.get("/get-item", getItemController);

// POST route to add a new item
router.post("/add-item", addItemController);

// PUT route to edit an existing item
router.put("/edit-item", editItemController);

// POST route to delete an item
router.post("/delete-item", deleteItemController);

// Export the router so it can be used in other parts of the application
module.exports = router;
