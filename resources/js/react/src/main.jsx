// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";
//
// import { BrowserRouter } from "react-router-dom";
//
//
// ReactDOM.createRoot(document.getElementById("root")).render(
//
//
//             <App />
//
//
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./Context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
    // <StrictMode>
    <AuthProvider>
        <App />
    </AuthProvider>
    // </StrictMode>
);
