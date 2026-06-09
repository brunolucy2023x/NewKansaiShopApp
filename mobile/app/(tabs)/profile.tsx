import SafeScreen from "@/components/SafeScreen";

import {
  useAuth,
  useUser,
} from "@clerk/clerk-expo";

import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "expo-image";

import { Ionicons } from "@expo/vector-icons";

import { router } from "expo-router";

/* =========================================================
   MENU ITEMS
========================================================= */

const MENU_ITEMS = [
  {
    id: 1,
    icon: "person-outline",
    title: "Edit Profile",
    subtitle:
      "Manage your account",

    color: "#3B82F6",

    action: "/profile",
  },

  {
    id: 2,
    icon: "receipt-outline",
    title: "Orders",
    subtitle:
      "Track purchases",

    color: "#10B981",

    action: "/orders",
  },

  {
    id: 3,
    icon: "location-outline",
    title: "Addresses",
    subtitle:
      "Delivery locations",

    color: "#F59E0B",

    action: "/addresses",
  },

  {
    id: 4,
    icon: "heart-outline",
    title: "Wishlist",
    subtitle:
      "Saved products",

    color: "#EF4444",

    action: "/wishlist",
  },
] as const;

/* =========================================================
   COMPONENT
========================================================= */

const ProfileScreen = () => {
  /* =====================================================
     AUTH
  ===================================================== */

  const { signOut } =
    useAuth();

  const { user } =
    useUser();

  /* =====================================================
     MENU PRESS
  ===================================================== */

  const handleMenuPress = (
    action: (typeof MENU_ITEMS)[number]["action"]
  ) => {
    if (
      action ===
      "/profile"
    )
      return;

    router.push(
      action as any
    );
  };

  /* =====================================================
     MAIN
  ===================================================== */

  return (
    <SafeScreen>
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        {/* =================================================
           HEADER
        ================================================= */}

        <View className="px-6 pt-4">
          {/* TOP */}

          <View
            className="
              flex-row
              items-center
              justify-between
            "
          >
            <View>
              <Text
                className="
                  text-[#6B7280]
                  text-sm
                "
              >
                Welcome Back
              </Text>

              <Text
                className="
                  text-black
                  text-[34px]
                  font-black
                  mt-1
                "
              >
                My Profile
              </Text>
            </View>

            {/* SETTINGS */}

            <TouchableOpacity
              activeOpacity={0.8}
              className="
                w-14
                h-14
                rounded-[22px]
                bg-[#F3F4F6]
                items-center
                justify-center
              "
            >
              <Ionicons
                name="settings-outline"
                size={24}
                color="#111"
              />
            </TouchableOpacity>
          </View>

          {/* =================================================
             PROFILE CARD
          ================================================= */}

          <View
            className="
              mt-8
              bg-[#111111]
              rounded-[40px]
              overflow-hidden
              p-6
            "
          >
            {/* FLOATING SHAPES */}

            <View
              className="
                absolute
                -top-10
                -right-10
                w-40
                h-40
                rounded-full
                bg-white/5
              "
            />

            <View
              className="
                absolute
                bottom-0
                right-0
                w-28
                h-28
                rounded-full
                bg-[#D9F26A]/10
              "
            />

            {/* CONTENT */}

            <View className="flex-row items-center">
              {/* IMAGE */}

              <View className="relative">
                <Image
                  source={
                    user?.imageUrl
                  }
                  style={{
                    width: 92,
                    height: 92,
                    borderRadius: 46,
                    backgroundColor:
                      "#F3F4F6",
                  }}
                  contentFit="cover"
                  transition={
                    200
                  }
                />

                {/* VERIFIED */}

                <View
                  className="
                    absolute
                    -bottom-1
                    -right-1
                    bg-[#D9F26A]
                    rounded-full
                    w-8
                    h-8
                    items-center
                    justify-center
                    border-2
                    border-[#111111]
                  "
                >
                  <Ionicons
                    name="checkmark"
                    size={16}
                    color="#111"
                  />
                </View>
              </View>

              {/* USER INFO */}

              <View className="flex-1 ml-5">
                <Text
                  className="
                    text-white
                    text-[24px]
                    font-black
                    leading-8
                  "
                >
                  {
                    user?.firstName
                  }{" "}
                  {
                    user?.lastName
                  }
                </Text>

                <Text
                  className="
                    text-[#A1A1AA]
                    text-sm
                    mt-2
                  "
                >
                  {user
                    ?.emailAddresses?.[0]
                    ?.emailAddress ||
                    "No email"}
                </Text>

                {/* PREMIUM BADGE */}

                <View
                  className="
                    self-start
                    bg-[#D9F26A]
                    px-4
                    py-2
                    rounded-full
                    mt-4
                  "
                >
                  <Text
                    className="
                      text-black
                      text-xs
                      font-black
                    "
                  >
                    PREMIUM MEMBER
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* =================================================
           QUICK STATS
        ================================================= */}

        <View
          className="
            px-6
            mt-8
            flex-row
          "
        >
          {/* ORDERS */}

          <View
            className="
              flex-1
              bg-[#F3F4F6]
              rounded-[30px]
              p-5
              mr-2
            "
          >
            <Text
              className="
                text-[#6B7280]
                text-sm
              "
            >
              Orders
            </Text>

            <Text
              className="
                text-black
                text-[28px]
                font-black
                mt-2
              "
            >
              12
            </Text>
          </View>

          {/* WISHLIST */}

          <View
            className="
              flex-1
              bg-[#D9F26A]
              rounded-[30px]
              p-5
              ml-2
            "
          >
            <Text
              className="
                text-black/70
                text-sm
              "
            >
              Wishlist
            </Text>

            <Text
              className="
                text-black
                text-[28px]
                font-black
                mt-2
              "
            >
              24
            </Text>
          </View>
        </View>

        {/* =================================================
           MENU GRID
        ================================================= */}

        <View className="px-6 mt-10">
          {/* TITLE */}

          <Text
            className="
              text-black
              text-[24px]
              font-black
              mb-5
            "
          >
            Account
          </Text>

          {/* GRID */}

          <View className="flex-row flex-wrap justify-between">
            {MENU_ITEMS.map(
              (item) => (
                <TouchableOpacity
                  key={
                    item.id
                  }
                  activeOpacity={
                    0.9
                  }
                  onPress={() =>
                    handleMenuPress(
                      item.action
                    )
                  }
                  className="
                    bg-[#F3F4F6]
                    rounded-[32px]
                    p-5
                    mb-4
                  "
                  style={{
                    width: "48%",
                  }}
                >
                  {/* ICON */}

                  <View
                    className="
                      w-16
                      h-16
                      rounded-[22px]
                      items-center
                      justify-center
                      mb-5
                    "
                    style={{
                      backgroundColor:
                        item.color +
                        "20",
                    }}
                  >
                    <Ionicons
                      name={
                        item.icon
                      }
                      size={
                        30
                      }
                      color={
                        item.color
                      }
                    />
                  </View>

                  {/* TITLE */}

                  <Text
                    className="
                      text-black
                      text-[17px]
                      font-black
                    "
                  >
                    {
                      item.title
                    }
                  </Text>

                  {/* SUBTITLE */}

                  <Text
                    className="
                      text-[#6B7280]
                      text-sm
                      mt-2
                      leading-6
                    "
                  >
                    {
                      item.subtitle
                    }
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </View>

        {/* =================================================
           SETTINGS SECTION
        ================================================= */}

        <View className="px-6 mt-6">
          {/* NOTIFICATIONS */}

          <SettingsRow
            icon="notifications-outline"
            title="Notifications"
            subtitle="Manage app alerts"
            color="#3B82F6"
          />

          {/* PRIVACY */}

          <SettingsRow
            icon="shield-checkmark-outline"
            title="Privacy & Security"
            subtitle="Protect your account"
            color="#10B981"
            onPress={() =>
              router.push(
                "/privacy-security" as any
              )
            }
          />
        </View>

        {/* =================================================
           SIGN OUT
        ================================================= */}

        <View className="px-6 mt-8">
          <TouchableOpacity
            activeOpacity={
              0.9
            }
            onPress={() =>
              signOut()
            }
            className="
              bg-[#FEE2E2]
              rounded-[30px]
              py-5
              flex-row
              items-center
              justify-center
            "
          >
            <Ionicons
              name="log-out-outline"
              size={22}
              color="#EF4444"
            />

            <Text
              className="
                text-[#EF4444]
                text-[16px]
                font-black
                ml-3
              "
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>

        {/* =================================================
           VERSION
        ================================================= */}

        <Text
          className="
            text-center
            text-[#9CA3AF]
            text-xs
            mt-8
          "
        >
          QvonXpert v1.0.0
        </Text>
      </ScrollView>
    </SafeScreen>
  );
};

export default ProfileScreen;

/* =========================================================
   SETTINGS ROW
========================================================= */

interface SettingsRowProps {
  icon: any;

  title: string;

  subtitle: string;

  color: string;

  onPress?: () => void;
}

function SettingsRow({
  icon,

  title,

  subtitle,

  color,

  onPress,
}: SettingsRowProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className="
        bg-[#F3F4F6]
        rounded-[30px]
        p-5
        mb-4
        flex-row
        items-center
      "
    >
      {/* ICON */}

      <View
        className="
          w-16
          h-16
          rounded-[22px]
          items-center
          justify-center
          mr-4
        "
        style={{
          backgroundColor:
            color + "20",
        }}
      >
        <Ionicons
          name={icon}
          size={28}
          color={color}
        />
      </View>

      {/* TEXT */}

      <View className="flex-1">
        <Text
          className="
            text-black
            text-[17px]
            font-black
          "
        >
          {title}
        </Text>

        <Text
          className="
            text-[#6B7280]
            text-sm
            mt-2
          "
        >
          {subtitle}
        </Text>
      </View>

      {/* ARROW */}

      <View
        className="
          w-12
          h-12
          rounded-full
          bg-white
          items-center
          justify-center
        "
      >
        <Ionicons
          name="chevron-forward"
          size={20}
          color="#111"
        />
      </View>
    </TouchableOpacity>
  );
}