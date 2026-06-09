import { router } from "expo-router";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";

export default function Step1() {
  const handleNext = () => {
    router.push("/onboarding/step2" as any);
  };

  const handleSkip = () => {
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
          source={require("../../assets/images/aaa.jpg")}
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
        {/* INDICATOR */}

        <View className="flex-row justify-center mb-8">
          <View className="w-8 h-2 rounded-full bg-[#0F4CFF] mr-2" />
          <View className="w-2 h-2 rounded-full bg-[#D1D5DB] mr-2" />
          <View className="w-2 h-2 rounded-full bg-[#D1D5DB]" />
        </View>

        {/* TITLE */}

        <Text className="text-black text-[32px] font-black">
          Build Your Dream Project
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
          Shop paints, cement,
          roofing materials,
          windows, doors and
          thousands of quality
          construction products
          from trusted suppliers.
        </Text>

        {/* NEXT BUTTON */}

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleNext}
          className="
            bg-[#0F4CFF]
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
            Next
          </Text>
        </TouchableOpacity>

        {/* SKIP BUTTON */}

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