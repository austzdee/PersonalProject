// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { jwtDecode } from "jwt-decode";

// ProtectedRoute wrapper
function ProtectedRoute({ token, children }) {
    if (!token) {
        return <Navigate to="/" replace />;
    }
    return children;
}

function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));

    // Decode token safely
    const decoded = token ? jwtDecode(token) : null;
    const username = decoded?.name || "User";
    const role = decoded?.role || "User";

    // Check expiration
    useEffect(() => {
        if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
            handleLogout();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [decoded]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <BrowserRouter>
            <Routes>
                {/* Login Route */}
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

                {/* Dashboard Route */}
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
            </Routes>
        </BrowserRouter>
    );
}

export default App;