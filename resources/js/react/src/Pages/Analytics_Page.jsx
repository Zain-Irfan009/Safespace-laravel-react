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

const dashboardData = [
  { month: "Jan", percentage: 35 },
  { month: "Feb", percentage: 42 },
  { month: "Mar", percentage: 55 },
  { month: "Apr", percentage: 48 },
  { month: "May", percentage: 65 },
  { month: "Jun", percentage: 70 },
  { month: "Jul", percentage: 75 },
  { month: "Aug", percentage: 80 },
  { month: "Sep", percentage: 85 },
  { month: "Oct", percentage: 90 },
  { month: "Nov", percentage: 95 },
  { month: "Dec", percentage: 100 },
];

const teamData = [
  { month: "Jan", percentage: 30 },
  { month: "Feb", percentage: 35 },
  { month: "Mar", percentage: 50 },
  { month: "Apr", percentage: 60 },
  { month: "May", percentage: 70 },
  { month: "Jun", percentage: 80 },
  { month: "Jul", percentage: 85 },
  { month: "Aug", percentage: 90 },
  { month: "Sep", percentage: 95 },
  { month: "Oct", percentage: 98 },
  { month: "Nov", percentage: 99 },
  { month: "Dec", percentage: 100 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-md border rounded-md">
        <p className="font-semibold">{payload[0].payload.month}</p>
        <p>{`Performance: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const Analytics_Page = () => {
  const navigate = useNavigate();
  const { pageType } = useParams();

  const data = pageType === "team" ? teamData : dashboardData;

  return (
    <div className="">
      <div className="w-auto h-[550px] bg-white rounded-md">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
          >
            <defs>
              <linearGradient id="lineColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
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
              domain={[0, 100]}
              tick={{ fill: "#555", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#ccc" }}
              unit="%"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} />

            <Line
              type="monotone"
              dataKey="percentage"
              stroke="url(#lineColor)"
              strokeWidth={3}
              dot={{ fill: "#555", strokeWidth: 2, r: 5 }}
              activeDot={{ r: 8, fill: "#8884d8" }}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics_Page;
