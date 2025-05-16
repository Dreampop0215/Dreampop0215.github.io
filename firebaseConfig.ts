// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ 你现有的配置，直接使用
const firebaseConfig = {
    apiKey: "AIzaSyCy97Km2_8p0lRMyErnvNiWahm-CA05EWg",
    authDomain: "classmates-memory.firebaseapp.com",
    projectId: "classmates-memory",
    storageBucket: "classmates-memory.appspot.com",
    messagingSenderId: "190605929599",
    appId: "1:190605929599:web:1759d2f26a3528b945634a",
    measurementId: "G-PZCR52V4MX"
};

// 初始化 Firebase 应用
const app = initializeApp(firebaseConfig);

// 获取 Firebase Auth 和 Firestore 实例
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
