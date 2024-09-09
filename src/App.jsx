import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/template/dashboard";
import Login from "./components/page/Login";
import SignUp from "./components/page/register";
import Plant from "./components/page/plant";
import Overview from "./components/page/Overview"; // เพิ่มหน้า Overview
import Parameter from "./components/page/parameter";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />}>
      <Route path="plant" element={<Plant />} />
      <Route path="overview" element={<Overview />} />
      <Route path="parameter" element={<Parameter />} />
      </Route>
    </Routes>
  );
}

export default App;
