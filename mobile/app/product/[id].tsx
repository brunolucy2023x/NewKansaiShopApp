// mobile/app/product/[id].tsx
import SafeScreen from "@/components/SafeScreen";
import useCart from "@/hooks/useCart";
import useProducts from "@/hooks/useProducts";
import { useProduct } from "@/hooks/useProduct";
import useWishlist from "@/hooks/useWishlist";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Alert,
  Share,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function ProductDetailScreen() {
  const insets = useSafeAreaInsets();

  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: product, isLoading, isError } = useProduct(id);
  const { data: products } = useProducts();

  const { addToCart, isAddingToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) {
    return (
      <SafeScreen>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      </SafeScreen>
    );
  }

  if (isError || !product) {
    return (
      <SafeScreen>
        <View className="flex-1 items-center justify-center">
          <Text>Product not found</Text>
        </View>
      </SafeScreen>
    );
  }

  const related =
    products?.filter((p) => p.id !== product.id).slice(0, 8) || [];

  const handleAddToCart = () => {
    addToCart(
      { productId: product.id, quantity: qty },
      {
        onSuccess: () =>
          Alert.alert("Success", "Added to cart"),
      } as any
    );
  };

  const handleShare = async () => {
    await Share.share({
      message: product.name,
    });
  };

  return (
    <SafeScreen>
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ paddingBottom: 200 }}
      >
        <View className="px-5 pt-4 flex-row justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>

          <View className="flex-row">
            <TouchableOpacity
              onPress={handleShare}
              className="mr-4"
            >
              <Ionicons
                name="share-outline"
                size={24}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                toggleWishlist(product.id)
              }
            >
              <Ionicons
                name={
                  isInWishlist(product.id)
                    ? "heart"
                    : "heart-outline"
                }
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="items-center">
          <Image
            source={{
              uri:
                product.images?.[selectedImage] ||
                "https://placehold.co/600x600",
            }}
            style={{
              width: width * 0.9,
              height: 320,
            }}
            contentFit="contain"
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-5"
        >
          {(product.images || []).map(
            (img, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  setSelectedImage(index)
                }
                className="mr-3"
              >
                <Image
                  source={{ uri: img }}
                  style={{
                    width: 70,
                    height: 70,
                  }}
                />
              </TouchableOpacity>
            )
          )}
        </ScrollView>

        <View className="px-5 mt-4">
          <Text className="text-[32px] font-black">
            KSh {product.price}
          </Text>

          <Text className="text-2xl font-black mt-2">
            {product.name}
          </Text>

          <View
            className={`self-start mt-3 px-4 py-2 rounded-full ${
              product.stock > 0
                ? "bg-green-100"
                : "bg-red-100"
            }`}
          >
            <Text
              className={`font-bold ${
                product.stock > 0
                  ? "text-green-700"
                  : "text-red-700"
              }`}
            >
              {product.stock > 0
                ? `${product.stock} In Stock`
                : "Out of Stock"}
            </Text>
          </View>

          <View className="flex-row items-center mt-3">
            <Ionicons
              name="star"
              size={16}
              color="#f59e0b"
            />
            <Text className="ml-2">
              {product.averageRating}
            </Text>
            <Text className="ml-2 text-gray-500">
              ({product.totalReviews} reviews)
            </Text>
          </View>
        </View>

        <View className="px-5 mt-6">
          <View className="bg-gray-50 rounded-3xl p-4">
            <Text className="font-black">
              Quantity
            </Text>

            <View className="flex-row justify-between items-center mt-4">
              <TouchableOpacity
                onPress={() =>
                  setQty(Math.max(1, qty - 1))
                }
              >
                <Ionicons
                  name="remove-circle"
                  size={38}
                />
              </TouchableOpacity>

              <Text className="text-3xl font-black">
                {qty}
              </Text>

              <TouchableOpacity
                onPress={() =>
                  setQty(
                    Math.min(
                      product.stock,
                      qty + 1
                    )
                  )
                }
              >
                <Ionicons
                  name="add-circle"
                  size={38}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="border rounded-3xl p-4 mt-4">
            <Text className="font-black">
              Shipping
            </Text>
            <Text className="mt-2">
              Nairobi, Kenya
            </Text>
            <Text>
              1-3 Day Delivery
            </Text>
          </View>

          <View className="border rounded-3xl p-4 mt-4">
            <Text className="font-black">
              Return Policy
            </Text>
            <Text className="mt-2">
              7 Day Return Guarantee
            </Text>
          </View>

          <View className="border rounded-3xl p-4 mt-4">
            <Text className="font-black">
              Shopping Security
            </Text>
            <Text>✓ Secure Payment</Text>
            <Text>✓ Buyer Protection</Text>
            <Text>✓ Verified Seller</Text>
          </View>

          <View className="border rounded-3xl p-4 mt-4">
            <Text className="font-black">
              PaintHub Official Store
            </Text>
            <Text className="text-gray-500 mt-2">
              Trusted Hardware Supplier
            </Text>
            <Text className="text-green-600 mt-2">
              ✓ Verified Seller
            </Text>
          </View>

          <View className="border rounded-3xl p-4 mt-4">
            <Text className="font-black">
              Specifications
            </Text>
            <Text className="mt-2">
              Category: {product.category}
            </Text>
            <Text>
              Stock: {product.stock}
            </Text>
          </View>

          <View className="mt-8">
            <Text className="text-xl font-black">
              Description
            </Text>
            <Text className="mt-3 text-gray-600 leading-7">
              {product.description}
            </Text>
          </View>

          <View className="mt-8">
            <Text className="text-xl font-black mb-4">
              You May Also Like
            </Text>

            <ScrollView horizontal>
              {related.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() =>
                    router.push(
                      `/product/${item.id}` as any
                    )
                  }
                  className="w-40 mr-4"
                >
                  <Image
                    source={{
                      uri: item.images?.[0],
                    }}
                    style={{
                      width: 140,
                      height: 140,
                    }}
                  />
                  <Text numberOfLines={2}>
                    {item.name}
                  </Text>
                  <Text className="font-black">
                    KSh {item.price}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      <View
        className="absolute left-0 right-0 bg-white border-t px-4 pt-4"
        style={{
          bottom: 0,
          paddingBottom: Math.max(
            insets.bottom,
            16
          ),
        }}
      >
        <View className="flex-row">
          <TouchableOpacity
            className="flex-1 bg-black rounded-2xl py-4 items-center mr-2"
            onPress={handleAddToCart}
          >
            {isAddingToCart ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-black">
                Add To Cart
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            disabled={product.stock <= 0}
            className={`flex-1 rounded-2xl py-4 items-center ${
              product.stock > 0
                ? "bg-[#D9F26A]"
                : "bg-gray-300"
            }`}
          >
            <Text className="font-black">
              Buy Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeScreen>
  );
}
