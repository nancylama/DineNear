import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                setUser(parsed);
            } catch (err) {
                console.error("Failed to parse user:", err);
            }
        }
    }, []);

    const handleProfile = () => {
        if (user) {
            navigate("/user-profile");
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="header">
            <Link to="/" className="link-decoration">
                <h1>DineNear</h1>
            </Link>
            
            <div className="nav-links">
                <Link to="/restaurant-list" className="link-decoration">
                    <h2>Restaurants</h2>
                </Link>
                <Link to="/reservations" className="link-decoration">
                    <h2>Reservations</h2>
                </Link>
                <Link to="/deals" className="link-decoration">
                    <h2>Deals</h2>
                </Link>
                <Link to="/menu" className="link-decoration">
                    <h2>Menus</h2>
                </Link>
                <Link to="/order" className="link-decoration">
                    <h2>Payments</h2>
                </Link>
                <Link to="/restaurant-info" className="link-decoration">
                    <h2>Info</h2>
                </Link>
                <Link to="/reviews" className="link-decoration">
                    <h2>Reviews</h2>
                </Link>
            </div>

            <div className="right-side" onClick={handleProfile} style={{ cursor: "pointer" }}>
                {user ? (
                    <img 
                        src={user.picture}
                        alt="User profile"
                        className="profile-pic"
                    />
                ) : (
                    <img 
                        src="/profile_placeholder.jpg"
                        alt="Placeholder profile"
                        className="profile-pic"
                    />
                )}
            </div>
        </div>
    );
};

export default Header;
