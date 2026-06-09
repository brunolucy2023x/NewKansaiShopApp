"use client";

import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

/* =========================================================
   DASHBOARD LAYOUT
   - Responsive
   - Mobile Drawer Support
   - Large Tables Friendly
   - Glassmorphism UI
   - Supports All Admin Pages
========================================================= */

function DashboardLayout() {
  return (
    <div className="drawer lg:drawer-open min-h-screen bg-[#030712] text-white">
      {/* =====================================================
         DRAWER TOGGLE
      ===================================================== */}
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
      />

      {/* =====================================================
         MAIN CONTENT AREA
      ===================================================== */}
      <div className="drawer-content flex flex-col min-h-screen">
        {/* =====================================================
           NAVBAR
        ===================================================== */}
        <Navbar />

        {/* =====================================================
           PAGE CONTENT
        ===================================================== */}
        <main className="relative flex-1 overflow-x-hidden">
          {/* Background Effects */}
          <div className="fixed inset-0 -z-20 bg-gradient-to-br from-[#030712] via-[#07111f] to-[#0b1220]" />

          <div className="fixed top-0 right-0 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="fixed bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

          {/* Content Wrapper */}
          <div className="relative z-10 p-3 sm:p-6 lg:p-8 pb-24 md:pb-8">
            <div
              className="
                min-h-[calc(100vh-120px)]
                rounded-3xl
                border border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                shadow-2xl
                overflow-hidden
              "
            >
              {/* Scrollable Content Area */}
              <div className="overflow-x-auto p-4 sm:p-6 lg:p-8">
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* =====================================================
         SIDEBAR
      ===================================================== */}
      <Sidebar />
    </div>
  );
}

export default DashboardLayout;