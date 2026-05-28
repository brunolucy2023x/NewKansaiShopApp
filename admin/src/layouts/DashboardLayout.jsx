"use client";

import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

/* =========================================================
   FIXED DASHBOARD LAYOUT (NO HIDDEN CONTENT ISSUES)
========================================================= */

function DashboardLayout() {
  return (
    <div className="drawer lg:drawer-open min-h-screen bg-[#030712] text-white">

      {/* Drawer toggle (mobile only) */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* =====================================================
         MAIN CONTENT WRAPPER
      ===================================================== */}
      <div className="drawer-content flex flex-col h-screen overflow-hidden">

        {/* ================= NAVBAR ================= */}
        <header className="shrink-0 z-50 border-b border-white/10 bg-[#030712]/80 backdrop-blur-md">
          <Navbar />
        </header>

        {/* ================= PAGE AREA ================= */}
        <main className="flex-1 overflow-y-auto relative">

          {/* ================= BACKGROUND (FIXED BUT NON-BLOCKING) ================= */}
          <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#030712] via-[#07111f] to-[#0b1220]" />
          <div className="fixed top-0 right-0 -z-10 h-96 w-96 bg-blue-500/10 blur-3xl" />
          <div className="fixed bottom-0 left-0 -z-10 h-96 w-96 bg-cyan-500/10 blur-3xl" />

          {/* ================= CONTENT WRAPPER ================= */}
          <div className="relative z-10 p-4 sm:p-6 lg:p-8">

            {/* IMPORTANT: DO NOT restrict height */}
            <div className="min-h-[calc(100vh-80px)] rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-xl p-4 sm:p-6 lg:p-8">

              {/* ROUTE CONTENT (Add Product, etc.) */}
              <Outlet />

            </div>

          </div>
        </main>
      </div>

      {/* ================= SIDEBAR ================= */}
      <Sidebar />
    </div>
  );
}

export default DashboardLayout;