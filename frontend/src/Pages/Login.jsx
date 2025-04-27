import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
// test update
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = async (credentialResponse) => {
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
      console.error("Google login failed:", err);
    }
  };

  const handleManualLogin = (e) => {
    e.preventDefault();
    // Here you'd send email/password to backend (if you have /login route)
    alert("Manual login clicked");
  };

  return (
    <div>
      <h2>Login</h2>

      {/* Google Login */}
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => alert("Google login failed")}
      />

      <p>or continue with email</p>

      {/* Manual login form */}
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
