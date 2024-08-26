import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/template/dashboard";
import Login from "./components/page/Login";  // นำเข้าหน้า Login

function App() {


  return (
              <Routes>
                <Route path="/" element={<Login />} /> 
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
  );
}

export default App;
