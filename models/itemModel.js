// Import Mongoose for MongoDB object modeling and schema definition
const mongoose = require("mongoose");

// Define a schema for the 'items' collection in MongoDB
const itemSchema = mongoose.Schema(
  {
    // Field for the name of the item
    name: {
      type: String, // The data type is String
      required: true, // This field is mandatory
    },
    // Field for the price of the item
    price: {
      type: Number, // The data type is Number
      required: true, // This field is mandatory
    },
    // Field for the category of the item
    category: {
      type: String, // The data type is String
      required: true, // This field is mandatory
    },
    // Field for the image URL of the item
    image: {
      type: String, // The data type is String
      required: true, // This field is mandatory
    },
  },
  { timestamps: true } // Automatically add 'createdAt' and 'updatedAt' fields
);

// Create a Mongoose model named 'Items' based on the itemSchema
const Items = mongoose.model("Items", itemSchema);//Items named collection got added into database

// Export the Items model so it can be used in other files
module.exports = Items;
