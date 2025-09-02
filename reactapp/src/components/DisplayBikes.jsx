import React, { useEffect, useState } from "react";
import "./DisplayBikes.css"; // ✅ Import CSS

const API_BASE = "https://ide-cdaebefafaeedecddaabafefccfecdeabcadecaab.premiumproject.examly.io/proxy/8080";

function DisplayBikes() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/getAllBiketaxi`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          const data = await res.json();
          setApplications(data);
        }
      } catch (err) {
        console.error("Error fetching applications", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="display-container">
      <h2>Submitted Applications</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Bike Number</th>
            <th>Age</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={index}>
              <td>{app.name}</td>
              <td>{app.bikeNumber}</td>
              <td>{app.age}</td>
              <td>{app.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayBikes;
