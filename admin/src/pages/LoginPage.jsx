
import React from "react";
import { SignIn } from "@clerk/clerk-react";

import {
  ShieldCheckIcon,
  SparklesIcon,
  TrendingUpIcon,
} from "lucide-react";

/* =========================================================
   LOGIN PAGE
========================================================= */

function LoginPage() {
  return (
    <div
      className="
        relative flex min-h-screen
        items-center justify-center
        overflow-hidden
        bg-[#020617]
        px-4 py-10
      "
    >
      {/* =====================================================
         BACKGROUND EFFECTS
      ===================================================== */}

      {/* TOP GLOW */}
      <div
        className="
          absolute top-0 left-1/2
          h-[500px] w-[500px]
          -translate-x-1/2
          rounded-full
          bg-blue-500/15
          blur-3xl
        "
      />

      {/* BOTTOM GLOW */}
      <div
        className="
          absolute bottom-0 right-0
          h-[350px] w-[350px]
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />

      {/* GRID */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]
          bg-[size:40px_40px]
        "
      />

      {/* =====================================================
         MAIN CONTENT
      ===================================================== */}
      <div
        className="
          relative z-10
          grid w-full max-w-6xl
          overflow-hidden
          rounded-[32px]
          border border-white/10
          bg-white/[0.04]
          shadow-2xl shadow-black/40
          backdrop-blur-2xl
          lg:grid-cols-2
        "
      >
        {/* ===================================================
           LEFT SIDE
        =================================================== */}
        <div
          className="
            relative hidden
            flex-col justify-between
            overflow-hidden
            border-r border-white/10
            p-10
            lg:flex
          "
        >
          {/* OVERLAY */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-br
              from-blue-600/20
              via-cyan-500/10
              to-transparent
            "
          />

          {/* BRAND */}
          <div className="relative z-10">
            <div className="flex items-center gap-4">
              {/* LOGO */}
              <div
                className="
                  flex h-16 w-16 items-center justify-center
                  rounded-3xl
                  bg-gradient-to-br
                  from-blue-600
                  via-cyan-500
                  to-indigo-600
                  shadow-xl shadow-blue-500/30
                "
              >
                <SparklesIcon className="h-8 w-8 text-white" />
              </div>

              {/* TEXT */}
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white">
                  QvonXpert
                </h1>

                <p className="mt-1 text-sm text-gray-400">
                  Modern Commerce Admin Platform
                </p>
              </div>
            </div>

            {/* HERO TEXT */}
            <div className="mt-16">
              <h2
                className="
                  max-w-lg
                  text-5xl font-black
                  leading-tight tracking-tight
                  text-white
                "
              >
                Manage your business smarter.
              </h2>

              <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-300">
                Powerful analytics, orders,
                customers, products and insights —
                all in one modern dashboard.
              </p>
            </div>
          </div>

          {/* FEATURES */}
          <div className="relative z-10 mt-12 space-y-5">
            {[
              {
                icon: (
                  <TrendingUpIcon className="h-5 w-5 text-emerald-400" />
                ),
                title: "Real-Time Analytics",
                description:
                  "Track revenue, sales and customer growth live.",
              },

              {
                icon: (
                  <ShieldCheckIcon className="h-5 w-5 text-blue-400" />
                ),
                title: "Secure Authentication",
                description:
                  "Enterprise-grade authentication powered by Clerk.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="
                  flex items-start gap-4
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.03]
                  p-5
                  backdrop-blur-md
                "
              >
                <div
                  className="
                    flex h-11 w-11 items-center justify-center
                    rounded-xl
                    bg-white/5
                  "
                >
                  {feature.icon}
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================
           RIGHT SIDE
        =================================================== */}
        <div
          className="
            relative flex
            min-h-[700px]
            items-center justify-center
            p-6 sm:p-10
          "
        >
          {/* MOBILE LOGO */}
          <div className="absolute top-6 left-6 lg:hidden">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-12 w-12 items-center justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-blue-600
                  to-cyan-500
                "
              >
                <SparklesIcon className="h-6 w-6 text-white" />
              </div>

              <div>
                <h1 className="text-xl font-bold text-white">
                  QvonXpert
                </h1>

                <p className="text-xs text-gray-400">
                  Admin Platform
                </p>
              </div>
            </div>
          </div>

          {/* SIGN IN CARD */}
          <div
            className="
              w-full max-w-md
              rounded-[28px]
              border border-white/10
              bg-white/[0.04]
              p-3
              shadow-2xl shadow-black/20
              backdrop-blur-xl
            "
          >
            <SignIn
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: `
                    shadow-none
                    bg-transparent
                    border-0
                  `,
                  headerTitle:
                    "text-white text-3xl font-bold",
                  headerSubtitle:
                    "text-gray-400",
                  socialButtonsBlockButton: `
                    bg-white/5
                    border border-white/10
                    text-white
                    hover:bg-white/10
                    transition-all
                  `,
                  formButtonPrimary: `
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                    hover:opacity-90
                    transition-all
                    text-white
                    shadow-lg shadow-blue-500/20
                  `,
                  formFieldInput: `
                    bg-white/5
                    border border-white/10
                    text-white
                    focus:border-blue-500
                    focus:ring-blue-500
                  `,
                  footerActionText:
                    "text-gray-400",
                  footerActionLink:
                    "text-cyan-400 hover:text-cyan-300",
                  formFieldLabel:
                    "text-gray-300",
                  dividerLine:
                    "bg-white/10",
                  dividerText:
                    "text-gray-500",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;