import React, { JSX, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FloatingWhatsApp(): JSX.Element {
  const [open, setOpen] = useState(false);

  const phoneNumber = "254796531625";

  const openWhatsApp = () => {
    const message = "Hi PaintHub, I need help with paint products.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
    setOpen(false);
  };

  const makeCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
    setOpen(false);
  };

  const quickQuote = () => {
    const message = "Hi BuildHub, I need a quick quote for paint services.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* OPTIONS */}
      {open && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.item} onPress={openWhatsApp}>
            <Ionicons name="logo-whatsapp" size={18} color="#fff" />
            <Text style={styles.text}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemCall} onPress={makeCall}>
            <Ionicons name="call" size={18} color="#fff" />
            <Text style={styles.text}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemQuote} onPress={quickQuote}>
            <Ionicons name="document-text" size={18} color="#fff" />
            <Text style={styles.text}>Quick Quote</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* MAIN FLOAT BUTTON */}
      <TouchableOpacity style={styles.fab} onPress={() => setOpen(!open)}>
        <Ionicons name={open ? "close" : "chatbubble-ellipses"} size={26} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 25,
    right: 20,
    alignItems: "flex-end",
  },

  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#16A34A",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },

  menu: {
    marginBottom: 10,
    alignItems: "flex-end",
    gap: 10,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#16A34A",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },

  itemCall: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },

  itemQuote: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F97316",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },

  text: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
});