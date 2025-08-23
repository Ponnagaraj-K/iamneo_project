import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Faster Bike Taxi</h1>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link" href="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/bikedetails" className="nav-link" href="/bikedetails">Bike Details</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;