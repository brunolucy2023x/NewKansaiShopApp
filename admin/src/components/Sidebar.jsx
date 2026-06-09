"use client";

import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingBagIcon,
  SparklesIcon,
} from "lucide-react";

import { NAVIGATION } from "./Navbar";

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar() {
  const location = useLocation();
  const { user } = useUser();

  return (
    <div className="drawer-side z-50">
      {/* =====================================================
         MOBILE OVERLAY
      ===================================================== */}
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      />

      {/* =====================================================
         SIDEBAR PANEL
      ===================================================== */}
      <aside
        className="
          min-h-full
          w-72
          border-r border-white/10
          bg-[#07111f]/95
          text-white
          backdrop-blur-2xl
          flex flex-col
        "
      >
        {/* =====================================================
           LOGO
        ===================================================== */}
        <div className="border-b border-white/10 p-5">
          <div className="flex items-center gap-3">
            <div
              className="
                relative
                flex h-12 w-12 items-center justify-center
                rounded-2xl
                bg-gradient-to-br
                from-blue-500
                via-cyan-500
                to-indigo-600
                shadow-lg shadow-blue-500/30
              "
            >
              <ShoppingBagIcon className="h-6 w-6 text-white" />

              <div
                className="
                  absolute
                  -top-1
                  -right-1
                  rounded-full
                  bg-white
                  p-1
                "
              >
                <SparklesIcon className="h-3 w-3 text-blue-600" />
              </div>
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
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
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <p
            className="
              px-3
              pb-3
              text-[11px]
              uppercase
              tracking-[0.2em]
              font-semibold
              text-gray-500
            "
          >
            Navigation
          </p>

          <ul className="space-y-2">
            {NAVIGATION.map((item) => {
              const isActive =
                location.pathname === item.path ||
                location.pathname.startsWith(
                  `${item.path}/`
                );

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      group
                      relative
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      px-4
                      py-3
                      transition-all
                      duration-200

                      ${
                        isActive
                          ? `
                            bg-gradient-to-r
                            from-blue-600
                            to-cyan-500
                            text-white
                            shadow-lg
                            shadow-blue-500/20
                          `
                          : `
                            text-gray-300
                            hover:bg-white/10
                            hover:text-white
                          `
                      }
                    `}
                  >
                    <span className="shrink-0">
                      {item.icon}
                    </span>

                    <span className="font-medium">
                      {item.name}
                    </span>

                    {isActive && (
                      <span
                        className="
                          absolute
                          left-0
                          top-2
                          bottom-2
                          w-1
                          rounded-r-full
                          bg-white
                        "
                      />
                    )}
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
            "
          >
            <img
              src={
                user?.imageUrl ||
                "https://ui-avatars.com/api/?name=User"
              }
              alt="User"
              className="
                h-11
                w-11
                rounded-full
                object-cover
                ring-2
                ring-white/10
              "
            />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {user?.fullName || "Admin User"}
              </p>

              <p className="truncate text-xs text-gray-400">
                {user?.primaryEmailAddress
                  ?.emailAddress || "No email"}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;