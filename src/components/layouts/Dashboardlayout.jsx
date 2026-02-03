import React, { useState } from "react";
import Navbar from "../Navbar.jsx";
import Sidemenu from "../Sidemenu.jsx";
import { useNavigate } from "react-router-dom";

const Dashboardlayout = ({ children }) => {
    const token = localStorage.getItem("expense_token");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-60 z-30 transition-transform duration-300 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <Sidemenu />
      </div>

      {/* Overlay (Mobile only) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="md:ml-60 flex flex-col min-h-screen">
        {/* Navbar */}
        <div className="fixed top-0 left-0 md:left-60 right-0 z-20 bg-white shadow">
          <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>

        {/* Scrollable Main Area */}
        <main className="flex-1 pt-20 px-4 md:px-8 pb-6 overflow-y-auto min-h-[calc(100vh-5rem)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboardlayout;
