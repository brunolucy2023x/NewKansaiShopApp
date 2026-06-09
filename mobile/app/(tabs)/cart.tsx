// mobile/app/cart.tsx
// Cart V2 - Production Ready Marketplace Style

import SafeScreen from "@/components/SafeScreen";
import AddressSelectionModal from "@/components/AddressSelectionModal";
import useCart from "@/hooks/useCart";
import { useAddresses } from "@/hooks/useAddressess";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function CartScreen() {
  const insets = useSafeAreaInsets();

  const {
    cart,
    cartItemCount,
    cartTotal,
    isLoading,
    isError,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const { addresses = [] } = useAddresses();

  const [addressModalVisible, setAddressModalVisible] =
    useState(false);

  const cartItems = cart?.items || [];

  const subtotal = cartTotal || 0;
  const shipping = subtotal > 5000 ? 0 : 300;
  const total = subtotal + shipping;

  if (isLoading) {
    return (
      <StateScreen
        title="Loading Cart..."
        icon="loader"
      />
    );
  }

  if (isError) {
    return (
      <StateScreen
        title="Something Went Wrong"
        icon="alert-circle"
      />
    );
  }

  if (!cartItems.length) {
    return (
      <StateScreen
        title="Your Cart Is Empty"
        icon="shopping-cart"
      />
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeScreen>
        <StatusBar barStyle="dark-content" />

        <View className="flex-1 bg-white">
          <View className="px-5 pt-4 pb-5">
            <Text className="text-gray-400 font-bold">
              CART
            </Text>

            <Text className="text-3xl font-black mt-1">
              Shopping Bag
            </Text>

            <Text className="text-gray-500 mt-1">
              {cartItemCount} items
            </Text>
          </View>

          <View className="mx-5 bg-[#F8FAFC] rounded-3xl p-4 mb-4">
            <Text className="font-black">
              Checkout Progress
            </Text>

            <View className="flex-row justify-between mt-4">
              <Text>🛒 Cart</Text>
              <Text>📍 Address</Text>
              <Text>💳 Payment</Text>
              <Text>✅ Done</Text>
            </View>
          </View>

          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 180,
            }}
          >
            {subtotal < 5000 && (
              <View className="bg-[#D9F26A] rounded-3xl p-4 mb-4">
                <Text className="font-black">
                  Spend KSh {(5000 - subtotal).toFixed(0)}
                  {" "}more to unlock FREE DELIVERY
                </Text>
              </View>
            )}

            {cartItems.map((item: any) => (
              <Swipeable
                key={item.id}
                renderRightActions={() => (
                  <TouchableOpacity
                    onPress={() =>
                      removeFromCart(item.product.id)
                    }
                    className="bg-red-500 justify-center items-center rounded-3xl ml-3"
                    style={{ width: 80 }}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={24}
                      color="#fff"
                    />
                  </TouchableOpacity>
                )}
              >
                <View className="bg-[#F8FAFC] rounded-3xl p-4 mb-4">
                  <View className="flex-row">
                    <Image
                      source={{
                        uri:
                          item.product.images?.[0],
                      }}
                      style={{
                        width: 95,
                        height: 95,
                      }}
                    />

                    <View className="flex-1 ml-4">
                      <Text
                        numberOfLines={2}
                        className="font-black text-base"
                      >
                        {item.product.name}
                      </Text>

                      <Text className="text-green-600 mt-2">
                        ✓ In Stock
                      </Text>

                      <Text className="font-black text-lg mt-2">
                        KSh {item.product.price}
                      </Text>

                      <View className="flex-row items-center justify-between mt-3">
                        <View className="flex-row items-center">
                          <TouchableOpacity
                            onPress={() =>
                              updateQuantity({
                                productId:
                                  item.product.id,
                                quantity: Math.max(
                                  1,
                                  item.quantity - 1
                                ),
                              })
                            }
                          >
                            <Ionicons
                              name="remove-circle"
                              size={32}
                            />
                          </TouchableOpacity>

                          <Text className="mx-4 font-black">
                            {item.quantity}
                          </Text>

                          <TouchableOpacity
                            onPress={() =>
                              updateQuantity({
                                productId:
                                  item.product.id,
                                quantity:
                                  item.quantity + 1,
                              })
                            }
                          >
                            <Ionicons
                              name="add-circle"
                              size={32}
                            />
                          </TouchableOpacity>
                        </View>

                        <Text className="font-black">
                          KSh {(item.product.price *
                            item.quantity).toFixed(0)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Swipeable>
            ))}

            <View className="bg-[#0F172A] rounded-3xl p-5">
              <Text className="text-white text-xl font-black">
                Order Summary
              </Text>

              <Row
                title="Subtotal"
                value={`KSh ${subtotal.toFixed(0)}`}
              />

              <Row
                title="Shipping"
                value={
                  shipping === 0
                    ? "FREE"
                    : `KSh ${shipping}`
                }
              />

              <View className="border-t border-gray-700 my-4" />

              <Row
                title="Total"
                value={`KSh ${total.toFixed(0)}`}
                bold
              />
            </View>
          </ScrollView>

          <View
            style={{
              position: "absolute",
              left: 16,
              right: 16,
              bottom: insets.bottom + 10,
            }}
          >
            <TouchableOpacity


onPress={() =>
  router.push("/checkout")
}






              className="bg-black rounded-3xl py-5 items-center"
            >
              <Text className="text-white font-black text-lg">
                Proceed To Checkout • KSh {total.toFixed(0)}
              </Text>
            </TouchableOpacity>
          </View>

          <AddressSelectionModal
            visible={addressModalVisible}
            onClose={() =>
              setAddressModalVisible(false)
            }
            onProceed={() => {}}
          />
        </View>
      </SafeScreen>
    </GestureHandlerRootView>
  );
}

function Row({
  title,
  value,
  bold,
}: any) {
  return (
    <View className="flex-row justify-between mt-4">
      <Text
        className={bold ? "text-white font-black" : "text-gray-300"}
      >
        {title}
      </Text>
      <Text
        className={bold ? "text-white font-black" : "text-gray-300"}
      >
        {value}
      </Text>
    </View>
  );
}

function StateScreen({ title, icon }: any) {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Feather name={icon} size={42} />
      <Text className="text-xl font-black mt-4">
        {title}
      </Text>
    </View>
  );
}
