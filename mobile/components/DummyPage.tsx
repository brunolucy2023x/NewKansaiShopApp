import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

type Props = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export default function DummyPage({
  title,
  icon,
}: Props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F8FAFC",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <View
        style={{
          width: 90,
          height: 90,
          borderRadius: 25,
          backgroundColor: "#DCFCE7",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons
          name={icon}
          size={42}
          color="#22C55E"
        />
      </View>

      <Text
        style={{
          fontSize: 24,
          fontWeight: "800",
          color: "#0F172A",
          marginTop: 20,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          textAlign: "center",
          color: "#64748B",
          marginTop: 10,
          fontSize: 15,
        }}
      >
        This feature is currently under development.
      </Text>
    </View>
  );
}