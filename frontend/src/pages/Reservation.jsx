import React from "react";
import { useState } from "react";
import './Reservation.css';
import bannerImage from "./blurred-busy-restaurant-background-free-photo.png";
import api from "../api/axios";

const Reservation = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    party_size: "",
  }, 
);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const user_id = localStorage.getItem("user_id");

      const response = await api.post('/api/reservations', {
        user_id,
        date: formData.date,
        time: formData.time,
        party_size: formData.party_size,
      })

      alert("Reservation confirmed");
      setFormData({
        date: "",
        time: "",
        party_size: "",
      })
    } catch (err) {
      console.error("Error saving reservation:", err);
      alert("Error saving reservation")
    }
  };

  return (
    <div className="reservation-page">
      

    <img
        className="restaurant-banner"
        src={bannerImage}
        alt="restaurant banner"
    />


      <div className="main-content">
        <div className="left-column">
          <h1 id = "reserv-h1">Restaurant Name</h1>
          <div className="restaurant-meta">
            <span>⭐⭐⭐⭐⭐&nbsp; <b>4.8</b> </span>
            <span> &nbsp; | &nbsp; <b>315 Reviews</b></span>
            <span> &nbsp; | &nbsp; 💰 <b>$30 and under</b> </span>
            <span> &nbsp; | &nbsp; 🍽 <b>Cuisine</b> </span>
          </div>

          <div className="tabs">
            <span><b> Overview</b> </span>
            <span><b> Popular Dishes</b> </span>
            <span><b> Photos</b> </span>
            <span><b> Menu</b> </span>
            <span><b> Reviews</b> </span>
          </div>

          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <div className="reservation-form-box">
            <h2>Make a reservation</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <select name="people" onChange={handleChange} required>
                  <option value=""># of People</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>

                <input
                  type="date"
                  name="date"
                  onChange={handleChange}
                  required
                />

                <input
                  type="time"
                  name="time"
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                Confirm Reservation
              </button>
            </form>
          </div>
        </div>

        <div className="right-column">
            <h3>Popular Dishes</h3>
            <div className="dish-card">   
                <div className="dish-img" />
                <div className="dish-info"> 
                    <strong>Item Name</strong>
                    <p>description</p>
                </div>
            </div>
            <div className="dish-card">
                <div className="dish-img" />
                <div className="dish-info">
                    <strong>Item Name</strong>
                    <p>description</p>
                </div>
            </div>

            <h3>Reviews</h3>
            <div className="review">
                <div className="review-header">
                      <strong>User One</strong>
                      <span>03/17/24</span>
                </div>
                <div className="stars">⭐⭐⭐⭐⭐&nbsp; <b>4.8</b></div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>

            <button className="review-btn">Write a Review</button>
        </div>

      </div>
    </div>
  );
};

export default Reservation;
