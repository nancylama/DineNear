import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

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
      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(userInfo));

      // Redirect
      navigate("/user-profile");

      // Optional backend call (if you still want)
      await fetch("http://localhost:8080/api/google-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
        }),
      });
    } catch (err) {
      console.error("Google register failed:", err);
    }
  };

  const handleManualRegister = (e) => {
    e.preventDefault();

    const newUser = {
      name: fullName,
      email,
      dob,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    alert("Manual registration successful!");
    navigate("/user-profile");
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
