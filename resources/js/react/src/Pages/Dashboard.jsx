import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://phpstack-1359771-5005546.cloudwaysapps.com/api/dashboard",
          {
            method: "GET",
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setStoreData(data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };

    fetchData();
  }, [token]);

  // If data is still loading or there's an error, display loading state
  if (loading) {
    return (
      <div className="flex flex-col mb-8 mt-8 mx-10">
        {/* Skeleton Loader for Header */}
        <h1 className="text-base font-bold text-gray-900 sm:text-xl md:text-2xl lg:text-2xl mb-4 ">
          <div className="h-10 w-[200px] bg-gray-300 rounded-lg animate-pulse" />
        </h1>

        {/* Skeleton Loader for Cards */}
        <ul
          role="list"
          className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {[...Array(6)].map((_, index) => (
            <li key={index} className="col-span-1 flex rounded-md shadow-sm">
              {/* Skeleton for the colored section */}
              <div className="flex w-16 shrink-0 items-center justify-center rounded-l-md bg-gray-300 animate-pulse" />

              {/* Skeleton for the card content */}
              <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white animate-pulse">
                <div className="flex-1 truncate px-4 py-2">
                  <div className="h-4 bg-gray-300 mb-2" />
                  <div className="h-3 bg-gray-300 w-24" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Map the API response to your projects array
  const projects = [
    {
      name: "Total Stores",
      initials: "TS",
      href: "#",
      stores: storeData.total_stores,
      bgColor: "bg-pink-600",
    },
    {
      name: "Approved Stores",
      initials: "AS",
      href: "#",
      stores: storeData.approved_stores,
      bgColor: "bg-green-500",
    },
    {
      name: "Denied Stores",
      initials: "DS",
      href: "#",
      stores: storeData.denied_stores,
      bgColor: "bg-red-500",
    },
    {
      name: "Paid Stores",
      initials: "PS",
      href: "#",
      stores: storeData.paid_stores,
      bgColor: "bg-green-600",
    },

    {
      name: "Unpaid Stores",
      initials: "US",
      href: "#",
      stores: storeData.unpaid_stores,
      bgColor: "bg-yellow-500",
    },
    {
      name: "Pending Stores",
      initials: "PS",
      href: "#",
      stores: storeData.pending_stores,
      bgColor: "bg-yellow-600",
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="flex flex-col mb-8 mt-8 mx-10">
      {/* Header Section */}
      <h1 className="text-xl font-bold text-gray-900 sm:text-xl md:text-2xl lg:text-2xl mb-4 ">
        Dashboard
      </h1>

      {/* Cards Section */}
      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <li
            key={project.name}
            className="col-span-1 flex rounded-md shadow-sm"
          >
            <div
              className={classNames(
                project.bgColor,
                "flex w-16 shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
              )}
            >
              {project.initials}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <a
                  href={project.href}
                  className="font-medium text-gray-900 hover:text-gray-600"
                >
                  {project.name}
                </a>
                <p className="text-gray-500">{project.stores} Stores</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
