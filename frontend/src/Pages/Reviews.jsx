import React, { useEffect, useState } from "react";
import "./styles/Reviews.css";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Example: Fetch from API or use mock data
    async function fetchReviews() {
      try {
        const response = await fetch('http://localhost:3000/api/reviews'); // Update with your real API
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    }

    fetchReviews();
  }, []);

  return (
    <div className="reviews-page">
      <div className="hero">
        <title>Reviews - DineNear</title>
        <h1>REVIEWS</h1>
      </div>

      <section id="reviews" className="reviews-container">
        {reviews.map((review) => (
          <div key={review.review_id} className="review-card">
            <div className="stars">
              {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
            </div>
            <p>{review.comment}</p>
            <div className="profile">
              <img src={review.profile_pic_url} alt="Profile" />
              <div className="username">{review.username}</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ReviewsPage;
