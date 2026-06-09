import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { supabase } from "@/lib/supabase";

export default function ProfileScreen() {
  const [loading, setLoading] =
    useState(true);

  const [profile, setProfile] =
    useState<any>(null);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } =
        await supabase
          .from("customers")
          .select("*")
          .eq("id", user.id)
          .single();

      setProfile(
        data || {
          full_name:
            user.user_metadata
              ?.full_name ||
            "PaintHub Customer",
          email:
            user.email,
        }
      );
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Failed to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent:
            "center",
          alignItems:
            "center",
          backgroundColor:
            "#F8FAFC",
        }}
      >
        <ActivityIndicator
          size="large"
          color="#22C55E"
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor:
          "#F8FAFC",
      }}
      showsVerticalScrollIndicator={
        false
      }
    >
      {/* HEADER */}

      <View
        style={{
          backgroundColor:
            "#0F172A",
          paddingTop: 70,
          paddingBottom: 40,
          alignItems:
            "center",
        }}
      >
        <Image
          source={{
            uri:
              profile?.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                profile?.full_name ||
                  "PaintHub"
              )}&background=22C55E&color=fff`,
          }}
          style={{
            width: 110,
            height: 110,
            borderRadius: 55,
            borderWidth: 4,
            borderColor:
              "#fff",
          }}
        />

        <Text
          style={{
            color: "#fff",
            fontSize: 24,
            fontWeight: "800",
            marginTop: 14,
          }}
        >
          {profile?.full_name ||
            "Customer"}
        </Text>

        <Text
          style={{
            color: "#CBD5E1",
            marginTop: 4,
          }}
        >
          {profile?.email}
        </Text>
      </View>

      {/* QUICK STATS */}

      <View
        style={{
          flexDirection:
            "row",
          marginHorizontal:
            16,
          marginTop: -25,
          gap: 12,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor:
              "#fff",
            borderRadius: 18,
            padding: 18,
            alignItems:
              "center",
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "800",
              color:
                "#22C55E",
            }}
          >
            0
          </Text>

          <Text
            style={{
              color:
                "#64748B",
            }}
          >
            Orders
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor:
              "#fff",
            borderRadius: 18,
            padding: 18,
            alignItems:
              "center",
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "800",
              color:
                "#22C55E",
            }}
          >
            0
          </Text>

          <Text
            style={{
              color:
                "#64748B",
            }}
          >
            Saved
          </Text>
        </View>
      </View>

      {/* ACCOUNT INFO */}

      <View
        style={{
          margin: 16,
          backgroundColor:
            "#fff",
          borderRadius: 20,
          padding: 18,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "800",
            marginBottom: 14,
            color: "#0F172A",
          }}
        >
          Account Information
        </Text>

        <InfoRow
          icon="person-outline"
          label="Full Name"
          value={
            profile?.full_name ||
            "-"
          }
        />

        <InfoRow
          icon="mail-outline"
          label="Email"
          value={
            profile?.email ||
            "-"
          }
        />

        <InfoRow
          icon="call-outline"
          label="Phone"
          value={
            profile?.phone ||
            "Not Added"
          }
        />
      </View>

      {/* ACTIONS */}

      <View
        style={{
          marginHorizontal:
            16,
          marginBottom: 30,
          backgroundColor:
            "#fff",
          borderRadius: 20,
          overflow:
            "hidden",
        }}
      >
        <MenuItem
          icon="create-outline"
          title="Edit Profile"
          onPress={() =>
            Alert.alert(
              "Coming Soon"
            )
          }
        />

        <MenuItem
          icon="heart-outline"
          title="Saved Items"
          onPress={() =>
            router.push(
              "/account/saved-items"
            )
          }
        />

        <MenuItem
          icon="receipt-outline"
          title="Order History"
          onPress={() =>
            router.push(
              "/account/order-history"
            )
          }
        />

        <MenuItem
          icon="log-out-outline"
          title="Logout"
          danger
          onPress={() =>
            router.push(
              "/account/logout"
            )
          }
        />
      </View>
    </ScrollView>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: any) {
  return (
    <View
      style={{
        flexDirection:
          "row",
        alignItems:
          "center",
        marginBottom: 16,
      }}
    >
      <Ionicons
        name={icon}
        size={20}
        color="#22C55E"
      />

      <View
        style={{
          marginLeft: 12,
        }}
      >
        <Text
          style={{
            color: "#64748B",
            fontSize: 12,
          }}
        >
          {label}
        </Text>

        <Text
          style={{
            color: "#0F172A",
            fontWeight: "600",
            marginTop: 2,
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

function MenuItem({
  icon,
  title,
  danger,
  onPress,
}: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection:
          "row",
        alignItems:
          "center",
        padding: 18,
        borderBottomWidth: 1,
        borderBottomColor:
          "#F1F5F9",
      }}
    >
      <Ionicons
        name={icon}
        size={22}
        color={
          danger
            ? "#DC2626"
            : "#22C55E"
        }
      />

      <Text
        style={{
          flex: 1,
          marginLeft: 14,
          fontSize: 15,
          fontWeight: "600",
          color: danger
            ? "#DC2626"
            : "#0F172A",
        }}
      >
        {title}
      </Text>

      <Ionicons
        name="chevron-forward"
        size={18}
        color="#94A3B8"
      />
    </TouchableOpacity>
  );
}