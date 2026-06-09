import useSocialAuth from "@/hooks/useSocialAuth";
import { useGuestStore } from "../../stores/useGuestStore";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

/* =========================================================
   COMPONENT
========================================================= */

const AuthScreen = () => {
  const { loadingStrategy, handleSocialAuth } = useSocialAuth();

  const isLoading = loadingStrategy !== null;

  const { enableGuestMode } = useGuestStore();

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <LinearGradient
        colors={["#F8FAFC", "#FFFFFF", "#EEF2FF"]}
        locations={[0, 0.5, 1]}
        style={{ flex: 1 }}
      >
        <SafeAreaView className="flex-1 bg-transparent">
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "space-between",
            }}
          >
            {/* =================================================
               TOP HERO SECTION
            ================================================= */}

            <View className="px-6 pt-4">
              {/* NAV */}
              <View className="flex-row items-center justify-between">
                {/* LOGO */}
                <View
                  className="w-[72px] h-[72px] rounded-[28px] bg-white items-center justify-center border border-[#EEF2FF]"
                  style={{
                    shadowColor: "#6366F1",
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.08,
                    shadowRadius: 20,
                    elevation: 6,
                  }}
                >
                  <Image
                    source={require("../../assets/images/logo.png")}
                    style={{
                      width: 56,
                      height: 56,
                    }}
                    resizeMode="contain"
                  />
                </View>

                {/* BRAND BADGE */}
                <View className="bg-[#111827] px-5 py-3 rounded-full flex-row items-center">
                  <View className="w-2 h-2 rounded-full bg-[#22C55E] mr-2" />

                  <Text className="text-white text-[11px] font-black tracking-[2px]">
                    PAINTHUB
                  </Text>
                </View>
              </View>

              {/* HERO CONTENT */}
              <View className="mt-16">
                {/* TAG */}
                <View className="self-start bg-[#EEF2FF] px-4 py-2 rounded-full flex-row items-center">
                  <Ionicons
                    name="sparkles"
                    size={14}
                    color="#4F46E5"
                  />

                  <Text className="text-[#4F46E5] font-bold text-[12px] ml-2">
                    PREMIUM SHOPPING EXPERIENCE
                  </Text>
                </View>

                {/* TITLE */}
                <Text className="text-[#0F172A] text-[42px] leading-[50px] font-black mt-6">
                  Discover{"\n"}
                  Modern Shopping
                </Text>

                {/* SUBTITLE */}
                <Text className="text-[#64748B] text-[16px] leading-8 mt-5 pr-6">
                  Access curated products, seamless checkout, and your
                  personalized premium experience.
                </Text>

                {/* FEATURES */}
                <View className="flex-row flex-wrap mt-8">
                  <FeatureItem label="Fast Checkout" />
                  <FeatureItem label="Secure Payments" />
                  <FeatureItem label="Premium Brands" />
                </View>
              </View>
            </View>

            {/* =================================================
               AUTH CARD
            ================================================= */}

            <View className="px-5 pb-8 mt-14">
              <View
                className="bg-white rounded-[40px] p-7 border border-[#F1F5F9]"
                style={{
                  shadowColor: "#0F172A",
                  shadowOffset: {
                    width: 0,
                    height: 14,
                  },
                  shadowOpacity: 0.08,
                  shadowRadius: 30,
                  elevation: 10,
                }}
              >
                {/* HEADER */}
                <View>
                  <Text className="text-[#0F172A] text-[30px] font-black">
                    Welcome Back
                  </Text>

                  <Text className="text-[#64748B] text-[15px] leading-7 mt-3">
                    Continue with your preferred account to access your
                    personalized shopping dashboard.
                  </Text>
                </View>

                {/* GOOGLE BUTTON */}
                <TouchableOpacity
                  activeOpacity={0.9}
                  disabled={isLoading}
                  onPress={() =>
                    !isLoading && handleSocialAuth("oauth_google")
                  }
                  className="mt-9 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[26px] py-[18px] px-5 flex-row items-center justify-center"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.03,
                    shadowRadius: 4,
                  }}
                >
                  {loadingStrategy === "oauth_google" ? (
                    <ActivityIndicator size="small" color="#111827" />
                  ) : (
                    <>
                      <Image
                        source={require("../../assets/images/google.png")}
                        className="w-7 h-7 mr-3"
                        resizeMode="contain"
                      />

                      <Text className="text-[#111827] text-[15px] font-extrabold">
                        Continue with Google
                      </Text>
                    </>
                  )}
                </TouchableOpacity>

                {/* APPLE BUTTON */}


                {/* =================================================
   GUEST ACCESS BUTTON
================================================= */}


