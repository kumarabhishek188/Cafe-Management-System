//This is where form where everything in backend is controlled

// Import required modules
const express = require("express"); // Import Express framework
const morgan = require("morgan"); // Import middleware for logging HTTP requests
const bodyParser = require("body-parser"); // Import middleware for parsing request bodies
const cors = require("cors"); // Import middleware to enable CORS (Cross-Origin Resource Sharing)
const dotanv = require("dotenv"); // Import dotenv to manage environment variables
require("colors"); // Import colors for adding color to console output
const connectDb = require("./config/config"); // Import custom function to connect to the database from config file of config folder

// Load environment variables from a .env file into process.env
dotanv.config(); //check out the .env file

// Connect to the database
connectDb();

// Create an instance of the Express application
const app = express();

// Middleware setup (middlewares installed are initialized here in our express application)
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON request bodies
app.use(bodyParser.json()); // (Optional) Parse incoming JSON request bodies, may be redundant with express.json()
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded request bodies (e.g., form submissions)
app.use(morgan("dev")); // Log HTTP requests in a concise format for development

// Define routes   //here '/api' wil be hidden when view in url
app.use("/api/items", require("./routes/itemRoutes")); // Route for handling requests to /api/items
app.use("/api/users", require("./routes/userRoutes")); // Route for handling requests to /api/users
app.use("/api/bills", require("./routes/billsRoute")); // Route for handling requests to /api/bills

// Define the port for the server to listen on
const PORT = process.env.PORT || 8080; // Use PORT from environment variables (from dataanv.config) or default to 8080

// Start the server and listen for incoming requests on the defined port
app.listen(PORT, () => {
  // Log a message to the console when the server is running
  console.log(`Server Running On Port ${PORT}`.bgBlue); // Message styled with a cyan background for visibility
});
