const express = require('express');
const axios = require('axios');
const cors = require('cors');  // Import cors
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Example route that redirects to a fake Google API URL
app.get('/api/google-fake', async (req, res) => {
  try {
    // This is where you make an API call to a fake Google endpoint
    const response = await axios.get('https://jsonplaceholder.typicode.com/users'); // Fake Google API URL
    res.json(response.data); // Send the data to the frontend
  } catch (error) {
    console.error('Error fetching data from Google API:', error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
