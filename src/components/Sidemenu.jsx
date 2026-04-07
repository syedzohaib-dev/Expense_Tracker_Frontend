import React, { use, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaMoneyBillWave, FaChartPie, FaSignOutAlt } from "react-icons/fa";
import { UserContext } from "../context/userContext";
import { FiUpload } from "react-icons/fi";
import { IoBanOutline } from "react-icons/io5";



const Sidemenu = () => {
    const token = localStorage.getItem("expense_token");
    const [uploaderLoading, setUploaderLoading] = useState(false);
    const navigate = useNavigate()

    const handleLogout = () => {

        localStorage.clear("expense_token");
        clearUser();
        navigate('/login');
    }

    const handleFileUpload = async (file) => {
        try {
            if (file) {
                setUploaderLoading(true);
                const formData = new FormData();
                formData.append("image", profilePic);

                const uploadRes = await axiosInstance.post("api/v1/auth/upload-image", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                uploadedImageUrl = uploadRes.data.imageUrl;
            }
        } catch (error) {
            console.error("Error uploading file:", error?.response?.data?.message || error.message || "File upload failed");
        } finally {
            setUploaderLoading(false);
        }
    }

    const location = useLocation();
    const { user, clearUser } = useContext(UserContext)

    return (
        <aside className="bg-white text-black w-60 border-black  min-h-screen flex flex-col justify-between">
            {/* Top Menu */}
            <div>
                <div className="p-5 text-2xl font-semibold">
                    Expense Tracker
                </div>
                {/* <div className="flex flex-col items-center p-6 ">
                    {user?.profileImageUrl ? (<img
                        src={user?.profileImageUrl}
                        alt="User img"
                        className="w-20 h-20 rounded-full mb-3 border-2 border-white border-dashed object-cover"
                    />) : (<img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKKOdmJz8Z2pDtYgFgR2u9spABvNNPKYYtGw&s"
                        alt="User img"
                        className="w-20 h-20 rounded-full mb-3 border-2 border-white border-dashed object-cover"
                    />)
                    }

                    <h2 className="text-lg font-semibold">{user?.fullName}</h2>
                </div> */}
                {/* <div className="flex flex-col items-center p-6">
                    <div className="relative">
                        <img
                            src={
                                user?.profileImageUrl
                                    ? user.profileImageUrl
                                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKKOdmJz8Z2pDtYgFgR2u9spABvNNPKYYtGw&s"
                            }
                            alt="User img"
                            className="w-20 h-20 rounded-full mb-3 border-2 border-white border-dashed object-cover"
                        />

                        <button
                            className="absolute bottom-2 right-0 bg-white hover:bg-purple-100 text-white p-2 rounded-full shadow-md"
                        >
                            {user?.profileImageUrl ? <FiUpload color="green" size={14} /> : <IoBanOutline size={14} />}
                        </button>
                    </div>

                    <h2 className="text-lg font-semibold">{user?.fullName}</h2>
                </div> */}
                <div className="flex flex-col items-center mb-6 relative">

                    <div className="relative w-28 h-28">
                        <img
                            src={
                                user?.profileImageUrl ||
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBj-1KIYtvjs4ft-nBOoDvTshg3UtK02xhhA&s"
                            }
                            alt="User"
                            className="w-28 h-28 rounded-full object-cover border border-gray-300 shadow"
                        />

                        <label className="absolute bottom-1 right-1 cursor-pointer">
                            {uploaderLoading ?
                                (<div className="w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center text-md hover:bg-blue-900 shadow">
                                    <MdFileUploadOff />
                                </div>)
                                :
                                (<div className="w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center text-md hover:bg-blue-900 shadow">
                                    <IoCloudUploadOutline />
                                </div>)
                            }

                            <input
                                disabled={uploaderLoading}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFileUpload(e.target.files[0])}
                            />
                        </label>
                        <h2 className="text-lg font-semibold mt-3">{user?.fullName}</h2>

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
                <button type="button" onClick={handleLogout} className="flex items-center gap-3 hover:bg-fuchsia-700 px-5  py-2 rounded cursor-pointer">
                    <FaSignOutAlt />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidemenu;
