import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { router } from "expo-router";

/* =========================================================
   COMPONENT
========================================================= */

export default function AddressesHeader() {
  return (
    <View
      className="
        px-6
        pb-5
        pt-2
        border-b
        border-surface
        flex-row
        items-center
        bg-background
      "
    >
      {/* =================================================
         BACK BUTTON
      ================================================= */}

      <TouchableOpacity
        onPress={() =>
          router.back()
        }
        className="
          mr-4
          w-11
          h-11
          rounded-full
          bg-surface
          items-center
          justify-center
        "
        activeOpacity={0.7}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="#FFFFFF"
        />
      </TouchableOpacity>

      {/* =================================================
         TITLE
      ================================================= */}

      <View className="flex-1">
        <Text
          className="
            text-text-primary
            text-2xl
            font-bold
          "
        >
          My Addresses
        </Text>

        <Text
          className="
            text-text-secondary
            text-sm
            mt-1
          "
        >
          Manage delivery addresses
        </Text>
      </View>
    </View>
  );
}