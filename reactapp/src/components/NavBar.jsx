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
          <a href="/" className="nav-link">Home</a>
        </li>
        <li className="nav-item">
          <a href="/bikedetails" className="nav-link">Bike Details</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;