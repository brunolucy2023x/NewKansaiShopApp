import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.jsx";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { ClerkProvider } from "@clerk/clerk-react";

import { BrowserRouter } from "react-router-dom";

import * as Sentry from "@sentry/react";

/* =========================================================
   ENV VARIABLES
========================================================= */

const PUBLISHABLE_KEY =
  import.meta.env
    .VITE_CLERK_PUBLISHABLE_KEY;

const SENTRY_DSN =
  import.meta.env.VITE_SENTRY_DSN;

/* =========================================================
   VALIDATION
========================================================= */

if (!PUBLISHABLE_KEY) {
  throw new Error(
    "Missing Clerk Publishable Key"
  );
}

/* =========================================================
   REACT QUERY
========================================================= */

const queryClient = new QueryClient();

/* =========================================================
   SENTRY
========================================================= */

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,

    sendDefaultPii: true,

    enableLogs: true,

    integrations: [
      Sentry.replayIntegration(),
    ],

    // Session Replay
    replaysSessionSampleRate: 1.0,

    replaysOnErrorSampleRate: 1.0,
  });
}

/* =========================================================
   APP RENDER
========================================================= */

createRoot(
  document.getElementById("root")
).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
      >
        <QueryClientProvider
          client={queryClient}
        >
          <App />
        </QueryClientProvider>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
);