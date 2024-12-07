// Import Mongoose for MongoDB object modeling and schema definition
const mongoose = require("mongoose");

// Define a schema for the 'users' collection in MongoDB
const userSchema = mongoose.Schema(
  {
    // Field for the user's name
    name: {
      type: String, // The data type is String
      required: true, // This field is mandatory
    },
    // Field for the user's unique identifier
    userId: {
      type: String, // The data type is String
      required: true, // This field is mandatory
    },
    // Field for the user's password
    password: {
      type: String, // The data type is String
      required: true, // This field is mandatory
    },
    // Field to indicate if the user's email has been verified
    verified: {
      type: Boolean, // The data type is Boolean
      default: false, // Default value is false (unverified)
    },
  },
  { timestamps: true } // Automatically add 'createdAt' and 'updatedAt' fields
);

// Create a Mongoose model named 'users' based on the userSchema
const Users = mongoose.model("users", userSchema);//users named collection got added into database

// Export the Users model so it can be used in other files
module.exports = Users;
