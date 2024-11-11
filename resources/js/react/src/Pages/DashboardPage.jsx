import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getAuthToken } from "../Unit-api/CookieUtils";

import "react-toastify/dist/ReactToastify.css";

import Sidebar from "../Components/Sidebar";

import Navbar from "../Components/Navbar";
export default function DashboardPage() {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchInitialData = async () => {
            const token = getAuthToken();
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
            } catch (error) {
                setError(error.message);
            }
        };

        fetchInitialData();
    }, [searchTerm]);

    return (
        <div>
            <Navbar
                stores={stores}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                loading={loading}
                error={error}
            />

            <div className="flex">
                <Sidebar
                    stores={stores}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    // loading={loading}
                    error={error}
                />
                <div className="flex-1">
                    <main className="">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}

DashboardPage.jsx;
