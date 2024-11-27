import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const salesData = [
  { month: "Jan", sales: 30 },
  { month: "Feb", sales: 60 },
  { month: "Mar", sales: 50 },
  { month: "Apr", sales: 120 },
  { month: "May", sales: 70 },
  { month: "Jun", sales: 80 },
  { month: "Jul", sales: 90 },
  { month: "Aug", sales: 50 },
  { month: "Sep", sales: 110 },
  { month: "Oct", sales: 120 },
  { month: "Nov", sales: 130 },
  { month: "Dec", sales: 140 },
];

const revenueData = [
  { month: "Jan", revenue: 1000 },
  { month: "Feb", revenue: 1200 },
  { month: "Mar", revenue: 1500 },
  { month: "Apr", revenue: 1800 },
  { month: "May", revenue: 2000 },
  { month: "Jun", revenue: 2200 },
  { month: "Jul", revenue: 2400 },
  { month: "Aug", revenue: 2600 },
  { month: "Sep", revenue: 2800 },
  { month: "Oct", revenue: 3000 },
  { month: "Nov", revenue: 3200 },
  { month: "Dec", revenue: 3400 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-md border rounded-md">
        <p className="font-semibold">{payload[0].payload.month}</p>
        <p>{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const AnalyticsPage = () => {
  const { id, pageType } = useParams();

  const navigate = useNavigate();
  const data = pageType === "revenue" ? revenueData : salesData;
  console.log("aaaaaaa==", id);
  const handleButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className=" px-4 sm:px-4 lg:px-4 bg-gray-100 flex-1 min-h-screen pt-8">
      <div className="flex items-center justify-between mb-8 ">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-2xl">
          Analysis
        </h1>
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg "
          onClick={handleButtonClick}
        >
          View Detail
        </button>
      </div>
      <ResponsiveContainer
        className="bg-white rounded-lg  "
        width="100%"
        height={450}
        // aspect={5 / 2}
      >
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
        >
          <defs>
            <linearGradient id="lineColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#555", fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "#ccc" }}
          />
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fill: "#555", fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "#ccc" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />

          <Line
            type="monotone"
            dataKey={pageType === "revenue" ? "revenue" : "sales"}
            stroke="url(#lineColor)"
            strokeWidth={3}
            dot={{ fill: "#82ca9d", strokeWidth: 2, r: 5 }}
            activeDot={{ r: 8, fill: "#82ca9d" }}
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsPage;
