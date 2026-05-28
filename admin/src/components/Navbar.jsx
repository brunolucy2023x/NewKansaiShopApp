"use client";

import React from "react";
import { UserButton } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

import {
  ClipboardListIcon,
  HomeIcon,
  PanelLeftIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "lucide-react";

/* =========================================================
   NAVIGATION ITEMS
========================================================= */

export const NAVIGATION = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    name: "Products",
    path: "/products",
    icon: <ShoppingBagIcon className="h-5 w-5" />,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: <ClipboardListIcon className="h-5 w-5" />,
  },
  {
    name: "Customers",
    path: "/customers",
    icon: <UsersIcon className="h-5 w-5" />,
  },
];

/* =========================================================
   COMPONENT
========================================================= */

function Navbar() {
  const location = useLocation();

  const currentPage =
    NAVIGATION.find((item) =>
      location.pathname.startsWith(item.path)
    )?.name || "Dashboard";

  return (
    <header
      className="
        sticky top-0 z-50
        w-full
        border-b border-white/10
        bg-[#0b1220]/80
        backdrop-blur-xl
        supports-[backdrop-filter]:bg-[#0b1220]/70
      "
    >
      <div className="flex h-16 items-center justify-between px-3 sm:px-5">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-3">
          {/* MOBILE SIDEBAR BUTTON */}
          <label
            htmlFor="my-drawer"
            aria-label="Open Sidebar"
            className="
              btn btn-ghost btn-circle
              hover:bg-white/10
              border border-transparent
              hover:border-white/10
              transition-all duration-300
            "
          >
            <PanelLeftIcon className="h-5 w-5 text-white" />
          </label>

          {/* PAGE TITLE */}
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {currentPage}
            </h1>

            <p className="hidden sm:block text-xs text-gray-400">
              Manage your platform efficiently
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3">
          {/* STATUS BADGE */}
          <div
            className="
              hidden md:flex
              items-center gap-2
              rounded-full
              border border-emerald-500/20
              bg-emerald-500/10
              px-3 py-1.5
              text-xs font-medium text-emerald-400
            "
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            System Online
          </div>

          {/* USER PROFILE */}
          <div
            className="
              flex items-center justify-center
              rounded-full
              border border-white/10
              bg-white/5
              p-1.5
              shadow-lg shadow-black/20
            "
          >
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-10 h-10 ring-2 ring-white/10 hover:ring-blue-500/40 transition-all",
                },
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;