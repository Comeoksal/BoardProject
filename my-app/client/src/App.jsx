import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./ks.page/page/MainPage";
import LoginPage from "./ks.page/page/LoginPage";
import ChatPage from "./ks.page/page/ChatPage";
import RegisterPage from "./ks.page/page/RegisterPage";
import BoardPage from "./ks.page/page/BoardPage";
import PostWritePage from "./ks.page/page/PostWritePage";
import PostViewPage from "./ks.page/page/PostViewPage";
import Navbars from "./ks.page/ui/Navbars";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { AuthProvider } from "./ks.page/contextAPI/AuthContext";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbars />
                <Routes>
                    <Route index element={<MainPage />} />
                    <Route path="/loginroom" element={<LoginPage />} />
                    <Route path="/boardroom" element={<BoardPage />} />
                    <Route path="/chatroom" element={<ChatPage />} />
                    <Route path="/registerroom" element={<RegisterPage />} />
                    <Route path="/postwriteroom" element={<PostWritePage />} />
                    <Route path="/postviewroom/:postId" element={<PostViewPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;