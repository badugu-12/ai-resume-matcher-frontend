import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { MatchProvider } from "./context/MatchContext";
import "./index.css"; // ✅ REQUIRED


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MatchProvider> 
            <App />
        </MatchProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
