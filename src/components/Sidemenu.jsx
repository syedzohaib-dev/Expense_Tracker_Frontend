import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaMoneyBillWave, FaChartPie, FaSignOutAlt } from "react-icons/fa";
import { UserContext } from "../context/userContext";

const Sidemenu = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate('/login')
    }

    

    const location = useLocation(); // get current route
    const { user, clearUser } = useContext(UserContext)
    // console.log(user)
    return (
        <aside className="bg-fuchsia-600 text-white w-60 min-h-screen flex flex-col justify-between">
            {/* Top Menu */}
            <div>
                <div className="p-5 text-2xl font-semibold border-b border-fuchsia-700">
                    Expense Tracker
                </div>
                <div className="flex flex-col items-center p-6 border-b border-fuchsia-700 ">
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
                        className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer transition-colors ${location.pathname === "/dashboard"
                            ? "bg-fuchsia-800"
                            : "hover:bg-fuchsia-700"
                            }`}
                    >
                        <FaHome />
                        <Link to="/dashboard" className="flex-1">
                            Home
                        </Link>
                    </li>

                    {/* Income */}
                    <li
                        className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer transition-colors ${location.pathname === "/income"
                            ? "bg-fuchsia-800"
                            : "hover:bg-fuchsia-700"
                            }`}
                    >
                        <FaMoneyBillWave />
                        <Link to="/income" className="flex-1">
                            Income
                        </Link>
                    </li>

                    {/* Expense */}
                    <li
                        className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer transition-colors ${location.pathname === "/expense"
                            ? "bg-fuchsia-800"
                            : "hover:bg-fuchsia-700"
                            }`}
                    >
                        <FaChartPie />
                        <Link to="/expense" className="flex-1">
                            Expense
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Bottom Logout */}
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
