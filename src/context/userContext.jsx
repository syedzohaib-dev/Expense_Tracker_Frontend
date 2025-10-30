import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    

    // Function to update user data
    const updateUser = (userData) => {
        setUser(userData);
    };

    // Function to clear user data (e.g., on logout)
    const clearUser = () => {
        setUser(null);
    };

    // ✅ Fetch user data when app loads
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
               
                if (!token){return};

                const response = await axios.get("http://localhost:3000/api/v1/auth/getUser", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(response.data)
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                updateUser,
                clearUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider