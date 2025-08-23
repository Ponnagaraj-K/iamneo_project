import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <main>
        <h2>Welcome to Faster Bike Taxi</h2>
        <p>Apply now to become a bike taxi driver and start earning!</p>
        <Link to="/apply">
          <button className="apply-btn">Apply Now</button>
        </Link>
      </main>
    </div>
  );
};

export default Home;