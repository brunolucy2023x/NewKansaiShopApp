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
  icon = "folder-open-outline",

  iconSize = 80,

  title,

  description,

  header,
}: EmptyStateProps) {
  return (
    <View className="flex-1 bg-background">
      {/* =================================================
         HEADER
      ================================================= */}

      {header && (
        <View
          className="
            px-6
            pt-16
            pb-5
          "
        >
          <Text
            className="
              text-text-primary
              text-3xl
              font-bold
              tracking-tight
            "
          >
            {header}
          </Text>

          <Text
            className="
              text-text-secondary
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
        "
      >
        {/* ICON */}

        <View
          className="
            bg-surface
            rounded-full
            w-32
            h-32
            items-center
            justify-center
            mb-6
          "
        >
          <Ionicons
            name={icon}
            size={iconSize}
            color="#666"
          />
        </View>

        {/* TITLE */}

        <Text
          className="
            text-text-primary
            font-bold
            text-2xl
            text-center
          "
        >
          {title}
        </Text>

        {/* DESCRIPTION */}

        {description && (
          <Text
            className="
              text-text-secondary
              text-center
              mt-3
              text-base
              leading-6
              max-w-[320px]
            "
          >
            {description}
          </Text>
        )}
      </View>
    </View>
  );
}