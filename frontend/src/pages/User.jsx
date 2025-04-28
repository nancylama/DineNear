import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import './User.css';
import api from "../api/axios";

const UserPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [picture, setPicture] = useState("");
    const [phone, setPhone] = useState("");
    const [diet, setDiet] = useState("");
    const [payment, setPayment] = useState("");
    const [dietRes, setDietRes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const info = JSON.parse(localStorage.getItem("user"));

        if (info) {
            setName(info.name);
            setEmail(info.email);
            setPicture(info.picture || "/profile_placeholder.jpg");
            setPhone(info.phone || "");
            setDiet(info.diet || "");
            setPayment(info.payment || "");
        } else {
            navigate("/login");
        }

        async function getDietRes() {
            try {
                // const response = await fetch("http://localhost:8080/api/diet-restrictions");
                const response = await api.get('/api/diet-restrictions');
                const data = response.data;
                console.log("Successfully got diet restrictions:", data); 
                setDietRes(data);
            } catch (error) {
                console.error("Failed to get diet restrictions:", error);
            }
        }

        getDietRes();
        
    }, [navigate]);

    const submit = async (e) => {
        e.preventDefault();

        try {
            // const res = await fetch("http://localhost:8080/api/update-profile", {
            //     method: "PUT",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ email, name, phone, diet, payment }),
            // });

            const res = await api.put('/api/update-profile', {
                email,
                name,
                phone,
                diet,
                payment
            });

            const result = res.data;
            if (result.success) {
                localStorage.setItem("user", JSON.stringify({ email, name, phone, diet, payment }));
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
        <div>

            <style jsx="true">
                {`
                .profile-pic-box {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 50px;
                }

                .pic {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                }

                .user-info {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .profile-page {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                button {
                    border: none;
                    color: white;
                    background-color: #4F180B;
                    border-radius: 5px;
                    width: 150px;
                    height: 30px;
                    cursor: pointer;
                }

                form {
                    gap: 10px;
                }

                .button-cont {
                    display: flex;
                    justify-content: center;
                    margin-top: 10px;
                }

                `}
            </style>


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
                    <select
                        value={diet}
                        onChange={(e) => setDiet(e.target.value)}
                    >
                        <option value="">Select a diet restriction</option>
                        {dietRes.map((restriction) => (
                            <option key={restriction.diet_id} value={restriction.diet_type}>
                                {restriction.diet_type}
                            </option>
                        ))}
                    </select>
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
        </div>
    );
};

export default UserPage;