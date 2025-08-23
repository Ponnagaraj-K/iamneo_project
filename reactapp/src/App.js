import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import ApplyForm from './components/ApplyForm';
import DisplayBikes from './components/DisplayBikes';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-brand">
            <h1>Faster Bike Taxi</h1>
          </div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/bikedetails" className="nav-link">Bike Details</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<ApplyForm />} />
          <Route path="/bikedetails" element={<DisplayBikes />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;