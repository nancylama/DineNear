import React, { useState, useEffect } from "react";
import "./styles/RestaurantList.css";
import axios from "axios";

const cuisines = [
    { name: "Italian", img: "/italian-food.jpg" },
    { name: "Japanese", img: "/japanese-food.webp" },
    { name: "Mexican", img: "/mexican-food.jpeg" },
    { name: "Greek", img: "/greek-food.webp" },
    { name: "Indian", img: "/indian-food.jpg" },
]

const RestaurantListPage = () => {
    const [topRestaurants, setTopRestaurants] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios
          .get("http://localhost:8080/api/top-rated") 
          .then((res) => setTopRestaurants(res.data))
          .catch((err) => console.error("Error:", err)); 
      }, []);

    return (
        <div className="restaurant-page">
            <h1>RESTAURANTS</h1>

            <div className="cuisines">
                <h3>Explore different cuisines</h3>
                <div className="cuisine-list">
                    {cuisines.map((cuisine, index) => (
                        <div className="item" key={index}>
                            <img src={cuisine.img} alt={cuisine.name} />
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
                        <div className="card" key={restaurant.id}>
                            <img src={restaurant.image_url} alt="Image of restaurant" />
                            <h3 className="res-name">{restaurant.name}</h3>
                            <p>Rating: {restaurant.rating}</p>
                        </div>
                    ))}
                </div>
            </div>
            

        </div>
    );
};

export default RestaurantListPage;