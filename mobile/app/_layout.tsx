import { Stack } from "expo-router";
import "../global.css";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

import * as Sentry from "@sentry/react-native";

import { StripeProvider } from "@stripe/stripe-react-native";

import { ActivityIndicator, View, Text } from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";

/* ✅ ADD THIS IMPORT */
import FloatingWhatsApp from "../components/FloatingWhatsApp";

/* =========================================================
   SENTRY
========================================================= */

Sentry.init({
  dsn:
    process.env.EXPO_PUBLIC_SENTRY_DSN ||
    "https://fb6731b90610cc08333e6c16ffac5724@o4509813037137920.ingest.de.sentry.io/4510451611205712",

  sendDefaultPii: true,
  enableLogs: true,

  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,

  integrations: [Sentry.mobileReplayIntegration()],
  debug: __DEV__,
});

/* =========================================================
   REACT QUERY
========================================================= */

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any, query) => {
      console.error("QUERY ERROR:", error);

      Sentry.captureException(error, {
        tags: {
          type: "react-query-query-error",
          queryKey:
            query.queryKey?.[0]?.toString() || "unknown",
        },
        extra: {
          errorMessage: error?.message,
          queryKey: query.queryKey,
          stack: error?.stack,
        },
      });
    },
  }),

  mutationCache: new MutationCache({
    onError: (error: any) => {
      console.error("MUTATION ERROR:", error);

      Sentry.captureException(error, {
        tags: {
          type: "react-query-mutation-error",
        },
        extra: {
          errorMessage: error?.message,
          stack: error?.stack,
        },
      });
    },
  }),

  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      refetchOnReconnect: true,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

/* =========================================================
   LOADING SCREEN
========================================================= */

function AppLoadingScreen() {
  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <View
        className="bg-[#F3F4F6] rounded-[40px] px-10 py-12 items-center w-full max-w-[320px]"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.05,
          shadowRadius: 12,
          elevation: 3,
        }}
      >
        <View className="w-24 h-24 rounded-full bg-[#D9F26A] items-center justify-center mb-6">
          <Text className="text-black text-[28px] font-black">
            QX
          </Text>
        </View>

        <ActivityIndicator size="large" color="#111" />

        <Text className="text-black text-[20px] font-black mt-6">
          Preparing App
        </Text>

        <Text className="text-[#6B7280] text-center text-sm mt-3 leading-6">
          Loading secure services and preparing your experience.
        </Text>
      </View>
    </View>
  );
}

/* =========================================================
   ROOT LAYOUT
========================================================= */

function RootLayout() {
  const stripeKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!stripeKey) {
    return <AppLoadingScreen />;
  }

  return (
    <SafeAreaProvider>
      <ClerkProvider tokenCache={tokenCache}>
        <QueryClientProvider client={queryClient}>
          <StripeProvider
            publishableKey={stripeKey}
            merchantIdentifier="merchant.com.qvonxpert"
          >
            {/* ROUTES */}
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
                contentStyle: { backgroundColor: "#FFFFFF" },
              }}
            />

            {/* ✅ FLOATING WHATSAPP (GLOBAL OVERLAY) */}
            <FloatingWhatsApp />
          </StripeProvider>
        </QueryClientProvider>
      </ClerkProvider>
    </SafeAreaProvider>
  );
}

/* =========================================================
   EXPORT
========================================================= */

export default Sentry.wrap(RootLayout);