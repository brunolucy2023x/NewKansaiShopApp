import SafeScreen from "@/components/SafeScreen";

import { supabase } from "@/lib/supabase";

import { Ionicons } from "@expo/vector-icons";

import { router } from "expo-router";

import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";

/* =========================================================
   TYPES
========================================================= */

type SecurityOption = {
  id: string;

  icon: string;

  title: string;

  description: string;

  type:
    | "navigation"
    | "toggle";

  value?: boolean;
};

/* =========================================================
   COMPONENT
========================================================= */

function PrivacyAndSecurityScreen() {
  /* =====================================================
     STATE
  ===================================================== */

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [
    twoFactorEnabled,
    setTwoFactorEnabled,
  ] = useState(false);

  const [
    biometricEnabled,
    setBiometricEnabled,
  ] = useState(true);

  const [
    pushNotifications,
    setPushNotifications,
  ] = useState(true);

  const [
    emailNotifications,
    setEmailNotifications,
  ] = useState(true);

  const [
    marketingEmails,
    setMarketingEmails,
  ] = useState(false);

  const [shareData, setShareData] =
    useState(false);

  /* =====================================================
     LOAD SETTINGS
  ===================================================== */

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings =
    async () => {
      try {
        setLoading(true);

        const {
          data,
          error,
        } = await supabase
          .from(
            "user_settings"
          )
          .select("*")
          .limit(1)
          .single();

        if (
          error &&
          error.code !==
            "PGRST116"
        ) {
          throw error;
        }

        if (data) {
          setTwoFactorEnabled(
            data.twoFactorEnabled
          );

          setBiometricEnabled(
            data.biometricEnabled
          );

          setPushNotifications(
            data.pushNotifications
          );

          setEmailNotifications(
            data.emailNotifications
          );

          setMarketingEmails(
            data.marketingEmails
          );

          setShareData(
            data.shareData
          );
        }
      } catch (error) {
        console.error(
          error
        );

        Alert.alert(
          "Error",

          "Failed to load settings"
        );
      } finally {
        setLoading(false);
      }
    };

  /* =====================================================
     SAVE SETTINGS
  ===================================================== */

  const saveSettings =
    async (
      updatedSettings: any
    ) => {
      try {
        setSaving(true);

        const { error } =
          await supabase
            .from(
              "user_settings"
            )
            .upsert([
              {
                id: 1,

                twoFactorEnabled,

                biometricEnabled,

                pushNotifications,

                emailNotifications,

                marketingEmails,

                shareData,

                ...updatedSettings,
              },
            ]);

        if (error) {
          throw error;
        }
      } catch (error) {
        console.error(
          error
        );

        Alert.alert(
          "Error",

          "Failed to save settings"
        );
      } finally {
        setSaving(false);
      }
    };

  /* =====================================================
     TOGGLE
  ===================================================== */

  const handleToggle =
    async (
      id: string,
      value: boolean
    ) => {
      switch (id) {
        case "two-factor":
          setTwoFactorEnabled(
            value
          );

          await saveSettings({
            twoFactorEnabled:
              value,
          });

          break;

        case "biometric":
          setBiometricEnabled(
            value
          );

          await saveSettings({
            biometricEnabled:
              value,
          });

          break;

        case "push":
          setPushNotifications(
            value
          );

          await saveSettings({
            pushNotifications:
              value,
          });

          break;

        case "email":
          setEmailNotifications(
            value
          );

          await saveSettings({
            emailNotifications:
              value,
          });

          break;

        case "marketing":
          setMarketingEmails(
            value
          );

          await saveSettings({
            marketingEmails:
              value,
          });

          break;

        case "data":
          setShareData(
            value
          );

          await saveSettings({
            shareData:
              value,
          });

          break;
      }
    };

  /* =====================================================
     SETTINGS
  ===================================================== */

  const securitySettings: SecurityOption[] =
    [
      {
        id: "password",

        icon:
          "lock-closed-outline",

        title:
          "Change Password",

        description:
          "Update your account password",

        type: "navigation",
      },

      {
        id: "two-factor",

        icon:
          "shield-checkmark-outline",

        title:
          "Two-Factor Authentication",

        description:
          "Add an extra layer of security",

        type: "toggle",

        value:
          twoFactorEnabled,
      },

      {
        id: "biometric",

        icon:
          "finger-print-outline",

        title:
          "Biometric Login",

        description:
          "Use Face ID or Touch ID",

        type: "toggle",

        value:
          biometricEnabled,
      },
    ];

  const privacySettings: SecurityOption[] =
    [
      {
        id: "push",

        icon:
          "notifications-outline",

        title:
          "Push Notifications",

        description:
          "Receive push notifications",

        type: "toggle",

        value:
          pushNotifications,
      },

      {
        id: "email",

        icon:
          "mail-outline",

        title:
          "Email Notifications",

        description:
          "Receive order updates via email",

        type: "toggle",

        value:
          emailNotifications,
      },

      {
        id: "marketing",

        icon:
          "megaphone-outline",

        title:
          "Marketing Emails",

        description:
          "Receive promotional emails",

        type: "toggle",

        value:
          marketingEmails,
      },

      {
        id: "data",

        icon:
          "analytics-outline",

        title:
          "Share Usage Data",

        description:
          "Help us improve the app",

        type: "toggle",

        value:
          shareData,
      },
    ];

  const accountSettings = [
    {
      id: "activity",

      icon:
        "time-outline",

      title:
        "Account Activity",

      description:
        "View recent login activity",
    },

    {
      id: "devices",

      icon:
        "phone-portrait-outline",

      title:
        "Connected Devices",

      description:
        "Manage devices with access",
    },

    {
      id: "data-download",

      icon:
        "download-outline",

      title:
        "Download Your Data",

      description:
        "Get a copy of your data",
    },
  ];

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <LoadingUI />
    );
  }

  /* =====================================================
     MAIN
  ===================================================== */

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />

      <SafeScreen>
        <View className="flex-1 bg-white">
          {/* =================================================
             HEADER
          ================================================= */}

          <View className="px-6 pt-4 pb-6">
            <View
              className="
                flex-row
                items-center
                justify-between
              "
            >
              {/* LEFT */}

              <View className="flex-row items-center flex-1">
                {/* BACK */}

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    router.back()
                  }
                  className="
                    w-12
                    h-12
                    rounded-full
                    bg-[#F3F4F6]
                    items-center
                    justify-center
                    mr-4
                  "
                >
                  <Ionicons
                    name="arrow-back"
                    size={22}
                    color="#111"
                  />
                </TouchableOpacity>

                {/* TEXT */}

                <View className="flex-1">
                  <Text
                    className="
                      text-black
                      text-[30px]
                      font-black
                    "
                  >
                    Privacy & Security
                  </Text>

                  <Text
                    className="
                      text-[#6B7280]
                      mt-1
                      text-sm
                    "
                  >
                    Manage your account protection
                  </Text>
                </View>
              </View>

              {/* SAVING */}

              {saving ? (
                <View
                  className="
                    w-14
                    h-14
                    rounded-[22px]
                    bg-[#D9F26A]
                    items-center
                    justify-center
                  "
                >
                  <ActivityIndicator
                    size="small"
                    color="#111"
                  />
                </View>
              ) : (
                <View
                  className="
                    w-14
                    h-14
                    rounded-[22px]
                    bg-[#D9F26A]
                    items-center
                    justify-center
                  "
                >
                  <Ionicons
                    name="shield-checkmark"
                    size={24}
                    color="#111"
                  />
                </View>
              )}
            </View>
          </View>

          {/* =================================================
             CONTENT
          ================================================= */}

          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={
              false
            }
            contentContainerStyle={{
              paddingBottom: 120,
            }}
          >
            {/* =================================================
               SECURITY
            ================================================= */}

            <SectionTitle
              title="Security"
            />

            <View className="px-6">
              {securitySettings.map(
                (
                  setting
                ) => (
                  <SettingsCard
                    key={
                      setting.id
                    }
                    setting={
                      setting
                    }
                    onToggle={
                      handleToggle
                    }
                  />
                )
              )}
            </View>

            {/* =================================================
               PRIVACY
            ================================================= */}

            <SectionTitle
              title="Privacy"
            />

            <View className="px-6">
              {privacySettings.map(
                (
                  setting
                ) => (
                  <SettingsCard
                    key={
                      setting.id
                    }
                    setting={
                      setting
                    }
                    onToggle={
                      handleToggle
                    }
                  />
                )
              )}
            </View>

            {/* =================================================
               ACCOUNT
            ================================================= */}

            <SectionTitle
              title="Account"
            />

            <View className="px-6">
              {accountSettings.map(
                (
                  setting
                ) => (
                  <TouchableOpacity
                    key={
                      setting.id
                    }
                    activeOpacity={
                      0.9
                    }
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
                        bg-white
                        items-center
                        justify-center
                        mr-4
                      "
                    >
                      <Ionicons
                        name={
                          setting.icon as any
                        }
                        size={
                          28
                        }
                        color="#111"
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
                        {
                          setting.title
                        }
                      </Text>

                      <Text
                        className="
                          text-[#6B7280]
                          text-sm
                          mt-2
                          leading-6
                        "
                      >
                        {
                          setting.description
                        }
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
                        size={
                          20
                        }
                        color="#111"
                      />
                    </View>
                  </TouchableOpacity>
                )
              )}
            </View>

            {/* =================================================
               DELETE ACCOUNT
            ================================================= */}

            <View className="px-6 mt-2">
              <TouchableOpacity
                activeOpacity={0.9}
                className="
                  bg-[#FEE2E2]
                  rounded-[32px]
                  p-5
                  flex-row
                  items-center
                  justify-between
                "
              >
                {/* LEFT */}

                <View className="flex-row items-center flex-1">
                  <View
                    className="
                      w-16
                      h-16
                      rounded-[22px]
                      bg-white
                      items-center
                      justify-center
                      mr-4
                    "
                  >
                    <Ionicons
                      name="trash-outline"
                      size={28}
                      color="#EF4444"
                    />
                  </View>

                  <View className="flex-1">
                    <Text
                      className="
                        text-[#EF4444]
                        text-[17px]
                        font-black
                      "
                    >
                      Delete Account
                    </Text>

                    <Text
                      className="
                        text-[#B91C1C]
                        text-sm
                        mt-2
                        leading-6
                      "
                    >
                      Permanently delete your account
                    </Text>
                  </View>
                </View>

                {/* ARROW */}

                <Ionicons
                  name="chevron-forward"
                  size={22}
                  color="#EF4444"
                />
              </TouchableOpacity>
            </View>

            {/* =================================================
               INFO CARD
            ================================================= */}

            <View className="px-6 mt-6">
              <View
                className="
                  bg-[#D9F26A]
                  rounded-[34px]
                  p-6
                "
              >
                <View className="flex-row">
                  {/* ICON */}

                  <View
                    className="
                      w-14
                      h-14
                      rounded-[20px]
                      bg-black
                      items-center
                      justify-center
                      mr-4
                    "
                  >
                    <Ionicons
                      name="shield-checkmark"
                      size={26}
                      color="#D9F26A"
                    />
                  </View>

                  {/* TEXT */}

                  <View className="flex-1">
                    <Text
                      className="
                        text-black
                        text-[18px]
                        font-black
                      "
                    >
                      Your Privacy Matters
                    </Text>

                    <Text
                      className="
                        text-black/70
                        text-sm
                        mt-3
                        leading-7
                      "
                    >
                      Your data is encrypted and
                      securely stored. You can
                      manage your privacy settings
                      anytime from this page.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeScreen>
    </>
  );
}

export default PrivacyAndSecurityScreen;

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  title,
}: {
  title: string;
}) {
  return (
    <View className="px-6 mb-4 mt-2">
      <Text
        className="
          text-black
          text-[24px]
          font-black
        "
      >
        {title}
      </Text>
    </View>
  );
}

/* =========================================================
   SETTINGS CARD
========================================================= */

function SettingsCard({
  setting,

  onToggle,
}: {
  setting: SecurityOption;

  onToggle: (
    id: string,
    value: boolean
  ) => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={
        setting.type ===
        "toggle"
          ? 1
          : 0.9
      }
      className="
        bg-[#F3F4F6]
        rounded-[30px]
        p-5
        mb-4
      "
    >
      <View className="flex-row items-center">
        {/* ICON */}

        <View
          className="
            w-16
            h-16
            rounded-[22px]
            bg-white
            items-center
            justify-center
            mr-4
          "
        >
          <Ionicons
            name={
              setting.icon as any
            }
            size={28}
            color="#111"
          />
        </View>

        {/* TEXT */}

        <View className="flex-1 pr-4">
          <Text
            className="
              text-black
              text-[17px]
              font-black
            "
          >
            {setting.title}
          </Text>

          <Text
            className="
              text-[#6B7280]
              text-sm
              mt-2
              leading-6
            "
          >
            {
              setting.description
            }
          </Text>
        </View>

        {/* ACTION */}

        {setting.type ===
        "toggle" ? (
          <Switch
            value={
              setting.value
            }
            onValueChange={(
              value
            ) =>
              onToggle(
                setting.id,
                value
              )
            }
            thumbColor="#FFFFFF"
            trackColor={{
              false:
                "#D1D5DB",

              true:
                "#D9F26A",
            }}
            ios_backgroundColor="#D1D5DB"
          />
        ) : (
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
        )}
      </View>
    </TouchableOpacity>
  );
}

/* =========================================================
   LOADING UI
========================================================= */

function LoadingUI() {
  return (
    <SafeScreen>
      <View
        className="
          flex-1
          bg-white
          items-center
          justify-center
          px-6
        "
      >
        <View
          className="
            bg-[#F3F4F6]
            rounded-[40px]
            px-10
            py-12
            items-center
          "
        >
          <View
            className="
              w-24
              h-24
              rounded-full
              bg-[#D9F26A]
              items-center
              justify-center
              mb-6
            "
          >
            <Ionicons
              name="shield-checkmark"
              size={34}
              color="#111"
            />
          </View>

          <ActivityIndicator
            size="large"
            color="#111"
          />

          <Text
            className="
              text-black
              text-[20px]
              font-black
              mt-6
            "
          >
            Loading Settings
          </Text>

          <Text
            className="
              text-[#6B7280]
              text-center
              mt-3
              leading-6
            "
          >
            Preparing your privacy and
            security preferences.
          </Text>
        </View>
      </View>
    </SafeScreen>
  );
}