// import React, { useContext } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Login from "./Components/Login";
// import DashboardPage from "./Pages/DashboardPage";
// import AnalyticsPage from "./Pages/AnalyticsPage";
// import ProtectedRoute from "./Unit-api/ProtectedRoute";
// import Profile from "./Web/Pages/Profile";
// import AdminDetails from "./Pages/AdminDetails";
// import Dashboard from "./Pages/Dashboard";
// import Home from "./Web/Pages/Home";
// import SafeSpaceStack from "./Web/Pages/SafeSpaceStack";
// import BussinessDirectry from "./Web/Pages/BussinessDirectry";
// import ApplyForVerifecation from "./Web/Pages/ApplyForVerifecation";
// import { AuthContext } from "./Context/AuthContext";

// function App() {
//   const { token } = useContext(AuthContext);
//   const isAuthenticated = token ? true : false;
//   console.log("in the appp", isAuthenticated, token);
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/safespacestack" element={<SafeSpaceStack />} />
//         <Route path="/businessdirectory" element={<BussinessDirectry />} />
//         <Route
//           path="/applyforverification"
//           element={<ApplyForVerifecation />}
//         />

//         <Route
//           path="/admin/login"
//           element={<Login isAuthenticated={isAuthenticated} />}
//         />

//         <Route
//           path="/admin/"
//           element={
//             <ProtectedRoute isAuthenticated={isAuthenticated}>
//               <DashboardPage />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path=":id" element={<AdminDetails />} />
//           <Route path=":id/analytics" element={<AnalyticsPage />} />
//         </Route>

//         <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React, { useContext } from "react";
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
import Profile from "./Web/Pages/Profile";
import AdminDetails from "./Pages/AdminDetails";
import Dashboard from "./Pages/Dashboard";
import Home from "./Web/Pages/Home";
import SafeSpaceStack from "./Web/Pages/SafeSpaceStack";
import BussinessDirectry from "./Web/Pages/BussinessDirectry";
import ApplyForVerifecation from "./Web/Pages/ApplyForVerifecation";
import TermsPrivacyPolicy from "./Web/Pages/TermsPrivacyPolicy";
import { AuthContext } from "./Context/AuthContext";

function App() {
    const { token } = useContext(AuthContext);
    const isAuthenticated = token ? true : false;

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/safespacestack" element={<SafeSpaceStack />} />
                <Route path="/businessdirectory" element={<BussinessDirectry />} />
                <Route path="/termsprivacypolicy" element={<TermsPrivacyPolicy />} />
                <Route
                    path="/applyforverification"
                    element={<ApplyForVerifecation />}
                />
                <Route
                    path="/admin/login"
                    element={<Login isAuthenticated={isAuthenticated} />}
                />

                {/* Protected Admin Routes */}
                <Route
                    path="/admin/*"
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

                {/* Fallback for unmatched routes */}
                <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
