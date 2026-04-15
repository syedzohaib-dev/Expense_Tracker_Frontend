import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { FaBars } from "react-icons/fa";


const Navbar = ({ onMenuClick }) => {
    const { user } = useContext(UserContext)

    return (
        <nav className="fixed top-0 left-0 right-0 md:left-60 bg-white p-4 shadow-md flex items-center justify-between z-40 ">
            <button
                onClick={onMenuClick}
                className="md:hidden text-2xl text-purple-700 focus:outline-none"
            >
                <FaBars />
            </button>
            <h1 className="text-xl font-semibold">Dashboard</h1> 
            <div className="flex items-center gap-3">
                <p className="text-gray-700 font-medium">{user?.user?.fullName}</p>
                {
                    user?.user?.profileImageUrl ? (
                        <img
                            src={user?.user?.profileImageUrl}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover border border-3 border-purple-800 rounded-full"
                        />) : (<img
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover border border-3 border-purple-800 rounded-full"
                        />)
                }

            </div>
        </nav>
    );
};

export default Navbar;
