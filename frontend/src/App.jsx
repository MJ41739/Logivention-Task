import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"
import UserDashboard from "./pages/UserDashboard"

function App() {
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")

  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            token && role === "admin"
              ? <AdminDashboard />
              : <Navigate to="/login" replace />
          }
        />

        {/* USER */}
        <Route
          path="/user"
          element={
            token && role === "user"
              ? <UserDashboard />
              : <Navigate to="/login" replace />
          }
        />

        {/* DEFAULT */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App
