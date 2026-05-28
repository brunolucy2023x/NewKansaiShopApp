import { Redirect, Tabs } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import { useAuth } from "@clerk/clerk-expo";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BlurView } from "expo-blur";

import {
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";

/* =========================================================
   TABS LAYOUT
   SUPABASE + CLERK READY
========================================================= */

const TabsLayout = () => {
  const { isSignedIn, isLoaded } =
    useAuth();

  const insets =
    useSafeAreaInsets();

  /* =========================================================
     LOADING
  ========================================================= */

  if (!isLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#020617",
        }}
      >
        <ActivityIndicator
          size="large"
          color="#1DB954"
        />
      </View>
    );
  }

  /* =========================================================
     REDIRECT UNAUTHENTICATED USERS
  ========================================================= */

  if (!isSignedIn) {
    return (
      <Redirect href="/(auth)" />
    );
  }

  /* =========================================================
     TABS
  ========================================================= */

  return (
    <Tabs
      screenOptions={{
        /* =====================================
           COLORS
        ===================================== */

        tabBarActiveTintColor:
          "#1DB954",

        tabBarInactiveTintColor:
          "#B3B3B3",

        /* =====================================
           HEADER
        ===================================== */

        headerShown: false,

        /* =====================================
           TAB BAR STYLE
        ===================================== */

        tabBarStyle: {
          position: "absolute",

          backgroundColor:
            "transparent",

          borderTopWidth: 0,

          height: 72 + insets.bottom,

          paddingTop: 8,

          paddingBottom:
            insets.bottom,

          marginHorizontal: 20,

          marginBottom: 14,

          borderRadius: 28,

          overflow: "hidden",

          elevation: 0,
        },

        /* =====================================
           BLUR BACKGROUND
        ===================================== */

        tabBarBackground: () => (
          <BlurView
            intensity={80}
            tint="dark"
            style={[
              StyleSheet.absoluteFill,

              {
                borderRadius: 28,

                overflow: "hidden",
              },
            ]}
          />
        ),

        /* =====================================
           LABEL STYLE
        ===================================== */

        tabBarLabelStyle: {
          fontSize: 12,

          fontWeight: "600",

          marginTop: 2,
        },

        /* =====================================
           TAB ITEM STYLE
        ===================================== */

        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}
    >
      {/* =====================================================
          SHOP
      ===================================================== */}

      <Tabs.Screen
        name="index"
        options={{
          title: "Shop",

          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="grid"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* =====================================================
          CART
      ===================================================== */}

      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",

          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="cart"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* =====================================================
          PROFILE
      ===================================================== */}

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",

          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="person"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;