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
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
