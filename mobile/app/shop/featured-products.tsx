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
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";

export default function FeaturedProductsScreen() {
  const [products, setProducts] =
    useState<any[]>([]);

  const [filteredProducts, setFilteredProducts] =
    useState<any[]>([]);

  const [savedItems, setSavedItems] =
    useState<string[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const loadProducts = async () => {
    try {
      const { data, error } =
        await supabase
          .from("products")
          .select("*")
          .eq("featured", true)
          .order("created_at", {
            ascending: false,
          });

      if (error) throw error;

      setProducts(data || []);
      setFilteredProducts(data || []);

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (user) {
        const { data: saved } =
          await supabase
            .from("saved_items")
            .select("product_id")
            .eq("user_id", user.id);

        setSavedItems(
          saved?.map(
            (item) =>
              item.product_id
          ) || []
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const filtered =
      products.filter(
        (product) =>
          product.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          product.category
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    setFilteredProducts(
      filtered
    );
  }, [search, products]);

  const onRefresh = () => {
    setRefreshing(true);
    loadProducts();
  };

  const toggleSave = async (
    productId: string
  ) => {
    try {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {
        Alert.alert(
          "Login Required",
          "Please login first."
        );
        return;
      }

      const exists =
        savedItems.includes(
          productId
        );

      if (exists) {
        await supabase
          .from("saved_items")
          .delete()
          .eq("user_id", user.id)
          .eq(
            "product_id",
            productId
          );

        setSavedItems(
          savedItems.filter(
            (id) =>
              id !== productId
          )
        );
      } else {
        await supabase
          .from("saved_items")
          .insert({
            user_id: user.id,
            product_id:
              productId,
          });

        setSavedItems([
          ...savedItems,
          productId,
        ]);
      }
    } catch (error) {
      console.log(error);
    }
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
          Featured Products
        </Text>

        <Text
          style={{
            color: "#CBD5E1",
            marginTop: 8,
          }}
        >
          Handpicked products from
          PaintHub experts
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
            placeholder="Search products..."
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

      {filteredProducts.length ===
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
            name="star-outline"
            size={80}
            color="#CBD5E1"
          />

          <Text
            style={{
              marginTop: 15,
              fontSize: 22,
              fontWeight: "700",
            }}
          >
            No Featured Products
          </Text>
        </View>
      ) : (
        <FlatList
          data={
            filteredProducts
          }
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
          }) => {
            const isSaved =
              savedItems.includes(
                item.id
              );

            return (
              <TouchableOpacity
                activeOpacity={
                  0.95
                }
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

                <View>
                  <Image
                    source={{
                      uri:
                        item.images?.[0] ||
                        item.image ||
                        "https://placehold.co/800x600",
                    }}
                    style={{
                      width: "100%",
                      height: 240,
                    }}
                  />

                  <View
                    style={{
                      position:
                        "absolute",
                      top: 15,
                      left: 15,
                      backgroundColor:
                        "#22C55E",
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 999,
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
                      FEATURED
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      toggleSave(
                        item.id
                      )
                    }
                    style={{
                      position:
                        "absolute",
                      top: 15,
                      right: 15,
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
                      name={
                        isSaved
                          ? "heart"
                          : "heart-outline"
                      }
                      size={22}
                      color="#EF4444"
                    />
                  </TouchableOpacity>
                </View>

                {/* DETAILS */}

                <View
                  style={{
                    padding: 18,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
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
                      marginTop: 6,
                    }}
                  >
                    {
                      item.category
                    }
                  </Text>

                  <Text
                    numberOfLines={
                      2
                    }
                    style={{
                      color:
                        "#64748B",
                      marginTop: 10,
                    }}
                  >
                    {
                      item.description
                    }
                  </Text>

                  <View
                    style={{
                      flexDirection:
                        "row",
                      justifyContent:
                        "space-between",
                      alignItems:
                        "center",
                      marginTop: 16,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight:
                          "800",
                        color:
                          "#22C55E",
                      }}
                    >
                      KSh{" "}
                      {Number(
                        item.price
                      ).toLocaleString()}
                    </Text>

                    <TouchableOpacity
                      style={{
                        backgroundColor:
                          "#22C55E",
                        paddingHorizontal: 18,
                        height: 46,
                        borderRadius: 14,
                        justifyContent:
                          "center",
                      }}
                    >
                      <Text
                        style={{
                          color:
                            "#fff",
                          fontWeight:
                            "800",
                        }}
                      >
                        Add Cart
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}