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
} from "react-native";

type SecurityOption = {
  id: string;

  icon: string;

  title: string;

  description: string;

  type: "navigation" | "toggle";

  value?: boolean;
};

function PrivacyAndSecurityScreen() {
  /* =========================================================
     STATE
  ========================================================= */

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [twoFactorEnabled, setTwoFactorEnabled] =
    useState(false);

  const [biometricEnabled, setBiometricEnabled] =
    useState(true);

  const [pushNotifications, setPushNotifications] =
    useState(true);

  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [marketingEmails, setMarketingEmails] =
    useState(false);

  const [shareData, setShareData] =
    useState(false);

  /* =========================================================
     LOAD SETTINGS FROM SUPABASE
  ========================================================= */

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);

      const { data, error } =
        await supabase
          .from("user_settings")
          .select("*")
          .limit(1)
          .single();

      if (error && error.code !== "PGRST116") {
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
      console.error(error);

      Alert.alert(
        "Error",
        "Failed to load settings"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     SAVE SETTINGS
  ========================================================= */

  const saveSettings = async (
    updatedSettings: any
  ) => {
    try {
      setSaving(true);

      const { error } =
        await supabase
          .from("user_settings")
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
      console.error(error);

      Alert.alert(
        "Error",
        "Failed to save settings"
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     TOGGLE HANDLER
  ========================================================= */

  const handleToggle = async (
    id: string,
    value: boolean
  ) => {
    switch (id) {
      case "two-factor":
        setTwoFactorEnabled(value);

        await saveSettings({
          twoFactorEnabled: value,
        });

        break;

      case "biometric":
        setBiometricEnabled(value);

        await saveSettings({
          biometricEnabled: value,
        });

        break;

      case "push":
        setPushNotifications(value);

        await saveSettings({
          pushNotifications: value,
        });

        break;

      case "email":
        setEmailNotifications(value);

        await saveSettings({
          emailNotifications: value,
        });

        break;

      case "marketing":
        setMarketingEmails(value);

        await saveSettings({
          marketingEmails: value,
        });

        break;

      case "data":
        setShareData(value);

        await saveSettings({
          shareData: value,
        });

        break;
    }
  };

  /* =========================================================
     SETTINGS ARRAYS
  ========================================================= */

  const securitySettings: SecurityOption[] =
    [
      {
        id: "password",

        icon: "lock-closed-outline",

        title: "Change Password",

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

        value: twoFactorEnabled,
      },

      {
        id: "biometric",

        icon: "finger-print-outline",

        title: "Biometric Login",

        description:
          "Use Face ID or Touch ID",

        type: "toggle",

        value: biometricEnabled,
      },
    ];

  const privacySettings: SecurityOption[] =
    [
      {
        id: "push",

        icon: "notifications-outline",

        title: "Push Notifications",

        description:
          "Receive push notifications",

        type: "toggle",

        value: pushNotifications,
      },

      {
        id: "email",

        icon: "mail-outline",

        title: "Email Notifications",

        description:
          "Receive order updates via email",

        type: "toggle",

        value: emailNotifications,
      },

      {
        id: "marketing",

        icon: "megaphone-outline",

        title: "Marketing Emails",

        description:
          "Receive promotional emails",

        type: "toggle",

        value: marketingEmails,
      },

      {
        id: "data",

        icon: "analytics-outline",

        title: "Share Usage Data",

        description:
          "Help us improve the app",

        type: "toggle",

        value: shareData,
      },
    ];

  const accountSettings = [
    {
      id: "activity",

      icon: "time-outline",

      title: "Account Activity",

      description:
        "View recent login activity",
    },

    {
      id: "devices",

      icon:
        "phone-portrait-outline",

      title: "Connected Devices",

      description:
        "Manage devices with access",
    },

    {
      id: "data-download",

      icon: "download-outline",

      title: "Download Your Data",

      description:
        "Get a copy of your data",
    },
  ];

  /* =========================================================
     LOADING UI
  ========================================================= */

  if (loading) {
    return (
      <SafeScreen>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator
            size="large"
            color="#1DB954"
          />

          <Text className="text-text-secondary mt-4">
            Loading settings...
          </Text>
        </View>
      </SafeScreen>
    );
  }

  return (
    <SafeScreen>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <View className="px-6 pb-5 border-b border-surface flex-row items-center justify-between">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-4"
          >
            <Ionicons
              name="arrow-back"
              size={28}
              color="#fff"
            />
          </TouchableOpacity>

          <Text className="text-text-primary text-2xl font-bold">
            Privacy & Security
          </Text>
        </View>

        {saving && (
          <ActivityIndicator
            size="small"
            color="#1DB954"
          />
        )}
      </View>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        {/* =====================================================
            SECURITY SECTION
        ===================================================== */}

        <View className="px-6 pt-6">
          <Text className="text-text-primary text-lg font-bold mb-4">
            Security
          </Text>

          {securitySettings.map(
            (setting) => (
              <TouchableOpacity
                key={setting.id}
                className="bg-surface rounded-2xl p-4 mb-3"
                activeOpacity={
                  setting.type ===
                  "toggle"
                    ? 1
                    : 0.7
                }
              >
                <View className="flex-row items-center">
                  <View className="bg-primary/20 rounded-full w-12 h-12 items-center justify-center mr-4">
                    <Ionicons
                      name={
                        setting.icon as any
                      }
                      size={24}
                      color="#1DB954"
                    />
                  </View>

                  <View className="flex-1">
                    <Text className="text-text-primary font-bold text-base mb-1">
                      {setting.title}
                    </Text>

                    <Text className="text-text-secondary text-sm">
                      {
                        setting.description
                      }
                    </Text>
                  </View>

                  {setting.type ===
                  "toggle" ? (
                    <Switch
                      value={
                        setting.value
                      }
                      onValueChange={(
                        value
                      ) =>
                        handleToggle(
                          setting.id,
                          value
                        )
                      }
                      thumbColor="#FFFFFF"
                      trackColor={{
                        false:
                          "#2A2A2A",

                        true:
                          "#1DB954",
                      }}
                    />
                  ) : (
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color="#666"
                    />
                  )}
                </View>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* =====================================================
            PRIVACY SECTION
        ===================================================== */}

        <View className="px-6 pt-4">
          <Text className="text-text-primary text-lg font-bold mb-4">
            Privacy
          </Text>

          {privacySettings.map(
            (setting) => (
              <View
                key={setting.id}
                className="bg-surface rounded-2xl p-4 mb-3"
              >
                <View className="flex-row items-center">
                  <View className="bg-primary/20 rounded-full w-12 h-12 items-center justify-center mr-4">
                    <Ionicons
                      name={
                        setting.icon as any
                      }
                      size={24}
                      color="#1DB954"
                    />
                  </View>

                  <View className="flex-1">
                    <Text className="text-text-primary font-bold text-base mb-1">
                      {setting.title}
                    </Text>

                    <Text className="text-text-secondary text-sm">
                      {
                        setting.description
                      }
                    </Text>
                  </View>

                  <Switch
                    value={setting.value}
                    onValueChange={(
                      value
                    ) =>
                      handleToggle(
                        setting.id,
                        value
                      )
                    }
                    trackColor={{
                      false:
                        "#2A2A2A",

                      true:
                        "#1DB954",
                    }}
                    thumbColor="#FFFFFF"
                  />
                </View>
              </View>
            )
          )}
        </View>

        {/* =====================================================
            ACCOUNT SECTION
        ===================================================== */}

        <View className="px-6 pt-4">
          <Text className="text-text-primary text-lg font-bold mb-4">
            Account
          </Text>

          {accountSettings.map(
            (setting) => (
              <TouchableOpacity
                key={setting.id}
                className="bg-surface rounded-2xl p-4 mb-3"
                activeOpacity={0.7}
              >
                <View className="flex-row items-center">
                  <View className="bg-primary/20 rounded-full w-12 h-12 items-center justify-center mr-4">
                    <Ionicons
                      name={
                        setting.icon as any
                      }
                      size={24}
                      color="#1DB954"
                    />
                  </View>

                  <View className="flex-1">
                    <Text className="text-text-primary font-bold text-base mb-1">
                      {setting.title}
                    </Text>

                    <Text className="text-text-secondary text-sm">
                      {
                        setting.description
                      }
                    </Text>
                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color="#666"
                  />
                </View>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* =====================================================
            DELETE ACCOUNT
        ===================================================== */}

        <View className="px-6 pt-4">
          <TouchableOpacity
            className="bg-surface rounded-2xl p-5 flex-row items-center justify-between border-2 border-red-500/20"
            activeOpacity={0.7}
          >
            <View className="flex-row items-center">
              <View className="bg-red-500/20 rounded-full w-12 h-12 items-center justify-center mr-4">
                <Ionicons
                  name="trash-outline"
                  size={24}
                  color="#EF4444"
                />
              </View>

              <View>
                <Text className="text-red-500 font-bold text-base mb-1">
                  Delete Account
                </Text>

                <Text className="text-text-secondary text-sm">
                  Permanently delete your
                  account
                </Text>
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#EF4444"
            />
          </TouchableOpacity>
        </View>

        {/* =====================================================
            INFO
        ===================================================== */}

        <View className="px-6 pt-6 pb-4">
          <View className="bg-primary/10 rounded-2xl p-4 flex-row">
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="#1DB954"
            />

            <Text className="text-text-secondary text-sm ml-3 flex-1">
              We take your privacy
              seriously. Your data is
              encrypted and stored
              securely. You can manage
              your privacy settings at
              any time.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

export default PrivacyAndSecurityScreen;