import React from "react";
import "./RestaurantInfo.css";
import { useNavigate } from "react-router-dom";


const RestaurantInfo = () => {
    const navigate = useNavigate();

    return (
    <div className="info-page">
      <div className="header">
        <div className="logo">DineNear</div>
        <div className="avatar" />
      </div>

      <div className="info-content">
        {/* LEFT IMAGE GRID */}
        <div className="info-images">
          <div className="image outside">Outside Pic</div>
          <div className="image interior">Interior Pic</div>
          <div className="image food">Food or etc</div>
          <div className="image extra1" />
          <div className="image extra2" />
        </div>

        {/* RIGHT DETAILS */}
        <div className="info-details">
            <h1>Restaurant Name</h1>
            <br></br>
            <p className="menu-link">View Menu</p>

            <div className="meta">
                <span>📍 <b>Borough</b></span>
                <span>💰 <b>$30 and under</b></span>
                <span>🍽 <b>Cuisine</b></span>
            </div>

            <hr className = "divider"/>
            <hr /><br></br>
         
            <p className="contact">
                123 ABC St., Borough, NY, ZipNum. <br />
                Telephone: 123-456-7890 <br />
                Email: restaurant@name.com
            </p>

            <p className="about">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
            </p>

            <div className="reviews">
                <h4>Reviews</h4>
                <span className="count">💬 315 Reviews</span>

            <div className="review-card">
              <div className="review-header">
                <strong>User One</strong>
                <span>03/17/24</span>
              </div>
              <div className="stars">⭐⭐⭐⭐ <b>4.0</b></div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>

          <div className="action-buttons">
            <button className="reserve-btn" onClick={() => navigate("/reservation")}>Reserve</button>
            <button className="order-btn">Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;
