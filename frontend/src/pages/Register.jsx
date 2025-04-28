import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleGoogleRegister = async (credentialResponse) => {
    const token = credentialResponse.credential;
    const userInfo = jwtDecode(token);
    console.log("Google User Info:", userInfo);

    try {
      // Send to backend
      // const response = await fetch("http://localhost:8080/api/google-register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     email: userInfo.email,
      //     name: userInfo.name,
      //   }),
      // });

      const response = await api.post('/google-register', {
          email: userInfo.email,
          name: userInfo.name,
      });

      const result = await response.json();
      console.log(result);

      if (result[0]) {
        alert(`Welcome ${userInfo.name}! Google account registered.`);
        navigate("/user-profile");
      } else {
        alert(result[1]);
      }
    } catch (err) {
      console.error("Google register failed:", err);
      alert("Google register failed.");
    }
  };

  const handleManualRegister = async (e) => {
    e.preventDefault();

    try {
      // const response = await fetch("http://localhost:8080/api/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     name: fullName,
      //     email: email,
      //     password: password,
      //     dob: dob,
      //   }),
      // });

      const response = await api.post('/register', {
        name: fullName,
        email: email,
        password: password,
        dob: dob,
      });

      const result = await response.json();
      console.log(result);

      if (result[0]) {
        alert("Manual registration successful!");
        navigate("/user-profile");
      } else {
        alert(result[1]);
      }
    } catch (err) {
      console.error("Manual registration failed:", err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <GoogleLogin
        onSuccess={handleGoogleRegister}
        onError={() => alert("Google register failed")}
      />

      <p>or register manually:</p>

      <form onSubmit={handleManualRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
