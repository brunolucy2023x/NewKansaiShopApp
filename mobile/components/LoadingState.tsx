import {
  View,
  Text,
  ActivityIndicator,
} from "react-native";

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

  color = "#1DB954",
}: LoadingStateProps) => {
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
         LOADER
      ================================================= */}

      <View
        className="
          bg-surface
          rounded-full
          w-28
          h-28
          items-center
          justify-center
          mb-6
        "
      >
        <ActivityIndicator
          size="large"
          color={color}
        />
      </View>

      {/* =================================================
         MESSAGE
      ================================================= */}

      <Text
        className="
          text-text-secondary
          text-base
          text-center
          font-medium
        "
      >
        {message}
      </Text>
    </View>
  );
};

export default LoadingState;