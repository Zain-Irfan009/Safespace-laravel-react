// import { Outlet } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import { getAuthToken } from "../Unit-api/CookieUtils";

// import "react-toastify/dist/ReactToastify.css";

// import Sidebar from "../Components/Sidebar";

// import Navbar from "../Components/Navbar";
// export default function DashboardPage() {
//   const [stores, setStores] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       const token = getAuthToken();
//       console.log("dashg", token);
//       if (!token) {
//         setError("No authentication token found");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch(
//           `https://phpstack-1359771-5005546.cloudwaysapps.com/api/dashboard?search=${searchTerm}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const data = await response.json();
//         setStores(data.stores);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchInitialData();
//   }, [searchTerm]);

//   return (
//     <div>
//       <Navbar
//         stores={stores}
//         searchTerm={searchTerm}
//         setSearchTerm={setSearchTerm}
//         loading={loading}
//         error={error}
//       />

//       <div className="flex min-h-screen">
//         <Sidebar
//           stores={stores}
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           // loading={loading}
//           error={error}
//         />
//         <div className="flex-1 overflow-y-auto bg-gray-100  sm:px-4 lg:px-12">
//           <main className="">
//             <Outlet />
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }

// DashboardPage.jsx;

import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getAuthToken } from "../Unit-api/CookieUtils";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

export default function DashboardPage() {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [searchTerm]);

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
                <div className="flex-1 overflow-y-auto bg-gray-100 sm:px-4 lg:px-7 max-h-[calc(100vh-68px)]">
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}

// import { Outlet, useParams } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import { getAuthToken } from "../Unit-api/CookieUtils";
// import "react-toastify/dist/ReactToastify.css";
// import Sidebar from "../Components/Sidebar";
// import Navbar from "../Components/Navbar";

// export default function DashboardPage() {
//   const [stores, setStores] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const id = location?.pathname?.split("/").pop();

//   useEffect(() => {
//     if (!id) {
//       setError("Store details not found.");
//       setLoading(false);
//       return;
//     }
//     console.log("yyy", id);
//     const fetchInitialData = async () => {
//       const token = getAuthToken();
//       if (!token) {
//         setError("No authentication token found");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch(
//           `https://phpstack-1359771-5005546.cloudwaysapps.com/api/dashboard?search=${searchTerm}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const data = await response.json();
//         setStores(data.stores);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [searchTerm, id]);

//   return (
//     <div>
//       <Navbar
//         stores={stores}
//         searchTerm={searchTerm}
//         setSearchTerm={setSearchTerm}
//         loading={loading}
//         error={error}
//       />

//       <div className="flex">
//         <Sidebar
//           stores={stores}
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           error={error}
//         />
//         <div className="flex-1">
//           <main className="">
//             <Outlet />
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }
