import React, { useState } from "react";



const RecentTransactions = ({ transactionsDetail }) => {
    const [showAll, setShowAll] = useState(false);


    const visibleTransactions = showAll
        ? transactionsDetail
        : transactionsDetail.slice(0, 3);


    return (
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-xxl mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-700">
                    Recent Transactions
                </h2>
                <button onClick={() => setShowAll(!showAll)} className="w-[120px] h-[50px] text-blue-600 hover:text-blue-800 text-sm font-medium">
                    {showAll ? "Show Less" : "See All"}
                </button>
            </div>

            <div className="space-y-4">
                {visibleTransactions.map((item, index) => (

                    <div className="flex items-center justify-between" key={index}>
                        <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-full ${item.amount > 0
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                                }`}>
                                💰
                            </div>
                            <span className="text-gray-700 font-medium">{item.source || item.category} </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`font-semibold ${item.amount > 0 ? "text-green-600" : "text-red-600"
                                }`}>
                                {item.amount > 0 ? "+" : "-"} Rs {Math.abs(item.amount)}
                            </span>
                            <span>{item.amount > 0 ? "⬆️" : "⬇️"}</span>
                        </div>
                    </div>

                ))}
            </div>

        </div>
    );
};

export default RecentTransactions;
