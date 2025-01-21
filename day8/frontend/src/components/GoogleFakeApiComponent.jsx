import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GoogleFakeApiComponent = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data from the backend
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/google-fake');
                setData(response.data);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Google Fake API Data</h1>
            {data && (
                <div>
                    <p><strong>User:</strong> {data.data.user}</p>
                    <p><strong>Email:</strong> {data.data.email}</p>
                    <p><strong>ID:</strong> {data.data.id}</p>
                </div>
            )}
        </div>
    );
};

export default GoogleFakeApiComponent;
