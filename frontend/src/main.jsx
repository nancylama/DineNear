import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="706181855204-s69qamf1un0rp7d22errhvelang64lka.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
