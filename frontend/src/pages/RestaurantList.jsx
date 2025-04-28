import React, { useState, useEffect } from "react";
import "./styles/RestaurantList.css";
import axios from "axios";
import { Link } from "react-router-dom";

const RestaurantListPage = () => {
    const [topRestaurants, setTopRestaurants] = useState([]);
    const [search, setSearch] = useState("");
    const [cuisines, setCuisines] = useState([]);

    // useEffect(() => {
    //     axios
    //       .get("http://localhost:8080/api/top-rated") 
    //       .then((res) => setTopRestaurants(res.data))
    //       .catch((err) => console.error("Error:", err)); 
    //   }, []);

    useEffect(() => {
        api.post('/top-rated') 
          .then((res) => setTopRestaurants(res.data))
          .catch((err) => console.error("Error:", err)); 
      }, []);

    // useEffect(() => {
    // axios
    //     .get("http://localhost:8080/api/cuisine") 
    //     .then((res) => setCuisines(res.data))
    //     .catch((err) => console.error("Error:", err)); 
    // }, []);

    useEffect(() => {
        api.post('/cuisine') 
            .then((res) => setCuisines(res.data))
            .catch((err) => console.error("Error:", err)); 
        }, []);

    return (
        <div className="restaurant-page">
            <h1>RESTAURANTS</h1>

            <div className="cuisines">
                <h3>Explore different cuisines</h3>
                <div className="cuisine-list">
                    {cuisines.map((cuisine) => (
                        <div className="item" key={cuisine.cuisine_id}>
                            <img src={cuisine.image_path} alt={cuisine.name} />
                            <p>{cuisine.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="restaurants">
                <h2>Featured Restaurants</h2>
                <div className="search-cont">
                    <input 
                        type="text"
                        placeholder="Explore other restaurants..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-bar"
                    />
                </div>
                <div className="grid">
                    {topRestaurants.filter((restaurant) =>
                        restaurant.name.toLowerCase().includes(search.toLowerCase())
                    ).map((restaurant) => (
                        <Link to="/restaurant-info" className="link-dec">
                            <div className="card" key={restaurant.id}>
                                <img src={restaurant.image_url} alt="Image of restaurant" />
                                <h3 className="res-name">{restaurant.name}</h3>
                                <p>Rating: {restaurant.rating}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            

        </div>
    );
};

export default RestaurantListPage;