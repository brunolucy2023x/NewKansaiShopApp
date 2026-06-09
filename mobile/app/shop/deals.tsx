import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";

export default function DealsScreen() {
  const [deals, setDeals] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const loadDeals = async () => {
    try {
      const { data, error } =
        await supabase
          .from("deals")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      if (error) throw error;

      setDeals(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDeals();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadDeals();
  };

  const isExpired = (
    expiryDate: string
  ) => {
    if (!expiryDate) return false;

    return (
      new Date(expiryDate) <
      new Date()
    );
  };

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
    <View
      style={{
        flex: 1,
        backgroundColor:
          "#F8FAFC",
      }}
    >
      {/* HERO */}

      <View
        style={{
          backgroundColor:
            "#0F172A",
          paddingTop: 65,
          paddingBottom: 25,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection:
              "row",
            alignItems:
              "center",
          }}
        >
          <Ionicons
            name="flash"
            size={28}
            color="#FACC15"
          />

          <Text
            style={{
              color: "#fff",
              fontSize: 30,
              fontWeight: "800",
              marginLeft: 10,
            }}
          >
            Hot Deals
          </Text>
        </View>

        <Text
          style={{
            color: "#CBD5E1",
            marginTop: 8,
            lineHeight: 22,
          }}
        >
          Limited-time discounts and
          exclusive PaintHub offers.
        </Text>
      </View>

      {/* EMPTY STATE */}

      {deals.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent:
              "center",
            alignItems:
              "center",
          }}
        >
          <Ionicons
            name="pricetag-outline"
            size={80}
            color="#CBD5E1"
          />

          <Text
            style={{
              marginTop: 15,
              fontSize: 22,
              fontWeight: "700",
              color: "#0F172A",
            }}
          >
            No Deals Available
          </Text>

          <Text
            style={{
              marginTop: 8,
              color: "#64748B",
            }}
          >
            Check again later.
          </Text>
        </View>
      ) : (
        <FlatList
          data={deals}
          keyExtractor={(item) =>
            item.id
          }
          refreshControl={
            <RefreshControl
              refreshing={
                refreshing
              }
              onRefresh={
                onRefresh
              }
              colors={[
                "#22C55E",
              ]}
            />
          }
          contentContainerStyle={{
            padding: 16,
          }}
          renderItem={({
            item,
          }) => (
            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                backgroundColor:
                  "#fff",
                borderRadius: 28,
                overflow:
                  "hidden",
                marginBottom: 20,
              }}
            >
              {/* IMAGE */}

              <Image
                source={{
                  uri:
                    item.image ||
                    "https://placehold.co/800x500",
                }}
                style={{
                  width: "100%",
                  height: 220,
                }}
              />

              {/* DISCOUNT BADGE */}

              <View
                style={{
                  position:
                    "absolute",
                  top: 15,
                  right: 15,
                  backgroundColor:
                    "#DC2626",
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 999,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight:
                      "800",
                  }}
                >
                  -
                  {
                    item.discount_percent
                  }
                  %
                </Text>
              </View>

              {/* CONTENT */}

              <View
                style={{
                  padding: 18,
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight:
                      "800",
                    color:
                      "#0F172A",
                  }}
                >
                  {item.title}
                </Text>

                <Text
                  style={{
                    color:
                      "#64748B",
                    marginTop: 10,
                    lineHeight: 22,
                  }}
                >
                  {
                    item.description
                  }
                </Text>

                {/* EXPIRY */}

                <View
                  style={{
                    flexDirection:
                      "row",
                    alignItems:
                      "center",
                    marginTop: 16,
                  }}
                >
                  <Ionicons
                    name="time-outline"
                    size={18}
                    color="#64748B"
                  />

                  <Text
                    style={{
                      marginLeft: 6,
                      color:
                        isExpired(
                          item.expires_at
                        )
                          ? "#DC2626"
                          : "#16A34A",
                      fontWeight:
                        "700",
                    }}
                  >
                    {isExpired(
                      item.expires_at
                    )
                      ? "Expired"
                      : `Ends ${new Date(
                          item.expires_at
                        ).toLocaleDateString()}`}
                  </Text>
                </View>

                {/* CTA */}

                <TouchableOpacity
                  style={{
                    marginTop: 18,
                    height: 52,
                    borderRadius: 14,
                    backgroundColor:
                      "#22C55E",
                    justifyContent:
                      "center",
                    alignItems:
                      "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight:
                        "800",
                      fontSize: 15,
                    }}
                  >
                    View Deal
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}