import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  Modal,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";

export default function ColorFinderScreen() {
  const [colors, setColors] =
    useState<any[]>([]);

  const [filteredColors, setFilteredColors] =
    useState<any[]>([]);

  const [selectedColor, setSelectedColor] =
    useState<any>(null);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const loadColors = async () => {
    try {
      const { data, error } =
        await supabase
          .from("colors")
          .select("*")
          .order("name");

      if (error) throw error;

      setColors(data || []);
      setFilteredColors(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadColors();
  }, []);

  useEffect(() => {
    const filtered =
      colors.filter(
        (item) =>
          item.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          item.category
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    setFilteredColors(filtered);
  }, [search, colors]);

  const onRefresh = () => {
    setRefreshing(true);
    loadColors();
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
            Color Finder
          </Text>

          <Text
            style={{
              color: "#CBD5E1",
              marginTop: 8,
            }}
          >
            Discover beautiful colors
            for your next project.
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
              height: 56,
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
              placeholder="Search colors..."
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

        {filteredColors.length ===
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
              name="color-palette-outline"
              size={80}
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
              No Colors Found
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredColors}
            numColumns={2}
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
              padding: 12,
            }}
            renderItem={({
              item,
            }) => (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                  setSelectedColor(
                    item
                  )
                }
                style={{
                  flex: 1,
                  margin: 6,
                  backgroundColor:
                    "#fff",
                  borderRadius: 24,
                  overflow:
                    "hidden",
                }}
              >
                {/* COLOR PREVIEW */}

                <View
                  style={{
                    height: 150,
                    backgroundColor:
                      item.hex_code ||
                      "#E2E8F0",
                  }}
                />

                <View
                  style={{
                    padding: 14,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
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
                      marginTop: 4,
                    }}
                  >
                    {
                      item.category
                    }
                  </Text>

                  <Text
                    style={{
                      color:
                        "#22C55E",
                      marginTop: 8,
                      fontWeight:
                        "700",
                    }}
                  >
                    {
                      item.hex_code
                    }
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      {/* COLOR DETAILS */}

      <Modal
        visible={
          !!selectedColor
        }
        animationType="slide"
      >
        {selectedColor && (
          <ScrollView
            style={{
              flex: 1,
              backgroundColor:
                "#fff",
            }}
          >
            <View
              style={{
                height: 320,
                backgroundColor:
                  selectedColor.hex_code,
              }}
            />

            <TouchableOpacity
              onPress={() =>
                setSelectedColor(
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
                  selectedColor.name
                }
              </Text>

              <Text
                style={{
                  color:
                    "#22C55E",
                  fontWeight:
                    "700",
                  marginTop: 8,
                }}
              >
                {
                  selectedColor.hex_code
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
                      "700",
                    color:
                      "#0F172A",
                  }}
                >
                  Category
                </Text>

                <Text
                  style={{
                    color:
                      "#64748B",
                    marginTop: 6,
                  }}
                >
                  {
                    selectedColor.category
                  }
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
                      "700",
                    color:
                      "#0F172A",
                  }}
                >
                  Description
                </Text>

                <Text
                  style={{
                    color:
                      "#64748B",
                    marginTop: 8,
                    lineHeight: 24,
                  }}
                >
                  {selectedColor.description ||
                    "No description available."}
                </Text>
              </View>
            </View>
          </ScrollView>
        )}
      </Modal>
    </>
  );
}