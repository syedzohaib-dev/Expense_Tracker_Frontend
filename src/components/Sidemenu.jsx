import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaMoneyBillWave, FaChartPie, FaSignOutAlt } from "react-icons/fa";
import { UserContext } from "../context/userContext";

const Sidemenu = () => {
    const navigate = useNavigate()

    const handleLogout = () => {

        localStorage.clear("expense_token");
        clearUser();
        navigate('/login');
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
                <div className="flex flex-col items-center p-6 ">
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
