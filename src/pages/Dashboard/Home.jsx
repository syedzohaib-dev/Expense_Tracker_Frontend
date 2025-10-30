import React, { useEffect, useState } from 'react'
import Dashboardlayout from '../../components/layouts/Dashboardlayout'
import axios from 'axios'

const Home = () => {

  const [dashBoardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token"); // if token is required
      const response = await axios.get("http://localhost:3000/api/v1/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDashboardData(response.data);
      console.log(response.data)
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);


  return (
    <Dashboardlayout>
      <div className='w-[500px] h-[500px]'>
        Home Dashboard
      </div>
    </Dashboardlayout>
  )
}

export default Home