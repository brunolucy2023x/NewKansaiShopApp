import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Image,
  TextInput,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { supabase } from "@/lib/supabase";

export default function CategoriesScreen() {
  const [categories, setCategories] =
    useState<any[]>([]);

  const [filteredCategories, setFilteredCategories] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const loadCategories = async () => {
    try {
      const { data, error } =
        await supabase
          .from("categories")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      if (error) throw error;

      setCategories(data || []);
      setFilteredCategories(
        data || []
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    const filtered =
      categories.filter(
        (category) =>
          category.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          category.description
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    setFilteredCategories(
      filtered
    );
  }, [search, categories]);

  const onRefresh = () => {
    setRefreshing(true);
    loadCategories();
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
          Categories
        </Text>

        <Text
          style={{
            color: "#CBD5E1",
            marginTop: 8,
          }}
        >
          Browse products by category
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
            placeholder="Search categories..."
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

      {filteredCategories.length ===
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
            name="grid-outline"
            size={80}
            color="#CBD5E1"
          />

          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              marginTop: 16,
              color: "#0F172A",
            }}
          >
            No Categories Found
          </Text>
        </View>
      ) : (
        <FlatList
          data={
            filteredCategories
          }
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
                router.push({
                  pathname:
                    "/shop/featured-products",
                  params: {
                    category:
                      item.name,
                  },
                })
              }
              style={{
                flex: 1,
                backgroundColor:
                  "#fff",
                margin: 6,
                borderRadius: 24,
                overflow:
                  "hidden",
              }}
            >
              {/* IMAGE */}

              <Image
                source={{
                  uri:
                    item.image ||
                    "https://placehold.co/600x400",
                }}
                style={{
                  width: "100%",
                  height: 140,
                }}
              />

              {/* CONTENT */}

              <View
                style={{
                  padding: 14,
                }}
              >
                <Text
                  numberOfLines={1}
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
                  numberOfLines={2}
                  style={{
                    color:
                      "#64748B",
                    marginTop: 6,
                    fontSize: 13,
                    lineHeight: 18,
                  }}
                >
                  {item.description}
                </Text>

                <View
                  style={{
                    marginTop: 12,
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
                    Browse
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
  );
}