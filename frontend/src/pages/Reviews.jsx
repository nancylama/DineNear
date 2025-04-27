import React, { useEffect, useState } from "react";
import "./styles/Reviews.css";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ restaurant_id: "", rating: 5, comment: "" });

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      const response = await fetch('http://localhost:3000/api/reviews');
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await fetch('http://localhost:8080/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: newReview.rating,
          comment: newReview.comment,
          user_id: JSON.parse(localStorage.getItem("user")).user_id,
        })
      });

      setNewReview({ rating: 5, comment: "" }); // Clear form
      setShowForm(false); // Hide form after submission
      fetchReviews(); // Reload reviews
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
        {reviews.map((review) => (
          <div key={review.review_id} className="review-card">
            <div className="stars">
              {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
            </div>
            <p>{review.comment}</p>
            <div className="profile">
              <div className="username">{review.name}</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ReviewsPage;
