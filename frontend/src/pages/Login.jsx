import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";
import api from "../api/axios";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = async (credentialResponse) => {
    const token = credentialResponse.credential;
    const userInfo = jwtDecode(token);
    console.log("Google User Info:", userInfo);

    try {
      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(userInfo));

      // Optional backend call (if you still want)
      // await fetch("http://localhost:8080/api/google-register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     email: userInfo.email,
      //     name: userInfo.name,
      //     picture: userInfo.picture,
      //   }),
      // });
      await api.post('/api/google-register', {
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
      }); 
    } catch (err) {
      console.error("Google login failed:", err);
    }

    // Redirect
    navigate("/user-profile");

  };

  const handleManualLogin = (e) => {
    e.preventDefault();
    const manualUser = { name, email, picture: '/profile_placeholder.jpg' };
    localStorage.setItem("user", JSON.stringify(manualUser));
    navigate("/user-profile");
  };

  return (
    <div className="login-page">
      <h1>LOGIN</h1>

      <div className="google-login">
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => alert("Google login failed")}
        />
      </div>
      
      <p>or continue with email</p>

      <form onSubmit={handleManualLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="button-cont">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
