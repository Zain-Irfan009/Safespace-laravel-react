import React, { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { twMerge } from "tailwind-merge";
import { AuthContext } from "../Context/AuthContext";
export default function Login({ setIsAuthenticated, isAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        "https://phpstack-1359771-5005546.cloudwaysapps.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Login response:", data);
        setToken(data?.data.token);

        // Update the authentication state in App
        // setIsAuthenticated(true);

        toast.success("Login successful!", {
          position: "bottom-center",
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          toastClassName: twMerge(
            "bg-indigo-600 text-white p-3 rounded shadow-lg"
          ),
          bodyClassName: twMerge("text-sm font-medium"),
        });

        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
        toast.error("Login failed. Please check your credentials.", {
          position: "bottom-center",
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          toastClassName: twMerge(
            "bg-indigo-600 text-white p-3 rounded shadow-lg"
          ),
          bodyClassName: twMerge("text-sm font-medium"),
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.", {
        position: "bottom-center",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        toastClassName: twMerge(
          "bg-indigo-600 text-white p-3 rounded shadow-lg"
        ),
        bodyClassName: twMerge("text-sm font-medium"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full mx-4 flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="text-sm text-red-600">{errorMessage}</div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? (
                  <ClipLoader color={"#fff"} loading={loading} size={20} />
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
