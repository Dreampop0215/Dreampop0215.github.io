// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../login/LoginPage";
import HomePage from "../home/HomePage";
import MainLayout from "../layouts/MainLayout";

// ⚠️ 以下两个页面后续你需要创建 ChatPage 和 SettingPage
import ChatPage from "../chatroom/ChatPage";
import SettingPage from "../setting/SettingPage";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route element={<MainLayout />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/setting" element={<SettingPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
