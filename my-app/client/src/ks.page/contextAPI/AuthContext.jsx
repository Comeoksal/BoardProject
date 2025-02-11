import React, { createContext, useState, useContext, useEffect } from "react";
import axios from 'axios';
const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_BACK_SERVER + '/api/users/auth', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.isAuth) {
                setIsLoggedIn(true);
                setUser({
                    _id: response.data._id,
                    name: response.data.name,
                    email: response.data.email,
                    isAdmin: response.data.isAdmin,
                    token: response.data.token,
                });
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        } catch (error) {
            console.error("Error fetching user info", error);
            setIsLoggedIn(false);
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, fetchUserInfo }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);