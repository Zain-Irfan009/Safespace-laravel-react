import React from "react";
import { Navigate } from "react-router-dom";
import { getAuthToken } from "../Unit-api/CookieUtils";

const ProtectedRoute = ({ children }) => {
  const token = getAuthToken();

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
