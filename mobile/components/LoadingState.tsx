import {
  View,
  Text,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

/* =========================================================
   TYPES
========================================================= */

interface LoadingStateProps {
  message?: string;

  color?: string;
}

/* =========================================================
   COMPONENT
========================================================= */

const LoadingState = ({
  message = "Loading...",

  color = "#D9F26A",
}: LoadingStateProps) => {
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
          px-10
          py-12
          items-center
          justify-center
          w-full
          max-w-[320px]
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
            w-24
            h-24
            rounded-full
            items-center
            justify-center
            mb-6
          "
          style={{
            backgroundColor: color,
          }}
        >
          <Ionicons
            name="bag-handle-outline"
            size={34}
            color="#111"
          />
        </View>

        {/* =================================================
           LOADER
        ================================================= */}

        <ActivityIndicator
          size="large"
          color="#111"
        />

        {/* =================================================
           MESSAGE
        ================================================= */}

        <Text
          className="
            text-black
            text-[18px]
            text-center
            font-bold
            mt-6
          "
        >
          {message}
        </Text>

        <Text
          className="
            text-[#6B7280]
            text-center
            text-sm
            mt-2
            leading-6
          "
        >
          Please wait while we prepare
          everything for you.
        </Text>
      </View>
    </View>
  );
};

export default LoadingState;