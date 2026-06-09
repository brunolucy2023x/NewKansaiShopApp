"use client";

import React from "react";
import { UserButton } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";

import {
  ClipboardListIcon,
  HomeIcon,
  PanelLeftIcon,
  ShoppingBagIcon,
  UsersIcon,
  LayersIcon,
  TagsIcon,
  UserCheckIcon,
  HelpCircleIcon,
  StarIcon,
  MessageSquareIcon,
  SparklesIcon,
  BookOpenIcon,
  MapPinIcon,
  FileTextIcon,
} from "lucide-react";

/* =========================================================
   ALL NAVIGATION ITEMS
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

  // Additional Admin Pages
  {
    name: "Categories",
    path: "/categories",
    icon: <LayersIcon className="h-5 w-5" />,
  },
  {
    name: "Deals",
    path: "/deals",
    icon: <TagsIcon className="h-5 w-5" />,
  },
  {
    name: "Experts",
    path: "/experts",
    icon: <UserCheckIcon className="h-5 w-5" />,
  },
  {
    name: "FAQ",
    path: "/faq",
    icon: <HelpCircleIcon className="h-5 w-5" />,
  },
  {
    name: "Featured Products",
    path: "/featured-products",
    icon: <StarIcon className="h-5 w-5" />,
  },
  {
    name: "Messages",
    path: "/messages",
    icon: <MessageSquareIcon className="h-5 w-5" />,
  },
  {
    name: "New Arrivals",
    path: "/new-arrivals",
    icon: <SparklesIcon className="h-5 w-5" />,
  },
  {
    name: "Painting Tips",
    path: "/painting-tips",
    icon: <BookOpenIcon className="h-5 w-5" />,
  },
  {
    name: "Store Locations",
    path: "/store-locations",
    icon: <MapPinIcon className="h-5 w-5" />,
  },
  {
    name: "Content Manager",
    path: "/content-manager",
    icon: <FileTextIcon className="h-5 w-5" />,
  },
];

/* =========================================================
   MOBILE NAVIGATION
   (Keep only important items)
========================================================= */

const MOBILE_NAVIGATION = [
  NAVIGATION[0], // Dashboard
  NAVIGATION[1], // Products
  NAVIGATION[2], // Orders
  NAVIGATION[3], // Customers
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
    <>
      {/* =====================================================
          TOP NAVBAR
      ===================================================== */}
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
            <label
              htmlFor="my-drawer"
              aria-label="Open Sidebar"
              className="
                btn btn-ghost btn-circle
                md:flex
                hover:bg-white/10
                border border-transparent
                hover:border-white/10
                transition-all duration-300
              "
            >
              <PanelLeftIcon className="h-5 w-5 text-white" />
            </label>

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

      {/* =====================================================
          MOBILE BOTTOM NAVIGATION
      ===================================================== */}
      <nav
        className="
          md:hidden
          fixed bottom-0 left-0 right-0
          z-50
          border-t border-white/10
          bg-[#0b1220]/95
          backdrop-blur-xl
          pb-safe
        "
      >
        <div className="grid grid-cols-4 h-16">
          {MOBILE_NAVIGATION.map((item) => {
            const isActive = location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  relative
                  flex flex-col items-center justify-center
                  transition-all duration-200
                  ${
                    isActive
                      ? "text-blue-400"
                      : "text-gray-400 hover:text-white"
                  }
                `}
              >
                <div
                  className={`
                    flex items-center justify-center
                    ${
                      isActive
                        ? "scale-110"
                        : "scale-100"
                    }
                    transition-transform
                  `}
                >
                  {item.icon}
                </div>

                <span className="mt-1 text-[11px] font-medium">
                  {item.name}
                </span>

                {isActive && (
                  <span className="absolute bottom-0 h-1 w-10 rounded-t-full bg-blue-500" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

export default Navbar;