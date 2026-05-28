"use client";

import React from "react";
import { Loader2Icon } from "lucide-react";

function PageLoader() {
  return (
    <div
      className="
        relative flex min-h-screen w-full
        items-center justify-center
        overflow-hidden
        bg-[#060816]
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_35%)]
        "
      />

      <div
        className="
          absolute bottom-0 left-1/2
          h-72 w-72 -translate-x-1/2
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />

      {/* LOADER CARD */}
      <div
        className="
          relative z-10
          flex flex-col items-center gap-5
          rounded-3xl
          border border-white/10
          bg-white/5
          px-10 py-8
          shadow-2xl shadow-black/30
          backdrop-blur-xl
        "
      >
        {/* SPINNER */}
        <div className="relative flex items-center justify-center">
          <div
            className="
              absolute h-20 w-20
              rounded-full
              border border-blue-500/20
            "
          />

          <Loader2Icon
            className="
              h-12 w-12
              animate-spin
              text-blue-400
            "
          />
        </div>

        {/* TEXT */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-white">
            Loading Application
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Please wait while we prepare your experience...
          </p>
        </div>

        {/* LOADING BAR */}
        <div className="w-56 overflow-hidden rounded-full bg-white/10">
          <div
            className="
              h-1.5 w-1/2
              animate-pulse
              rounded-full
              bg-gradient-to-r
              from-blue-500
              via-cyan-400
              to-blue-500
            "
          />
        </div>
      </div>
    </div>
  );
}

export default PageLoader;