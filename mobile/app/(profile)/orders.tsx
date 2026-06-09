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
  StatusBar,
} from "react-native";

/* =========================================================
   COMPONENT
========================================================= */

function OrdersScreen() {
  /* =====================================================
     DATA
  ===================================================== */

  const {
    data: orders = [],
    isLoading,

    isError,
  } = useOrders();

  const {
    createReviewAsync,

    isCreatingReview,
  } = useReviews();

  /* =====================================================
     STATE
  ===================================================== */

  const [
    showRatingModal,
    setShowRatingModal,
  ] = useState(false);

  const [
    selectedOrder,
    setSelectedOrder,
  ] = useState<any | null>(
    null
  );

  const [
    productRatings,
    setProductRatings,
  ] = useState<{
    [key: string]: number;
  }>({});

  /* =====================================================
     OPEN MODAL
  ===================================================== */

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
          initialRatings[
            productId
          ] = 0;
        }
      }
    );

    setProductRatings(
      initialRatings
    );
  };

  /* =====================================================
     SUBMIT REVIEWS
  ===================================================== */

  const handleSubmitRating =
    async () => {
      if (!selectedOrder)
        return;

      const allRated =
        Object.values(
          productRatings
        ).every(
          (rating) =>
            rating > 0
        );

      if (!allRated) {
        Alert.alert(
          "Incomplete Ratings",

          "Please rate all ordered products."
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
          "Thank You!",

          "Your ratings were submitted successfully."
        );

        setShowRatingModal(
          false
        );

        setSelectedOrder(
          null
        );

        setProductRatings(
          {}
        );
      } catch (
        error: any
      ) {
        Alert.alert(
          "Error",

          error?.message ||
            "Failed to submit ratings"
        );
      }
    };

  /* =====================================================
     LOADING
  ===================================================== */

  if (isLoading) {
    return <LoadingUI />;
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (isError) {
    return <ErrorUI />;
  }

  /* =====================================================
     EMPTY
  ===================================================== */

  if (
    !orders ||
    orders.length === 0
  ) {
    return <EmptyUI />;
  }

  /* =====================================================
     MAIN
  ===================================================== */

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />

      <SafeScreen>
        <View className="flex-1 bg-white">
          {/* =================================================
             HEADER
          ================================================= */}

          <View className="px-6 pt-4 pb-6">
            <View
              className="
                flex-row
                items-center
                justify-between
              "
            >
              {/* LEFT */}

              <View className="flex-row items-center flex-1">
                {/* BACK */}

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    router.back()
                  }
                  className="
                    w-12
                    h-12
                    rounded-full
                    bg-[#F3F4F6]
                    items-center
                    justify-center
                    mr-4
                  "
                >
                  <Ionicons
                    name="arrow-back"
                    size={22}
                    color="#111"
                  />
                </TouchableOpacity>

                {/* TEXT */}

                <View className="flex-1">
                  <Text
                    className="
                      text-black
                      text-[32px]
                      font-black
                    "
                  >
                    My Orders
                  </Text>

                  <Text
                    className="
                      text-[#6B7280]
                      mt-1
                      text-sm
                    "
                  >
                    Track and manage purchases
                  </Text>
                </View>
              </View>

              {/* ICON */}

              <View
                className="
                  w-14
                  h-14
                  rounded-[22px]
                  bg-[#D9F26A]
                  items-center
                  justify-center
                "
              >
                <Ionicons
                  name="receipt-outline"
                  size={24}
                  color="#111"
                />
              </View>
            </View>
          </View>

          {/* =================================================
             ORDERS
          ================================================= */}

          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={
              false
            }
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: 120,
            }}
          >
            {orders.map(
              (order: any) => {
                const totalItems =
                  order.orderItems?.reduce(
                    (
                      sum: number,
                      item: any
                    ) =>
                      sum +
                      (item.quantity ||
                        0),
                    0
                  ) || 0;

                const firstImage =
                  order.orderItems?.[0]
                    ?.image || "";

                return (
                  <View
                    key={order.id}
                    className="
                      bg-[#F3F4F6]
                      rounded-[36px]
                      p-5
                      mb-6
                    "
                    style={{
                      shadowColor:
                        "#000",

                      shadowOffset:
                        {
                          width: 0,
                          height: 6,
                        },

                      shadowOpacity: 0.05,

                      shadowRadius: 14,

                      elevation: 4,
                    }}
                  >
                    {/* =====================================
                        TOP
                    ===================================== */}

                    <View className="flex-row">
                      {/* IMAGE */}

                      <View className="relative">
                        <View
                          className="
                            bg-white
                            rounded-[28px]
                            overflow-hidden
                          "
                        >
                          <Image
                            source={{
                              uri:
                                firstImage ||
                                "https://placehold.co/100x100",
                            }}
                            style={{
                              width: 95,
                              height: 95,
                            }}
                            contentFit="cover"
                          />
                        </View>

                        {/* EXTRA ITEMS */}

                        {order
                          .orderItems
                          ?.length >
                          1 && (
                          <View
                            className="
                              absolute
                              -bottom-2
                              -right-2
                              bg-[#D9F26A]
                              w-9
                              h-9
                              rounded-full
                              items-center
                              justify-center
                              border-2
                              border-[#F3F4F6]
                            "
                          >
                            <Text
                              className="
                                text-black
                                font-black
                                text-xs
                              "
                            >
                              +
                              {order
                                .orderItems
                                .length -
                                1}
                            </Text>
                          </View>
                        )}
                      </View>

                      {/* INFO */}

                      <View className="flex-1 ml-4 justify-between">
                        <View>
                          <Text
                            className="
                              text-black
                              font-black
                              text-[18px]
                            "
                          >
                            Order #
                            {order.id
                              ?.slice(
                                -8
                              )
                              ?.toUpperCase()}
                          </Text>

                          <Text
                            className="
                              text-[#6B7280]
                              mt-2
                              text-sm
                            "
                          >
                            {formatDate(
                              order.createdAt
                            )}
                          </Text>
                        </View>

                        {/* STATUS */}

                        <View
                          className="
                            self-start
                            px-4
                            py-2
                            rounded-full
                            mt-3
                          "
                          style={{
                            backgroundColor:
                              getStatusColor(
                                order.status
                              ) + "20",
                          }}
                        >
                          <Text
                            className="
                              font-black
                              text-xs
                            "
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

                    <View className="mt-6">
                      {order.orderItems?.map(
                        (
                          item: any,
                          index: number
                        ) => (
                          <View
                            key={
                              item.id ||
                              index
                            }
                            className="
                              flex-row
                              items-center
                              justify-between
                              mb-3
                            "
                          >
                            <View className="flex-row items-center flex-1 pr-4">
                              <View
                                className="
                                  w-2
                                  h-2
                                  rounded-full
                                  bg-[#D9F26A]
                                  mr-3
                                "
                              />

                              <Text
                                numberOfLines={
                                  1
                                }
                                className="
                                  text-[#374151]
                                  text-sm
                                  flex-1
                                "
                              >
                                {
                                  item.name
                                }
                              </Text>
                            </View>

                            <Text
                              className="
                                text-black
                                font-black
                              "
                            >
                              ×
                              {
                                item.quantity
                              }
                            </Text>
                          </View>
                        )
                      )}
                    </View>

                    {/* DIVIDER */}

                    <View
                      className="
                        h-[1px]
                        bg-[#E5E7EB]
                        my-6
                      "
                    />

                    {/* =====================================
                        FOOTER
                    ===================================== */}

                    <View
                      className="
                        flex-row
                        items-center
                        justify-between
                      "
                    >
                      {/* PRICE */}

                      <View>
                        <Text
                          className="
                            text-[#6B7280]
                            text-xs
                          "
                        >
                          {totalItems} items
                        </Text>

                        <Text
                          className="
                            text-black
                            text-[30px]
                            font-black
                            mt-1
                          "
                        >
                          $
                          {Number(
                            order.totalPrice ||
                              0
                          ).toFixed(
                            2
                          )}
                        </Text>
                      </View>

                      {/* REVIEW */}

                      {order.status ===
                        "delivered" &&
                        (order.hasReviewed ? (
                          <View
                            className="
                              bg-[#DCFCE7]
                              px-5
                              py-4
                              rounded-[24px]
                              flex-row
                              items-center
                            "
                          >
                            <Ionicons
                              name="checkmark-circle"
                              size={
                                18
                              }
                              color="#22C55E"
                            />

                            <Text
                              className="
                                text-[#16A34A]
                                font-black
                                ml-2
                              "
                            >
                              Reviewed
                            </Text>
                          </View>
                        ) : (
                          <TouchableOpacity
                            activeOpacity={
                              0.9
                            }
                            onPress={() =>
                              handleOpenRating(
                                order
                              )
                            }
                            className="
                              bg-[#D9F26A]
                              px-5
                              py-4
                              rounded-[24px]
                              flex-row
                              items-center
                            "
                          >
                            <Ionicons
                              name="star"
                              size={
                                18
                              }
                              color="#111"
                            />

                            <Text
                              className="
                                text-black
                                font-black
                                ml-2
                              "
                            >
                              Rate Order
                            </Text>
                          </TouchableOpacity>
                        ))}
                    </View>
                  </View>
                );
              }
            )}
          </ScrollView>

          {/* =================================================
             MODAL
          ================================================= */}

          <RatingModal
            visible={
              showRatingModal
            }
            onClose={() =>
              setShowRatingModal(
                false
              )
            }
            order={selectedOrder}
            productRatings={
              productRatings
            }
            onSubmit={
              handleSubmitRating
            }
            isSubmitting={
              isCreatingReview
            }
            onRatingChange={(
              productId,
              rating
            ) =>
              setProductRatings(
                (prev) => ({
                  ...prev,
                  [productId]:
                    rating,
                })
              )
            }
          />
        </View>
      </SafeScreen>
    </>
  );
}

export default OrdersScreen;

/* =========================================================
   LOADING UI
========================================================= */

function LoadingUI() {
  return (
    <View
      className="
        flex-1
        bg-white
        items-center
        justify-center
        px-6
      "
    >
      <View
        className="
          bg-[#F3F4F6]
          rounded-[40px]
          px-10
          py-12
          items-center
        "
      >
        <View
          className="
            w-24
            h-24
            rounded-full
            bg-[#D9F26A]
            items-center
            justify-center
            mb-6
          "
        >
          <Ionicons
            name="receipt-outline"
            size={34}
            color="#111"
          />
        </View>

        <ActivityIndicator
          size="large"
          color="#111"
        />

        <Text
          className="
            text-black
            text-[20px]
            font-black
            mt-6
          "
        >
          Loading Orders
        </Text>

        <Text
          className="
            text-[#6B7280]
            text-center
            mt-3
            leading-6
          "
        >
          Preparing your purchase
          history and order details.
        </Text>
      </View>
    </View>
  );
}

/* =========================================================
   ERROR UI
========================================================= */

function ErrorUI() {
  return (
    <View
      className="
        flex-1
        bg-white
        items-center
        justify-center
        px-6
      "
    >
      <View
        className="
          w-28
          h-28
          rounded-full
          bg-[#FEE2E2]
          items-center
          justify-center
          mb-6
        "
      >
        <Ionicons
          name="cloud-offline-outline"
          size={54}
          color="#EF4444"
        />
      </View>

      <Text
        className="
          text-black
          text-[28px]
          font-black
          text-center
        "
      >
        Failed to load orders
      </Text>

      <Text
        className="
          text-[#6B7280]
          text-center
          mt-4
          leading-7
        "
      >
        Please check your internet
        connection and try again.
      </Text>
    </View>
  );
}

/* =========================================================
   EMPTY UI
========================================================= */

function EmptyUI() {
  return (
    <View
      className="
        flex-1
        bg-white
        items-center
        justify-center
        px-6
      "
    >
      <View
        className="
          bg-[#F3F4F6]
          p-8
          rounded-full
        "
      >
        <Ionicons
          name="receipt-outline"
          size={60}
          color="#9CA3AF"
        />
      </View>

      <Text
        className="
          text-black
          text-[28px]
          font-black
          mt-6
        "
      >
        No Orders Yet
      </Text>

      <Text
        className="
          text-[#6B7280]
          text-center
          mt-4
          leading-7
        "
      >
        Your purchases and order history
        will appear here once you start
        shopping.
      </Text>
    </View>
  );
}