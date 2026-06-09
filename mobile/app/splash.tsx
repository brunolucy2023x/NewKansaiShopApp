import { useEffect } from "react";
import { router } from "expo-router";

import {
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { LinearGradient } from "expo-linear-gradient";

import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  ZoomIn,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function SplashScreen() {
  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    try {
      const completed =
        await AsyncStorage.getItem(
          "onboardingCompleted"
        );

      setTimeout(() => {
        if (completed === "true") {
          router.replace("/(auth)" as any);
        } else {
          router.replace(
            "/onboarding/step1" as any
          );
        }
      }, 2800);
    } catch {
      router.replace(
        "/onboarding/step1" as any
      );
    }
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <LinearGradient
        colors={[
          "#020817",
          "#0F172A",
          "#1E3A8A",
          "#2563EB",
        ]}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={{
          flex: 1,
        }}
      >
        {/* TOP GLOW */}

        <View
          style={{
            position: "absolute",
            top: -150,
            right: -100,
            width: 350,
            height: 350,
            borderRadius: 999,
            backgroundColor:
              "rgba(96,165,250,0.18)",
          }}
        />

        {/* MIDDLE GLOW */}

        <View
          style={{
            position: "absolute",
            top: "35%",
            left: -120,
            width: 260,
            height: 260,
            borderRadius: 999,
            backgroundColor:
              "rgba(255,255,255,0.05)",
          }}
        />

        {/* BOTTOM GLOW */}

        <View
          style={{
            position: "absolute",
            bottom: -120,
            right: -50,
            width: 280,
            height: 280,
            borderRadius: 999,
            backgroundColor:
              "rgba(59,130,246,0.15)",
          }}
        />

        {/* CONTENT */}

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 30,
          }}
        >
          {/* LOGO CONTAINER */}

          <Animated.View
            entering={ZoomIn.duration(
              900
            )}
            style={{
              width: 180,
              height: 180,
              borderRadius: 90,
              backgroundColor:
                "rgba(255,255,255,0.08)",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor:
                "rgba(255,255,255,0.12)",
            }}
          >
            <Image
              source={require(
                "../assets/images/logo.png"
              )}
              resizeMode="contain"
              style={{
                width: 120,
                height: 120,
              }}
            />
          </Animated.View>

          {/* APP NAME */}

          <Animated.Text
            entering={FadeInDown.delay(
              300
            )}
            style={{
              color: "#FFFFFF",
              fontSize: 46,
              fontWeight: "900",
              marginTop: 28,
              letterSpacing: 1,
            }}
          >
            PaintHub
          </Animated.Text>

          {/* TAGLINE */}

          <Animated.Text
            entering={FadeInDown.delay(
              500
            )}
            style={{
              color:
                "rgba(255,255,255,0.85)",
              fontSize: 17,
              marginTop: 12,
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            Kenya's Trusted Building Marketplace
          </Animated.Text>

          <Animated.Text
            entering={FadeInDown.delay(
              700
            )}
            style={{
              color:
                "rgba(255,255,255,0.65)",
              fontSize: 14,
              marginTop: 10,
              textAlign: "center",
              lineHeight: 22,
              maxWidth: 280,
            }}
          >
            Paints • Cement • Steel • Tools •
            Hardware
          </Animated.Text>

          {/* TRUST CARD */}

          <Animated.View
            entering={FadeInUp.delay(
              900
            )}
            style={{
              marginTop: 40,
              paddingHorizontal: 22,
              paddingVertical: 12,
              borderRadius: 30,
              backgroundColor:
                "rgba(255,255,255,0.08)",
              borderWidth: 1,
              borderColor:
                "rgba(255,255,255,0.12)",
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 13,
                fontWeight: "600",
              }}
            >
              Trusted by Contractors &
              Homeowners
            </Text>
          </Animated.View>
        </View>

        {/* FOOTER */}

        <View
          style={{
            paddingHorizontal: 40,
            paddingBottom: 70,
          }}
        >
          <Animated.View
            entering={FadeIn.delay(
              1200
            )}
          >
            <View
              style={{
                height: 6,
                width: width - 80,
                backgroundColor:
                   "rgba(74,222,128,0.20)",
                borderRadius: 999,
                overflow: "hidden",
                alignSelf: "center",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: "85%",
                  borderRadius: 999,
                  backgroundColor:
                    "#FFFFFF",
                }}
              />
            </View>

            <Text
              style={{
                color:
                  "rgba(255,255,255,0.65)",
                textAlign: "center",
                marginTop: 16,
                fontSize: 13,
                fontWeight: "500",
              }}
            >
              Loading your marketplace...
            </Text>
          </Animated.View>
        </View>
      </LinearGradient>
    </>
  );
}