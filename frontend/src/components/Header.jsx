import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    // const [user, setUser] = useState(null);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const user = localStorage.getItem("user");
    //     if (user) {
    //         try {
    //             const parse = JSON.parse(stored);
    //             setUser(parse);
    //         } catch (err) {
    //             console.error("Failed to parse user");
    //         }
    //     } 
    // }, []);

    // const handleProfile = () => {
    //     if (user) {
    //         navigate("/user-profile");
    //     } else {
    //         navigate("/login");
    //     }
    // }

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