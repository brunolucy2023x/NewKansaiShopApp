import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";

export default function FAQScreen() {
  const [faqs, setFaqs] =
    useState<any[]>([]);

  const [filteredFaqs, setFilteredFaqs] =
    useState<any[]>([]);

  const [expandedId, setExpandedId] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const loadFaqs = async () => {
    try {
      const { data, error } =
        await supabase
          .from("faqs")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      if (error) throw error;

      setFaqs(data || []);
      setFilteredFaqs(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  useEffect(() => {
    const filtered =
      faqs.filter(
        (faq) =>
          faq.question
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          faq.answer
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          faq.category
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    setFilteredFaqs(filtered);
  }, [search, faqs]);

  const onRefresh = () => {
    setRefreshing(true);
    loadFaqs();
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
          Help Center
        </Text>

        <Text
          style={{
            color: "#CBD5E1",
            marginTop: 8,
            lineHeight: 22,
          }}
        >
          Find answers to frequently
          asked questions about
          PaintHub products and
          services.
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
            placeholder="Search questions..."
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

      {filteredFaqs.length ===
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
            name="help-circle-outline"
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
            No FAQs Found
          </Text>

          <Text
            style={{
              color: "#64748B",
              textAlign: "center",
              marginTop: 8,
            }}
          >
            Try another search term.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredFaqs}
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
            const expanded =
              expandedId ===
              item.id;

            return (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                  setExpandedId(
                    expanded
                      ? null
                      : item.id
                  )
                }
                style={{
                  backgroundColor:
                    "#fff",
                  borderRadius: 22,
                  padding: 18,
                  marginBottom: 14,
                }}
              >
                {/* CATEGORY */}

                {item.category && (
                  <View
                    style={{
                      alignSelf:
                        "flex-start",
                      backgroundColor:
                        "#DCFCE7",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 999,
                      marginBottom: 10,
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
                      {
                        item.category
                      }
                    </Text>
                  </View>
                )}

                {/* QUESTION */}

                <View
                  style={{
                    flexDirection:
                      "row",
                    alignItems:
                      "center",
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 16,
                      fontWeight:
                        "800",
                      color:
                        "#0F172A",
                    }}
                  >
                    {
                      item.question
                    }
                  </Text>

                  <Ionicons
                    name={
                      expanded
                        ? "chevron-up"
                        : "chevron-down"
                    }
                    size={22}
                    color="#22C55E"
                  />
                </View>

                {/* ANSWER */}

                {expanded && (
                  <View
                    style={{
                      marginTop: 14,
                      borderTopWidth: 1,
                      borderTopColor:
                        "#F1F5F9",
                      paddingTop: 14,
                    }}
                  >
                    <Text
                      style={{
                        color:
                          "#64748B",
                        lineHeight: 24,
                        fontSize: 15,
                      }}
                    >
                      {
                        item.answer
                      }
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}