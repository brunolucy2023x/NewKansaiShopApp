import { Order } from "@/types";

import { Ionicons } from "@expo/vector-icons";

import { Image } from "expo-image";

import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

/* =========================================================
   TYPES
========================================================= */

interface RatingModalProps {
  visible: boolean;

  onClose: () => void;

  order: Order | null;

  productRatings: {
    [key: string]: number;
  };

  onRatingChange: (
    productId: string,
    rating: number
  ) => void;

  onSubmit: () => void;

  isSubmitting: boolean;
}

/* =========================================================
   COMPONENT
========================================================= */

const RatingModal = ({
  visible,

  onClose,

  order,

  productRatings,

  onRatingChange,

  onSubmit,

  isSubmitting,
}: RatingModalProps) => {
  /* =====================================================
     EMPTY
  ===================================================== */

  if (!order) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={
        onClose
      }
    >
      {/* =================================================
         BACKDROP
      ================================================= */}

      <TouchableWithoutFeedback
        onPress={onClose}
      >
        <View
          className="
            flex-1
            bg-black/80
            items-center
            justify-center
            px-4
          "
        >
          {/* =============================================
             PREVENT BACKDROP CLOSE
          ============================================= */}

          <TouchableWithoutFeedback>
            <View
              className="
                bg-surface
                rounded-3xl
                p-6
                w-full
                max-w-md
                max-h-[85%]
                border
                border-border
              "
            >
              {/* =========================================
                 HEADER
              ========================================= */}

              <View className="items-center mb-6">
                {/* ICON */}

                <View
                  className="
                    bg-primary/20
                    rounded-full
                    w-20
                    h-20
                    items-center
                    justify-center
                    mb-4
                  "
                >
                  <Ionicons
                    name="star"
                    size={36}
                    color="#1DB954"
                  />
                </View>

                {/* TITLE */}

                <Text
                  className="
                    text-text-primary
                    text-2xl
                    font-bold
                    mb-2
                  "
                >
                  Rate Products
                </Text>

                {/* DESCRIPTION */}

                <Text
                  className="
                    text-text-secondary
                    text-center
                    text-sm
                    leading-5
                  "
                >
                  Your feedback helps
                  other customers make
                  better decisions.
                </Text>
              </View>

              {/* =========================================
                 PRODUCTS
              ========================================= */}

              <ScrollView
                className="mb-5"
                showsVerticalScrollIndicator={
                  false
                }
              >
                {order.orderItems.map(
                  (
                    item,
                    index
                  ) => {
                    const productId =
                      item
                        .product
                        ?.id ||
                      item.id;

                    const currentRating =
                      productRatings[
                        productId
                      ] || 0;

                    return (
                      <View
                        key={
                          item.id
                        }
                        className={`bg-background-lighter rounded-3xl p-4 border border-border ${
                          index <
                          order
                            .orderItems
                            .length -
                            1
                            ? "mb-4"
                            : ""
                        }`}
                      >
                        {/* =============================
                           PRODUCT INFO
                        ============================= */}

                        <View className="flex-row items-center mb-4">
                          {/* IMAGE */}

                          <Image
                            source={{
                              uri:
                                item.image,
                            }}
                            style={{
                              width: 72,

                              height: 72,

                              borderRadius: 16,
                            }}
                            contentFit="cover"
                            transition={200}
                          />

                          {/* INFO */}

                          <View className="flex-1 ml-4">
                            <Text
                              className="
                                text-text-primary
                                font-bold
                                text-sm
                                leading-5
                              "
                              numberOfLines={
                                2
                              }
                            >
                              {
                                item.name
                              }
                            </Text>

                            <Text
                              className="
                                text-text-secondary
                                text-xs
                                mt-2
                              "
                            >
                              Qty:{" "}
                              {
                                item.quantity
                              }{" "}
                              • $
                              {Number(
                                item.price
                              ).toFixed(
                                2
                              )}
                            </Text>
                          </View>
                        </View>

                        {/* =============================
                           STARS
                        ============================= */}

                        <View className="flex-row justify-center">
                          {[1, 2, 3, 4, 5].map(
                            (
                              star
                            ) => {
                              const active =
                                star <=
                                currentRating;

                              return (
                                <TouchableOpacity
                                  key={
                                    star
                                  }
                                  onPress={() =>
                                    onRatingChange(
                                      productId,

                                      star
                                    )
                                  }
                                  activeOpacity={
                                    0.7
                                  }
                                  className="mx-1"
                                >
                                  <Ionicons
                                    name={
                                      active
                                        ? "star"
                                        : "star-outline"
                                    }
                                    size={
                                      34
                                    }
                                    color={
                                      active
                                        ? "#1DB954"
                                        : "#666"
                                    }
                                  />
                                </TouchableOpacity>
                              );
                            }
                          )}
                        </View>

                        {/* =============================
                           RATING LABEL
                        ============================= */}

                        {currentRating >
                          0 && (
                          <Text
                            className="
                              text-primary
                              text-center
                              text-sm
                              font-semibold
                              mt-3
                            "
                          >
                            {currentRating ===
                              1 &&
                              "Poor"}

                            {currentRating ===
                              2 &&
                              "Fair"}

                            {currentRating ===
                              3 &&
                              "Good"}

                            {currentRating ===
                              4 &&
                              "Very Good"}

                            {currentRating ===
                              5 &&
                              "Excellent"}
                          </Text>
                        )}
                      </View>
                    );
                  }
                )}
              </ScrollView>

              {/* =========================================
                 ACTIONS
              ========================================= */}

              <View className="gap-3">
                {/* SUBMIT */}

                <TouchableOpacity
                  className="
                    bg-primary
                    rounded-2xl
                    py-4
                    items-center
                    justify-center
                  "
                  activeOpacity={
                    0.8
                  }
                  onPress={
                    onSubmit
                  }
                  disabled={
                    isSubmitting
                  }
                >
                  {isSubmitting ? (
                    <ActivityIndicator
                      size="small"
                      color="#121212"
                    />
                  ) : (
                    <View className="flex-row items-center">
                      <Ionicons
                        name="send"
                        size={18}
                        color="#121212"
                      />

                      <Text
                        className="
                          text-background
                          font-bold
                          text-base
                          ml-2
                        "
                      >
                        Submit Ratings
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>

                {/* CANCEL */}

                <TouchableOpacity
                  className="
                    bg-background-lighter
                    rounded-2xl
                    py-4
                    items-center
                    border
                    border-border
                  "
                  activeOpacity={
                    0.7
                  }
                  onPress={
                    onClose
                  }
                  disabled={
                    isSubmitting
                  }
                >
                  <Text
                    className="
                      text-text-secondary
                      font-bold
                      text-base
                    "
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default RatingModal;