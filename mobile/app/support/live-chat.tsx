import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";

export default function LiveChatScreen() {
  const [messages, setMessages] =
    useState<any[]>([]);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const flatListRef =
    useRef<FlatList>(null);

  useEffect(() => {
    initializeChat();
  }, []);

  const initializeChat = async () => {
    try {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } =
        await supabase
          .from("messages")
          .select("*")
          .eq("user_id", user.id)
          .eq("message_type", "chat")
          .order("created_at", {
            ascending: true,
          });

      setMessages(data || []);

      subscribeToMessages(user.id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToMessages = (
    userId: string
  ) => {
    supabase
      .channel(
        "paint-hub-chat"
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setMessages(
            (prev) => [
              ...prev,
              payload.new,
            ]
          );

          setTimeout(() => {
            flatListRef.current?.scrollToEnd(
              {
                animated: true,
              }
            );
          }, 300);
        }
      )
      .subscribe();
  };

  const sendMessage =
    async () => {
      if (!message.trim())
        return;

      try {
        const {
          data: { user },
        } =
          await supabase.auth.getUser();

        if (!user) return;

        const {
          error,
        } = await supabase
          .from("messages")
          .insert({
            user_id:
              user.id,
            name:
              user.user_metadata
                ?.full_name ||
              "Customer",
            message:
              message.trim(),
            sender:
              "customer",
            message_type:
              "chat",
            status:
              "unread",
          });

        if (error)
          throw error;

        setMessage("");
      } catch (error) {
        Alert.alert(
          "Error",
          "Failed to send message."
        );
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
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor:
          "#F8FAFC",
      }}
      behavior={
        Platform.OS ===
        "ios"
          ? "padding"
          : undefined
      }
    >
      {/* HEADER */}

      <View
        style={{
          backgroundColor:
            "#0F172A",
          paddingTop: 60,
          paddingBottom: 18,
          paddingHorizontal: 20,
          flexDirection:
            "row",
          alignItems:
            "center",
        }}
      >
        <View
          style={{
            width: 52,
            height: 52,
            borderRadius: 26,
            backgroundColor:
              "#22C55E",
            justifyContent:
              "center",
            alignItems:
              "center",
          }}
        >
          <Ionicons
            name="headset"
            size={26}
            color="#fff"
          />
        </View>

        <View
          style={{
            marginLeft: 12,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "800",
            }}
          >
            PaintHub Support
          </Text>

          <Text
            style={{
              color: "#CBD5E1",
              marginTop: 2,
            }}
          >
            Online Support Team
          </Text>
        </View>
      </View>

      {/* MESSAGES */}

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) =>
          item.id
        }
        contentContainerStyle={{
          padding: 16,
        }}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd(
            {
              animated: true,
            }
          )
        }
        renderItem={({
          item,
        }) => {
          const isMine =
            item.sender ===
            "customer";

          return (
            <View
              style={{
                alignSelf:
                  isMine
                    ? "flex-end"
                    : "flex-start",
                maxWidth:
                  "80%",
                marginBottom: 12,
              }}
            >
              <View
                style={{
                  backgroundColor:
                    isMine
                      ? "#22C55E"
                      : "#fff",
                  padding: 14,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    color:
                      isMine
                        ? "#fff"
                        : "#0F172A",
                    fontSize: 15,
                  }}
                >
                  {
                    item.message
                  }
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 11,
                  color:
                    "#94A3B8",
                  marginTop: 4,
                  alignSelf:
                    isMine
                      ? "flex-end"
                      : "flex-start",
                }}
              >
                {new Date(
                  item.created_at
                ).toLocaleTimeString()}
              </Text>
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent:
                "center",
              alignItems:
                "center",
              marginTop: 120,
            }}
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
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
              Start Conversation
            </Text>

            <Text
              style={{
                color: "#64748B",
                textAlign:
                  "center",
                marginTop: 8,
              }}
            >
              Send a message to
              PaintHub support.
            </Text>
          </View>
        )}
      />

      {/* INPUT */}

      <View
        style={{
          backgroundColor:
            "#fff",
          padding: 12,
          borderTopWidth: 1,
          borderTopColor:
            "#E2E8F0",
          flexDirection:
            "row",
          alignItems:
            "center",
        }}
      >
        <TextInput
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
          multiline
          style={{
            flex: 1,
            backgroundColor:
              "#F8FAFC",
            borderRadius: 16,
            paddingHorizontal: 16,
            paddingVertical: 12,
            maxHeight: 120,
          }}
        />

        <TouchableOpacity
          onPress={sendMessage}
          style={{
            width: 54,
            height: 54,
            borderRadius: 27,
            backgroundColor:
              "#22C55E",
            justifyContent:
              "center",
            alignItems:
              "center",
            marginLeft: 10,
          }}
        >
          <Ionicons
            name="send"
            size={22}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}