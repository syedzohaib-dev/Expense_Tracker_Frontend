import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import axios from "axios";
import AddExpenseModal from "./AddExpenseModal";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosinstance";

const ExpenseOverview = () => {
    const [expenseData, setExpenseData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ✅ Fetch Expense Data
    const fetchExpenseData = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axiosInstance.get("api/v1/expense/get", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response?.data)
            setExpenseData(response?.data || []);

        } catch (error) {
            console.error("Error fetching expense data:", error);
        }
    };

    useEffect(() => {
        fetchExpenseData();
    }, []);

    // ✅ Prepare Data for Chart
    const chartData = expenseData.map((item) => ({
        date: new Date(item.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
        }),
        amount: Number(item.amount),
    }));

   

   
  const handleDownloadExcel = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(
      "api/v1/expense/downloadexcel",
      {
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expense_details.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error downloading Excel:", error);
  }
};


    return (
        <div className="bg-white p-6 rounded-2xl shadow-md w-full  mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Expense Overview</h2>
                <div className="flex gap-2">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-md transition"
                >
                    + Add Expense
                </button>
                <button
                    onClick={handleDownloadExcel}
                    className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-md transition"
                >
                    📥 Download Excel
                </button>
                </div>
            </div>

            {/* Chart */}
            <div className="h-72 w-full">
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={chartData}
                            margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tick={{ fill: "#6b7280", fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fill: "#6b7280", fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip formatter={(v) => [`Rs ${v}`, "Amount"]} />
                            <Line
                                type="monotone"
                                dataKey="amount"
                                stroke="#8b5cf6"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-center text-gray-500">No expense data found</p>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <AddExpenseModal
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={async (newExpense) => {
                        try {
                            const token = localStorage.getItem("token");
                            await axios.post("http://localhost:3000/api/v1/expense/add", newExpense, {
                                headers: { Authorization: `Bearer ${token}` },
                            });
                            toast.success("Expense added successfully!");
                            setIsModalOpen(false);
                            fetchExpenseData();
                        } catch (error) {
                            console.error("Error adding expense:", error);
                            toast.error("Failed to add expense!");
                        }
                    }}
                />
            )}

        </div>
    );
};

export default ExpenseOverview;