<TouchableOpacity
  activeOpacity={0.85}
  disabled={isLoading}
  onPress={() => {
    enableGuestMode();
    router.replace("/(tabs)");
  }}
  className="mt-5 py-4 flex-row items-center justify-center"
>
  <Ionicons
    name="arrow-forward-circle-outline"
    size={20}
    color="#64748B"
  />

  <Text className="text-[#64748B] text-[15px] font-bold ml-2">
    Continue as Guest
  </Text>
</TouchableOpacity>




                <TouchableOpacity
                  activeOpacity={0.9}
                  disabled={isLoading}
                  onPress={() =>
                    !isLoading && handleSocialAuth("oauth_apple")
                  }
                  className="mt-4 rounded-[26px] py-[18px] px-5 flex-row items-center justify-center overflow-hidden"
                  style={{
                    backgroundColor: "#0F172A",
                  }}
                >
                  <LinearGradient
                    colors={["#111827", "#020617"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                    }}
                  />

                  {loadingStrategy === "oauth_apple" ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <>
                      <Image
                        source={require("../../assets/images/apple.png")}
                        className="w-6 h-6 mr-3"
                        resizeMode="contain"
                      />

                      <Text className="text-white text-[15px] font-extrabold">
                        Continue with Apple
                      </Text>
                    </>
                  )}
                </TouchableOpacity>

                {/* DIVIDER */}
                <View className="flex-row items-center mt-8">
                  <View className="flex-1 h-[1px] bg-[#E2E8F0]" />

                  <View className="mx-4 flex-row items-center">
                    <Ionicons
                      name="shield-checkmark"
                      size={16}
                      color="#22C55E"
                    />

                    <Text className="text-[#64748B] text-[11px] font-extrabold ml-2 tracking-[1px]">
                      SECURE AUTH
                    </Text>
                  </View>

                  <View className="flex-1 h-[1px] bg-[#E2E8F0]" />
                </View>

                {/* TRUST BADGES */}
                <View className="flex-row items-center justify-between mt-7">
                  <TrustItem
                    icon="lock-closed"
                    label="Encrypted"
                  />

                  <TrustItem
                    icon="flash"
                    label="Fast Access"
                  />

                  <TrustItem
                    icon="checkmark-circle"
                    label="Trusted"
                  />
                </View>

                {/* TERMS */}
                <Text className="text-center text-[#94A3B8] text-[12px] leading-6 mt-8 px-3">
                  By continuing, you agree to our{" "}
                  <Text className="text-[#0F172A] font-bold">
                    Terms of Service
                  </Text>
                  ,{" "}
                  <Text className="text-[#0F172A] font-bold">
                    Privacy Policy
                  </Text>{" "}
                  and{" "}
                  <Text className="text-[#0F172A] font-bold">
                    Cookie Policy
                  </Text>
                  .
                </Text>
              </View>

              {/* FOOTER */}
              <View className="items-center mt-8">
                <Text className="text-[#94A3B8] text-[13px] font-medium">
                  Built for modern commerce experiences
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

/* =========================================================
   FEATURE CHIP
========================================================= */

const FeatureItem = ({ label }: { label: string }) => {
  return (
    <View className="bg-white border border-[#E2E8F0] px-4 py-3 rounded-2xl mr-3 mb-3 flex-row items-center">
      <View className="w-2 h-2 rounded-full bg-[#4F46E5] mr-2" />

      <Text className="text-[#0F172A] text-[13px] font-bold">
        {label}
      </Text>
    </View>
  );
};

/* =========================================================
   TRUST ITEM
========================================================= */

const TrustItem = ({
  icon,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}) => {
  return (
    <View className="items-center">
      <View className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] items-center justify-center">
        <Ionicons
          name={icon}
          size={20}
          color="#0F172A"
        />
      </View>

      <Text className="text-[#64748B] text-[11px] font-bold mt-2">
        {label}
      </Text>
    </View>
  );
};

export default AuthScreen;