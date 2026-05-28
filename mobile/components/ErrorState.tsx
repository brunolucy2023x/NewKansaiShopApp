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
        bg-background
        items-center
        justify-center
        px-6
      "
    >
      {/* =================================================
         ICON
      ================================================= */}

      <View
        className="
          bg-red-500/10
          rounded-full
          w-32
          h-32
          items-center
          justify-center
          mb-6
        "
      >
        <Ionicons
          name="alert-circle-outline"
          size={72}
          color="#FF6B6B"
        />
      </View>

      {/* =================================================
         TITLE
      ================================================= */}

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

      {/* =================================================
         DESCRIPTION
      ================================================= */}

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

      {/* =================================================
         RETRY BUTTON
      ================================================= */}

      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          activeOpacity={0.8}
          className="
            mt-8
            bg-primary
            px-8
            py-4
            rounded-2xl
            flex-row
            items-center
            justify-center
          "
        >
          <Ionicons
            name="refresh"
            size={20}
            color="#121212"
          />

          <Text
            className="
              text-background
              font-bold
              text-base
              ml-2
            "
          >
            Try Again
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}