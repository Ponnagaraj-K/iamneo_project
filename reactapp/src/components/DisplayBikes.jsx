import React, { useState, useEffect } from 'react';

const DisplayBikes = () => {
  const [biketaxis, setBiketaxis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBiketaxis();
  }, []);

  const fetchBiketaxis = async () => {
    try {
      const response = await fetch('https://placement.skcet.ac.in/proxy/8080/getAllBiketaxi', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setBiketaxis(data);
      } else {
        console.log('Response status:', response.status);
        setError(`Backend server error: ${response.status}`);
      }
    } catch (error) {
      console.log('Fetch error:', error);
      setError(`Backend connection failed: ${error.message}`);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="display-bikes-container">
      <h2>Submitted Applications</h2>
      
      {biketaxis.length === 0 ? (
        <p>No applications submitted yet.</p>
      ) : (
        <table className="bikes-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Bike Number</th>
              <th>Age</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {biketaxis.map((biketaxi) => (
              <tr key={biketaxi.id}>
                <td>{biketaxi.name}</td>
                <td>{biketaxi.bikeNumber}</td>
                <td>{biketaxi.age}</td>
                <td>{biketaxi.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DisplayBikes;