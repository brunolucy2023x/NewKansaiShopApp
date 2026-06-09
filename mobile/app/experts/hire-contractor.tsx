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

export default function HireContractorScreen() {
  const [contractors, setContractors] =
    useState<any[]>([]);

  const [filteredData, setFilteredData] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const loadContractors = async () => {
    try {
      const { data, error } =
        await supabase
          .from("experts")
          .select("*")
          .ilike(
            "profession",
            "%contractor%"
          )
          .order("created_at", {
            ascending: false,
          });

      if (error) throw error;

      setContractors(data || []);
      setFilteredData(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadContractors();
  }, []);

  useEffect(() => {
    const filtered =
      contractors.filter(
        (item) =>
          item.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          item.location
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          item.profession
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    setFilteredData(filtered);
  }, [search, contractors]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadContractors();
  };

  const callContractor = (
    phone: string
  ) => {
    if (!phone) return;

    Linking.openURL(
      `tel:${phone}`
    );
  };

  const emailContractor = (
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
          Hire Contractor
        </Text>

        <Text
          style={{
            color: "#CBD5E1",
            marginTop: 8,
            lineHeight: 22,
          }}
        >
          Find verified contractors
          for your painting and
          renovation projects.
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
            placeholder="Search contractor..."
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

      {filteredData.length ===
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
            name="construct-outline"
            size={70}
            color="#CBD5E1"
          />

          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              marginTop: 15,
            }}
          >
            No Contractors Found
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) =>
            item.id
          }
          refreshControl={
            <RefreshControl
              refreshing={
                refreshing
              }
              onRefresh={
                handleRefresh
              }
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
              <Image
                source={{
                  uri:
                    item.image ||
                    "https://placehold.co/600x400",
                }}
                style={{
                  width: "100%",
                  height: 220,
                }}
              />

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
                      CONTRACTOR
                    </Text>
                  </View>
                </View>

                <Text
                  style={{
                    color:
                      "#64748B",
                    marginTop: 8,
                  }}
                >
                  {item.bio}
                </Text>

                <View
                  style={{
                    marginTop: 14,
                    gap: 8,
                  }}
                >
                  <Text>
                    📍{" "}
                    {item.location ||
                      "Location not provided"}
                  </Text>

                  <Text>
                    📞{" "}
                    {item.phone ||
                      "No phone"}
                  </Text>

                  <Text>
                    ✉️{" "}
                    {item.email ||
                      "No email"}
                  </Text>
                </View>

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
                      callContractor(
                        item.phone
                      )
                    }
                    style={{
                      flex: 1,
                      backgroundColor:
                        "#22C55E",
                      height: 52,
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
                      Call
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      emailContractor(
                        item.email
                      )
                    }
                    style={{
                      flex: 1,
                      backgroundColor:
                        "#0F172A",
                      height: 52,
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