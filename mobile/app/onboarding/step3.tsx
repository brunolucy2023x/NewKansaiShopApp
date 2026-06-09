import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";

export default function Step3() {
  const finishOnboarding = async () => {
    await AsyncStorage.setItem(
      "onboardingCompleted",
      "true"
    );

    router.replace("/(auth)" as any);
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem(
      "onboardingCompleted",
      "true"
    );

    router.replace("/(auth)" as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />

      {/* IMAGE SECTION */}

      <View
        className="
          flex-1
          items-center
          justify-center
          px-6
          pt-6
        "
      >
        <Image
          source={require("../../assets/images/ccc.jpg")}
          style={{
            width: "100%",
            height: 320,
            borderRadius: 30,
          }}
          resizeMode="cover"
        />
      </View>

      {/* CONTENT */}

      <View className="px-8 pb-10">
        {/* PAGE INDICATOR */}

        <View className="flex-row justify-center mb-8">
          <View className="w-2 h-2 rounded-full bg-[#D1D5DB] mr-2" />
          <View className="w-2 h-2 rounded-full bg-[#D1D5DB] mr-2" />
          <View className="w-8 h-2 rounded-full bg-[#0F4CFF]" />
        </View>

        {/* TITLE */}

        <Text className="text-black text-[32px] font-black">
          Everything You Need
        </Text>

        {/* DESCRIPTION */}

        <Text
          className="
            text-[#6B7280]
            text-[16px]
            leading-7
            mt-4
          "
        >
          Browse thousands of
          building materials,
          paints, cement,
          roofing products,
          doors and windows
          from trusted suppliers.
        </Text>

        {/* GET STARTED */}

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={finishOnboarding}
          className="
            bg-[#F97316]
            py-5
            rounded-[24px]
            mt-10
          "
        >
          <Text
            className="
              text-center
              text-white
              font-black
              text-lg
            "
          >
            Get Started
          </Text>
        </TouchableOpacity>

        {/* SKIP */}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSkip}
          className="mt-5"
        >
          <Text
            className="
              text-center
              text-[#6B7280]
              font-semibold
            "
          >
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}