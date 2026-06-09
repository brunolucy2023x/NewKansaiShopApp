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
  Dimensions,
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
   CONSTANTS
========================================================= */

const { width } = Dimensions.get("window");

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
      statusBarTranslucent
      onRequestClose={onClose}
    >
      {/* =================================================
         BACKDROP
      ================================================= */}

      <TouchableWithoutFeedback onPress={onClose}>
        <View
          className="
            flex-1
            justify-center
            items-center
            px-5
          "
          style={{
            backgroundColor: "rgba(0,0,0,0.65)",
          }}
        >
          {/* =============================================
             PREVENT BACKDROP CLOSE
          ============================================= */}

          <TouchableWithoutFeedback>
            <View
              style={{
                width: width - 32,
                maxHeight: "88%",
              }}
              className="
                bg-white
                rounded-[38px]
                px-5
                pt-6
                pb-5
              "
            >
              {/* =========================================
                 HANDLE
              ========================================= */}

              <View className="items-center mb-5">
                <View
                  className="
                    w-16
                    h-1.5
                    rounded-full
                    bg-zinc-200
                  "
                />
              </View>

              {/* =========================================
                 HEADER
              ========================================= */}

              <View className="items-center mb-7">
                {/* ICON */}

                <View
                  className="
                    w-24
                    h-24
                    rounded-full
                    items-center
                    justify-center
                    mb-5
                  "
                  style={{
                    backgroundColor: "#D9F26A",
                    shadowColor: "#D9F26A",
                    shadowOffset: {
                      width: 0,
                      height: 10,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 20,
                    elevation: 8,
                  }}
                >
                  <Ionicons
                    name="star"
                    size={42}
                    color="#111111"
                  />
                </View>

                {/* TITLE */}

                <Text
                  className="
                    text-black
                    text-[28px]
                    font-bold
                    mb-2
                  "
                >
                  Rate Products
                </Text>

                {/* DESCRIPTION */}

                <Text
                  className="
                    text-zinc-500
                    text-center
                    text-[15px]
                    leading-6
                    px-4
                  "
                >
                  Your feedback helps customers
                  make better purchase decisions.
                </Text>
              </View>

              {/* =========================================
                 PRODUCTS
              ========================================= */}

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: 10,
                }}
              >
                {order.orderItems.map(
                  (item, index) => {
                    const productId =
                      item.product?.id || item.id;

                    const currentRating =
                      productRatings[productId] || 0;

                    return (
                      <View
                        key={item.id}
                        className={`
                          bg-[#F7F7F7]
                          rounded-[30px]
                          p-4
                          mb-4
                        `}
                      >
                        {/* =============================
                           PRODUCT INFO
                        ============================= */}

                        <View className="flex-row">
                          {/* IMAGE */}

                          <Image
                            source={{
                              uri: item.image,
                            }}
                            style={{
                              width: 92,
                              height: 92,
                              borderRadius: 24,
                              backgroundColor: "#EFEFEF",
                            }}
                            contentFit="cover"
                            transition={200}
                          />

                          {/* INFO */}

                          <View className="flex-1 ml-4 justify-center">
                            <Text
                              numberOfLines={2}
                              className="
                                text-black
                                text-[16px]
                                font-bold
                                leading-6
                              "
                            >
                              {item.name}
                            </Text>

                            <Text
                              className="
                                text-zinc-400
                                text-sm
                                mt-2
                              "
                            >
                              Qty: {item.quantity}
                            </Text>

                            <Text
                              className="
                                text-black
                                text-lg
                                font-bold
                                mt-1
                              "
                            >
                              $
                              {Number(
                                item.price
                              ).toFixed(2)}
                            </Text>
                          </View>
                        </View>

                        {/* =============================
                           DIVIDER
                        ============================= */}

                        <View
                          className="
                            h-[1px]
                            bg-zinc-200
                            my-5
                          "
                        />

                        {/* =============================
                           STARS
                        ============================= */}

                        <View className="items-center">
                          <View className="flex-row">
                            {[1, 2, 3, 4, 5].map(
                              (star) => {
                                const active =
                                  star <= currentRating;

                                return (
                                  <TouchableOpacity
                                    key={star}
                                    onPress={() =>
                                      onRatingChange(
                                        productId,
                                        star
                                      )
                                    }
                                    activeOpacity={0.8}
                                    className="mx-1"
                                  >
                                    <View
                                      className="
                                        w-12
                                        h-12
                                        rounded-2xl
                                        items-center
                                        justify-center
                                      "
                                      style={{
                                        backgroundColor:
                                          active
                                            ? "#D9F26A"
                                            : "#ECECEC",
                                      }}
                                    >
                                      <Ionicons
                                        name={
                                          active
                                            ? "star"
                                            : "star-outline"
                                        }
                                        size={24}
                                        color={
                                          active
                                            ? "#111111"
                                            : "#9CA3AF"
                                        }
                                      />
                                    </View>
                                  </TouchableOpacity>
                                );
                              }
                            )}
                          </View>

                          {/* =============================
                             LABEL
                          ============================= */}

                          {currentRating > 0 && (
                            <Text
                              className="
                                text-black
                                text-base
                                font-semibold
                                mt-4
                              "
                            >
                              {currentRating === 1 &&
                                "Poor"}

                              {currentRating === 2 &&
                                "Fair"}

                              {currentRating === 3 &&
                                "Good"}

                              {currentRating === 4 &&
                                "Very Good"}

                              {currentRating === 5 &&
                                "Excellent"}
                            </Text>
                          )}
                        </View>
                      </View>
                    );
                  }
                )}
              </ScrollView>

              {/* =========================================
                 ACTIONS
              ========================================= */}

              <View className="mt-2">
                {/* SUBMIT */}

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={onSubmit}
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: "#D9F26A",
                  }}
                  className="
                    rounded-[26px]
                    py-5
                    items-center
                    justify-center
                    mb-3
                  "
                >
                  {isSubmitting ? (
                    <ActivityIndicator
                      size="small"
                      color="#111111"
                    />
                  ) : (
                    <View className="flex-row items-center">
                      <Ionicons
                        name="paper-plane"
                        size={20}
                        color="#111111"
                      />

                      <Text
                        className="
                          text-black
                          text-[17px]
                          font-bold
                          ml-3
                        "
                      >
                        Submit Ratings
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>

                {/* CANCEL */}

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={onClose}
                  disabled={isSubmitting}
                  className="
                    bg-[#F3F3F3]
                    rounded-[26px]
                    py-5
                    items-center
                    justify-center
                  "
                >
                  <Text
                    className="
                      text-zinc-500
                      text-[16px]
                      font-semibold
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