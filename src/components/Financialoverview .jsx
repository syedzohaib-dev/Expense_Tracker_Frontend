import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";

const Financialoverview = ({ balance, income, expense }) => {
    const data = [
        { name: "Balance", value: balance },
        { name: "Income", value: income },
        { name: "Expense", value: expense },
    ];

    const COLORS = ["#FFA500", "#0088FE", "#FF4444"]; // orange, blue, red
    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md w-full  mx-auto">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Financial Overview
            </h2>

            <div className="h-64 flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            fill="#8884d8"
                            paddingAngle={3}
                            dataKey="value"
                            labelLine={false}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>

                <div className="text-center">
                    <p className="text-sm text-gray-500">Total Balance</p>
                    <h3 className="text-2xl font-bold text-gray-800">Rs {balance}</h3>
                </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                    <span className="text-sm text-gray-600">Balance</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="text-sm text-gray-600">Income</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="text-sm text-gray-600">Expense</span>
                </div>
            </div>
        </div>
    );
};

export default Financialoverview;
