import axios from "axios";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import axiosInstance from "../utils/axiosinstance";

const IncomeOverview = ({ incomeData, onAddIncome }) => {
  if (!incomeData || incomeData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-4xl mx-auto text-center text-gray-500">
        <h2 className="text-lg font-semibold mb-4">Income Overview</h2>
        <p>No income data found</p>
      </div>
    );
  }

  const data = incomeData.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    amount: item.amount,
  }));

  const handleDownloadExcel = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.get(
        "api/v1/income/downloadexcel",
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
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading Excel:", error);
    }
  };



  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full  mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Income Overview</h2>
        <div className="flex gap-2">
          <button
            onClick={onAddIncome}
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-md transition"
          >
            + Add Income
          </button>
          <button
            onClick={handleDownloadExcel}
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-md transition"
          >
            📥 Download Excel
          </button>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
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
            <Bar dataKey="amount" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeOverview;
