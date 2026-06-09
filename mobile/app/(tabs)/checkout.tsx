// mobile/app/checkout.tsx

import SafeScreen from "@/components/SafeScreen";
import useCart from "@/hooks/useCart";
import { useAddresses } from "@/hooks/useAddressess";


import useCreateOrder from "@/hooks/useCreateOrder";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";

import {
  useMemo,
  useState,
} from "react";

import { Image } from "expo-image";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  router,
} from "expo-router";

export default function CheckoutScreen() {
  const insets =
    useSafeAreaInsets();

  const {
    cart,
    cartTotal,
    isLoading,
  } = useCart();

  const {
    addresses,
  } = useAddresses();

  const {
    createOrder,
    isCreatingOrder,
  } = useCreateOrder();

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState<
    "cod" | "mpesa"
  >("cod");

  const [
    phoneNumber,
    setPhoneNumber,
  ] = useState("");

  const defaultAddress =
    useMemo(() => {
      return (
        addresses.find(
          (
            address
          ) =>
            address.isDefault
        ) ||
        addresses[0]
      );
    }, [addresses]);

  const shipping =
    cartTotal >= 5000
      ? 0
      : 300;

  const total =
    cartTotal + shipping;

  const handlePlaceOrder =
    () => {
      if (
        !defaultAddress
      ) {
        Alert.alert(
          "Address Required",
          "Please add a delivery address first."
        );

        return;
      }

      if (
        paymentMethod ===
          "mpesa" &&
        !phoneNumber
      ) {
        Alert.alert(
          "Phone Number Required",
          "Please enter your M-Pesa number."
        );

        return;
      }

      createOrder(
        {
          shippingAddress:
            defaultAddress,
      
          paymentMethod,
      
          mpesaPhone:
            phoneNumber,
        },
      
        {
          onSuccess: () => {
            router.replace(
              "/order-success"
            );
          },
      
          onError: (
            error: any
          ) => {
            Alert.alert(
              "Order Error",
              error.message
            );
          },
        }
      );
    };

  if (isLoading) {
    return (
      <SafeScreen>
        <View
          className="
            flex-1
            items-center
            justify-center
            bg-white
          "
        >
          <ActivityIndicator
            size="large"
          />

          <Text
            className="
              mt-4
              text-gray-500
            "
          >
            Loading checkout...
          </Text>
        </View>
      </SafeScreen>
    );
  }

  return (
    <SafeScreen>
      <View className="flex-1 bg-white">
        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={{
            paddingBottom:
              260,
          }}
        >
          {/* =====================================
              HEADER
          ===================================== */}

          <View
            className="
              px-5
              pt-4
              flex-row
              items-center
            "
          >
            <TouchableOpacity
              onPress={() =>
                router.back()
              }
            >
              <Ionicons
                name="arrow-back"
                size={24}
              />
            </TouchableOpacity>

            <View
              className="
                ml-4
              "
            >
              <Text
                className="
                  text-2xl
                  font-black
                "
              >
                Checkout
              </Text>

              <Text
                className="
                  text-gray-500
                "
              >
                Secure Checkout
              </Text>
            </View>
          </View>

          {/* =====================================
              ADDRESS
          ===================================== */}

          <View
            className="
              mx-5
              mt-6
            "
          >
            <View
  className="
    flex-row
    justify-between
    items-center
  "
>
  <Text
    className="
      text-lg
      font-black
    "
  >
    Delivery Address
  </Text>

  <TouchableOpacity
    onPress={() =>
      router.push(
        "/addresses"
      )
    }
  >
    <Text
      className="
        font-black
        text-blue-500
      "
    >
      Change
    </Text>
  </TouchableOpacity>
</View>

            {defaultAddress ? (
              <View
                className="
                  bg-gray-50
                  rounded-3xl
                  p-5
                  mt-3
                "
              >
                <View
                  className="
                    flex-row
                    justify-between
                    items-center
                  "
                >
                  <Text
                    className="
                      font-black
                    "
                  >
                    {
                      defaultAddress.fullName
                    }
                  </Text>

                  <View
                    className="
                      bg-green-100
                      px-3
                      py-1
                      rounded-full
                    "
                  >
                    <Text
                      className="
                        text-green-700
                        text-xs
                        font-bold
                      "
                    >
                      Default
                    </Text>
                  </View>
                </View>

                <Text
                  className="
                    mt-2
                    text-gray-600
                  "
                >
                  {
                    defaultAddress.streetAddress
                  }
                </Text>

                <Text
                  className="
                    text-gray-600
                  "
                >
                  {
                    defaultAddress.city
                  }
                  ,{" "}
                  {
                    defaultAddress.state
                  }
                </Text>

                <Text
                  className="
                    mt-2
                    font-semibold
                  "
                >
                  {
                    defaultAddress.phoneNumber
                  }
                </Text>
              </View>
            ) : (
              <View
                className="
                  mt-3
                  p-5
                  rounded-3xl
                  border
                  border-dashed
                "
              >
                <Text
                  className="
                    text-red-500
                  "
                >
                  No address found.
                </Text>

                <Text
                  className="
                    mt-2
                    text-gray-500
                  "
                >
                  Please add an address.
                </Text>
              </View>


            )}
          </View>











          <View
  className="
    mx-5
    bg-[#F8FAFC]
    rounded-3xl
    p-5
    mb-4
  "
>
  <View
    className="
      flex-row
      justify-between
      items-center
    "
  >
    <Text
      className="
        font-black
        text-lg
      "
    >
      Delivery Details
    </Text>

    <TouchableOpacity>
    <Text
        className="
          text-blue-500
          font-bold
        "
      >
        Change
      </Text>
    </TouchableOpacity>
  </View>

  <View className="mt-4">
    <Text
      className="
        font-black
      "
    >
      Standard Delivery
    </Text>

    
  </View>
</View>








<View
  className="
    bg-blue-50
    rounded-3xl
    p-5
    mt-2
  "
>
  <Text
    className="
      font-black
      mb-3
    "
  >
    Payment Information
  </Text>

  <Text
    className="
      text-gray-600
      leading-6
    "
  >
    You will be redirected
    to the payment provider
    to complete your purchase.
  </Text>

  <Text
    className="
      text-gray-600
      leading-6
      mt-2
    "
  >
    Ensure you have
    sufficient funds
    available.
  </Text>
</View>

<View
  className="
    mx-5
    mt-4
    bg-white
    border
    border-gray-100
    rounded-3xl
    p-5
  "
>
  <Text
    className="
      font-black
      mb-3
    "
  >
    We Accept
  </Text>

  <Text>
    • M-Pesa
  </Text>

  <Text>
    • Airtel Money
  </Text>

  <Text>
    • Visa
  </Text>

  <Text>
    • Mastercard
  </Text>

  <Text>
    • Cash On Delivery
  </Text>
</View>

<View
  className="
    mx-5
    mt-4
    bg-[#F8FAFC]
    rounded-3xl
    p-5
  "
>
  <Text
    className="
      font-black
      mb-3
    "
  >
    Buyer Protection
  </Text>

  <Text
    className="
      text-gray-600
    "
  >
    ✓ Secure Payments
  </Text>

  <Text
    className="
      text-gray-600
      mt-2
    "
  >
    ✓ Trusted Marketplace
  </Text>

  <Text
    className="
      text-gray-600
      mt-2
    "
  >
    ✓ Fast Delivery
  </Text>

  <Text
    className="
      text-gray-600
      mt-2
    "
  >
    ✓ Easy Returns
  </Text>
</View>




















          {/* =====================================
              PAYMENT METHOD
          ===================================== */}

          <View
            className="
              mx-5
              mt-8
            "
          >
            <Text
              className="
                text-lg
                font-black
              "
            >
              Payment Method
            </Text>

            <TouchableOpacity
              onPress={() =>
                setPaymentMethod(
                  "cod"
                )
              }
              className={`
                mt-3
                rounded-3xl
                p-5
                border
                ${
                  paymentMethod ===
                  "cod"
                    ? "border-black"
                    : "border-gray-200"
                }
              `}
            >
              <Text
                className="
                  font-black
                "
              >
                {paymentMethod ===
                "cod"
                  ? "◉"
                  : "○"}{" "}
                Cash On Delivery
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setPaymentMethod(
                  "mpesa"
                )
              }
              className={`
                mt-3
                rounded-3xl
                p-5
                border
                ${
                  paymentMethod ===
                  "mpesa"
                    ? "border-green-500"
                    : "border-gray-200"
                }
              `}
            >
              <Text
                className="
                  font-black
                "
              >
                {paymentMethod ===
                "mpesa"
                  ? "◉"
                  : "○"}{" "}
                M-Pesa
              </Text>
            </TouchableOpacity>

            {paymentMethod ===
              "mpesa" && (
              <TextInput
                placeholder="Enter M-Pesa Number"
                keyboardType="phone-pad"
                value={
                  phoneNumber
                }
                onChangeText={
                  setPhoneNumber
                }
                className="
                  border
                  border-gray-200
                  rounded-2xl
                  mt-4
                  px-4
                  py-4
                "
              />
            )}
          </View>

          {/* =====================================
              ITEMS
          ===================================== */}

          <View
            className="
              mx-5
              mt-8
            "
          >
            <Text
              className="
                text-lg
                font-black
              "
            >
              Order Items
            </Text>

            {cart?.items?.map(
              (
                item
              ) => (
                <View
                  key={item.id}
                  className="
                    flex-row
                    mt-4
                    bg-gray-50
                    rounded-3xl
                    p-4
                  "
                >
                  <Image
                    source={{
                      uri:
                        item
                          .product
                          .images?.[0],
                    }}
                    style={{
                      width: 80,
                      height: 80,
                    }}
                  />

                  <View
                    className="
                      flex-1
                      ml-4
                    "
                  >
                    <Text
                      numberOfLines={
                        2
                      }
                      className="
                        font-black
                      "
                    >
                      {
                        item
                          .product
                          .name
                      }
                    </Text>

                    <Text
                      className="
                        mt-2
                        text-gray-500
                      "
                    >
                      Qty:
                      {" "}
                      {
                        item.quantity
                      }
                    </Text>

                    <Text
                      className="
                        mt-2
                        font-black
                      "
                    >
                      KSh{" "}
                      {(
                        item
                          .product
                          .price *
                        item.quantity
                      ).toFixed(
                        0
                      )}
                    </Text>
                  </View>
                </View>
              )
            )}
          </View>

          {/* =====================================
              DELIVERY INFO
          ===================================== */}

          <View
            className="
              mx-5
              mt-8
              bg-gray-50
              rounded-3xl
              p-5
            "
          >
            <Text
              className="
                font-black
                mb-4
              "
            >
              Delivery Information
            </Text>





            <View
  className="
    mx-5
    mt-6
    bg-green-50
    rounded-3xl
    p-5
  "
>
  <Text
    className="
      font-black
      mb-3
    "
  >
    Shopping Security
  </Text>

  <Text>
    ✓ Secure Checkout
  </Text>

  <Text
    className="
      mt-2
    "
  >
    ✓ Buyer Protection
  </Text>

  <Text
    className="
      mt-2
    "
  >
    ✓ Trusted Marketplace
  </Text>

  <Text
    className="
      mt-2
    "
  >
    ✓ Protected Payments
  </Text>
</View>








            <Text>
              ✓ Delivery
              within 1-3
              days
            </Text>

            <Text
              className="
                mt-2
              "
            >
              ✓ Secure
              Packaging
            </Text>

            <Text
              className="
                mt-2
              "
            >
              ✓ Order
              Tracking
            </Text>
          </View>

          {/* =====================================
              SUMMARY
          ===================================== */}

          <View
            className="
              mx-5
              mt-8
              bg-black
              rounded-3xl
              p-5
            "
          >
            <Text
              className="
                text-white
                text-lg
                font-black
              "
            >
              Order Summary
            </Text>

            <View
              className="
                flex-row
                justify-between
                mt-5
              "
            >
              <Text
                className="
                  text-gray-300
                "
              >
                Subtotal
              </Text>

              <Text
                className="
                  text-white
                "
              >
                KSh{" "}
                {cartTotal.toFixed(
                  0
                )}
              </Text>
            </View>

            <View
              className="
                flex-row
                justify-between
                mt-3
              "
            >
              <Text
                className="
                  text-gray-300
                "
              >
                Shipping
              </Text>

              <Text
                className="
                  text-white
                "
              >
                {shipping ===
                0
                  ? "FREE"
                  : `KSh ${shipping}`}
              </Text>
            </View>

            <View
              className="
                h-px
                bg-gray-700
                my-5
              "
            />

            <View
              className="
                flex-row
                justify-between
              "
            >
              <Text
                className="
                  text-white
                  font-black
                "
              >
                Total
              </Text>

              <Text
                className="
                  text-white
                  font-black
                "
              >
                KSh{" "}
                {total.toFixed(
                  0
                )}
              </Text>
            </View>
          </View>
        </ScrollView>

     {/* =====================================
    FOOTER
===================================== */}

<View
  className="
    absolute
    left-0
    right-0
    bg-white
    border-t
    border-gray-100
    px-5
    pt-4
  "
  style={{
    bottom: 40,
    paddingBottom: Math.max(
      insets.bottom,
      15
    ),
  }}
>
  <View
    className="
      flex-row
      justify-between
      items-center
    "
  >
    {/* TOTAL */}

    <View>
      <Text
        className="
          text-gray-500
          text-sm
        "
      >
        Total
      </Text>

      <Text
        className="
          font-black
          text-2xl
        "
      >
        KSh {total.toFixed(0)}
      </Text>
    </View>



   







    {/* BUTTON */}

    <TouchableOpacity
      disabled={
        isCreatingOrder
      }
      onPress={
        handlePlaceOrder
      }
      className="
        bg-[#D9F26A]
        rounded-3xl
        px-8
        py-5
        min-w-[180px]
        items-center
      "
    >
      {isCreatingOrder ? (
        <ActivityIndicator
          color="#111"
        />
      ) : (
        <Text
          className="
            font-black
            text-base
          "
        >
          Place Order
        </Text>
      )}
    </TouchableOpacity>

    </View>
   
  </View>
</View>
    </SafeScreen>

   
  );
};