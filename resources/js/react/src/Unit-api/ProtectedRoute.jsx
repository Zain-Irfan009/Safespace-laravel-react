// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ isAuthenticated, children }) => {
//   const [isAuth, setIsAuth] = useState(isAuthenticated);

//   useEffect(() => {
//     setIsAuth(isAuthenticated);
//   }, [isAuthenticated]);

//   return isAuth ? children : <Navigate to="/admin/login" />;
// };

// export default ProtectedRoute;
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  const isAuthenticated = token ? true : false;
  console.log("isAuthenticated in login", isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
