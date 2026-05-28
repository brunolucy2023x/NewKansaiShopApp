import RatingModal from "@/components/RatingModal";

import SafeScreen from "@/components/SafeScreen";

import { useOrders } from "@/hooks/useOrders";

import { useReviews } from "@/hooks/useReviews";

import {
  capitalizeFirstLetter,
  formatDate,
  getStatusColor,
} from "@/lib/utils";

import { Ionicons } from "@expo/vector-icons";

import { Image } from "expo-image";

import { router } from "expo-router";

import { useState } from "react";

import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function OrdersScreen() {
  /* =========================================================
     DATA
  ========================================================= */

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useOrders();

  const {
    createReviewAsync,
    isCreatingReview,
  } = useReviews();

  /* =========================================================
     STATE
  ========================================================= */

  const [showRatingModal, setShowRatingModal] =
    useState(false);

  const [selectedOrder, setSelectedOrder] =
    useState<any | null>(null);

  const [productRatings, setProductRatings] =
    useState<{
      [key: string]: number;
    }>({});

  /* =========================================================
     OPEN RATING MODAL
  ========================================================= */

  const handleOpenRating = (
    order: any
  ) => {
    setShowRatingModal(true);

    setSelectedOrder(order);

    const initialRatings: {
      [key: string]: number;
    } = {};

    order.orderItems?.forEach(
      (item: any) => {
        const productId =
          item.product?.id;

        if (productId) {
          initialRatings[productId] = 0;
        }
      }
    );

    setProductRatings(initialRatings);
  };

  /* =========================================================
     SUBMIT REVIEWS
  ========================================================= */

  const handleSubmitRating =
    async () => {
      if (!selectedOrder) return;

      const allRated = Object.values(
        productRatings
      ).every((rating) => rating > 0);

      if (!allRated) {
        Alert.alert(
          "Error",
          "Please rate all products"
        );

        return;
      }

      try {
        await Promise.all(
          selectedOrder.orderItems.map(
            (item: any) =>
              createReviewAsync({
                productId:
                  item.product?.id,

                orderId:
                  selectedOrder.id,

                rating:
                  productRatings[
                    item.product?.id
                  ],
              })
          )
        );

        Alert.alert(
          "Success",
          "Thank you for rating all products!"
        );

        setShowRatingModal(false);

        setSelectedOrder(null);

        setProductRatings({});
      } catch (error: any) {
        console.error(error);

        Alert.alert(
          "Error",
          error?.message ||
            "Failed to submit review"
        );
      }
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

  /* =========================================================
     EMPTY
  ========================================================= */

  if (!orders || orders.length === 0) {
    return <EmptyUI />;
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
          My Orders
        </Text>
      </View>

      {/* =====================================================
          ORDERS
      ===================================================== */}

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
          {orders.map((order: any) => {
            const totalItems =
              order.orderItems?.reduce(
                (
                  sum: number,
                  item: any
                ) =>
                  sum +
                  (item.quantity || 0),
                0
              ) || 0;

            const firstImage =
              order.orderItems?.[0]
                ?.image || "";

            return (
              <View
                key={order.id}
                className="bg-surface rounded-3xl p-5 mb-4"
              >
                {/* =====================================
                    TOP SECTION
                ===================================== */}

                <View className="flex-row mb-4">
                  {/* IMAGE */}

                  <View className="relative">
                    <Image
                      source={
                        firstImage ||
                        "https://placehold.co/100x100"
                      }
                      style={{
                        height: 80,
                        width: 80,
                        borderRadius: 12,
                      }}
                      contentFit="cover"
                    />

                    {/* MORE ITEMS BADGE */}

                    {order.orderItems
                      ?.length > 1 && (
                      <View className="absolute -bottom-1 -right-1 bg-primary rounded-full size-7 items-center justify-center">
                        <Text className="text-background text-xs font-bold">
                          +
                          {order
                            .orderItems
                            .length - 1}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* DETAILS */}

                  <View className="flex-1 ml-4">
                    <Text className="text-text-primary font-bold text-base mb-1">
                      Order #
                      {order.id
                        ?.slice(-8)
                        ?.toUpperCase()}
                    </Text>

                    <Text className="text-text-secondary text-sm mb-2">
                      {formatDate(
                        order.createdAt
                      )}
                    </Text>

                    <View
                      className="self-start px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor:
                          getStatusColor(
                            order.status
                          ) + "20",
                      }}
                    >
                      <Text
                        className="text-xs font-bold"
                        style={{
                          color:
                            getStatusColor(
                              order.status
                            ),
                        }}
                      >
                        {capitalizeFirstLetter(
                          order.status
                        )}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* =====================================
                    ITEMS
                ===================================== */}

                <View className="mb-4">
                  {order.orderItems?.map(
                    (
                      item: any,
                      index: number
                    ) => (
                      <Text
                        key={
                          item.id || index
                        }
                        className="text-text-secondary text-sm mb-1"
                        numberOfLines={1}
                      >
                        {item.name} ×{" "}
                        {item.quantity}
                      </Text>
                    )
                  )}
                </View>

                {/* =====================================
                    FOOTER
                ===================================== */}

                <View className="border-t border-background-lighter pt-3 flex-row justify-between items-center">
                  {/* TOTAL */}

                  <View>
                    <Text className="text-text-secondary text-xs mb-1">
                      {totalItems} items
                    </Text>

                    <Text className="text-primary font-bold text-xl">
                      $
                      {Number(
                        order.totalPrice ||
                          0
                      ).toFixed(2)}
                    </Text>
                  </View>

                  {/* REVIEW */}

                  {order.status ===
                    "delivered" &&
                    (order.hasReviewed ? (
                      <View className="bg-primary/20 px-5 py-3 rounded-full flex-row items-center">
                        <Ionicons
                          name="checkmark-circle"
                          size={18}
                          color="#1DB954"
                        />

                        <Text className="text-primary font-bold text-sm ml-2">
                          Reviewed
                        </Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        className="bg-primary px-5 py-3 rounded-full flex-row items-center"
                        activeOpacity={
                          0.7
                        }
                        onPress={() =>
                          handleOpenRating(
                            order
                          )
                        }
                      >
                        <Ionicons
                          name="star"
                          size={18}
                          color="#121212"
                        />

                        <Text className="text-background font-bold text-sm ml-2">
                          Leave Rating
                        </Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* =====================================================
          RATING MODAL
      ===================================================== */}

      <RatingModal
        visible={showRatingModal}
        onClose={() =>
          setShowRatingModal(false)
        }
        order={selectedOrder}
        productRatings={productRatings}
        onSubmit={handleSubmitRating}
        isSubmitting={isCreatingReview}
        onRatingChange={(
          productId,
          rating
        ) =>
          setProductRatings((prev) => ({
            ...prev,
            [productId]: rating,
          }))
        }
      />
    </SafeScreen>
  );
}

export default OrdersScreen;

/* =========================================================
   LOADING UI
========================================================= */

function LoadingUI() {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator
        size="large"
        color="#00D9FF"
      />

      <Text className="text-text-secondary mt-4">
        Loading orders...
      </Text>
    </View>
  );
}

/* =========================================================
   ERROR UI
========================================================= */

function ErrorUI() {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <Ionicons
        name="alert-circle-outline"
        size={64}
        color="#FF6B6B"
      />

      <Text className="text-text-primary font-semibold text-xl mt-4">
        Failed to load orders
      </Text>

      <Text className="text-text-secondary text-center mt-2">
        Please check your connection
        and try again
      </Text>
    </View>
  );
}

/* =========================================================
   EMPTY UI
========================================================= */

function EmptyUI() {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <Ionicons
        name="receipt-outline"
        size={80}
        color="#666"
      />

      <Text className="text-text-primary font-semibold text-xl mt-4">
        No orders yet
      </Text>

      <Text className="text-text-secondary text-center mt-2">
        Your order history will appear
        here
      </Text>
    </View>
  );
}