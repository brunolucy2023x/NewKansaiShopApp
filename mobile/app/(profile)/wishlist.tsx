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
  StatusBar,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

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
     REMOVE
  ========================================================= */

  const handleRemoveFromWishlist = (
    productId: string,
    productName: string
  ) => {
    Alert.alert(
      "Remove Product",
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
            removeFromWishlist(productId),
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
            "Added to Cart",
            `${productName} added successfully`
          );
        },

        onError: (error: any) => {
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
    <>
      <StatusBar
        barStyle="light-content"
      />

      <SafeScreen>
        <LinearGradient
          colors={[
            "#0B0B0F",
            "#121318",
            "#1A1C22",
          ]}
          style={{
            flex: 1,
          }}
        >
          {/* =====================================================
              HEADER
          ===================================================== */}

          <View
            className="
              px-6
              pt-2
              pb-6
              flex-row
              items-center
            "
          >
            {/* BACK */}

            <TouchableOpacity
              onPress={() =>
                router.back()
              }
              className="
                w-12
                h-12
                rounded-2xl
                bg-white/5
                items-center
                justify-center
                mr-4
              "
            >
              <Ionicons
                name="arrow-back"
                size={22}
                color="#fff"
              />
            </TouchableOpacity>

            {/* TITLE */}

            <View className="flex-1">
              <Text className="text-white text-[28px] font-black">
                Wishlist
              </Text>

              <Text className="text-[#8E8E93] mt-1">
                {wishlist.length}{" "}
                {wishlist.length === 1
                  ? "saved item"
                  : "saved items"}
              </Text>
            </View>
          </View>

          {/* =====================================================
              EMPTY
          ===================================================== */}

          {wishlist.length === 0 ? (
            <View className="flex-1 items-center justify-center px-8">
              <View className="bg-white/5 p-8 rounded-full">
                <Ionicons
                  name="heart-outline"
                  size={70}
                  color="#777"
                />
              </View>

              <Text className="text-white text-3xl font-black mt-7">
                Your Wishlist is Empty
              </Text>

              <Text
                className="
                  text-[#9CA3AF]
                  text-center
                  mt-4
                  leading-7
                  text-[15px]
                "
              >
                Save products you love and
                revisit them anytime.
              </Text>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                  router.push("/(tabs)")
                }
                className="
                  bg-[#FACC15]
                  px-8
                  py-4
                  rounded-2xl
                  mt-8
                "
              >
                <Text className="text-black font-black text-base">
                  Explore Products
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            /* =====================================================
                LIST
            ===================================================== */

            <ScrollView
              className="flex-1"
              showsVerticalScrollIndicator={
                false
              }
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 120,
              }}
            >
              {wishlist.map((item: any) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.92}
                  className="
                    bg-[#181A20]
                    rounded-[28px]
                    overflow-hidden
                    mb-5
                    border
                    border-white/5
                  "
                  style={{
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 10,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 18,
                    elevation: 8,
                  }}
                  onPress={() =>
                    router.push(
                      `/product/${item.id}` as any
                    )
                  }
                >
                  {/* =================================================
                      CONTENT
                  ================================================= */}

                  <View className="p-4 flex-row">
                    {/* IMAGE */}

                    <View className="relative">
                      <Image
                        source={{
                          uri:
                            item.images?.[0] ||
                            "https://placehold.co/300x300",
                        }}
                        style={{
                          width: 110,
                          height: 110,
                          borderRadius: 24,
                        }}
                        contentFit="cover"
                      />

                      {/* DELETE */}

                      <TouchableOpacity
                        activeOpacity={0.8}
                        disabled={
                          isRemovingFromWishlist
                        }
                        onPress={() =>
                          handleRemoveFromWishlist(
                            item.id,
                            item.name
                          )
                        }
                        className="
                          absolute
                          top-2
                          right-2
                          w-10
                          h-10
                          rounded-full
                          bg-black/40
                          items-center
                          justify-center
                        "
                      >
                        <Ionicons
                          name="trash-outline"
                          size={18}
                          color="#FF4D6D"
                        />
                      </TouchableOpacity>
                    </View>

                    {/* INFO */}

                    <View className="flex-1 ml-4 justify-between">
                      <View>
                        <Text
                          numberOfLines={2}
                          className="
                            text-white
                            text-[16px]
                            font-black
                            leading-6
                          "
                        >
                          {item.name}
                        </Text>

                        {/* PRICE */}

                        <Text className="text-[#FACC15] text-[26px] font-black mt-3">
                          $
                          {Number(
                            item.price || 0
                          ).toFixed(2)}
                        </Text>
                      </View>

                      {/* STOCK */}

                      <View className="flex-row items-center mt-3">
                        <View
                          className={`
                            w-2.5
                            h-2.5
                            rounded-full
                            mr-2
                            ${
                              item.stock > 0
                                ? "bg-green-500"
                                : "bg-red-500"
                            }
                          `}
                        />

                        <Text
                          className={`
                            text-sm
                            font-bold
                            ${
                              item.stock > 0
                                ? "text-green-400"
                                : "text-red-400"
                            }
                          `}
                        >
                          {item.stock > 0
                            ? `${item.stock} in stock`
                            : "Out of stock"}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* =================================================
                      BUTTON
                  ================================================= */}

                  {item.stock > 0 && (
                    <View className="px-4 pb-4">
                      <TouchableOpacity
                        activeOpacity={0.9}
                        disabled={
                          isAddingToCart
                        }
                        onPress={() =>
                          handleAddToCart(
                            item.id,
                            item.name
                          )
                        }
                        className="
                          bg-[#FACC15]
                          rounded-2xl
                          py-4
                          items-center
                          flex-row
                          justify-center
                        "
                      >
                        {isAddingToCart ? (
                          <ActivityIndicator
                            size="small"
                            color="#000"
                          />
                        ) : (
                          <>
                            <Ionicons
                              name="bag-add"
                              size={20}
                              color="#000"
                            />

                            <Text className="text-black font-black ml-2 text-[15px]">
                              Add to Cart
                            </Text>
                          </>
                        )}
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </LinearGradient>
      </SafeScreen>
    </>
  );
}

export default WishlistScreen;

/* =========================================================
   LOADING
========================================================= */

function LoadingUI() {
  return (
    <LinearGradient
      colors={[
        "#0B0B0F",
        "#121318",
      ]}
      style={{
        flex: 1,
      }}
    >
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator
          size="large"
          color="#FACC15"
        />

        <Text className="text-[#A1A1AA] mt-5">
          Loading wishlist...
        </Text>
      </View>
    </LinearGradient>
  );
}

/* =========================================================
   ERROR
========================================================= */

function ErrorUI() {
  return (
    <LinearGradient
      colors={[
        "#0B0B0F",
        "#121318",
      ]}
      style={{
        flex: 1,
      }}
    >
      <View className="flex-1 items-center justify-center px-6">
        <Ionicons
          name="cloud-offline-outline"
          size={70}
          color="#EF4444"
        />

        <Text className="text-white text-2xl font-black mt-5">
          Failed to load wishlist
        </Text>

        <Text className="text-[#9CA3AF] text-center mt-3 leading-6">
          Please check your internet connection
          and try again.
        </Text>
      </View>
    </LinearGradient>
  );
}