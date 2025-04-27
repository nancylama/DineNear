import React from "react";
import './styles/Home.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="search-container">
        <form action="/action_page.php">
          <input type="text" placeholder="Search.." name="search" />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>

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
