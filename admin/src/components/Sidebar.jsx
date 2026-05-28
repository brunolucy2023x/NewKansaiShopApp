"use client";

import React from "react";
import { useUser } from "@clerk/clerk-react";
import {
  ShoppingBagIcon,
  SparklesIcon,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { NAVIGATION } from "./Navbar";

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar() {
  const location = useLocation();
  const { user } = useUser();

  return (
    <div className="drawer-side z-40">
      {/* OVERLAY */}
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay backdrop-blur-sm"
      />

      {/* SIDEBAR */}
      <aside
        className="
          flex min-h-full flex-col
          border-r border-white/10
          bg-[#07111f]/95
          text-white
          backdrop-blur-2xl
          transition-all duration-300
          is-drawer-close:w-20
          is-drawer-open:w-72
        "
      >
        {/* =====================================================
           LOGO SECTION
        ===================================================== */}
        <div className="border-b border-white/10 p-4">
          <div className="flex items-center gap-3">
            {/* LOGO */}
            <div
              className="
                relative flex h-12 w-12 items-center justify-center
                rounded-2xl
                bg-gradient-to-br
                from-blue-500
                via-cyan-500
                to-indigo-600
                shadow-lg shadow-blue-500/20
                shrink-0
              "
            >
              <ShoppingBagIcon className="h-6 w-6 text-white" />

              <div
                className="
                  absolute -right-1 -top-1
                  rounded-full
                  bg-white
                  p-1
                "
              >
                <SparklesIcon className="h-3 w-3 text-blue-600" />
              </div>
            </div>

            {/* BRAND */}
            <div className="is-drawer-close:hidden">
              <h1 className="text-lg font-extrabold tracking-tight">
                QvonXpert
              </h1>

              <p className="text-xs text-gray-400">
                Admin Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
           NAVIGATION
        ===================================================== */}
        <div className="flex-1 overflow-y-auto px-3 py-5">
          <p
            className="
              mb-3 px-3
              text-[11px]
              font-semibold
              uppercase tracking-[0.2em]
              text-gray-500
              is-drawer-close:hidden
            "
          >
            Navigation
          </p>

          <ul className="flex flex-col gap-2">
            {NAVIGATION.map((item) => {
              const isActive =
                location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      group relative flex items-center gap-3
                      overflow-hidden
                      rounded-2xl
                      px-4 py-3
                      transition-all duration-300

                      ${
                        isActive
                          ? `
                            bg-gradient-to-r
                            from-blue-600
                            to-cyan-500
                            text-white
                            shadow-lg shadow-blue-500/20
                          `
                          : `
                            text-gray-300
                            hover:bg-white/10
                            hover:text-white
                          `
                      }
                    `}
                  >
                    {/* ACTIVE GLOW */}
                    {isActive && (
                      <div
                        className="
                          absolute inset-0
                          bg-white/5
                        "
                      />
                    )}

                    {/* ICON */}
                    <div className="relative z-10 shrink-0">
                      {item.icon}
                    </div>

                    {/* TEXT */}
                    <span
                      className="
                        relative z-10
                        font-medium
                        is-drawer-close:hidden
                      "
                    >
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* =====================================================
           USER PROFILE
        ===================================================== */}
        <div className="border-t border-white/10 p-4">
          <div
            className="
              flex items-center gap-3
              rounded-2xl
              border border-white/10
              bg-white/5
              p-3
              backdrop-blur-md
            "
          >
            {/* AVATAR */}
            <div className="shrink-0">
              <img
                src={
                  user?.imageUrl ||
                  "https://ui-avatars.com/api/?name=User"
                }
                alt={
                  user?.fullName ||
                  "User Avatar"
                }
                className="
                  h-11 w-11 rounded-full
                  object-cover
                  ring-2 ring-white/10
                "
              />
            </div>

            {/* USER INFO */}
            <div className="min-w-0 flex-1 is-drawer-close:hidden">
              <p className="truncate text-sm font-semibold text-white">
                {user?.firstName || "User"}{" "}
                {user?.lastName || ""}
              </p>

              <p className="truncate text-xs text-gray-400">
                {user?.primaryEmailAddress?.emailAddress ||
                  "No email"}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;