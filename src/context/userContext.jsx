import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const token = localStorage.getItem("expense_token");
    const userId = localStorage.getItem('expense-userId')
    const [uploaderLoading, setUploaderLoading] = useState(false);

    const [user, setUser] = useState(null);


    const updateUser = (userData) => {
        setUser(userData);
    };

    const clearUser = () => {
        setUser(null);
    };


    const fetchUser = async () => {
        try {
            if (!token) return;

            const response = await axiosInstance.get("api/v1/auth/getUser", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response?.data)
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };
    useEffect(() => {
        if (token) fetchUser();
    }, [token]);

    const handleProfileUpload = async (file) => {
        if (!file) return;
        try {
            if (!token) return;
            setUploaderLoading(true)
            const formData = new FormData();
            formData.append("image", file);
            const response = await axiosInstance.post(`/api/v1/auth/uploadprofile`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setUser(response.data.user);
            fetchUser();
            ("Profile updated");

        } catch (error) {
            console.log("Image upload failed:", error || error?.response?.data?.message);
        } finally {
            setUploaderLoading(false)
        }
    };

    return (
        <UserContext.Provider
            value={{
                user,
                updateUser,
                clearUser,
                handleProfileUpload,
                uploaderLoading
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider