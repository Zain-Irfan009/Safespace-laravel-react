import { Outlet } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Context/AuthContext";
import { useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
export default function DashboardPage() {
  const { token, setIsCallMainApi, isCallMainApi } = useContext(AuthContext);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchMainData = async () => {
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://phpstack-1359771-5005546.cloudwaysapps.com/api/dashboard?search=${searchTerm}`,
          {
            method: "GET",
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setStores(data.stores);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      } finally {
        setIsCallMainApi(false);
      }
    };

    fetchMainData();
  }, [searchTerm, isCallMainApi]);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div>
      <Navbar setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex h-[calc(100vh-68px)] min-h-[unset] ">
        <Sidebar
          stores={stores}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          loading={loading}
          error={error}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
        <div className="flex-1 overflow-y-auto bg-gray-100 sm:px-4 lg:px-7 max-h-[calc(100vh-68px)] mx-auto md:mx-0">
          <main>
            <Outlet stores={stores} />
            {/* <Outlet /> */}
          </main>
        </div>
      </div>
    </div>
  );
}
