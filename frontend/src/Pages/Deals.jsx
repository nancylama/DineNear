import React, { useEffect, useState } from "react";
import "./styles/Deals.css";

const DealsPage = () => {
  const [deals, setDeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchDeals() {
      try {
        const response = await fetch('http://localhost:3000/api/deals'); // Update API if needed
        const data = await response.json();
        setDeals(data);
      } catch (error) {
        console.error("Failed to fetch deals:", error);
      }
    }

    fetchDeals();
  }, []);

  const filteredDeals = deals.filter(deal =>
    deal.restaurant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="deals-page">
        <title> Deals - DineNear</title>
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
            <p>{deal.description}</p>
            <p><strong>at</strong> {deal.restaurant}</p>
            <button className="learn-more-btn">Learn More</button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DealsPage;
