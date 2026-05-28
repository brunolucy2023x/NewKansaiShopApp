import SafeScreen from "@/components/SafeScreen";

import OrderSummary from "@/components/OrderSummary";

import AddressSelectionModal from "@/components/AddressSelectionModal";

import { useAddresses } from "@/hooks/useAddressess";

import useCart from "@/hooks/useCart";

import { Address } from "@/types";

import { supabase } from "@/lib/supabase";

import { Ionicons } from "@expo/vector-icons";

import { Image } from "expo-image";

import { router } from "expo-router";

import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useState } from "react";

import * as Sentry from "@sentry/react-native";

/* =========================================================
   STRIPE
========================================================= */

type StripeHookType = {
  initPaymentSheet: (
    params: any
  ) => Promise<any>;

  presentPaymentSheet: () => Promise<any>;
};

type StripeModuleType = {
  useStripe?: () => StripeHookType;
};

let StripeModule: StripeModuleType =
  {};

if (Platform.OS !== "web") {
  StripeModule = require(
    "@stripe/stripe-react-native"
  );
}

const useStripe =
  StripeModule.useStripe;

/* =========================================================
   COMPONENT
========================================================= */

const CartScreen = () => {
  /* =====================================================
     HOOKS
  ===================================================== */

  const {
    cart,

    cartItemCount,

    cartTotal,

    clearCart,

    isError,

    isLoading,

    isRemoving,

    isUpdating,

    removeFromCart,

    updateQuantity,
  } = useCart();
  const {
    addresses = [],
    isLoading: addressesLoading,
    isError: addressesError,
  } = useAddresses();

  /* =====================================================
     STRIPE
  ===================================================== */

  const stripe = useStripe?.();

  const initPaymentSheet =
    stripe?.initPaymentSheet;

  const presentPaymentSheet =
    stripe?.presentPaymentSheet;

  /* =====================================================
     STATE
  ===================================================== */

  const [paymentLoading, setPaymentLoading] =
    useState(false);

  const [addressModalVisible, setAddressModalVisible] =
    useState(false);

  /* =====================================================
     DATA
  ===================================================== */

  const cartItems = cart?.items || [];

  const subtotal = cartTotal || 0;

  const shipping =
    subtotal > 100 ? 0 : 10;

  const tax = subtotal * 0.08;

  const total =
    subtotal + shipping + tax;

  /* =====================================================
     QUANTITY CHANGE
  ===================================================== */

  const handleQuantityChange = (
    productId: string,
    currentQuantity: number,
    change: number
  ) => {
    const newQuantity =
      currentQuantity + change;

    if (newQuantity < 1) return;

    updateQuantity({
      productId,

      quantity: newQuantity,
    });
  };

  /* =====================================================
     REMOVE ITEM
  ===================================================== */

  const handleRemoveItem = (
    productId: string,
    productName: string
  ) => {
    Alert.alert(
      "Remove Item",

      `Remove ${productName} from cart?`,

      [
        {
          text: "Cancel",

          style: "cancel",
        },

        {
          text: "Remove",

          style: "destructive",

          onPress: () =>
            removeFromCart(
              productId
            ),
        },
      ]
    );
  };

  /* =====================================================
     CHECKOUT
  ===================================================== */

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert(
        "Cart Empty",

        "Your cart is empty."
      );

      return;
    }

    /* ===============================================
       WEB FALLBACK
    =============================================== */

    if (Platform.OS === "web") {
      Alert.alert(
        "Web Checkout",

        "Payments are currently available only on Android and iOS."
      );

      return;
    }

    /* ===============================================
       ADDRESS CHECK
    =============================================== */

    if (!addresses?.length) {
      Alert.alert(
        "No Address",

        "Please add a shipping address before checkout."
      );

      return;
    }

    setAddressModalVisible(true);
  };

  /* =====================================================
     CREATE ORDER IN SUPABASE
  ===================================================== */

  const createOrderInSupabase =
    async (
      selectedAddress: Address
    ) => {
      try {
        const orderPayload = {
          orderItems: cartItems.map(
            (item: any) => ({
              id:
                item.product?.id,

              name:
                item.product?.name,

              image:
                item.product
                  ?.images?.[0],

              quantity:
                item.quantity,

              price:
                item.product
                  ?.price,
            })
          ),

          status: "pending",

          totalPrice: total,

          hasReviewed: false,

          shippingAddress: {
            fullName:
              selectedAddress.fullName,

            streetAddress:
              selectedAddress.streetAddress,

            city:
              selectedAddress.city,

            state:
              selectedAddress.state,

            zipCode:
              selectedAddress.zipCode,

            phoneNumber:
              selectedAddress.phoneNumber,
          },
        };

        const { data, error } =
          await supabase
            .from("orders")
            .insert([
              orderPayload,
            ])
            .select()
            .single();

        if (error) {
          throw error;
        }

        return data;
      } catch (error) {
        console.error(error);

        throw error;
      }
    };

  /* =====================================================
     PAYMENT FLOW
  ===================================================== */

  const handleProceedWithPayment =
    async (
      selectedAddress: Address
    ) => {
      try {
        setAddressModalVisible(false);

        setPaymentLoading(true);

        /* ===============================================
           SENTRY
        =============================================== */

        Sentry.logger.info(
          "Checkout started",

          {
            total:
              total.toFixed(2),

            itemCount:
              cartItemCount,
          }
        );

        /* ===============================================
           CREATE ORDER FIRST
        =============================================== */

        const createdOrder =
          await createOrderInSupabase(
            selectedAddress
          );

        /* ===============================================
           WEB MOCK PAYMENT
        =============================================== */

        if (Platform.OS === "web") {
          Alert.alert(
            "Success",

            "Order placed successfully!"
          );

          clearCart();

          return;
        }

        /* ===============================================
           STRIPE SAFETY
        =============================================== */

        if (
          !initPaymentSheet ||
          !presentPaymentSheet
        ) {
          Alert.alert(
            "Stripe Error",

            "Stripe is unavailable on this platform."
          );

          return;
        }

        /* ===============================================
           MOCK PAYMENT SHEET
        =============================================== */

        const {
          error: initError,
        } =
          await initPaymentSheet({
            merchantDisplayName:
              "QvonXpert Store",

            allowsDelayedPaymentMethods: true,
          });

        if (initError) {
          Alert.alert(
            "Payment Error",

            initError.message
          );

          return;
        }

        const {
          error: paymentError,
        } =
          await presentPaymentSheet();

        if (paymentError) {
          Alert.alert(
            "Payment Cancelled",

            paymentError.message
          );

          return;
        }

        /* ===============================================
           UPDATE ORDER STATUS
        =============================================== */

        await supabase
          .from("orders")
          .update({
            status: "paid",
          })
          .eq(
            "id",
            createdOrder.id
          );

        /* ===============================================
           SUCCESS
        =============================================== */

        Alert.alert(
          "Success",

          "Payment completed successfully!"
        );

        clearCart();
      } catch (error: any) {
        console.log(
          "PAYMENT ERROR:",
          error
        );

        Alert.alert(
          "Error",

          error?.message ||
            "Payment failed. Please try again."
        );
      } finally {
        setPaymentLoading(false);
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

  if (cartItems.length === 0) {
    return <EmptyUI />;
  }

  return (
    <SafeScreen>
      {/* =================================================
         HEADER
      ================================================= */}

      <View className="px-6 pt-2 pb-5">
        <Text className="text-text-primary text-4xl font-black">
          Shopping Cart
        </Text>

        <Text className="text-text-secondary mt-2">
          {cartItemCount} item
          {cartItemCount !== 1
            ? "s"
            : ""}{" "}
          in your cart
        </Text>
      </View>

      {/* =================================================
         CONTENT
      ================================================= */}

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingBottom: 260,
        }}
      >
        <View className="px-6 gap-4">
          {cartItems.map(
            (item: any) => (
              <View
                key={item.id}
                className="
                bg-surface
                rounded-[28px]
                overflow-hidden
                border border-border
              "
              >
                <View className="p-4 flex-row">
                  {/* IMAGE */}

                  <Image
                    source={
                      item.product
                        ?.images?.[0] ||
                      "https://placehold.co/300x300"
                    }
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 24,
                    }}
                    contentFit="cover"
                  />

                  {/* CONTENT */}

                  <View className="flex-1 ml-4 justify-between">
                    <View>
                      <Text
                        className="
                        text-text-primary
                        text-base
                        font-bold
                      "
                        numberOfLines={2}
                      >
                        {
                          item.product
                            ?.name
                        }
                      </Text>

                      <Text className="text-text-secondary mt-1">
                        $
                        {Number(
                          item.product
                            ?.price ||
                            0
                        ).toFixed(
                          2
                        )}
                      </Text>

                      <Text className="text-primary text-xl font-black mt-3">
                        $
                        {(
                          Number(
                            item
                              .product
                              ?.price ||
                              0
                          ) *
                          item.quantity
                        ).toFixed(
                          2
                        )}
                      </Text>
                    </View>

                    {/* ACTIONS */}

                    <View className="flex-row items-center mt-4">
                      {/* QUANTITY */}

                      <View
                        className="
                        flex-row items-center
                        bg-background
                        rounded-2xl
                        px-2 py-1
                      "
                      >
                        <TouchableOpacity
                          disabled={
                            isUpdating
                          }
                          onPress={() =>
                            handleQuantityChange(
                              item
                                .product
                                ?.id,
                              item.quantity,
                              -1
                            )
                          }
                          className="
                          w-9 h-9
                          items-center
                          justify-center
                        "
                        >
                          <Ionicons
                            name="remove"
                            size={18}
                          />
                        </TouchableOpacity>

                        <Text className="mx-3 font-bold text-base">
                          {
                            item.quantity
                          }
                        </Text>

                        <TouchableOpacity
                          disabled={
                            isUpdating
                          }
                          onPress={() =>
                            handleQuantityChange(
                              item
                                .product
                                ?.id,
                              item.quantity,
                              1
                            )
                          }
                          className="
                          w-9 h-9
                          items-center
                          justify-center
                        "
                        >
                          <Ionicons
                            name="add"
                            size={18}
                          />
                        </TouchableOpacity>
                      </View>

                      {/* DELETE */}

                      <TouchableOpacity
                        disabled={
                          isRemoving
                        }
                        onPress={() =>
                          handleRemoveItem(
                            item
                              .product
                              ?.id,
                            item
                              .product
                              ?.name
                          )
                        }
                        className="
                        ml-auto
                        w-11 h-11
                        rounded-2xl
                        bg-red-100
                        items-center
                        justify-center
                      "
                      >
                        <Ionicons
                          name="trash-outline"
                          size={20}
                          color="red"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )
          )}
        </View>

        {/* =================================================
           ORDER SUMMARY
        ================================================= */}

        <OrderSummary
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          total={total}
        />
      </ScrollView>

      {/* =================================================
         FOOTER
      ================================================= */}

      <View
        className="
          absolute bottom-0 left-0 right-0
          px-6 pt-5 pb-8
          bg-background
          border-t border-border
        "
      >
        <TouchableOpacity
          onPress={handleCheckout}
          disabled={paymentLoading}
          className="
            bg-primary
            rounded-3xl
            py-5
            items-center
            justify-center
          "
          activeOpacity={0.9}
        >
          {paymentLoading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <>
              <Text className="text-black text-lg font-black">
                Checkout
              </Text>

              <Text className="text-black/70 mt-1 font-semibold">
                ${total.toFixed(2)}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* =================================================
         ADDRESS MODAL
      ================================================= */}

      <AddressSelectionModal
        visible={
          addressModalVisible
        }
        onClose={() =>
          setAddressModalVisible(
            false
          )
        }
        onProceed={
          handleProceedWithPayment
        }
        isProcessing={
          paymentLoading
        }
      />
    </SafeScreen>
  );
};

export default CartScreen;

/* =========================================================
   LOADING UI
========================================================= */

function LoadingUI() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator size="large" />

      <Text className="mt-4 text-text-secondary">
        Loading cart...
      </Text>
    </View>
  );
}

/* =========================================================
   ERROR UI
========================================================= */

function ErrorUI() {
  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Ionicons
        name="alert-circle-outline"
        size={60}
        color="red"
      />

      <Text className="text-xl font-bold mt-4">
        Failed to load cart
      </Text>

      <Text className="text-text-secondary text-center mt-2">
        Please try again later.
      </Text>
    </View>
  );
}

/* =========================================================
   EMPTY UI
========================================================= */

function EmptyUI() {
  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <View
        className="
          w-28 h-28
          rounded-full
          bg-surface
          items-center
          justify-center
        "
      >
        <Ionicons
          name="cart-outline"
          size={52}
          color="#888"
        />
      </View>

      <Text className="text-2xl font-black mt-6">
        Your cart is empty
      </Text>

      <Text className="text-text-secondary text-center mt-3">
        Add products to your cart to
        continue shopping.
      </Text>
    </View>
  );
}