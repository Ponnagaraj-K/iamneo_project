import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <center>
        <h1>Faster Bike Taxi</h1>
        </center>
        
      </div>
      <ul className="navbar-nav">
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/apply" className="nav-link">Apply</Link>
        </li>
        <li>
          <Link to="/bikedetails" className="nav-link">Bike Details</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
