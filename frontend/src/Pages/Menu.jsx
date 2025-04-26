import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles/Menu.css";

const MenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/RuaThaiMenu")
            .then((res) => setMenuItems(res.data))
            .catch((err) => console.error("Error:", err));
    }, []);

    return (
        <div className="menu-page">
            <h1>MENU</h1>

            <div className="food-nav">
                <h3>Appetizers</h3>
                <h3>Entrees</h3>
                <h3>Drinks</h3>
                <h3>Desserts</h3>
                <h3>Sides</h3>
            </div>

            <div className="menu-grid">
                {menuItems.map((item) => (
                    <div className="menu-card" key={item.id}>
                        <img src={item.image_url} alt="Image of menu item" />
                        <div className="info">
                            <div className="name-price">
                                <h3 className="item-name">{item.name}</h3>
                                <p className="item-price">${item.price}</p>
                            </div>
                            <p className="item-description">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default MenuPage;