import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

import "../global.css";  // 全局布局


const SettingPage: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };

    return (
        <div className="chat-wrapper">
            <div className="chat-header">
                <h2>⚙️ 欢迎来到设置页</h2>
                <button onClick={handleLogout}>退出登录</button>
            </div>

            <div className="chat-messages">
                <p style={{ color: "#666", fontSize: "1rem" }}>
                    这是占位内容，未来可以在这里添加欢迎信息或其他内容。
                </p>
            </div>
        </div>
    );
};

export default SettingPage;
