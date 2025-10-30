import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Last30DaysExpenseChart = ({ lastThirtyDay }) => {
  if (!lastThirtyDay) return null;

  const { total, transactions } = lastThirtyDay;

  const COLORS = ["#FF8042", "#FFBB28", "#FF6666", "#FFB6C1"];

  const data = transactions?.map((t) => ({
    name: t.category,
    value: t.amount,
  }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
        Last 30 Days Expenses
      </h2>

      <div className="h-64 flex flex-col items-center justify-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={3}
              dataKey="value"
              labelLine={false}
            >
              {data?.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        {/* Center total */}
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-sm text-gray-500">Total Expense</p>
          <h3 className="text-2xl font-bold text-gray-800">
            Rs {total}
          </h3>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center flex-wrap gap-4 mt-4">
        {data?.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            ></span>
            <span className="text-sm text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Last30DaysExpenseChart;
