import React from "react";

const HomePage = () => {
  return (
    <div> {/* Main wrapper */}
      <div className="topnav">
        <a href="">DineNear</a>
        <a href="#">Restaurants</a>
        <a href="#">Menus</a>
        <a href="#">Reviews</a>
        <a href="#">Payments</a>
        <a href="#">Reservations</a>
        <a href="#">Info</a>
        <a href="#">Deals</a>
        <a href="#">Login</a>
        <div className="search-container">
          <form action="/action_page.php">
            <input type="text" placeholder="Search.." name="search" />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
      </div>

      <h1>Welcome To DineNear</h1>

      <div className="scroll-container">
        <img src="rest1.jpg" alt="Italian Restaurant" width="600" height="400" />
        <img src="rest2.jpg" alt="Another Restaurant" width="600" height="400" />
        <img src="rest3.jpg" alt="Sea Food" width="600" height="400" />
      </div>
    </div>
  );
};

export default HomePage;
