import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({ onSearch }) => {
    return (
        <div className="header">
            <Link to="/" className="link-dec">
                <h1>DineNear</h1>
            </Link>
            <div className="right-side">
                <input 
                    type="text"
                    placeholder="Search"
                    onChange={(e) => onSearch?.(e.target.value)}
                    className="search"
                />
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