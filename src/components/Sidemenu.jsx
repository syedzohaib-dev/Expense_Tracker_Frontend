import React, { use, useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaMoneyBillWave, FaChartPie, FaSignOutAlt } from "react-icons/fa";
import { UserContext } from "../context/userContext";
import { FiUpload } from "react-icons/fi";
import { MdFileUploadOff } from "react-icons/md";
import { IoBanOutline, IoCloudUploadOutline } from "react-icons/io5";
import axiosInstance from "../utils/axiosinstance";



const Sidemenu = () => {
    const { user, clearUser, handleProfileUpload, uploaderLoading } = useContext(UserContext);
    const token = localStorage.getItem("expense_token");
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("expense_token");
        clearUser();
        navigate('/login');
    }

    // const handleFileUpload = async (file) => {
    //     try {
    //         if (file) {
    //             setUploaderLoading(true);
    //             const formData = new FormData();
    //             formData.append("image", file);

    //             const uploadRes = await axiosInstance.post("api/v1/auth/upload-image", formData, {
    //                 headers: { "Content-Type": "multipart/form-data" },
    //             });


    //             uploadedImageUrl = uploadRes.data.imageUrl;
    //             alert("Image uploaded successfully");
    //         }
    //     } catch (error) {
    //         console.error("Error uploading file:", error?.response?.data?.message || error.message || "File upload failed");
    //     } finally {
    //         setUploaderLoading(false);
    //     }
    // }

    const location = useLocation();

    return (
        <aside className="bg-white text-black w-60 border-black  min-h-screen flex flex-col justify-between">
            {/* Top Menu */}
            <div>
                <div className="p-5 text-2xl font-semibold">
                    Expense Tracker
                </div>

                <div className="flex flex-col items-center mb-6 relative">

                    <div className="relative w-28 h-28 border-3 border-purple-800 rounded-full">
                        <img
                            src={
                                user?.user?.profileImageUrl ||
                                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            }
                            alt="User"
                            className="w-28 h-28 rounded-full object-cover border border-gray-300 shadow"
                        />

                        <label className="absolute bottom-1 right-1 cursor-pointer">
                            {uploaderLoading ?
                                (<div className="animate-spin w-8 h-8 bg-purple-600 text-white rounded-full
                                 flex items-center justify-center text-md hover:bg-purple-800 shadow">
                                    <div className="w-4 h-2 bg-white rounded-2xl"></div>
                                </div>)
                                :
                                (<div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center
                                 justify-center text-md hover:bg-purple-800 shadow">
                                    <IoCloudUploadOutline />
                                </div>)
                            }

                            <input
                                disabled={uploaderLoading}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleProfileUpload(e.target.files[0])}
                            />
                        </label>
                        <h2 className="text-lg font-semibold text-center border-b">{user?.user?.fullName}</h2>

                    </div>
                </div>
                <ul className="flex flex-col  gap-2 p-4">

                    {/* Home */}
                    <li
                        className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer
                             transition-colors ${location.pathname === "/dashboard"
                                ? "bg-purple-600"
                                : "bg-purple-200"
                            }`}
                    >
                        <FaHome />
                        <Link to="/dashboard" className="flex-1">
                            Home
                        </Link>
                    </li>

                    {/* Income */}
                    <li
                        className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors ${location.pathname === "/income"
                            ? "bg-purple-600"
                            : "bg-purple-200"
                            }`}
                    >
                        <FaMoneyBillWave />
                        <Link to="/income" className="flex-1">
                            Income
                        </Link>
                    </li>

                    {/* Expense */}
                    <li
                        className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors ${location.pathname === "/expense"
                            ? "bg-purple-600"
                            : "bg-purple-200"
                            }`}
                    >
                        <FaChartPie />
                        <Link to="/expense" className="flex-1">
                            Expense
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="py-4 flex justify-center border-t border-fuchsia-700">
                <button type="button" onClick={handleLogout} className="flex items-center gap-3 bg-purple-200
                 hover:bg-purple-700 px-15  py-2 rounded cursor-pointer transition-all duration-300">
                    <FaSignOutAlt />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidemenu;
