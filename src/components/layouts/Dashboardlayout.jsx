import React, { useState } from 'react'
import Navbar from '../Navbar.jsx'
import Sidemenu from "../Sidemenu.jsx"
import { useNavigate } from 'react-router-dom'

const Dashboardlayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate()

  const token = localStorage.getItem("token");
  if (!token) {
    navigate('/login')
  }

  return (
    <>
      <div className="flex w-full h-screen overflow-hidden bg-gray-100">
        {/* Sidebar (fixed) */}
        <div
          className={`fixed md:static z-20 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0`}
        >
          <Sidemenu />
        </div>

        {/* Overlay (Mobile Only) */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Main Area */}
        <div className="flex flex-col flex-1 ml-60"> {/* same width as sidebar */}
          {/* Navbar (fixed) */}
          <div className="fixed top-0 left-60 right-0 z-10">
            <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          </div>

          {/* Scrollable main content */}
          <main className="mt-16 p-6 overflow-y-auto h-[calc(100vh-4rem)]">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}

export default Dashboardlayout