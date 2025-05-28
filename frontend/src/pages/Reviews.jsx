import React, { useEffect, useState } from "react";
import "./styles/Reviews.css";
import api from "../api/axios"; 

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    restaurant_id: "",
    rating: 5,
    comment: ""
  });

  useEffect(() => {
    fetchReviews();
    fetchRestaurants();
  }, []);

  async function fetchReviews() {
    try {
      const response = await api.get('/api/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  }

  async function fetchRestaurants() {
    try {
      const response = await api.get('/api/restaurants');
      console.log("Fetched restaurants:", response.data); 
      setRestaurants(response.data);
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // const user = JSON.parse(localStorage.getItem("user"));

    try {
      await api.post('/api/reviews', {
        restaurant_id: newReview.restaurant_id,
        rating: newReview.rating,
        comment: newReview.comment,
      }
      // , {
      //   headers: {
      //     Authorization: `Bearer ${user.token}`
      //   }
      // }
    );

      setNewReview({ restaurant_id: "", rating: 5, comment: "" });
      setShowForm(false);
      fetchReviews();
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  }

  return (
    <div className="reviews-page">
      <div className="hero">
        <h1>REVIEWS</h1>
      </div>

      <div className="submit-review">
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Write a review"}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="review-form">
            <label>
              Restaurant:
              <select
                value={newReview.restaurant_id}
                onChange={(e) => setNewReview({ ...newReview, restaurant_id: e.target.value })}
                required
              >
                <option value="">Select a restaurant</option>
                {restaurants.map(rest => (
                  <option key={rest.restaurant_id} value={rest.restaurant_id}>
                    {rest.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Rating:
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
              >
                {[5,4,3,2,1].map(num => (
                  <option key={num} value={num}>{num} Stars</option>
                ))}
              </select>
            </label>

            <label>
              Comment:
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                required
              />
            </label>

            <button type="submit">Submit</button>
          </form>
        )}
      </div>

      <section id="reviews" className="reviews-container">
  {reviews.length === 0 ? (
    <p>No reviews yet. Be the first to write one!</p>
  ) : (
    reviews.map((review) => (
      <div key={review.review_id} className="review-card">
        <div className="stars">
          {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
        </div>
        <p><strong>{review.restaurant_name || "Unknown Restaurant"}</strong></p>
        <p>{review.comment}</p>
        <div className="profile">
          {/* <div className="username">Reviewed by {review.user_id || "Anonymous"}</div> */}
          <div className="username">Reviewed by Anonymous</div>
        </div>
      </div>
    ))
  )}
</section>

    </div>
  );
};

export default ReviewsPage;

