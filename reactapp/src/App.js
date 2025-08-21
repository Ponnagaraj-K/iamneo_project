import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
        <NavBar />
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