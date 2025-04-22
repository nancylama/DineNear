import React from "react";
import "./Header.css";

const Header = ({ onSearch }) => {
    return (
        <div className="header">
            <h1>DineNear</h1>
            <div className="right-side">
                <input 
                    type="text"
                    placeholder="Search"
                    onChange={(e) => onSearch?.(e.target.value)}
                    className="search"
                />
                <img 
                    src="/profile_placeholder.jpg"
                    alt="Placeholder profile picture"
                    className="profile-pic"
                />
            </div>
        </div>
    );
};

export default Header;