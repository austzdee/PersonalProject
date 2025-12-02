// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeList from "./components/EmployeeList";
import { jwtDecode } from "jwt-decode";
import Register from "./pages/Register";

function ProtectedRoute({ token, children }) {
    return token ? children : <Navigate to="/" replace />;
}

function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const decoded = token ? jwtDecode(token) : null;
    const username = decoded?.name || "User";
    const role = decoded?.role || "User";
    console.log("Decoded JWT:", decoded);

    useEffect(() => {
        if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
            handleLogout();
        }
    }, [decoded]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <BrowserRouter>
            <Routes>
                {/* Login route */}
                <Route
                    path="/"
                    element={
                        token ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <Login onLogin={setToken} />
                        )
                    }
                />
                {/* Register route */}
                <Route path="/register" element={<Register />} />
                {/* Dashboard route */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute token={token}>
                            <Dashboard
                                token={token}
                                onLogout={handleLogout}
                                username={username}
                                role={role}
                            />
                        </ProtectedRoute>
                    }
                />
                {/* Employees route */}
                <Route
                    path="/employees"
                    element={
                        <ProtectedRoute token={token}>
                            <EmployeeList />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;