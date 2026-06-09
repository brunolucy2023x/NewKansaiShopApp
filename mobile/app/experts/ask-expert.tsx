import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";

export default function AskExpertScreen() {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async () => {
    if (
      !form.name ||
      !form.subject ||
      !form.message
    ) {
      Alert.alert(
        "Missing Information",
        "Please fill all required fields."
      );
      return;
    }

    try {
      setLoading(true);

      const { error } =
        await supabase
          .from("messages")
          .insert([
            {
              name: form.name,
              email: form.email,
              phone: form.phone,
              subject: form.subject,
              message: form.message,
              status: "unread",
            },
          ]);

      if (error) throw error;

      Alert.alert(
        "Success",
        "Your question has been sent to our experts."
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Failed to send your message."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#F8FAFC",
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* HERO */}

      <View
        style={{
          backgroundColor: "#0F172A",
          paddingTop: 70,
          paddingBottom: 40,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 20,
            backgroundColor:
              "rgba(34,197,94,0.15)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="chatbubbles"
            size={34}
            color="#22C55E"
          />
        </View>

        <Text
          style={{
            color: "#fff",
            fontSize: 30,
            fontWeight: "800",
            marginTop: 18,
          }}
        >
          Ask an Expert
        </Text>

        <Text
          style={{
            color: "#CBD5E1",
            marginTop: 8,
            fontSize: 15,
            lineHeight: 22,
          }}
        >
          Need help choosing paint,
          estimating quantities,
          selecting colors, or solving
          painting problems? Send your
          question directly to PaintHub
          experts.
        </Text>
      </View>

      {/* FORM */}

      <View
        style={{
          margin: 16,
          backgroundColor: "#fff",
          borderRadius: 24,
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "800",
            color: "#0F172A",
            marginBottom: 20,
          }}
        >
          Send Your Question
        </Text>

        <TextInput
          placeholder="Full Name *"
          value={form.name}
          onChangeText={(text) =>
            setForm({
              ...form,
              name: text,
            })
          }
          style={styles.input}
        />

        <TextInput
          placeholder="Email Address"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(text) =>
            setForm({
              ...form,
              email: text,
            })
          }
          style={styles.input}
        />

        <TextInput
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(text) =>
            setForm({
              ...form,
              phone: text,
            })
          }
          style={styles.input}
        />

        <TextInput
          placeholder="Subject *"
          value={form.subject}
          onChangeText={(text) =>
            setForm({
              ...form,
              subject: text,
            })
          }
          style={styles.input}
        />

        <TextInput
          placeholder="Describe your question in detail *"
          multiline
          textAlignVertical="top"
          value={form.message}
          onChangeText={(text) =>
            setForm({
              ...form,
              message: text,
            })
          }
          style={[
            styles.input,
            {
              height: 140,
              paddingTop: 14,
            },
          ]}
        />

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleSubmit}
          disabled={loading}
          style={{
            backgroundColor: "#22C55E",
            height: 58,
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          {loading ? (
            <ActivityIndicator
              color="#fff"
            />
          ) : (
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "800",
              }}
            >
              Send Question
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* BENEFITS */}

      <View
        style={{
          marginHorizontal: 16,
          marginBottom: 30,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "800",
            color: "#0F172A",
            marginBottom: 14,
          }}
        >
          What Can We Help With?
        </Text>

        {[
          "Paint product recommendations",
          "Paint quantity estimation",
          "Interior & exterior color advice",
          "Surface preparation guidance",
          "Professional contractor referrals",
        ].map((item) => (
          <View
            key={item}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 16,
              marginBottom: 10,
            }}
          >
            <Ionicons
              name="checkmark-circle"
              size={22}
              color="#22C55E"
            />

            <Text
              style={{
                marginLeft: 12,
                color: "#0F172A",
                fontWeight: "600",
              }}
            >
              {item}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = {
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 14,
    fontSize: 15,
  },
};