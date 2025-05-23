import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles/Menu.css";
import api from "../api/axios";

const MenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [cart, setCart] = useState([]);

    // useEffect(() => {
    //     axios
    //         .get("http://localhost:8080/api/RuaThaiMenu")
    //         .then((res) => setMenuItems(res.data))
    //         .catch((err) => console.error("Error:", err));
    // }, []);

    useEffect(() => {
        api.get('/api/RuaThaiMenu')
            .then((res) => setMenuItems(res.data))
            .catch((err) => console.error("Error:", err));
    }, []);

    const addToCart = (item) => {
        const updatedCart = cart.concat(item);
        setCart(updatedCart); 
        console.log("User cart:", updatedCart)
    }

    const checkout = async () => {
        try {
            const items = cart.map((item) => item.menu_item_id)

            // await axios.post("http://localhost:8080/api/order-details", { order_id : `O001`, items });
            await api.post('/api/order-details', { order_id : `O001`, items });

            setCart([]);
            alert("Order saved");
        } catch (err) {
            console.error("Order failed:", err);
        }
    }

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
                    <div className="menu-card" key={item.menu_item_id}>
                        <img src={item.image_url} alt="Image of menu item" />
                        <div className="info">
                            <div className="name-price">
                                <h3 className="item-name">{item.name}</h3>
                                <p className="item-price">${item.price}</p>
                            </div>
                            <p className="item-description">{item.description}</p>
                        </div>
                        <button className="add" onClick={() => addToCart(item)}>➕</button>
                    </div>
                ))}
            </div>

            <div className="cart">
                {cart.length > 0 && (
                    <div className="cart-contents">
                        <h2>Your Cart</h2>
                        <ul>
                            {cart.map((item, index) => (
                                <li key={index}>
                                    {item.name}: ${item.price}
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => checkout()} className="checkout-button">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuPage;