import React, {
  ReactNode,
} from "react";

import {
  View,
} from "react-native";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

/* =========================================================
   TYPES
========================================================= */

interface SafeScreenProps {
  children: ReactNode;

  className?: string;
}

/* =========================================================
   COMPONENT
========================================================= */

const SafeScreen = ({
  children,

  className = "",
}: SafeScreenProps) => {
  /* =====================================================
     SAFE AREA
  ===================================================== */

  const insets =
    useSafeAreaInsets();

  return (
    <View
      className={`
        flex-1
        bg-background
        ${className}
      `}
      style={{
        paddingTop:
          insets.top,

        paddingBottom:
          insets.bottom,
      }}
    >
      {children}
    </View>
  );
};

export default SafeScreen;