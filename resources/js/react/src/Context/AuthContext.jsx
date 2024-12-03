import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCallMainApi, setIsCallMainApi] = useState(false);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  const updateToken = (newToken) => {
    if (newToken) {
      Cookies.set("token", newToken, { expires: 5 / 24 });
      setToken(newToken);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };

  const logout = () => updateToken(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: updateToken,
        logout,
        isCallMainApi,
        setIsCallMainApi,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
