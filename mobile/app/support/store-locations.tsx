import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  Linking,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";

export default function StoreLocationsScreen() {
  const [stores, setStores] =
    useState<any[]>([]);

  const [filteredStores, setFilteredStores] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const loadStores = async () => {
    try {
      const { data, error } =
        await supabase
          .from("store_locations")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      if (error) throw error;

      setStores(data || []);
      setFilteredStores(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadStores();
  }, []);

  useEffect(() => {
    const filtered =
      stores.filter(
        (store) =>
          store.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          store.address
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          store.city
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    setFilteredStores(filtered);
  }, [search, stores]);

  const onRefresh = () => {
    setRefreshing(true);
    loadStores();
  };

  const callStore = (
    phone: string
  ) => {
    if (!phone) return;

    Linking.openURL(
      `tel:${phone}`
    );
  };

  const emailStore = (
    email: string
  ) => {
    if (!email) return;

    Linking.openURL(
      `mailto:${email}`
    );
  };

  const openMap = (
    latitude: number,
    longitude: number,
    address: string
  ) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    Linking.openURL(url);
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
          Store Locations
        </Text>

        <Text
          style={{
            color: "#CBD5E1",
            marginTop: 8,
            lineHeight: 22,
          }}
        >
          Find the nearest PaintHub
          store, dealer, or pickup
          location.
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
            height: 56,
            borderRadius: 18,
            flexDirection:
              "row",
            alignItems:
              "center",
            paddingHorizontal: 16,
          }}
        >
          <Ionicons
            name="search"
            size={20}
            color="#64748B"
          />

          <TextInput
            placeholder="Search location..."
            value={search}
            onChangeText={setSearch}
            style={{
              flex: 1,
              marginLeft: 10,
            }}
          />
        </View>
      </View>

      {/* EMPTY */}

      {filteredStores.length ===
      0 ? (
        <View
          style={{
            flex: 1,
            justifyContent:
              "center",
            alignItems:
              "center",
            padding: 24,
          }}
        >
          <Ionicons
            name="location-outline"
            size={80}
            color="#CBD5E1"
          />

          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              color: "#0F172A",
              marginTop: 15,
            }}
          >
            No Stores Found
          </Text>

          <Text
            style={{
              color: "#64748B",
              marginTop: 8,
            }}
          >
            Try another search.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredStores}
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
                padding: 18,
                marginBottom: 16,
              }}
            >
              {/* STORE HEADER */}

              <View
                style={{
                  flexDirection:
                    "row",
                  alignItems:
                    "center",
                }}
              >
                <View
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: 16,
                    backgroundColor:
                      "#DCFCE7",
                    justifyContent:
                      "center",
                    alignItems:
                      "center",
                  }}
                >
                  <Ionicons
                    name="business"
                    size={28}
                    color="#22C55E"
                  />
                </View>

                <View
                  style={{
                    flex: 1,
                    marginLeft: 12,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight:
                        "800",
                      color:
                        "#0F172A",
                    }}
                  >
                    {item.name}
                  </Text>

                  <Text
                    style={{
                      color:
                        "#64748B",
                      marginTop: 3,
                    }}
                  >
                    {item.city}
                  </Text>
                </View>
              </View>

              {/* DETAILS */}

              <View
                style={{
                  marginTop: 16,
                  gap: 10,
                }}
              >
                <Text
                  style={{
                    color:
                      "#475569",
                  }}
                >
                  📍 {item.address}
                </Text>

                <Text
                  style={{
                    color:
                      "#475569",
                  }}
                >
                  📞{" "}
                  {item.phone ||
                    "Not Available"}
                </Text>

                <Text
                  style={{
                    color:
                      "#475569",
                  }}
                >
                  ✉️{" "}
                  {item.email ||
                    "Not Available"}
                </Text>

                <Text
                  style={{
                    color:
                      "#475569",
                  }}
                >
                  🕒{" "}
                  {item.opening_hours ||
                    "Always Open"}
                </Text>
              </View>

              {/* ACTIONS */}

              <View
                style={{
                  flexDirection:
                    "row",
                  marginTop: 18,
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    callStore(
                      item.phone
                    )
                  }
                  style={{
                    flex: 1,
                    backgroundColor:
                      "#22C55E",
                    height: 50,
                    borderRadius: 14,
                    justifyContent:
                      "center",
                    alignItems:
                      "center",
                  }}
                >
                  <Ionicons
                    name="call"
                    size={18}
                    color="#fff"
                  />

                  <Text
                    style={{
                      color:
                        "#fff",
                      fontWeight:
                        "700",
                      marginTop: 2,
                    }}
                  >
                    Call
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    emailStore(
                      item.email
                    )
                  }
                  style={{
                    flex: 1,
                    backgroundColor:
                      "#3B82F6",
                    height: 50,
                    borderRadius: 14,
                    justifyContent:
                      "center",
                    alignItems:
                      "center",
                  }}
                >
                  <Ionicons
                    name="mail"
                    size={18}
                    color="#fff"
                  />

                  <Text
                    style={{
                      color:
                        "#fff",
                      fontWeight:
                        "700",
                      marginTop: 2,
                    }}
                  >
                    Email
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    openMap(
                      item.latitude,
                      item.longitude,
                      item.address
                    )
                  }
                  style={{
                    flex: 1,
                    backgroundColor:
                      "#0F172A",
                    height: 50,
                    borderRadius: 14,
                    justifyContent:
                      "center",
                    alignItems:
                      "center",
                  }}
                >
                  <Ionicons
                    name="navigate"
                    size={18}
                    color="#fff"
                  />

                  <Text
                    style={{
                      color:
                        "#fff",
                      fontWeight:
                        "700",
                      marginTop: 2,
                    }}
                  >
                    Map
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}