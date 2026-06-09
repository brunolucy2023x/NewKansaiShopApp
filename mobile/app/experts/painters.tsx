import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  RefreshControl,
  Linking,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";

export default function PaintersScreen() {
  const [experts, setExperts] =
    useState<any[]>([]);

  const [filteredExperts, setFilteredExperts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const loadExperts = async () => {
    try {
      const { data, error } =
        await supabase
          .from("experts")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      if (error) throw error;

      setExperts(data || []);
      setFilteredExperts(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadExperts();
  }, []);

  useEffect(() => {
    const filtered =
      experts.filter(
        (expert) =>
          expert.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          expert.profession
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          expert.location
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    setFilteredExperts(filtered);
  }, [search, experts]);

  const onRefresh = () => {
    setRefreshing(true);
    loadExperts();
  };

  const callExpert = (
    phone: string
  ) => {
    if (!phone) return;

    Linking.openURL(
      `tel:${phone}`
    );
  };

  const emailExpert = (
    email: string
  ) => {
    if (!email) return;

    Linking.openURL(
      `mailto:${email}`
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
        <Text
          style={{
            color: "#fff",
            fontSize: 30,
            fontWeight: "800",
          }}
        >
          Painters & Experts
        </Text>

        <Text
          style={{
            color: "#CBD5E1",
            marginTop: 8,
            lineHeight: 22,
          }}
        >
          Find professional painters,
          consultants and painting
          experts verified by PaintHub.
        </Text>
      </View>

      {/* SEARCH */}

      <View
        style={{
          padding: 16,
        }}
      >
        <View
          style={{
            backgroundColor:
              "#fff",
            borderRadius: 18,
            flexDirection:
              "row",
            alignItems:
              "center",
            paddingHorizontal: 15,
            height: 56,
          }}
        >
          <Ionicons
            name="search"
            size={20}
            color="#64748B"
          />

          <TextInput
            placeholder="Search experts..."
            value={search}
            onChangeText={setSearch}
            style={{
              flex: 1,
              marginLeft: 10,
            }}
          />
        </View>
      </View>

      {/* EMPTY STATE */}

      {filteredExperts.length ===
      0 ? (
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
            name="people-outline"
            size={70}
            color="#CBD5E1"
          />

          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              marginTop: 15,
              color: "#0F172A",
            }}
          >
            No Experts Found
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredExperts}
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
            <View
              style={{
                backgroundColor:
                  "#fff",
                borderRadius: 24,
                overflow:
                  "hidden",
                marginBottom: 18,
              }}
            >
              {/* IMAGE */}

              <Image
                source={{
                  uri:
                    item.image ||
                    "https://placehold.co/800x600",
                }}
                style={{
                  width: "100%",
                  height: 240,
                }}
              />

              {/* CONTENT */}

              <View
                style={{
                  padding: 18,
                }}
              >
                <View
                  style={{
                    flexDirection:
                      "row",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight:
                        "800",
                      color:
                        "#0F172A",
                      flex: 1,
                    }}
                  >
                    {item.name}
                  </Text>

                  <View
                    style={{
                      backgroundColor:
                        "#DCFCE7",
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 999,
                    }}
                  >
                    <Text
                      style={{
                        color:
                          "#166534",
                        fontWeight:
                          "700",
                        fontSize: 12,
                      }}
                    >
                      VERIFIED
                    </Text>
                  </View>
                </View>

                <Text
                  style={{
                    color:
                      "#22C55E",
                    fontWeight:
                      "700",
                    marginTop: 6,
                  }}
                >
                  {item.profession}
                </Text>

                <Text
                  style={{
                    color:
                      "#64748B",
                    marginTop: 10,
                    lineHeight: 22,
                  }}
                >
                  {item.bio}
                </Text>

                {/* DETAILS */}

                <View
                  style={{
                    marginTop: 15,
                    gap: 8,
                  }}
                >
                  <Text>
                    📍{" "}
                    {item.location ||
                      "Location not specified"}
                  </Text>

                  <Text>
                    📞{" "}
                    {item.phone ||
                      "Phone not available"}
                  </Text>

                  <Text>
                    ✉️{" "}
                    {item.email ||
                      "Email not available"}
                  </Text>
                </View>

                {/* ACTIONS */}

                <View
                  style={{
                    flexDirection:
                      "row",
                    gap: 10,
                    marginTop: 18,
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      callExpert(
                        item.phone
                      )
                    }
                    style={{
                      flex: 1,
                      backgroundColor:
                        "#22C55E",
                      height: 54,
                      borderRadius: 14,
                      justifyContent:
                        "center",
                      alignItems:
                        "center",
                    }}
                  >
                    <Text
                      style={{
                        color:
                          "#fff",
                        fontWeight:
                          "700",
                      }}
                    >
                      Call Expert
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      emailExpert(
                        item.email
                      )
                    }
                    style={{
                      flex: 1,
                      backgroundColor:
                        "#0F172A",
                      height: 54,
                      borderRadius: 14,
                      justifyContent:
                        "center",
                      alignItems:
                        "center",
                    }}
                  >
                    <Text
                      style={{
                        color:
                          "#fff",
                        fontWeight:
                          "700",
                      }}
                    >
                      Email
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}