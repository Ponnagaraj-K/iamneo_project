import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
     <center>
     <h1>Welcome to Faster Bike Taxi</h1>
      <p>Apply now to become a bike taxi driver and start earning!</p>
      <Link to="/apply" className="apply-link" >
        Apply Now
      </Link>
     </center>
    </div>
  );
}

export default Home;
