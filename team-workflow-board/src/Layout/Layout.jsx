// src/layout/Layout.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Global Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="max-w-5xl mx-auto mt-8 px-4 pb-10">
        <Outlet />
      </div>
    </div>
  );
}
