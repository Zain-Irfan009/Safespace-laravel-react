import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-md border rounded-md">
        <p className="font-semibold">{payload[0].payload.month}</p>
        <p>{`Orders: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const AnalyticsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const [storeName, setStoreName] = useState("");

  const apiUrl = `https://phpstack-1359771-5005546.cloudwaysapps.com/api/analytics/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: ` ${token}`,
          },
        });
        const result = await response.json();
        setStoreName(result.shop_name || "");
        if (result.success && result.data) {
          const formattedData = Object.entries(result.data).map(
            ([month, value]) => ({
              month,
              value,
            })
          );
          setChartData(formattedData);
        } else {
          console.error("Failed to fetch data:", result.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, token]);

  const handleButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className="px-4 sm:px-4 lg:px-4 bg-gray-100 flex-1 min-h-screen pt-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-2xl">
          {loading ? (
            <Skeleton width={300} height={40} className="rounded-lg" />
          ) : (
            storeName
          )}
        </h1>
        {loading ? (
          <Skeleton
            width={110}
            height={40}
            borderRadius={8}
            className="rounded-lg"
          />
        ) : (
          <button
            className="bg-indigo-600 text-white text-sm py-1 px-2 lg:py-2 lg:px-4 lg:text-base md:py-2 md:px-4 md:text-base sm:text-sm sm:py-1 sm:px-2 rounded-md"
            onClick={handleButtonClick}
          >
            View Detail
          </button>
        )}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-xl p-4">
        {loading ? (
          <Skeleton height={450} className="rounded-xl" />
        ) : chartData.length > 0 ? (
          <>
            <div className="flex flex-wrap justify-around items-center gap-2 ">
              <span className="text-[#8884d8] font-semibold text-sm sm:text-base md:text-lg">
                Before
              </span>
              <span className="text-[#8884d8] font-semibold text-sm sm:text-base md:text-lg">
                After
              </span>
            </div>

            <ResponsiveContainer width="100%" height={450}>
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
              >
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
                {/* <Legend verticalAlign="top" height={36} /> */}
                <ReferenceLine
                  x={chartData[Math.floor(chartData.length / 2)]?.month}
                  stroke="gray"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  ifOverflow="extendDomain"
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  strokeWidth={3}
                  dot={{ fill: "#8884d8", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 8, fill: "#8884d8" }}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        ) : (
          <div className="flex items-center justify-center h-96 text-gray-500 text-3xl font-medium">
            No Record Found
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;
