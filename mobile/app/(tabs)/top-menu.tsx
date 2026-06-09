import SafeScreen from "@/components/SafeScreen";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

const menuItems = [
  {
    title: "Wishlist",
    icon: "heart",
    route: "/wishlist",
    color: "#E11D48",
  },
  {
    title: "Messages",
    icon: "chatbubbles",
    route: "/messages",
    color: "#2563EB",
  },
  {
    title: "My Quotes",
    icon: "document-text",
    route: "/quotes",
    color: "#F97316",
  },
  {
    title: "Suppliers",
    icon: "business",
    route: "/suppliers",
    color: "#0F172A",
  },
  {
    title: "Addresses",
    icon: "location",
    route: "/addresses",
    color: "#16A34A",
  },
  {
    title: "Notifications",
    icon: "notifications",
    route: "/notifications",
    color: "#F59E0B",
  },
  {
    title: "Settings",
    icon: "settings-outline",
    route: "/settings",
    color: "#64748B",
  },
  {
    title: "Help Center",
    icon: "help-circle-outline",
    route: "/support",
    color: "#64748B",
  },
];

export default function TopMenuScreen() {
  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

  return (
    <SafeScreen>
      <View className="flex-1 bg-[#F8FAFC]">
        {/* HEADER */}
        <View className="px-5 pt-4 pb-5 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-11 h-11 rounded-full bg-white border border-[#E2E8F0] items-center justify-center"
            >
              <Ionicons name="arrow-back" size={20} color="#0F172A" />
            </TouchableOpacity>

            <Text className="text-[26px] font-black text-[#0F172A] ml-4">
              Menu
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/(tabs)/profile")}
            className="w-11 h-11 rounded-full bg-white border border-[#E2E8F0] items-center justify-center"
          >
            <Ionicons name="person" size={20} color="#0F172A" />
          </TouchableOpacity>
        </View>

        {/* WELCOME CARD */}
        <View className="mx-5 mb-5 bg-[#0F172A] rounded-[26px] p-5">
          <Text className="text-[#D9F26A] font-bold text-xs tracking-widest">
            BUILDHUB
          </Text>

          <Text className="text-white text-[20px] font-black mt-2">
            Manage Your Account
          </Text>

          <Text className="text-[#CBD5E1] mt-2 text-sm leading-5">
            Access quotes, suppliers, messages, notifications and more.
          </Text>
        </View>

        {/* MENU GRID */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 18,
            paddingBottom: 40,
          }}
        >
          <View className="flex-row flex-wrap justify-between">
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.title}
                activeOpacity={0.85}
                onPress={() => handleNavigation(item.route)}
                className="w-[48%] bg-white rounded-[24px] p-5 mb-4 border border-[#E2E8F0] items-center"
              >
                <View
                  style={{
                    backgroundColor: item.color + "15",
                  }}
                  className="w-14 h-14 rounded-full items-center justify-center"
                >
                  <Ionicons
                    name={item.icon as any}
                    size={28}
                    color={item.color}
                  />
                </View>

                <Text className="mt-3 text-[#0F172A] font-bold text-sm text-center">
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}

            {/* LOGOUT */}
            <TouchableOpacity
              activeOpacity={0.85}
              className="w-full bg-red-50 rounded-[24px] p-5 mt-2 border border-red-100 items-center"
            >
              <View className="w-14 h-14 rounded-full bg-red-100 items-center justify-center">
                <Ionicons
                  name="log-out-outline"
                  size={28}
                  color="#DC2626"
                />
              </View>

              <Text className="mt-3 text-red-600 font-bold text-base">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeScreen>
  );
}