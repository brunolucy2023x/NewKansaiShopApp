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
  Modal,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";

export default function PaintingTipsScreen() {
  const [tips, setTips] =
    useState<any[]>([]);

  const [filteredTips, setFilteredTips] =
    useState<any[]>([]);

  const [selectedTip, setSelectedTip] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const loadTips = async () => {
    try {
      const { data, error } =
        await supabase
          .from("painting_tips")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      if (error) throw error;

      setTips(data || []);
      setFilteredTips(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadTips();
  }, []);

  useEffect(() => {
    const filtered =
      tips.filter(
        (tip) =>
          tip.title
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          tip.content
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    setFilteredTips(filtered);
  }, [search, tips]);

  const onRefresh = () => {
    setRefreshing(true);
    loadTips();
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
            Painting Tips
          </Text>

          <Text
            style={{
              color: "#CBD5E1",
              marginTop: 8,
              lineHeight: 22,
            }}
          >
            Learn professional
            painting techniques,
            preparation methods and
            expert advice.
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
              placeholder="Search tips..."
              value={search}
              onChangeText={
                setSearch
              }
              style={{
                flex: 1,
                marginLeft: 10,
              }}
            />
          </View>
        </View>

        {/* EMPTY */}

        {filteredTips.length ===
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
              name="book-outline"
              size={70}
              color="#CBD5E1"
            />

            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                marginTop: 15,
                color:
                  "#0F172A",
              }}
            >
              No Tips Found
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredTips}
            keyExtractor={(
              item
            ) => item.id}
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
                activeOpacity={
                  0.9
                }
                onPress={() =>
                  setSelectedTip(
                    item
                  )
                }
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
                  <View
                    style={{
                      flexDirection:
                        "row",
                      alignItems:
                        "center",
                    }}
                  >
                    <Ionicons
                      name="book"
                      size={
                        18
                      }
                      color="#22C55E"
                    />

                    <Text
                      style={{
                        color:
                          "#22C55E",
                        fontWeight:
                          "700",
                        marginLeft: 6,
                      }}
                    >
                      Expert Guide
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight:
                        "800",
                      color:
                        "#0F172A",
                      marginTop: 10,
                    }}
                  >
                    {
                      item.title
                    }
                  </Text>

                  <Text
                    numberOfLines={
                      3
                    }
                    style={{
                      color:
                        "#64748B",
                      marginTop: 10,
                      lineHeight: 22,
                    }}
                  >
                    {
                      item.content
                    }
                  </Text>

                  <TouchableOpacity
                    style={{
                      marginTop: 15,
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
                      Read Full
                      Article →
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      {/* ARTICLE MODAL */}

      <Modal
        visible={
          !!selectedTip
        }
        animationType="slide"
      >
        {selectedTip && (
          <View
            style={{
              flex: 1,
              backgroundColor:
                "#fff",
            }}
          >
            <ScrollView>
              <Image
                source={{
                  uri:
                    selectedTip.image ||
                    "https://placehold.co/800x500",
                }}
                style={{
                  width: "100%",
                  height: 280,
                }}
              />

              <TouchableOpacity
                onPress={() =>
                  setSelectedTip(
                    null
                  )
                }
                style={{
                  position:
                    "absolute",
                  top: 60,
                  right: 20,
                  width: 42,
                  height: 42,
                  borderRadius: 21,
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
                    fontSize: 28,
                    fontWeight:
                      "800",
                    color:
                      "#0F172A",
                  }}
                >
                  {
                    selectedTip.title
                  }
                </Text>

                <Text
                  style={{
                    color:
                      "#64748B",
                    marginTop: 16,
                    lineHeight: 28,
                    fontSize: 16,
                  }}
                >
                  {
                    selectedTip.content
                  }
                </Text>
              </View>
            </ScrollView>
          </View>
        )}
      </Modal>
    </>
  );
}