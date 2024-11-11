// import React from "react";
// import {
//   Disclosure,
//   DisclosureButton,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuItems,
// } from "@headlessui/react";
// import { useNavigate } from "react-router-dom";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import Logo from "../assets/img/Logo.jpeg";
// import axios from "axios";
// import { removeAuthToken, getAuthToken } from "../Unit-api/CookieUtils";
// import ClipLoader from "react-spinners/ClipLoader";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Cookies from "js-cookie";
// import Sidebar from "../Components/Sidebar"

// export default function Navbar() {
//   const navigate = useNavigate();

//   const handleSignOut = async () => {
//     const token = getAuthToken();

//     console.log("Logging out with token:", token);

//     if (!token) {
//       console.error("No token found. Please log in.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "https://phpstack-362288-4960243.cloudwaysapps.com/api/logout",
//         {},
//         {
//           headers: {
//             Authorization: `${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         removeAuthToken();

//         toast.success("Logout successful!", {
//           position: "bottom-center",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });

//         setTimeout(() => {
//           navigate("/login");
//         }, 3000);
//       } else {
//         console.error("Logout failed:", response.data);

//         toast.error("Logout failed. Please try again.", {
//           position: "bottom-center",
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });
//       }
//     } catch (error) {
//       console.error("Error signing out:", error);

//       toast.error("An error occurred during logout.", {
//         position: "bottom-center",
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });

//       if (error.response) {
//         console.error("Response status:", error.response.status);
//         console.error("Response data:", error.response.data);
//       }
//     }
//   };

//   return (
//     <Disclosure as="nav" className="bg-white border border-gray-200 shadow-md">
//       <div className="mx-auto max-w-full sm:px-6 lg:px-8">
//         <div className="relative flex h-16 justify-between">
//           <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
//             <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//               {/* Mobile menu button */}
//               <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
//                 <span className="absolute -inset-0.5" />
//                 <span className="sr-only">Open main menu</span>
//                 <Bars3Icon
//                   aria-hidden="true"
//                   className="block h-6 w-6 group-data-[open]:hidden"
//                 />
//                 <XMarkIcon
//                   aria-hidden="true"
//                   className="hidden h-6 w-6 group-data-[open]:block"
//                 />
//               </DisclosureButton>
//             </div>
//             <div className="flex flex-shrink-0 items-center">
//               <img
//                 alt="Your Company"
//                 src={Logo}
//                 className="h-10 w-auto hover:cursor-pointer"
//                 onClick={() => navigate("dashboardPage")}
//               />
//             </div>
//           </div>
//           <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//             {/* Profile dropdown */}
//             <Menu as="div" className="relative ml-3">
//               <div className="mr-9">
//                 <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
//                   <span className="absolute -inset-1.5" />
//                   <span className="sr-only">Open user menu</span>
//                   <img
//                     alt=""
//                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                     className="h-8 w-8 rounded-full "
//                   />
//                 </MenuButton>
//               </div>
//               <MenuItems
//                 transition
//                 className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-75 data-[enter]:ease-out data-[leave]:duration-100 data-[leave]:ease-in"
//               >
//                 <MenuItem>
//                   <button
//                     className="block w-full text-center px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md transition duration-150"
//                     onClick={handleSignOut}
//                   >
//                     Sign Out
//                   </button>
//                 </MenuItem>
//               </MenuItems>
//             </Menu>
//           </div>
//         </div>
//         <ToastContainer />
//       </div>
//     </Disclosure>
//   );
// }

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
import Logo from "../assets/img/Logo.jpeg";
import axios from "axios";
import { removeAuthToken, getAuthToken } from "../Unit-api/CookieUtils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Components/Sidebar";

export default function Navbar({
  stores,
  searchTerm,
  loading,
  error,
  onStoreClick,
}) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  console.log("Stores:", stores);
  console.log("Search Term:", searchTerm);
  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("onStoreClick function:", onStoreClick);

  const handleSignOut = async () => {
    const token = getAuthToken();

    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        "https://phpstack-1359771-5009369.cloudwaysapps.com/api/logout",
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        removeAuthToken();
        toast.success("Logout successful!", {
          position: "bottom-center",
          autoClose: 1000,
        });

        setTimeout(() => {
          navigate("/admin/login");
        }, 3000);
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
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>

                  {isSidebarOpen ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>

              <div className="flex flex-shrink-0 items-center">
                <img
                  alt="Your Company"
                  src={Logo}
                  className="h-10 w-auto hover:cursor-pointer"
                  onClick={() => navigate("dashboardPage")}
                />
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Menu as="div" className="relative mr-6">
                <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span className="absolute -inset-1.5" />
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

      {isSidebarOpen && (
        <Sidebar
          stores={stores}
          searchTerm={searchTerm}
          loading={loading}
          error={error}
          onStoreClick={onStoreClick}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
      )}
    </>
  );
}
