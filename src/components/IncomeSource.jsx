import React, { useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosinstance";



const IncomeSource = ({ incomeSourceDetail }) => {
    const [showAll, setShowAll] = useState(false);

    const visibleTransactions = showAll
        ? incomeSourceDetail
        : incomeSourceDetail.slice(0, 3);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axiosInstance.delete(
                `api/v1/income/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            toast.success("Income deleted successfully!");
            fetchIncomeData();
        } catch (error) {
            console.error("Error deleting income:", error);
            toast.error("Failed to delete income.");
        }
    };

    return (
        <div className="bg-white mt-5 p-6 rounded-2xl shadow-md w-full max-w-xxl mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-700">
                    Income Sources
                </h2>
                <button onClick={() => setShowAll(!showAll)} className="w-[120px] h-[50px] text-blue-600 hover:text-blue-800 text-sm font-medium">
                    {showAll ? "Show Less" : "See All"}
                </button>
            </div>

            <div className="space-y-4">
                {visibleTransactions.map((item, index) => (

                    <div className="flex items-center justify-between" key={index}>
                        <div className="flex items-center gap-3">
                            {
                                item.icon ? (<div className={`w-12 h-10 flex justify-center items-center rounded-full ${item.amount > 2000
                                    ? "bg-green-200 text-green-600"
                                    : "bg-red-200 text-red-600"
                                    }`}>
                                    {item.icon}
                                </div>) : (<div className={`w-12 h-10 flex justify-center items-center rounded-full ${item.amount > 2000
                                    ? "bg-green-200 text-green-600"
                                    : "bg-red-200 text-red-600"
                                    }`}>
                                    🚫
                                </div>)
                            }

                            <span className="text-gray-700 font-medium">{item.source} </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaTrash
                                className="text-red-500 cursor-pointer hover:text-red-700 transition"
                                onClick={() => handleDelete(item._id)}
                            />
                            <span className={`w-[130px] flex justify-center font-semibold ${item.amount > 2000 ? "text-green-600" : "text-red-600"
                                }`}>
                                {item.amount > 0 ? "+" : "-"} Rs {Math.abs(item.amount)}
                            </span>
                            <span>{item.amount > 2000 ? "⬆️" : "⬇️"}</span>
                        </div>
                    </div>

                ))}
            </div>

        </div>
    );
};

export default IncomeSource;
