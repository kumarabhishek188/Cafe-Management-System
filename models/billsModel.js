// Import Mongoose for MongoDB object modeling and schema definition
const mongoose = require("mongoose");

// Define a schema for the 'bills' collection in MongoDB
const billSchema = mongoose.Schema(
  {
    // Field for the customer's name
    customerName: {
      type: String, // The data type is String
      required: true, // This field is mandatory
    },
    // Field for the customer's phone number
    customerNumber: {
      type: Number, // The data type is Number
      required: true, // This field is mandatory
    },
    // Field for the total amount of the bill
    totalAmount: {
      type: Number, // The data type is Number
      required: true, // This field is mandatory
    },
    // Field for the subtotal amount before tax
    subTotal: {
      type: Number, // The data type is Number
      required: true, // This field is mandatory
    },
    // Field for the amount of tax applied
    tax: {
      type: Number, // The data type is Number
      required: true, // This field is mandatory
    },
    // Field for the mode of payment (e.g., cash, credit card)
    paymentMode: {
      type: String, // The data type is String
      required: true, // This field is mandatory
    },
    // Field for storing items in the cart
    cartItems: {
      type: Array, // The data type is Array
      required: true, // This field is mandatory
    },
    // Field for the date of the bill
    date: {
      type: String, // The data type is String
      default: () => new Date().toLocaleDateString("en-GB"), // Default to the current date in 'en-GB' format
    },
  },
  { timestamps: true } // Automatically add 'createdAt' and 'updatedAt' fields
);

// Create a Mongoose model named 'bills' based on the billSchema
const Bills = mongoose.model("bills", billSchema);//bills named collection got added into database

// Export the Bills model so it can be used in other files
module.exports = Bills;
