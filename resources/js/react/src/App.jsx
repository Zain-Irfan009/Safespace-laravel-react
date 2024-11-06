// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate, // Import Navigate instead of redirect
// } from "react-router-dom";
// import Login from "./Components/Login";
// import DashboardLayout from "./Components/DashboardLayout";
// import DashboardPage from "./Pages/DashboardPage";
// import Analytics from "./Pages/Analytics_Page";
// import ProtectedRoute from "./Unit-api/ProtectedRoute";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/admin/login" element={<Login />} />
//         <Route path="/admin" element={<DashboardLayout />}>
//           <Route
//             path=":id"
//             element={
//               <ProtectedRoute>
//                 <DashboardPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="analytics/:pageType"
//             element={
//               <ProtectedRoute>
//                 <Analytics />
//               </ProtectedRoute>
//             }
//           />
//         </Route>
//         <Route path="/" element={<Navigate to="/admin/login" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import DashboardPage from "./Pages/DashboardPage";
import Analytics_Page from "./Pages/Analytics_Page";
import ProtectedRoute from "./Unit-api/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        >
          <Route path=":id" element={<DashboardPage />} />
          <Route path=":id/analytics" element={<Analytics_Page />} />
        </Route>
        <Route path="/" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
