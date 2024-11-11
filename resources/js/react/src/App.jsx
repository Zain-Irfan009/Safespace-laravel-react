import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import DashboardPage from "./Pages/DashboardPage";
import AnalyticsPage from "./Pages/AnalyticsPage";
import ProtectedRoute from "./Unit-api/ProtectedRoute";
import { getAuthToken } from "./Unit-api/CookieUtils";
import AdminDetails from "./Pages/AdminDetails";
import Dashboard from "./Pages/Dashboard";

import Home from "./Web/Pages/Home";
import SafeSpaceStack from "./Web/Pages/SafeSpaceStack";
import BussinessDirectry from "./Web/Pages/BussinessDirectry";
import ApplyForVerifecation from "./Web/Pages/ApplyForVerifecation";

function App() {
    const isAuthenticated = getAuthToken();
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/safespacestack" element={<SafeSpaceStack />} />
                <Route path="/bussinessdirectry" element={<BussinessDirectry />} />
                <Route
                    path="/applyforverifecation"
                    element={<ApplyForVerifecation />}
                />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                >
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path=":id" element={<AdminDetails />} />
                    <Route path=":id/analytics" element={<AnalyticsPage />} />
                </Route>
                <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
// } from "react-router-dom";
// import { getAuthToken, removeAuthToken } from "./Unit-api/CookieUtils";
// import Login from "./Components/Login";
// import DashboardPage from "./Pages/DashboardPage";
// import AnalyticsPage from "./Pages/AnalyticsPage";
// import ProtectedRoute from "./Unit-api/ProtectedRoute";
// import AdminDetails from "./Pages/AdminDetails";
// import Dashboard from "./Pages/Dashboard";
// import Home from "./Web/Pages/Home";
// import SafeSpaceStack from "./Web/Pages/SafeSpaceStack";
// import BussinessDirectry from "./Web/Pages/BussinessDirectry";
// import ApplyForVerifecation from "./Web/Pages/ApplyForVerifecation";

// // AuthWrapper component to handle auth state
// const AuthWrapper = ({ children }) => {
//   const isAuthenticated = getAuthToken();
//   const navigate = useNavigate();

//   // Function to handle logout
//   const handleLogout = () => {
//     removeAuthToken();
//     isAuthenticated(false);
//     navigate("/login");
//   };

//   // Provide auth context to children
//   return React.cloneElement(children, {
//     isAuthenticated,
//     onLogout: handleLogout,
//   });
// };

// // Public Route Component - redirects to dashboard if authenticated
// const PublicRoute = ({ children, isAuthenticated }) => {
//   if (isAuthenticated) {
//     return <Navigate to="/admin/dashboard" replace />;
//   }
//   return children;
// };

// function App() {
//   const isAuthenticated = getAuthToken();

//   return (
//     <Router>
//       <AuthWrapper>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/safespacestack" element={<SafeSpaceStack />} />
//           <Route path="/bussinessdirectry" element={<BussinessDirectry />} />
//           <Route
//             path="/applyforverifecation"
//             element={<ApplyForVerifecation />}
//           />

//           {/* Login Route - redirects to dashboard if already authenticated */}
//           <Route
//             path="/login"
//             element={
//               <PublicRoute isAuthenticated={isAuthenticated}>
//                 <Login />
//               </PublicRoute>
//             }
//           />

//           {/* Protected Admin Routes */}
//           <Route
//             path="/admin"
//             element={
//               <ProtectedRoute isAuthenticated={isAuthenticated}>
//                 <DashboardPage />
//               </ProtectedRoute>
//             }
//           >
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path=":id" element={<AdminDetails />} />
//             <Route path=":id/analytics" element={<AnalyticsPage />} />
//           </Route>

//           {/* Catch all route */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </AuthWrapper>
//     </Router>
//   );
// }

// export default App;
// App.js
//////////////////////////////////////////////////////////////
