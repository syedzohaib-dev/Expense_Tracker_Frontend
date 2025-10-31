import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { FaBars } from "react-icons/fa";


const Navbar = ({ onMenuClick }) => {
    const { user } = useContext(UserContext)

    return (
        <nav className="fixed top-0 left-0 right-0 md:left-60 bg-white p-4 shadow-md flex items-center justify-between z-40">
            <button
                onClick={onMenuClick}
                className="md:hidden text-2xl text-purple-700 focus:outline-none"
            >
                <FaBars />
            </button>
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div className="flex items-center gap-3">
                <p className="text-gray-700 font-medium">{user?.fullName}</p>
                {
                    user?.profileImageUrl ? (<img
                        src={user?.profileImageUrl}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                    />) : (<img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKKOdmJz8Z2pDtYgFgR2u9spABvNNPKYYtGw&s"
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                    />)
                }

            </div>
        </nav>
    );
};

export default Navbar;
