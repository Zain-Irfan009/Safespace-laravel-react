import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isCallMainApi, setIsCallMainApi] = useState(false);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
    }
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
