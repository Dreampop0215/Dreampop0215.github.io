// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
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
            <AppRoutes />
        </BrowserRouter>
    </React.StrictMode>
);
