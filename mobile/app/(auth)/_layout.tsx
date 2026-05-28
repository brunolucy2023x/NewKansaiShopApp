import { Redirect, Stack } from "expo-router";

import { useAuth } from "@clerk/clerk-expo";

import {
  ActivityIndicator,
  View,
} from "react-native";

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } =
    useAuth();

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
          color="#3b82f6"
        />
      </View>
    );
  }

  /* =========================================================
     REDIRECT AUTHENTICATED USERS
  ========================================================= */

  if (isSignedIn) {
    return <Redirect href="/(tabs)" />;
  }

  /* =========================================================
     AUTH STACK
  ========================================================= */

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}