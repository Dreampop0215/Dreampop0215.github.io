import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

import "../global.css";  // 全局布局


const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };

    return (
        <div className="chat-wrapper">
            <div className="chat-header">
                <h2>🏠 欢迎来到主页</h2>
                <button onClick={handleLogout}>退出登录</button>
            </div>

            <div className="chat-messages">
                {/*<p style={{color: "#666", fontSize: "1rem"}}>*/}
                {/*    这是占位内容，未来可以在这里添加欢迎信息或其他内容。*/}
                {/*</p>*/}
                <img
                    src="/images/watcher.jpg"
                    alt="watcher"
                    style={{
                        maxWidth: "100%",
                        borderRadius: "12px",
                        marginTop: "1rem",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                />
            </div>
        </div>
    );
};

export default HomePage;
