import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import {
    addDoc,
    collection,
    serverTimestamp,
    onSnapshot,
    orderBy,
    query,
    doc,
    getDoc,
} from "firebase/firestore";
import "../global.css"
import "./ChatPage.css";
import { Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";


interface Message {
    id: string;
    text: string;
    username: string;
    uid: string;
    createdAt: Timestamp | null;
    avatarUrl?: string;
}

const ChatPage: React.FC = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState("");
    const [currentUsername, setCurrentUsername] = useState("");
    const [currentUid, setCurrentUid] = useState("");

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };

    const handleSend = async () => {
        if (!text.trim()) return;

        const uid = auth.currentUser?.uid || "";
        if (!uid || !currentUsername) return;

        await addDoc(collection(db, "messages"), {
            text: text.trim(),
            createdAt: serverTimestamp(),
            username: currentUsername,
            uid: uid, // ✅ 使用独立变量更安全
        });

        setText("");
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUid(user.uid);
                const docRef = doc(db, "users", user.uid);
                const snap = await getDoc(docRef);
                if (snap.exists()) {
                    setCurrentUsername(snap.data().username);
                }
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs: Message[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                msgs.push({
                    id: doc.id,
                    text: data.text,
                    username: data.username || "匿名用户",
                    uid: data.uid || "",
                    createdAt: data.createdAt ?? null,
                });
            });
            setMessages(msgs);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="chat-wrapper">
            <div className="chat-header">
                <h2>🎉 欢迎进入聊天室</h2>
                <button onClick={handleLogout}>退出登录</button>
            </div>

            <div className="chat-messages">
                {messages.map((msg) => {
                    const isOwn = msg.uid === currentUid;
                    return (
                        <div
                            key={msg.id}
                            className={`chat-message ${isOwn ? "own" : "other"}`}
                        >
                            <div className="chat-user">{msg.username}</div>
                            <div className="chat-text">{msg.text}</div>
                            <div className="chat-message-time">
                                {msg.createdAt
                                    ? msg.createdAt.toDate().toLocaleString("zh-CN", {
                                        timeZone: "Asia/Shanghai",
                                        hour12: false,
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                    })
                                    : "时间未知"}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="chat-input">
                <input
                    type="text"
                    placeholder="输入消息..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button onClick={handleSend}>发送</button>
            </div>
        </div>
    );
};

export default ChatPage;
