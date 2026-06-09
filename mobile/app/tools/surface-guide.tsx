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

export default function SurfaceGuideScreen() {
  const [surfaces, setSurfaces] =
    useState<any[]>([]);

  const [filteredSurfaces, setFilteredSurfaces] =
    useState<any[]>([]);

  const [selectedSurface, setSelectedSurface] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const loadSurfaces = async () => {
    try {
      const { data, error } =
        await supabase
          .from("surface_guides")
          .select("*")
          .order("surface_name");

      if (error) throw error;

      setSurfaces(data || []);
      setFilteredSurfaces(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadSurfaces();
  }, []);

  useEffect(() => {
    const filtered =
      surfaces.filter(
        (surface) =>
          surface.surface_name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          surface.description
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    setFilteredSurfaces(filtered);
  }, [search, surfaces]);

  const onRefresh = () => {
    setRefreshing(true);
    loadSurfaces();
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
            Surface Guide
          </Text>

          <Text
            style={{
              color: "#CBD5E1",
              marginTop: 8,
            }}
          >
            Learn how to prepare and
            paint different surfaces.
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
              placeholder="Search surface..."
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

        {filteredSurfaces.length ===
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
              name="layers-outline"
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
              No Surface Guides
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredSurfaces}
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
                  setSelectedSurface(
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
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight:
                        "800",
                      color:
                        "#0F172A",
                    }}
                  >
                    {
                      item.surface_name
                    }
                  </Text>

                  <Text
                    numberOfLines={3}
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
                      View Guide
                    </Text>

                    <Ionicons
                      name="arrow-forward"
                      size={16}
                      color="#22C55E"
                      style={{
                        marginLeft: 6,
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
          !!selectedSurface
        }
        animationType="slide"
      >
        {selectedSurface && (
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
                  selectedSurface.image ||
                  "https://placehold.co/800x500",
              }}
              style={{
                width: "100%",
                height: 300,
              }}
            />

            <TouchableOpacity
              onPress={() =>
                setSelectedSurface(
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
                  selectedSurface.surface_name
                }
              </Text>

              <Text
                style={{
                  color:
                    "#64748B",
                  marginTop: 16,
                  lineHeight: 26,
                }}
              >
                {
                  selectedSurface.description
                }
              </Text>

              {/* PREPARATION */}

              <View
                style={{
                  marginTop: 20,
                  backgroundColor:
                    "#F8FAFC",
                  borderRadius: 18,
                  padding: 18,
                }}
              >
                <Text
                  style={{
                    fontWeight:
                      "800",
                    color:
                      "#0F172A",
                    marginBottom: 10,
                  }}
                >
                  Surface Preparation
                </Text>

                <Text
                  style={{
                    color:
                      "#64748B",
                    lineHeight: 24,
                  }}
                >
                  {selectedSurface.preparation_steps ||
                    "Clean surface thoroughly and remove dust, grease, loose paint and contaminants before painting."}
                </Text>
              </View>

              {/* PRIMER */}

              <View
                style={{
                  marginTop: 14,
                  backgroundColor:
                    "#F8FAFC",
                  borderRadius: 18,
                  padding: 18,
                }}
              >
                <Text
                  style={{
                    fontWeight:
                      "800",
                    color:
                      "#0F172A",
                    marginBottom: 10,
                  }}
                >
                  Recommended Primer
                </Text>

                <Text
                  style={{
                    color:
                      "#64748B",
                    lineHeight: 24,
                  }}
                >
                  {selectedSurface.primer ||
                    "Use an appropriate primer for maximum adhesion and durability."}
                </Text>
              </View>

              {/* PRODUCT */}

              <View
                style={{
                  marginTop: 14,
                  backgroundColor:
                    "#DCFCE7",
                  borderRadius: 18,
                  padding: 18,
                }}
              >
                <Text
                  style={{
                    fontWeight:
                      "800",
                    color:
                      "#166534",
                    marginBottom: 10,
                  }}
                >
                  Recommended Product
                </Text>

                <Text
                  style={{
                    color:
                      "#166534",
                    lineHeight: 24,
                    fontWeight:
                      "600",
                  }}
                >
                  {selectedSurface.recommended_product ||
                    "Consult PaintHub for product recommendations."}
                </Text>
              </View>
            </View>
          </ScrollView>
        )}
      </Modal>
    </>
  );
}