import React, { useState } from "react";
import "./styles/Register.css";
import { registerUser } from "../database_functions";


function RegisterPage() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name || !password || !email || !dob) {
            setMessage("Please fill in all fields.");
            return;
        }

        setMessage("");

        const userData = { name, password, email, dob };
        
        const success = await registerUser(userData, setLoading, setMessage);

        if (success) {
            setMessage("Registration successful")
            setName("");
            setPassword("");
            setEmail("");
            setDob("");
        }
    }

    return (
        <form className="container" onSubmit={handleRegister}>
            <div className="text">Register</div>
            <div className="inputs">
                <div className="input">
                    <h3>Full Name</h3>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="input">
                    <h3>Date of Birth</h3>
                    <input 
                        type="date"
                        value={dob} 
                        onChange={(e) => setDob(e.target.value)} 
                    />
                </div>
                <div className="input">
                    <h3>Email</h3>
                    <input 
                        type="email"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input">
                    <h3>Password</h3>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="submit-cont">
                <button className="submit">
                    {loading ? "Registering..." : "Register"}
                </button>
            </div>
            {message}
        </form>
    );
}

export default RegisterPage;