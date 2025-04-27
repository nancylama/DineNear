import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
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
      console.error("Google login failed:", err);
    }
  };

  const handleManualLogin = (e) => {
    e.preventDefault();
    const manualUser = { name: "Manual User", email };
    localStorage.setItem("user", JSON.stringify(manualUser));
    navigate("/user-profile");
  };

  return (
    <div>
      <h2>Login</h2>

      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => alert("Google login failed")}
      />

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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
