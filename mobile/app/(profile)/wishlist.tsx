import SafeScreen from "@/components/SafeScreen";

import useCart from "@/hooks/useCart";
import useWishlist from "@/hooks/useWishlist";

import { Ionicons } from "@expo/vector-icons";

import { Image } from "expo-image";

import { router } from "expo-router";

import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function WishlistScreen() {
  /* =========================================================
     DATA
  ========================================================= */

  const {
    wishlist = [],

    isLoading,

    isError,

    removeFromWishlist,

    isRemovingFromWishlist,
  } = useWishlist();

  const {
    addToCart,

    isAddingToCart,
  } = useCart();

  /* =========================================================
     REMOVE FROM WISHLIST
  ========================================================= */

  const handleRemoveFromWishlist =
    (
      productId: string,
      productName: string
    ) => {
      Alert.alert(
        "Remove from wishlist",

        `Remove ${productName} from wishlist?`,

        [
          {
            text: "Cancel",

            style: "cancel",
          },

          {
            text: "Remove",

            style: "destructive",

            onPress: () =>
              removeFromWishlist(
                productId
              ),
          },
        ]
      );
    };

  /* =========================================================
     ADD TO CART
  ========================================================= */

  const handleAddToCart = (
    productId: string,
    productName: string
  ) => {
    addToCart(
      {
        productId,

        quantity: 1,
      },

      {
        onSuccess: () => {
          Alert.alert(
            "Success",

            `${productName} added to cart`
          );
        },

        onError: (error: any) => {
          console.error(error);

          Alert.alert(
            "Error",

            error?.message ||
              "Failed to add to cart"
          );
        },
      }
    );
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return <LoadingUI />;
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (isError) {
    return <ErrorUI />;
  }

  return (
    <SafeScreen>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <View className="px-6 pb-5 border-b border-surface flex-row items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-4"
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <Text className="text-text-primary text-2xl font-bold">
          Wishlist
        </Text>

        <Text className="text-text-secondary text-sm ml-auto">
          {wishlist.length}{" "}
          {wishlist.length === 1
            ? "item"
            : "items"}
        </Text>
      </View>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {wishlist.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons
            name="heart-outline"
            size={80}
            color="#666"
          />

          <Text className="text-text-primary font-semibold text-xl mt-4">
            Your wishlist is empty
          </Text>

          <Text className="text-text-secondary text-center mt-2">
            Start adding products you
            love!
          </Text>

          <TouchableOpacity
            className="bg-primary rounded-2xl px-8 py-4 mt-6"
            activeOpacity={0.8}
            onPress={() =>
              router.push("/(tabs)")
            }
          >
            <Text className="text-background font-bold text-base">
              Browse Products
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* =====================================================
            WISHLIST ITEMS
        ===================================================== */

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        >
          <View className="px-6 py-4">
            {wishlist.map((item: any) => (
              <TouchableOpacity
                key={item.id}
                className="bg-surface rounded-3xl overflow-hidden mb-3"
                activeOpacity={0.8}
                // onPress={() =>
                //   router.push(`/product/${item.id}`)
                // }
              >
                <View className="flex-row p-4">
                  {/* IMAGE */}

                  <Image
                    source={
                      item.images?.[0] ||
                      "https://placehold.co/300x300"
                    }
                    className="rounded-2xl bg-background-lighter"
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: 8,
                    }}
                    contentFit="cover"
                  />

                  {/* CONTENT */}

                  <View className="flex-1 ml-4">
                    <Text
                      className="text-text-primary font-bold text-base mb-2"
                      numberOfLines={2}
                    >
                      {item.name}
                    </Text>

                    <Text className="text-primary font-bold text-xl mb-2">
                      $
                      {Number(
                        item.price || 0
                      ).toFixed(2)}
                    </Text>

                    {/* STOCK */}

                    {item.stock > 0 ? (
                      <View className="flex-row items-center">
                        <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />

                        <Text className="text-green-500 text-sm font-semibold">
                          {item.stock} in
                          stock
                        </Text>
                      </View>
                    ) : (
                      <View className="flex-row items-center">
                        <View className="w-2 h-2 bg-red-500 rounded-full mr-2" />

                        <Text className="text-red-500 text-sm font-semibold">
                          Out of Stock
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* DELETE */}

                  <TouchableOpacity
                    className="self-start bg-red-500/20 p-2 rounded-full"
                    activeOpacity={0.7}
                    onPress={() =>
                      handleRemoveFromWishlist(
                        item.id,
                        item.name
                      )
                    }
                    disabled={
                      isRemovingFromWishlist
                    }
                  >
                    <Ionicons
                      name="trash-outline"
                      size={20}
                      color="#EF4444"
                    />
                  </TouchableOpacity>
                </View>

                {/* ADD TO CART */}

                {item.stock > 0 && (
                  <View className="px-4 pb-4">
                    <TouchableOpacity
                      className="bg-primary rounded-xl py-3 items-center"
                      activeOpacity={0.8}
                      onPress={() =>
                        handleAddToCart(
                          item.id,
                          item.name
                        )
                      }
                      disabled={
                        isAddingToCart
                      }
                    >
                      {isAddingToCart ? (
                        <ActivityIndicator
                          size="small"
                          color="#121212"
                        />
                      ) : (
                        <Text className="text-background font-bold">
                          Add to Cart
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeScreen>
  );
}

export default WishlistScreen;

/* =========================================================
   LOADING UI
========================================================= */

function LoadingUI() {
  return (
    <SafeScreen>
      <View className="px-6 pb-5 border-b border-surface flex-row items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-4"
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <Text className="text-text-primary text-2xl font-bold">
          Wishlist
        </Text>
      </View>

      <View className="flex-1 items-center justify-center">
        <ActivityIndicator
          size="large"
          color="#00D9FF"
        />

        <Text className="text-text-secondary mt-4">
          Loading wishlist...
        </Text>
      </View>
    </SafeScreen>
  );
}

/* =========================================================
   ERROR UI
========================================================= */

function ErrorUI() {
  return (
    <SafeScreen>
      <View className="px-6 pb-5 border-b border-surface flex-row items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-4"
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#fff"
          />
        </TouchableOpacity>

        <Text className="text-text-primary text-2xl font-bold">
          Wishlist
        </Text>
      </View>

      <View className="flex-1 items-center justify-center px-6">
        <Ionicons
          name="alert-circle-outline"
          size={64}
          color="#FF6B6B"
        />

        <Text className="text-text-primary font-semibold text-xl mt-4">
          Failed to load wishlist
        </Text>

        <Text className="text-text-secondary text-center mt-2">
          Please check your connection
          and try again
        </Text>
      </View>
    </SafeScreen>
  );
}