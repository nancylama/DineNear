import React, { useState } from "react";
// import { registerUser } from "../api/userAPI"; 
import { GoogleLogin } from "@react-oauth/google"; 
import { jwtDecode } from "jwt-decode"; 
//test
const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser({ fullName, dob, email, password });
  };

  // google register oauth
  const handleGoogleRegister = async (credentialResponse) => {
    const token = credentialResponse.credential;
    const userInfo = jwtDecode(token);
    console.log("Google User Info:", userInfo);

    try {
      const res = await fetch("http://localhost:8080/api/google-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture, 
        }),
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error("Google register failed:", err);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      {/* google login section */}
      <GoogleLogin
        onSuccess={handleGoogleRegister}
        onError={() => {
          alert("Google register failed");
        }}
      />

      <p>or register manually:</p>

      {/*  manual registration form */}
      <form onSubmit={handleSubmit}>
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
