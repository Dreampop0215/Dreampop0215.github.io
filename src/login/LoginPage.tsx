import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword, signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/home");
        } catch (err) {
            alert("登录失败：" + (err as any).message);
        }
    };

    const handleRegister = async () => {
        try {
            if (auth.currentUser) {
                await signOut(auth); // ✅ 确保注册前状态干净
            }

            await createUserWithEmailAndPassword(auth, email, password);

            if (auth.currentUser) {
                await setDoc(doc(db, "users", auth.currentUser.uid), {
                    email,
                    username,
                });
            }

            navigate("/home");
        } catch (err) {
            alert("注册失败：" + (err as any).message);
        }
    };


    return (
        <div className="login-container">
            <h2>登录 / 注册</h2>
            <input
                type="text"
                placeholder="用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="邮箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>登录</button>
            <button onClick={handleRegister}>注册</button>
        </div>
    );
};

export default LoginPage;
