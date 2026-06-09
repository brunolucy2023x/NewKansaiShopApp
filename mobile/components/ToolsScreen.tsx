import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function PaintHubMenu() {
  const sections = [
    {
      title: "Tools",
      items: [
        {
          icon: "color-palette",
          label: "Color Finder",
          route: "/tools/color-finder",
        },
        {
          icon: "calculator",
          label: "Paint Calculator",
          route: "/tools/paint-calculator",
        },
        {
          icon: "layers",
          label: "Surface Guide",
          route: "/tools/surface-guide",
        },
        {
          icon: "brush",
          label: "Finish Types",
          route: "/tools/finish-types",
        },
      ],
    },

    {
      title: "Shop",
      items: [
        {
          icon: "star",
          label: "Featured Products",
          route: "/shop/featured-products",
        },
        {
          icon: "flame",
          label: "Deals / Discounts",
          route: "/shop/deals",
        },
        {
          icon: "sparkles",
          label: "New Arrivals",
          route: "/shop/new-arrivals",
        },
        {
          icon: "grid",
          label: "Categories",
          route: "/shop/categories",
        },
      ],
    },

    {
      title: "Experts",
      items: [
        {
          icon: "people",
          label: "Painters / Experts",
          route: "/experts/painters",
        },
        {
          icon: "construct",
          label: "Hire Contractor",
          route: "/experts/hire-contractor",
        },
        {
          icon: "school",
          label: "Learn Painting Tips",
          route: "/experts/painting-tips",
        },
        {
          icon: "chatbubbles",
          label: "Ask an Expert",
          route: "/experts/ask-expert",
        },
      ],
    },

    {
      title: "Support",
      items: [
        {
          icon: "chatbubble-ellipses",
          label: "Live Chat",
          route: "/support/live-chat",
        },
        {
          icon: "location",
          label: "Store Locations",
          route: "/support/store-locations",
        },
        {
          icon: "help-circle",
          label: "Help Center / FAQ",
          route: "/support/faq",
        },
      ],
    },

    {
      title: "Account",
      items: [
        {
          icon: "person",
          label: "My Profile",
          route: "/account/profile",
        },
        {
          icon: "heart",
          label: "Saved Items",
          route: "/account/saved-items",
        },
        {
          icon: "receipt",
          label: "Order History",
          route: "/account/order-history",
        },
        {
          icon: "log-out",
          label: "Logout",
          route: "/account/logout",
        },
      ],
    },
  ];

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#F8FAFC",
      }}
    >
      {/* HEADER */}
      <View
        style={{
          padding: 16,
          backgroundColor: "#0F172A",
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "900",
            color: "#fff",
          }}
        >
          PaintHub Menu
        </Text>

        <Text
          style={{
            color: "#94A3B8",
            marginTop: 4,
          }}
        >
          Everything you need in one place
        </Text>
      </View>

      {/* SECTIONS */}
      {sections.map((section, idx) => (
        <View
          key={idx}
          style={{
            padding: 14,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "800",
              color: "#334155",
              marginBottom: 10,
            }}
          >
            {section.title}
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            {section.items.map((item, i) => (
              <TouchableOpacity
                key={i}
                activeOpacity={0.8}
                onPress={() =>
                  router.push(item.route as any)
                }
                style={{
                  width: "47%",
                  backgroundColor: "#fff",
                  padding: 14,
                  borderRadius: 14,
                  flexDirection: "row",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                  elevation: 2,
                }}
              >
                <View
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    backgroundColor: "#E2E8F0",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 10,
                  }}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color="#0F172A"
                  />
                </View>

                <Text
                  style={{
                    flex: 1,
                    fontSize: 13,
                    fontWeight: "600",
                    color: "#0F172A",
                  }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}