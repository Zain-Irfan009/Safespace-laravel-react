import React, { useContext } from "react";
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
import logo from "../assets/Images/logo.png";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Context/AuthContext";

export default function Navbar({ setIsSidebarOpen }) {
  const navigate = useNavigate();
  const { logout, token } = useContext(AuthContext);

  const handleSignOut = async () => {
    if (!token) {
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
        logout();
        toast.success("Logout successful!", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
        });

        setTimeout(() => navigate("/admin/login"), 1000);
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
        className="relative z-[999] bg-white border border-gray-200 shadow-md"
      >
        <div className="font-montserrat mx-auto max-w-full sm:px-6 lg:px-8">
          <div className="relative px-4 lg:px-0  flex h-16 justify-between items-center">
            <div className=" inset-y-0 left-0 flex items-center lg:hidden ">
              <DisclosureButton
                className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setIsSidebarOpen((prev) => !prev)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="block h-6 w-6" />
              </DisclosureButton>
            </div>
            <div className="flex items-center  flex-1 justify-center mr-10   md:justify-center lg:justify-start">
              <img
                src={logo}
                alt="Your Company"
                className="h-16 w-auto hover:cursor-pointer"
                onClick={() => navigate("/admin/dashboard")}
              />
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Menu as="div" className="relative mr-6">
                <MenuButton className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User avatar"
                  />
                </MenuButton>
                <MenuItems className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={handleSignOut}
                        className={`block w-full text-center px-4 py-2 text-sm font-semibold text-gray-700 ${
                          active ? "bg-gray-50" : ""
                        } focus:outline-none rounded-md`}
                      >
                        Sign Out
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
          <ToastContainer />
        </div>
      </Disclosure>
    </>
  );
}
