import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // React Router for redirection

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Make API call to your backend to redirect to the fake Google API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/google-fake');
        setData(response.data); // Set the data from the fake API
        navigate('/dashboard'); // Redirect after fetching the data
      } catch (err) {
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, [navigate]);

  if (error) return <p>{error}</p>;

  return (
    <div className="App">
      <h1>Data from Fake Google API</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display the fetched data */}
    </div>
  );
}

export default App;
