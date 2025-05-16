// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import HomePage from "./home/HomePage";
import "./index.css";

// 🔁 处理 GitHub Pages 重定向问题
const redirectPath = sessionStorage.redirect;
if (redirectPath) {
    sessionStorage.removeItem('redirect');
    window.history.replaceState(null, '', new URL(redirectPath).pathname);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
