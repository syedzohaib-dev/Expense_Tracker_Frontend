import React, { useEffect, useState } from "react";
import Dashboardlayout from "../../components/layouts/Dashboardlayout";
import axios from "axios";
import { FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa";
import RecentTransactions from "../../components/RecentTransactions ";
import Financialoverview from "../../components/Financialoverview ";
import Last60DaysIncomeChart from "../../components/Last60DaysIncomeChart";
import Last30DaysExpenseChart from "../../components/Last30DaysExpenseChart ";
import axiosInstance from "../../utils/axiosinstance";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("expense_token");
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const [transactionsDetail, setTransactionsDetail] = useState([])
  const [lastSixtyDay, setLastSixtyDay] = useState({})
  const [lastThirtyDay, setLastThirtyDay] = useState({})

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("expense_token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {

        const response = await axiosInstance.get("api/v1/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response?.data)



        setBalance(response?.data.totalBalance);
        setIncome(response?.data.totalIncome);
        setExpense(response?.data.totalExpense);
        setTransactionsDetail(response?.data.recentTransactions)
        setLastSixtyDay(response?.data.last60DaysIncome)
        setLastThirtyDay(response?.data.last30DaysExpenses)


      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <Dashboardlayout>
      <div className="max-w-7xl mx-auto w-full h-[500px] space-y-6">
        <h2 className="text-xl font-semibold text-gray-700">Overview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl shadow-sm flex-col overflow-hidden flex items-center justify-between">
            <div className="w-full h-3 bg-blue-600"></div>
            <div className="w-full flex justify-between items-center p-4">
              <div>
                <h3 className="text-sm text-gray-500">Total Balance</h3>
                <p className="mt-2 text-2xl font-semibold text-gray-800">
                  ₨ {balance}
                </p>
              </div>
              <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                <FaWallet className="text-2xl" />
              </div>
            </div>
          </div>


          <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col items-center justify-between">
            <div className="w-full h-3 bg-green-600"></div>
            <div className="w-full flex justify-between items-center p-4">
              <div>
                <h3 className="text-sm text-gray-500">Total Income</h3>
                <p className="mt-2 text-2xl font-semibold text-green-600">
                  ₨ {income.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-50 text-green-600 p-3 rounded-lg">
                <FaArrowUp className="text-2xl" />
              </div>
            </div>
          </div>


          <div className="bg-white rounded-xl shadow-sm flex flex-col overflow-hidden items-center justify-between">
            <div className="w-full h-3 bg-red-600"></div>
            <div className="w-full flex justify-between items-center p-4">
              <div>
                <h3 className="text-sm text-gray-500">Total Expense</h3>
                <p className="mt-2 text-2xl font-semibold text-red-600">
                  ₨ {expense.toLocaleString()}
                </p>
              </div>
              <div className="bg-red-50 text-red-600 p-3 rounded-lg">
                <FaArrowDown className="text-2xl" />
              </div>
            </div>
          </div>
        </div>



        <RecentTransactions transactionsDetail={transactionsDetail} />

        <Financialoverview
          balance={balance}
          income={income}
          expense={expense}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full py-4">
          <Last30DaysExpenseChart lastThirtyDay={lastThirtyDay} />
          <Last60DaysIncomeChart lastSixtyDay={lastSixtyDay} />

        </div>

      </div>
    </Dashboardlayout>
  );
};

export default Home;
