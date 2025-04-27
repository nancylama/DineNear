import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/User.css';

const UserPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [picture, setPicture] = useState("");
    const [phone, setPhone] = useState("");
    const [diet, setDiet] = useState("");
    const [payment, setPayment] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const info = JSON.parse(localStorage.getItem("user"));

        if (info) {
            setName(info.name);
            setEmail(info.email);
            setPicture(info.picture || "/profile_placeholder.jpg");
            setEmail(info.phone || "");
            setEmail(info.diet || "");
            setEmail(info.payment || "");
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const submit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8080/api/update-profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, name, phone, diet, payment, picture }),
            });

            const result = await response.json();
            if (result.success) {
                localStorage.setItem("user", JSON.stringify({ email, name, phone, diet, payment, picture }));
                alert("Profile updated.");
                } else {
                alert("Error updating profile.");
                }
        } catch (err) {
            console.error("Profile update error:", err);
            alert("Error updating profile.");
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    }


    return (
        <div className="profile-page">
            <h2>User Profile</h2>

            <div className="profile-pic-box">
                <img src={picture} alt="User profile picture" className="pic" />
            </div>

            <form onSubmit={submit} className="user-info">
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div>
                    <label>Dietary Restrictions</label>
                    <input
                        type="text"
                        value={diet}
                        onChange={(e) => setDiet(e.target.value)}
                        placeholder="e.g. Halal, Gluten-free"
                    />
                </div>
                <div>
                    <label>Payment Method</label>
                    <input
                        type="text"
                        value={payment}
                        onChange={(e) => setPayment(e.target.value)}
                        placeholder="e.g. VISA"
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
            <div className="button-cont">
                <button onClick={logout} className="logout-button">
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default UserPage;