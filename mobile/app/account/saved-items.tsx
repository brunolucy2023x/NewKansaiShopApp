import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { supabase } from "@/lib/supabase";

export default function SavedItemsScreen() {
  const [loading, setLoading] =
    useState(true);

  const [savedItems, setSavedItems] =
    useState<any[]>([]);

  const loadSavedItems = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } =
        await supabase
          .from("saved_items")
          .select(
            `
            id,
            product_id,
            products(*)
          `
          )
          .eq("user_id", user.id);

      if (error) throw error;

      setSavedItems(data || []);
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Failed to load saved items."
      );
    } finally {
      setLoading(false);
    }
  };

  const removeSavedItem = async (
    id: string
  ) => {
    try {
      await supabase
        .from("saved_items")
        .delete()
        .eq("id", id);

      setSavedItems((prev) =>
        prev.filter(
          (item) => item.id !== id
        )
      );
    } catch {
      Alert.alert(
        "Error",
        "Failed to remove item."
      );
    }
  };

  useEffect(() => {
    loadSavedItems();
  }, []);

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
          padding: 20,
          backgroundColor:
            "#0F172A",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "800",
            color: "#fff",
          }}
        >
          Saved Items
        </Text>

        <Text
          style={{
            color: "#CBD5E1",
            marginTop: 4,
          }}
        >
          Your favourite products
        </Text>
      </View>

      {savedItems.length === 0 ? (
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
            name="heart-outline"
            size={70}
            color="#CBD5E1"
          />

          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#0F172A",
              marginTop: 16,
            }}
          >
            No Saved Items
          </Text>

          <Text
            style={{
              color: "#64748B",
              textAlign: "center",
              marginTop: 8,
            }}
          >
            Products you save will
            appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={savedItems}
          keyExtractor={(item) =>
            item.id
          }
          contentContainerStyle={{
            padding: 16,
          }}
          renderItem={({ item }) => {
            const product =
              item.products;

            return (
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  backgroundColor:
                    "#fff",
                  borderRadius: 20,
                  marginBottom: 14,
                  overflow:
                    "hidden",
                }}
              >
                <Image
                  source={{
                    uri:
                      product
                        ?.images?.[0] ||
                      "https://placehold.co/600x400",
                  }}
                  style={{
                    width: "100%",
                    height: 180,
                  }}
                />

                <View
                  style={{
                    padding: 16,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight:
                        "700",
                      color:
                        "#0F172A",
                    }}
                  >
                    {
                      product?.name
                    }
                  </Text>

                  <Text
                    style={{
                      color:
                        "#64748B",
                      marginTop: 6,
                    }}
                    numberOfLines={
                      2
                    }
                  >
                    {
                      product?.description
                    }
                  </Text>

                  <Text
                    style={{
                      color:
                        "#22C55E",
                      fontSize: 20,
                      fontWeight:
                        "800",
                      marginTop: 10,
                    }}
                  >
                    KSh{" "}
                    {Number(
                      product?.price ||
                        0
                    ).toLocaleString()}
                  </Text>

                  <View
                    style={{
                      flexDirection:
                        "row",
                      marginTop: 14,
                      gap: 10,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        height: 48,
                        backgroundColor:
                          "#22C55E",
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
                        View Product
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        removeSavedItem(
                          item.id
                        )
                      }
                      style={{
                        width: 48,
                        height: 48,
                        backgroundColor:
                          "#FEE2E2",
                        borderRadius: 14,
                        justifyContent:
                          "center",
                        alignItems:
                          "center",
                      }}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={
                          22
                        }
                        color="#DC2626"
                      />
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