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
} from "react-native";

import { Image } from "expo-image";

import { LinearGradient } from "expo-linear-gradient";

/* =========================================================
   TYPES
========================================================= */

interface ProductsGridProps {
  isLoading: boolean;

  isError: boolean;

  products: Product[];
}

/* =========================================================
   COMPONENT
========================================================= */

const ProductsGrid = ({
  products,

  isLoading,

  isError,
}: ProductsGridProps) => {
  /* =====================================================
     WISHLIST
  ===================================================== */

  const {
    isInWishlist,

    toggleWishlist,

    isAddingToWishlist,

    isRemovingFromWishlist,
  } = useWishlist();

  /* =====================================================
     CART
  ===================================================== */

  const {
    isAddingToCart,

    addToCart,
  } = useCart();

  /* =====================================================
     ADD TO CART
  ===================================================== */

  const handleAddToCart =
    (
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

          onError: (
            error: any
          ) => {
            Alert.alert(
              "Error",

              error?.message ||
                "Failed to add to cart"
            );
          },
        }
      );
    };

  /* =====================================================
     PRODUCT CARD
  ===================================================== */

  const renderProduct = ({
    item: product,
  }: {
    item: Product;
  }) => {
    const inWishlist =
      isInWishlist(
        product.id
      );

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        className="mb-5"
        style={{
          width: "48%",
        }}
        onPress={() =>
          router.push(
            `/product/${product.id}` as any
          )
        }
      >
        {/* =============================================
           CARD
        ============================================= */}

        <LinearGradient
          colors={[
            "#141414",
            "#1B1B1B",
          ]}
          className="
            rounded-[32px]
            overflow-hidden
            border
            border-white/5
          "
        >
          {/* =========================================
             IMAGE
          ========================================= */}

          <View className="relative">
            <Image
              source={{
                uri:
                  product
                    .images?.[0] ||
                  "https://placehold.co/600x600",
              }}
              style={{
                width: "100%",
                height: 210,
              }}
              contentFit="cover"
              transition={300}
            />

            {/* DARK OVERLAY */}

            <LinearGradient
              colors={[
                "transparent",
                "rgba(0,0,0,0.4)",
              ]}
              className="absolute bottom-0 left-0 right-0 h-24"
            />

            {/* WISHLIST */}

            <TouchableOpacity
              activeOpacity={0.8}
              className="
                absolute
                top-3
                right-3
                bg-black/40
                backdrop-blur-xl
                rounded-full
                p-3
              "
              onPress={() =>
                toggleWishlist(
                  product.id
                )
              }
            >
              {isAddingToWishlist ||
              isRemovingFromWishlist ? (
                <ActivityIndicator
                  size="small"
                  color="#fff"
                />
              ) : (
                <Ionicons
                  name={
                    inWishlist
                      ? "heart"
                      : "heart-outline"
                  }
                  size={18}
                  color={
                    inWishlist
                      ? "#FF4D6D"
                      : "#fff"
                  }
                />
              )}
            </TouchableOpacity>

            {/* STOCK */}

            {product.stock >
            0 ? (
              <View className="absolute bottom-3 left-3 bg-emerald-500 px-3 py-1 rounded-full">
                <Text className="text-black text-[10px] font-black">
                  IN STOCK
                </Text>
              </View>
            ) : (
              <View className="absolute bottom-3 left-3 bg-red-500 px-3 py-1 rounded-full">
                <Text className="text-white text-[10px] font-black">
                  SOLD OUT
                </Text>
              </View>
            )}
          </View>

          {/* =========================================
             CONTENT
          ========================================= */}

          <View className="p-4">
            {/* CATEGORY */}

            <Text className="text-primary text-[11px] font-bold uppercase tracking-widest mb-2">
              {
                product.category
              }
            </Text>

            {/* NAME */}

            <Text
              className="
                text-white
                text-[15px]
                font-black
                leading-6
                min-h-[48px]
              "
              numberOfLines={2}
            >
              {product.name}
            </Text>

            {/* RATING */}

            <View className="flex-row items-center mt-3">
              <Ionicons
                name="star"
                size={14}
                color="#FFC107"
              />

              <Text className="text-white text-xs font-bold ml-1">
                {Number(
                  product.averageRating ||
                    0
                ).toFixed(1)}
              </Text>

              <Text className="text-gray-400 text-xs ml-1">
                (
                {
                  product.totalReviews
                }
                )
              </Text>
            </View>

            {/* PRICE + BTN */}

            <View className="flex-row items-center justify-between mt-5">
              {/* PRICE */}

              <View>
                <Text className="text-gray-500 text-xs line-through">
                  $
                  {(
                    Number(
                      product.price
                    ) * 1.2
                  ).toFixed(2)}
                </Text>

                <Text className="text-primary text-2xl font-black">
                  $
                  {Number(
                    product.price
                  ).toFixed(2)}
                </Text>
              </View>

              {/* ADD BTN */}

              <TouchableOpacity
                activeOpacity={0.85}
                disabled={
                  isAddingToCart ||
                  product.stock <=
                    0
                }
                className={`
                  w-14
                  h-14
                  rounded-2xl
                  items-center
                  justify-center
                  ${
                    product.stock <=
                    0
                      ? "bg-[#2A2A2A]"
                      : "bg-primary"
                  }
                `}
                onPress={() =>
                  handleAddToCart(
                    product.id,

                    product.name
                  )
                }
              >
                {isAddingToCart ? (
                  <ActivityIndicator
                    size="small"
                    color="#000"
                  />
                ) : (
                  <Ionicons
                    name="bag-add"
                    size={22}
                    color={
                      product.stock <=
                      0
                        ? "#666"
                        : "#000"
                    }
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (isLoading) {
    return (
      <View className="py-20 items-center justify-center">
        <ActivityIndicator
          size="large"
          color="#1DB954"
        />

        <Text className="text-text-secondary mt-4">
          Loading products...
        </Text>
      </View>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (isError) {
    return (
      <View className="py-20 items-center justify-center px-6">
        <Ionicons
          name="cloud-offline-outline"
          size={64}
          color="#FF6B6B"
        />

        <Text className="text-white font-black text-2xl mt-5">
          Failed to load
        </Text>

        <Text className="text-gray-400 text-center mt-3 leading-6">
          Please check your
          internet connection and
          try again.
        </Text>
      </View>
    );
  }

  /* =====================================================
     MAIN GRID
  ===================================================== */

  return (
    <FlatList
      data={products}
      renderItem={
        renderProduct
      }
      keyExtractor={(
        item
      ) => item.id}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent:
          "space-between",
      }}
      showsVerticalScrollIndicator={
        false
      }
      scrollEnabled={false}
      ListEmptyComponent={
        NoProductsFound
      }
    />
  );
};

export default ProductsGrid;

/* =========================================================
   EMPTY STATE
========================================================= */

function NoProductsFound() {
  return (
    <View className="py-24 items-center justify-center">
      <View className="bg-surface rounded-full p-8">
        <Ionicons
          name="search-outline"
          size={60}
          color="#666"
        />
      </View>

      <Text className="text-white text-2xl font-black mt-6">
        No Products Found
      </Text>

      <Text className="text-gray-400 text-center mt-3 leading-6 px-10">
        Try adjusting your search
        or explore other
        categories.
      </Text>
    </View>
  );
}