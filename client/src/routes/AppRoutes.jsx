import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import StudentsList from "../pages/students/StudentsList";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<StudentsList />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
