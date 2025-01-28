require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add CORS to handle cross-origin requests
const studentRoutes = require('./routes/students'); // Import the student routes

// Initialize the app
const app = express();
const port = process.env.PORT || 3000; // Use the port from .env, or default to 3000

// Middleware
app.use(cors());  // Enable cross-origin requests
app.use(bodyParser.json());  // Parse incoming JSON requests

// Connect to MongoDB using the URI from the .env file (no need for deprecated options)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Use the student routes
app.use('/students', studentRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
