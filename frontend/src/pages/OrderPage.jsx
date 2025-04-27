import React, { useState, useEffect } from "react";
import "./OrderPage.css";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const [user, setUser] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false); // NEW: track if order is placed
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(decoded);
    setUser(decoded);
    localStorage.setItem("user", JSON.stringify(decoded));
    alert(`Welcome ${decoded.name}`);
  };

  const handleLoginFailure = () => {
    console.log("Login Failed");
    alert("Google login failed.");
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem("user");
    alert("Logged out!");
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true); // NEW: set orderPlaced to true
  };
  
  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <>
      {/* IF ORDER IS PLACED, show success message */}
      {orderPlaced ? (
        <div className="order-success-wrapper" style={{ textAlign: "center", padding: "100px" }}>
          <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>🎉 Thank you for your order!</h1>
          <p style={{ fontSize: "18px", color: "#555" }}>
            We’ve received your order and are preparing it for delivery!
          </p>

          <button
            className="place-order-btn"
            onClick={handleGoHome}
            style={{
              marginTop: "40px",
              padding: "12px 24px",
              backgroundColor: "#5c3a2f",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            Back to Home
          </button>
        </div>
      ) : (
        // ELSE: show normal checkout page
        <>
          {user && (
            <div className="user-banner">
              <p>Logged in as <strong>{user.name}</strong></p>
              <img
                src={user.picture}
                alt="User Avatar"
                style={{ width: "50px", borderRadius: "50%", marginTop: "10px" }}
              />
              <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
                Logout
              </button>
            </div>
          )}

          <div className="order-page-wrapper">
            <div className="order-page">
              {/* LEFT SIDE */}
              <div className="order-left">
                {/* Sign in Section */}
                <div className="section">
                  <h3>1. Sign in or sign up to place your order</h3>
                  <div className="signin-box">
                    <div className="google-section">
                      {!user && (
                        <GoogleLogin
                          onSuccess={handleLoginSuccess}
                          onError={handleLoginFailure}
                        />
                      )}
                      <p className="divider-text">or continue with email</p>
                      <input type="email" placeholder="Email" />
                    </div>

                    <div className="email-section">
                      <div className="form-row">
                        <input type="text" placeholder="First Name" />
                        <input type="text" placeholder="Last Name" />
                      </div>
                      <input type="email" placeholder="Email" />
                      <input type="password" placeholder="Password" />
                    </div>
                  </div>
                </div>

                {/* Shipping Section */}
                <div className="section">
                  <h3>2. Shipping Details</h3>
                  <select>
                    <option value="">Select Shipping Address</option>
                    <option value="default">123 Main St, NY</option>
                  </select>
                </div>

                {/* Payment Section */}
                <div className="section">
                  <h3>3. Payment Details</h3>

                  <div className="payment-icons">
                    <span>🍎</span>
                    <span>💳</span>
                    <span>🅶</span>
                  </div>

                  <div className="payment-form">
                    <input type="text" placeholder="Name on Card" />
                    <input type="text" placeholder="Card Number" />
                    <div className="form-row">
                      <input type="text" placeholder="Expiration Date (MM/YY)" />
                      <input type="text" placeholder="CVV" />
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <button className="place-order-btn" onClick={handlePlaceOrder}>
                  Place Order
                </button>

              </div>

              {/* RIGHT SIDE */}
              <div className="order-right">
                <p className="cart-title">Your cart from</p>
                <h2 className="restaurant-name">Restaurant Name</h2>
                <hr />
                <h3>Items:</h3>

                <div className="cart-item">
                  <div className="item-image" />
                  <div className="item-details">
                    <p><strong>Item Name</strong></p>
                    <p>$10</p>
                  </div>

                  <div className="item-qty">
                    <button className="qty-btn" onClick={handleDecrement}>-</button>
                    <span className="qty-number">{quantity}</span>
                    <button className="qty-btn" onClick={handleIncrement}>+</button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="price-breakdown">
                  <p>Subtotal: <span>${10 * quantity}</span></p>
                  <p>Tax: <span>${(10 * quantity * 0.1).toFixed(2)}</span></p>
                  <p className="total">Total Price: <span>${(10 * quantity * 1.1).toFixed(2)}</span></p>
                </div>

              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderPage;
