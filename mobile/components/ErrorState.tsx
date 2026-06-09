import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

/* =========================================================
   TYPES
========================================================= */

interface ErrorStateProps {
  title?: string;

  description?: string;

  onRetry?: () => void;
}

/* =========================================================
   COMPONENT
========================================================= */

export function ErrorState({
  title = "Something went wrong",

  description = "Please check your internet connection and try again.",

  onRetry,
}: ErrorStateProps) {
  return (
    <View
      className="
        flex-1
        bg-white
        items-center
        justify-center
        px-6
      "
    >
      {/* =================================================
         CARD
      ================================================= */}

      <View
        className="
          bg-[#F3F4F6]
          rounded-[36px]
          px-8
          py-12
          items-center
          w-full
          max-w-[340px]
        "
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.05,
          shadowRadius: 12,
          elevation: 3,
        }}
      >
        {/* =================================================
           ICON
        ================================================= */}

        <View
          className="
            w-28
            h-28
            rounded-full
            items-center
            justify-center
            mb-7
          "
          style={{
            backgroundColor:
              "#FEE2E2",
          }}
        >
          <Ionicons
            name="cloud-offline-outline"
            size={54}
            color="#EF4444"
          />
        </View>

        {/* =================================================
           TITLE
        ================================================= */}

        <Text
          className="
            text-black
            font-black
            text-[28px]
            text-center
          "
        >
          {title}
        </Text>

        {/* =================================================
           DESCRIPTION
        ================================================= */}

        <Text
          className="
            text-[#6B7280]
            text-center
            mt-4
            text-[15px]
            leading-7
          "
        >
          {description}
        </Text>

        {/* =================================================
           RETRY BUTTON
        ================================================= */}

        {onRetry && (
          <TouchableOpacity
            onPress={onRetry}
            activeOpacity={0.85}
            className="
              mt-8
              bg-[#D9F26A]
              px-8
              py-5
              rounded-[24px]
              flex-row
              items-center
              justify-center
              w-full
            "
          >
            <Ionicons
              name="refresh"
              size={20}
              color="#111"
            />

            <Text
              className="
                text-black
                font-black
                text-[16px]
                ml-3
              "
            >
              Try Again
            </Text>
          </TouchableOpacity>
        )}

        {/* =================================================
           SUPPORT TEXT
        ================================================= */}

        <Text
          className="
            text-[#9CA3AF]
            text-xs
            text-center
            mt-5
            leading-5
          "
        >
          If the issue continues,
          please try again later.
        </Text>
      </View>
    </View>
  );
}