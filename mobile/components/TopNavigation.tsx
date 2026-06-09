import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";

export default function TopNavigation() {
  const pathname = usePathname();

  const tabs = [
    { icon: "home", route: "/(tabs)" },
    { icon: "search", route: "/(tabs)/search" },
    { icon: "cube", route: "/(tabs)/orders" },
    { icon: "cart", route: "/(tabs)/cart" },
    { icon: "person", route: "/(tabs)/profile" },
  ];

  return (
    <View style={{ backgroundColor: "#F1F5F9", paddingTop: 18 }}>
      {/* MODERN HERO BAR */}
      <View
        style={{
          marginHorizontal: 14,
          backgroundColor: "#0F172A",
          borderRadius: 22,
          paddingVertical: 16,
          paddingHorizontal: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontSize: 20, fontWeight: "900", color: "#fff" }}>
            PaintHub
          </Text>
          <Text style={{ fontSize: 12, color: "#94A3B8" }}>
            Everything you need for beautiful, lasting spaces.
          </Text>
        </View>

        {/* PLUS BUTTON */}
        <TouchableOpacity
          onPress={() => router.push("/tools")}
          style={{
            width: 44,
            height: 44,
            borderRadius: 16,
            backgroundColor: "#22C55E",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="add" size={24} color="#0F172A" />
        </TouchableOpacity>
      </View>

      {/* ICON RAIL NAV */}
      <View
        style={{
          marginTop: 14,
          marginHorizontal: 14,
          backgroundColor: "#FFFFFF",
          borderRadius: 20,
          paddingVertical: 12,
          flexDirection: "row",
          justifyContent: "space-around",
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 2,
        }}
      >
        {tabs.map((tab) => {
          const active = pathname === tab.route;

          return (
            <TouchableOpacity
              key={tab.route}
              onPress={() => router.push(tab.route as any)}
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name={tab.icon as any}
                size={24}
                color={active ? "#22C55E" : "#94A3B8"}
              />

              {active && (
                <View
                  style={{
                    marginTop: 6,
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#22C55E",
                  }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}