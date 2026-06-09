import useCart from "@/hooks/useCart";
import useWishlist from "@/hooks/useWishlist";
import { Product } from "@/types";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native";

import { Image } from "expo-image";

const { width } = Dimensions.get("window");

const CARD_WIDTH = (width - 32 - 12) / 2;

interface ProductsGridProps {
  isLoading: boolean;
  isError: boolean;
  products: Product[];
}

const ProductsGrid = ({
  products,
  isLoading,
  isError,
}: ProductsGridProps) => {
  const {
    isInWishlist,
    toggleWishlist,
    isAddingToWishlist,
    isRemovingFromWishlist,
  } = useWishlist();

  const { isAddingToCart, addToCart } = useCart();

  const handleAddToCart = (productId: string, productName: string) => {
    addToCart(
      { productId, quantity: 1 },
      {
        onSuccess: () => {
          Alert.alert("Added", `${productName} added to cart`);
        },
        onError: (error: any) => {
          Alert.alert("Error", error?.message || "Failed to add product");
        },
      }
    );
  };

  const renderProduct = ({ item: product }: { item: Product }) => {
    const inWishlist = isInWishlist(product.id);

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          width: CARD_WIDTH,
          marginBottom: 16,
        }}
        onPress={() =>
          router.push(`/product/${product.id}` as any)
        }
      >
        {/* CARD */}
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 18,
            overflow: "hidden",
            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 3,
          }}
        >
          {/* IMAGE */}
          <View style={{ position: "relative" }}>
            <Image
              source={{
                uri:
                  product.images?.[0] ||
                  "https://placehold.co/600x600",
              }}
              style={{
                width: "100%",
                height: 140,
              }}
              contentFit="cover"
            />

            {/* Wishlist */}
            <TouchableOpacity
              onPress={() => toggleWishlist(product.id)}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                width: 34,
                height: 34,
                borderRadius: 17,
                backgroundColor: "rgba(255,255,255,0.9)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isAddingToWishlist || isRemovingFromWishlist ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <Ionicons
                  name={inWishlist ? "heart" : "heart-outline"}
                  size={18}
                  color={inWishlist ? "#EF4444" : "#111"}
                />
              )}
            </TouchableOpacity>

            {/* Stock badge */}
            <View
              style={{
                position: "absolute",
                bottom: 8,
                left: 8,
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 12,
                backgroundColor:
                  product.stock > 0 ? "#16A34A" : "#DC2626",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 9, fontWeight: "700" }}>
                {product.stock > 0 ? "IN STOCK" : "SOLD"}
              </Text>
            </View>
          </View>

          {/* CONTENT */}
          <View style={{ padding: 10 }}>
            {/* CATEGORY */}
            <Text
              style={{
                fontSize: 9,
                color: "#6B7280",
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              {product.category}
            </Text>

            {/* NAME */}
            <Text
              numberOfLines={2}
              style={{
                fontSize: 13,
                fontWeight: "700",
                color: "#111",
                marginTop: 4,
              }}
            >
              {product.name}
            </Text>

            {/* RATING */}
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
              <Ionicons name="star" size={12} color="#F59E0B" />
              <Text style={{ fontSize: 11, marginLeft: 4, color: "#111" }}>
                {Number(product.averageRating || 0).toFixed(1)}
              </Text>
            </View>

            {/* PRICE + BUTTON */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              {/* PRICE */}
              <View>
                <Text
                  style={{
                    fontSize: 10,
                    color: "#9CA3AF",
                    textDecorationLine: "line-through",
                  }}
                >
                  ${(Number(product.price) * 1.2).toFixed(2)}
                </Text>

                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "800",
                    color: "#111",
                  }}
                >
                  ${Number(product.price).toFixed(2)}
                </Text>
              </View>

              {/* BUTTON */}
              <TouchableOpacity
                onPress={() =>
                  handleAddToCart(product.id, product.name)
                }
                disabled={isAddingToCart || product.stock <= 0}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  backgroundColor:
                    product.stock <= 0 ? "#E5E7EB" : "#111",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isAddingToCart ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Ionicons
                    name="add"
                    size={18}
                    color={product.stock <= 0 ? "#9CA3AF" : "#fff"}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  /* LOADING */
  if (isLoading) {
    return (
      <View style={{ paddingVertical: 40, alignItems: "center" }}>
        <ActivityIndicator size="large" color="#111" />
        <Text style={{ marginTop: 10, color: "#6B7280" }}>
          Loading products...
        </Text>
      </View>
    );
  }

  /* ERROR */
  if (isError) {
    return (
      <View style={{ paddingVertical: 40, alignItems: "center" }}>
        <Ionicons name="cloud-offline-outline" size={50} color="#EF4444" />
        <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "700" }}>
          Failed to load products
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: "space-between",
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 120,
      }}
    />
  );
};

export default ProductsGrid;