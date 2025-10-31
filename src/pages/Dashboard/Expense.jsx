import React, { useEffect, useState } from 'react'
import Dashboardlayout from '../../components/layouts/Dashboardlayout'
import ExpenseOverview from '../../components/ExpenseOverview'
import AddExpenseModal from '../../components/AddExpenseModal';
import ExpenseDetail from '../../components/ExpenseDetail';
import axios from 'axios';
import axiosInstance from '../../utils/axiosinstance';
import { useNavigate } from 'react-router-dom';

const Expense = () => {
  const [showModal, setShowModal] = useState(false);
  const [expenseData, setExpenseData] = useState([])
  const [expenseDetail, setExpenseDetail] = useState([])


  const handleAddExpense = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.post("api/v1/expense/add", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowModal(false);
      // Refresh income data
      window.location.reload();
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };


  const fetchExpenseData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("api/v1/expense/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenseDetail(response?.data)
      const income = response?.data;
      const formattedData = Array.isArray(income) ? income : [income];
      setExpenseData(formattedData);
    } catch (error) {
      console.error("Error fetching income data:", error);
    }
  };
  useEffect(() => {
    fetchExpenseData();
  }, [])

 const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // redirect to login if no token
    }
  }, [navigate]);


  return (
    <Dashboardlayout>

      <ExpenseOverview />
      {showModal && (
        <AddExpenseModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddExpense}
        />
      )}

      <ExpenseDetail expenseDetail={expenseDetail} fetchExpenseData={fetchExpenseData} />
    </Dashboardlayout>
  )
}

export default Expense