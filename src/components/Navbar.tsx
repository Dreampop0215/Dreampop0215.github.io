// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/home">首页</Link></li>
                <li><Link to="/chat">聊天</Link></li>
                <li><Link to="/setting">设置</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
