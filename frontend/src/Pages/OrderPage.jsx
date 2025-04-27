import React, { useState, useEffect } from "react";
import "./OrderPage.css";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const OrderPage = () => {
  const [user, setUser] = useState(null);

  //  When page loads, check if user exists in localStorage
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

    // Save to localStorage
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

    // Clear from localStorage
    localStorage.removeItem("user");

    alert("Logged out!");
  };

  return (
    <>
      {/* Visual indicator if logged in */}
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

      {/* Page Content */}
      <div className="order-page-wrapper">
        <div className="order-page">
          {/* LEFT SIDE */}
          <div className="order-left">
            {/* Sign in Section */}
            <div className="section">
              <h3>1. Sign in or sign up to place your order</h3>
              <div className="signin-box">
                <div className="google-section">
                  
                  {/* Show GoogleLogin if not logged in */}
                  {!user && (
                    <GoogleLogin
                      onSuccess={handleLoginSuccess}
                      onError={handleLoginFailure}
                    />
                  )}

                  <p className="divider-text">or continue with email</p>
                  <input type="email" placeholder="Email" />
                </div>

                {/* Manual Email Signup */}
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
            </div>

            <button className="place-order-btn">Place Order</button>
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
                <p>$ Price</p>
              </div>
              <div className="item-qty">
                <button>-</button>
                <span>#</span>
                <button>+</button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="price-breakdown">
              <p>Subtotal: <span>$$</span></p>
              <p>Tax: <span>$$</span></p>
              <p className="total">Total Price: <span>$$</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
