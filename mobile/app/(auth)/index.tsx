import useSocialAuth from "@/hooks/useSocialAuth";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const AuthScreen = () => {
  const {
    loadingStrategy,
    handleSocialAuth,
  } = useSocialAuth();

  const isLoading =
    loadingStrategy !== null;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-8 items-center py-10">
          {/* =====================================================
             HERO IMAGE
          ===================================================== */}

          <Image
            source={require("../../assets/images/auth-image.png")}
            className="w-80 h-80"
            resizeMode="contain"
          />

          {/* =====================================================
             TITLE
          ===================================================== */}

          <View className="items-center mt-2">
            <Text className="text-3xl font-bold text-black">
              Welcome
            </Text>

            <Text className="text-gray-500 text-center mt-2 text-base">
              Sign in to continue to
              QvonXpert
            </Text>
          </View>

          {/* =====================================================
             AUTH BUTTONS
          ===================================================== */}

          <View className="gap-4 mt-8 w-full">
            {/* GOOGLE BUTTON */}

            <TouchableOpacity
              className="
                flex-row items-center justify-center
                bg-white
                border border-gray-300
                rounded-full
                px-6 py-3
              "
              onPress={() =>
                !isLoading &&
                handleSocialAuth(
                  "oauth_google"
                )
              }
              disabled={isLoading}
              style={{
                shadowColor: "#000",

                shadowOffset: {
                  width: 0,
                  height: 1,
                },

                shadowOpacity: 0.08,

                shadowRadius: 4,

                elevation: 2,
              }}
            >
              {loadingStrategy ===
              "oauth_google" ? (
                <ActivityIndicator
                  size="small"
                  color="#4285f4"
                />
              ) : (
                <View className="flex-row items-center justify-center">
                  <Image
                    source={require("../../assets/images/google.png")}
                    className="w-10 h-10 mr-3"
                    resizeMode="contain"
                  />

                  <Text className="text-black font-medium text-base">
                    Continue with Google
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* APPLE BUTTON */}

            <TouchableOpacity
              className="
                flex-row items-center justify-center
                bg-white
                border border-gray-300
                rounded-full
                px-6 py-3
              "
              onPress={() =>
                !isLoading &&
                handleSocialAuth(
                  "oauth_apple"
                )
              }
              disabled={isLoading}
              style={{
                shadowColor: "#000",

                shadowOffset: {
                  width: 0,
                  height: 1,
                },

                shadowOpacity: 0.08,

                shadowRadius: 4,

                elevation: 2,
              }}
            >
              {loadingStrategy ===
              "oauth_apple" ? (
                <ActivityIndicator
                  size="small"
                  color="#000"
                />
              ) : (
                <View className="flex-row items-center justify-center">
                  <Image
                    source={require("../../assets/images/apple.png")}
                    className="w-8 h-8 mr-3"
                    resizeMode="contain"
                  />

                  <Text className="text-black font-medium text-base">
                    Continue with Apple
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* =====================================================
             TERMS
          ===================================================== */}

          <Text className="text-center text-gray-500 text-xs leading-5 mt-8 px-4">
            By signing up, you agree to
            our{" "}
            <Text className="text-blue-500">
              Terms
            </Text>
            ,{" "}
            <Text className="text-blue-500">
              Privacy Policy
            </Text>
            , and{" "}
            <Text className="text-blue-500">
              Cookie Use
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthScreen;