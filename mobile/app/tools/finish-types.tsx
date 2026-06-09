import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Modal,
  ScrollView,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";

export default function FinishTypesScreen() {
  const [finishes, setFinishes] =
    useState<any[]>([]);

  const [filteredFinishes, setFilteredFinishes] =
    useState<any[]>([]);

  const [selectedFinish, setSelectedFinish] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const loadFinishes = async () => {
    try {
      const { data, error } =
        await supabase
          .from("finish_types")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      if (error) throw error;

      setFinishes(data || []);
      setFilteredFinishes(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadFinishes();
  }, []);

  useEffect(() => {
    const filtered =
      finishes.filter(
        (item) =>
          item.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          item.description
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    setFilteredFinishes(filtered);
  }, [search, finishes]);

  const onRefresh = () => {
    setRefreshing(true);
    loadFinishes();
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
    <>
      <View
        style={{
          flex: 1,
          backgroundColor:
            "#F8FAFC",
        }}
      >
        {/* HEADER */}

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
            Finish Types
          </Text>

          <Text
            style={{
              color: "#CBD5E1",
              marginTop: 8,
            }}
          >
            Compare paint finishes and
            choose the perfect look.
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
              placeholder="Search finish types..."
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

        {filteredFinishes.length ===
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
              name="brush-outline"
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
              No Finish Types Found
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredFinishes}
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
                onPress={() =>
                  setSelectedFinish(
                    item
                  )
                }
                style={{
                  backgroundColor:
                    "#fff",
                  borderRadius: 24,
                  overflow:
                    "hidden",
                  marginBottom: 16,
                }}
              >
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
                    {item.name}
                  </Text>

                  <Text
                    numberOfLines={3}
                    style={{
                      marginTop: 10,
                      color:
                        "#64748B",
                      lineHeight: 22,
                    }}
                  >
                    {
                      item.description
                    }
                  </Text>

                  <View
                    style={{
                      marginTop: 14,
                      flexDirection:
                        "row",
                      alignItems:
                        "center",
                    }}
                  >
                    <Text
                      style={{
                        color:
                          "#22C55E",
                        fontWeight:
                          "700",
                      }}
                    >
                      Learn More
                    </Text>

                    <Ionicons
                      name="arrow-forward"
                      size={16}
                      color="#22C55E"
                      style={{
                        marginLeft: 5,
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      {/* DETAILS MODAL */}

      <Modal
        visible={
          !!selectedFinish
        }
        animationType="slide"
      >
        {selectedFinish && (
          <ScrollView
            style={{
              flex: 1,
              backgroundColor:
                "#fff",
            }}
          >
            <Image
              source={{
                uri:
                  selectedFinish.image ||
                  "https://placehold.co/800x500",
              }}
              style={{
                width: "100%",
                height: 300,
              }}
            />

            <TouchableOpacity
              onPress={() =>
                setSelectedFinish(
                  null
                )
              }
              style={{
                position:
                  "absolute",
                top: 60,
                right: 20,
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor:
                  "#fff",
                justifyContent:
                  "center",
                alignItems:
                  "center",
              }}
            >
              <Ionicons
                name="close"
                size={24}
                color="#0F172A"
              />
            </TouchableOpacity>

            <View
              style={{
                padding: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontWeight:
                    "800",
                  color:
                    "#0F172A",
                }}
              >
                {
                  selectedFinish.name
                }
              </Text>

              <Text
                style={{
                  color:
                    "#64748B",
                  marginTop: 16,
                  lineHeight: 26,
                  fontSize: 15,
                }}
              >
                {
                  selectedFinish.description
                }
              </Text>

              <View
                style={{
                  marginTop: 20,
                  backgroundColor:
                    "#F8FAFC",
                  padding: 18,
                  borderRadius: 18,
                }}
              >
                <Text
                  style={{
                    fontWeight:
                      "800",
                    color:
                      "#0F172A",
                  }}
                >
                  Best Use Cases
                </Text>

                <Text
                  style={{
                    marginTop: 10,
                    color:
                      "#64748B",
                    lineHeight: 24,
                  }}
                >
                  {selectedFinish.best_for ||
                    "Interior walls, ceilings, feature walls and decorative applications."}
                </Text>
              </View>

              <View
                style={{
                  marginTop: 14,
                  backgroundColor:
                    "#F8FAFC",
                  padding: 18,
                  borderRadius: 18,
                }}
              >
                <Text
                  style={{
                    fontWeight:
                      "800",
                    color:
                      "#0F172A",
                  }}
                >
                  Advantages
                </Text>

                <Text
                  style={{
                    marginTop: 10,
                    color:
                      "#64748B",
                    lineHeight: 24,
                  }}
                >
                  {selectedFinish.advantages ||
                    "Durable finish, attractive appearance, easy maintenance and long-lasting protection."}
                </Text>
              </View>
            </View>
          </ScrollView>
        )}
      </Modal>
    </>
  );
}