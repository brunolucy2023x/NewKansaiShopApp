import { Stack } from "expo-router";

import "../global.css";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import {
  ClerkProvider,
} from "@clerk/clerk-expo";

import { tokenCache } from "@clerk/clerk-expo/token-cache";

import * as Sentry from "@sentry/react-native";

import {
  StripeProvider,
} from "@stripe/stripe-react-native";

import {
  ActivityIndicator,
  View,
} from "react-native";

/* =========================================================
   SENTRY
========================================================= */

Sentry.init({
  dsn:
    process.env
      .EXPO_PUBLIC_SENTRY_DSN ||

    "https://fb6731b90610cc08333e6c16ffac5724@o4509813037137920.ingest.de.sentry.io/4510451611205712",

  /* =====================================================
     PII
  ===================================================== */

  sendDefaultPii: true,

  /* =====================================================
     LOGS
  ===================================================== */

  enableLogs: true,

  /* =====================================================
     SESSION REPLAY
  ===================================================== */

  replaysSessionSampleRate:
    1.0,

  replaysOnErrorSampleRate:
    1.0,

  integrations: [
    Sentry.mobileReplayIntegration(),
  ],

  /* =====================================================
     DEBUG
  ===================================================== */

  debug: __DEV__,
});

/* =========================================================
   REACT QUERY
========================================================= */

const queryClient =
  new QueryClient({
    /* ===================================================
       QUERY CACHE
    =================================================== */

    queryCache:
      new QueryCache({
        onError: (
          error: any,
          query
        ) => {
          console.error(
            "QUERY ERROR:",
            error
          );

          Sentry.captureException(
            error,
            {
              tags: {
                type: "react-query-query-error",

                queryKey:
                  query.queryKey?.[0]?.toString() ||
                  "unknown",
              },

              extra: {
                errorMessage:
                  error?.message,

                queryKey:
                  query.queryKey,

                stack:
                  error?.stack,
              },
            }
          );
        },
      }),

    /* ===================================================
       MUTATION CACHE
    =================================================== */

    mutationCache:
      new MutationCache({
        onError: (
          error: any
        ) => {
          console.error(
            "MUTATION ERROR:",
            error
          );

          Sentry.captureException(
            error,
            {
              tags: {
                type: "react-query-mutation-error",
              },

              extra: {
                errorMessage:
                  error?.message,

                stack:
                  error?.stack,
              },
            }
          );
        },
      }),

    /* ===================================================
       DEFAULT OPTIONS
    =================================================== */

    defaultOptions: {
      queries: {
        retry: 1,

        staleTime:
          1000 * 60 * 5,

        gcTime:
          1000 * 60 * 30,

        refetchOnReconnect:
          true,

        refetchOnMount:
          true,

        refetchOnWindowFocus:
          false,
      },

      mutations: {
        retry: 1,
      },
    },
  });

/* =========================================================
   ROOT LAYOUT
========================================================= */

function RootLayout() {
  /* =====================================================
     STRIPE KEY
  ===================================================== */

  const stripeKey =
    process.env
      .EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  /* =====================================================
     LOADING STATE
  ===================================================== */

  if (!stripeKey) {
    return (
      <View
        style={{
          flex: 1,

          justifyContent:
            "center",

          alignItems:
            "center",

          backgroundColor:
            "#020617",
        }}
      >
        <ActivityIndicator
          size="large"
          color="#1DB954"
        />
      </View>
    );
  }

  return (
    <ClerkProvider
      tokenCache={
        tokenCache
      }
    >
      <QueryClientProvider
        client={queryClient}
      >
        {/* ===============================================
           STRIPE
        =============================================== */}

        <StripeProvider
          publishableKey={
            stripeKey
          }
          merchantIdentifier="merchant.com.qvonxpert"
        >
          {/* =============================================
             ROUTES
          ============================================= */}

          <Stack
            screenOptions={{
              headerShown: false,

              animation:
                "slide_from_right",
            }}
          />
        </StripeProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

/* =========================================================
   EXPORT
========================================================= */

export default Sentry.wrap(
  RootLayout
);