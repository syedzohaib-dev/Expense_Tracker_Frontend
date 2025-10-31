import React, { useEffect, useState } from "react";
import Dashboardlayout from "../../components/layouts/Dashboardlayout";
import IncomeOverview from "../../components/IncomeOverview";
import AddIncomeModal from "../../components/AddIncomeModal";
import axios from "axios";
import { Toaster } from 'react-hot-toast';
import IncomeSource from "../../components/IncomeSource";
import axiosInstance from "../../utils/axiosinstance";
import { useNavigate } from "react-router-dom";


const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [incomeSourceDetail, setIncomeSourceDetail] = useState([])


  const fetchIncomeData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("api/v1/income/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIncomeSourceDetail(response?.data)
      const income = response?.data;
      const formattedData = Array.isArray(income) ? income : [income];
      setIncomeData(formattedData);
    } catch (error) {
      console.error("Error fetching income data:", error);
    }
  };
  useEffect(() => {
    fetchIncomeData();
  }, []);

  // Handle new income submit
  const handleAddIncome = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.post("api/v1/income/add", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowModal(false);
      // Refresh income data
      window.location.reload();
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // redirect to login if no token
    }
  }, [navigate]);



  return (
    <Dashboardlayout>
      <Toaster position="top-center" reverseOrder={false} />
      <IncomeOverview
        incomeData={incomeData}
        onAddIncome={() => setShowModal(true)}
      />

      {showModal && (
        <AddIncomeModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddIncome}
        />
      )}

      {/* Income Source */}

      <IncomeSource incomeSourceDetail={incomeSourceDetail} fetchIncomeData={fetchIncomeData} />

    </Dashboardlayout>
  );
};

export default Income;
