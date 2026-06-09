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
        bg-white
        px-6
        pt-4
        pb-5
      "
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
      }}
    >
      {/* =================================================
         TOP ROW
      ================================================= */}

      <View
        className="
          flex-row
          items-center
        "
      >
        {/* =================================================
           BACK BUTTON
        ================================================= */}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            router.back()
          }
          className="
            w-12
            h-12
            rounded-full
            bg-[#F3F4F6]
            items-center
            justify-center
            mr-4
          "
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color="#111"
          />
        </TouchableOpacity>

        {/* =================================================
           TITLE SECTION
        ================================================= */}

        <View className="flex-1">
          <Text
            className="
              text-black
              text-[30px]
              font-black
            "
          >
            My Addresses
          </Text>

          <Text
            className="
              text-[#6B7280]
              text-sm
              mt-1
            "
          >
            Manage delivery addresses
          </Text>
        </View>

        {/* =================================================
           LOCATION ICON
        ================================================= */}

        <View
          className="
            w-12
            h-12
            rounded-2xl
            bg-[#D9F26A]
            items-center
            justify-center
          "
        >
          <Ionicons
            name="location-outline"
            size={22}
            color="#111"
          />
        </View>
      </View>
    </View>
  );
}