import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
    const [isAuth, setIsAuth] = useState(isAuthenticated);

    useEffect(() => {
        setIsAuth(isAuthenticated);
    }, [isAuthenticated]);

    return isAuth ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { getAuthToken } from "../Unit-api/CookieUtils"; // Import your token retrieval function

// const ProtectedRoute = ({ isAuthenticated, children }) => {
//   const [isAuth, setIsAuth] = useState(isAuthenticated);

//   useEffect(() => {
//     // Check if the token exists
//     const token = getAuthToken();

//     // Update authentication state based on the presence of the token
//     if (token) {
//       setIsAuth(true);
//     } else {
//       setIsAuth(false);
//     }
//   }, [isAuthenticated]);

//   // Navigate to /admin/login if not authenticated
//   return isAuth ? children : <Navigate to="/admin/login" replace />;
// };

// export default ProtectedRoute;
