import {
  View,
  Text,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

/* =========================================================
   TYPES
========================================================= */

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;

  iconSize?: number;

  title: string;

  description?: string;

  header?: string;
}

/* =========================================================
   COMPONENT
========================================================= */

export function EmptyState({
  icon = "bag-handle-outline",

  iconSize = 72,

  title,

  description,

  header,
}: EmptyStateProps) {
  return (
    <View className="flex-1 bg-white">
      {/* =================================================
         HEADER
      ================================================= */}

      {header && (
        <View
          className="
            px-6
            pt-16
            pb-4
          "
        >
          <Text
            className="
              text-black
              text-[34px]
              font-black
              tracking-tight
            "
          >
            {header}
          </Text>

          <Text
            className="
              text-[#6B7280]
              text-sm
              mt-2
            "
          >
            Nothing here yet
          </Text>
        </View>
      )}

      {/* =================================================
         CONTENT
      ================================================= */}

      <View
        className="
          flex-1
          items-center
          justify-center
          px-6
          pb-16
        "
      >
        {/* =================================================
           CARD
        ================================================= */}

        <View
          className="
            bg-[#F3F4F6]
            rounded-[38px]
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
             ICON CONTAINER
          ================================================= */}

          <View
            className="
              w-28
              h-28
              rounded-full
              bg-[#D9F26A]
              items-center
              justify-center
              mb-7
            "
          >
            <Ionicons
              name={icon}
              size={iconSize}
              color="#111"
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
              leading-9
            "
          >
            {title}
          </Text>

          {/* =================================================
             DESCRIPTION
          ================================================= */}

          {description && (
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
          )}

          {/* =================================================
             DECORATIVE FOOTER
          ================================================= */}

          <View
            className="
              flex-row
              items-center
              mt-8
            "
          >
            <View className="w-2 h-2 rounded-full bg-[#D9F26A]" />

            <View className="w-2 h-2 rounded-full bg-[#D9F26A] mx-2 opacity-70" />

            <View className="w-2 h-2 rounded-full bg-[#D9F26A] opacity-40" />
          </View>
        </View>
      </View>
    </View>
  );
}