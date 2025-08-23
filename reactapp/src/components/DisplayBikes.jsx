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
      const response = await fetch('https://8080-cdaebefafaeedecddaabafefccfecdeabcadecaab.premiumproject.examly.io/getAllBiketaxi', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setBiketaxis(data);
      } else {
        setError('Backend server not running on port 8080');
      }
    } catch (error) {
      setError('Backend server not running. Start Spring Boot app first.');
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