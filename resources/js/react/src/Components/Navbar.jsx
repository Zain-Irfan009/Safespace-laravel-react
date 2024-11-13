import React, { useState } from "react";
import {
    Disclosure,
    DisclosureButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/Images/Logo.png";
import axios from "axios";
import { removeAuthToken, getAuthToken } from "../Unit-api/CookieUtils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Components/Sidebar";

export default function Navbar({
                                   setIsSidebarOpen,
                                   stores,
                                   searchTerm,
                                   // setIsAuthenticated,

                                   error,
                               }) {
    const navigate = useNavigate();
    // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSignOut = async () => {
        const token = getAuthToken();
        if (!token) {
            setIsAuthenticated(false);
            navigate("/admin/login");
            return;
        }

        try {
            const response = await axios.post(
                "https://phpstack-1359771-5005546.cloudwaysapps.com/api/logout",
                {},
                { headers: { Authorization: `${token}` } }
            );

            if (response.status === 200) {
                removeAuthToken(); // Remove token first
                // setIsAuthenticated(false); // Update auth state
                // console.log("Auth successful", setIsAuthenticated());
                toast.success("Logout successful!", {
                    position: "bottom-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                });

                setTimeout(() => {
                    navigate("/admin/login");
                }, 1000);
            } else {
                toast.error("Logout failed. Please try again.", {
                    position: "bottom-center",
                });
            }
        } catch (error) {
            toast.error("An error occurred during logout.", {
                position: "bottom-center",
            });
            console.error("Error signing out:", error);
        }
    };

    return (
        <>
            <Disclosure
                as="nav"
                className="relative z-[999] bg-white border border-gray-200 shadow-md "
            >
                <div className="mx-auto max-w-full sm:px-6 lg:px-8">
                    <div className="relative flex h-16 justify-between">
                        <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                            <div className="absolute inset-y-0 left-0 flex items-center lg:hidden md:hidden">
                                <DisclosureButton
                                    className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                    onClick={() => setIsSidebarOpen((prev) => !prev)}
                                >
                                    <span className="sr-only">Open main menu</span>
                                    <Bars3Icon className="block h-6 w-6" />
                                    {/* {isSidebarOpen ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )} */}
                                </DisclosureButton>
                            </div>

                            <div className="flex flex-shrink-0 items-center">
                                <img
                                    alt="Your Company"
                                    src={Logo}
                                    className="h-10 w-auto hover:cursor-pointer"
                                    onClick={() => navigate("/")}
                                />
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <Menu as="div" className="relative mr-6">
                                <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        alt=""
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        className="h-8 w-8 rounded-full"
                                    />
                                </MenuButton>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                                >
                                    <MenuItem>
                                        <button
                                            className="block w-full text-center px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none rounded-md transition duration-150"
                                            onClick={handleSignOut}
                                        >
                                            Sign Out
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </Disclosure>

            {/* Sidebar for Mobile View */}
            {/* {isSidebarOpen && (
        <Sidebar
          stores={stores}
          searchTerm={searchTerm}
          error={error}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
      )} */}
        </>
    );
}

// import React from "react";
// import { Disclosure, DisclosureButton } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import Logo from "../assets/Images/Logo.png";
// import { useNavigate } from "react-router-dom";

// export default function Navbar({ setIsSidebarOpen }) {
//   const navigate = useNavigate();

//   return (
//     <Disclosure as="nav" className="bg-white shadow-md">
//       <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
//         <div className="relative flex h-16 items-center justify-between">
//           <div className="flex items-center">
//             <DisclosureButton
//               onClick={() => setIsSidebarOpen((prev) => !prev)}
//               className="text-gray-500 hover:text-gray-700 lg:hidden"
//             >
//               <span className="sr-only">Open main menu</span>
//               <Bars3Icon className="block h-6 w-6" />
//             </DisclosureButton>
//             <img
//               src={Logo}
//               alt="Your Company"
//               className="h-10 w-auto ml-2"
//               onClick={() => navigate("/")}
//             />
//           </div>
//         </div>
//       </div>
//     </Disclosure>
//   );
// }
