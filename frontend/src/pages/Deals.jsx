import React, { useEffect, useState } from "react";
import "./styles/Deals.css";
import { Link } from "react-router-dom";
import api from "../api/axios";

const DealsPage = () => {
  const [deals, setDeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchDeals() {
      try {
        // const response = await fetch('http://localhost:8080/api/deals'); 
        // const data = await response.json();
        // setDeals(data);
        const response = await api.get('/api/deals'); 
        setDeals(response.data);
      } catch (error) {
        console.error("Failed to fetch deals:", error);
      }
    }

    fetchDeals();
  }, []);

  const filteredDeals = deals.filter(deal =>
    deal.restaurant_name && deal.restaurant_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="deals-page">
      <div className="hero">
        <h1>DEALS</h1>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Wanna skip the scroll? Search and see if your fav has a deal!"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

    <section className="deals-container">
      {filteredDeals.map((deal) => (
        <div key={deal.deal_id} className="deal-card">
          <p>{deal.discount_details}</p>
          <p><strong>at</strong> {deal.restaurant_name}</p>
          <Link to="/restaurant-info" className="link-dec">
            <button className="learn-more-btn">Learn More</button>
          </Link>
        </div>
      ))}
    </section>

    </div>
  );
};

export default DealsPage;
