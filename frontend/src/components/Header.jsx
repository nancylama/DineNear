import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({ onSearch }) => {
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
            </div>

            <div className="right-side">
                {/* <input 
                    type="text"
                    placeholder="Search"
                    onChange={(e) => onSearch?.(e.target.value)}
                    className="search"
                /> */}
                <Link to="/user">
                <img 
                    src="/profile_placeholder.jpg"
                    alt="Placeholder profile picture"
                    className="profile-pic"
                />
                </Link>
            </div>
        </div>
    );
};

export default Header;