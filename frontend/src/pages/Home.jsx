import React from "react";
import './styles/Home.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome To DineNear!</h1>

      <div className="images">
        <img src="/rest1.jpg" alt="Italian Restaurant" />
        <img src="/rest2.jpg" alt="Another Restaurant"  />
        <img src="/rest3.jpg" alt="Sea Food" />
      </div>
    </div>
  );
};

export default HomePage;
