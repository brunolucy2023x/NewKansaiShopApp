import { useAddresses } from "@/hooks/useAddressess";

import type { Address } from "@/types";

import { Ionicons } from "@expo/vector-icons";

import {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";

/* =========================================================
   TYPES
========================================================= */

interface AddressSelectionModalProps {
  visible: boolean;

  onClose: () => void;

  onProceed: (
    address: Address
  ) => void;

  isProcessing: boolean;
}

/* =========================================================
   COMPONENT
========================================================= */

const AddressSelectionModal = ({
  visible,

  onClose,

  onProceed,

  isProcessing,
}: AddressSelectionModalProps) => {
  /* =====================================================
     STATE
  ===================================================== */

  const [
    selectedAddress,
    setSelectedAddress,
  ] =
    useState<Address | null>(
      null
    );

  /* =====================================================
     ADDRESSES
  ===================================================== */

  const {
    addresses,

    isLoading:
      addressesLoading,

    isError,
  } = useAddresses();

  /* =====================================================
     AUTO SELECT DEFAULT ADDRESS
  ===================================================== */

  useEffect(() => {
    if (
      addresses?.length
    ) {
      const defaultAddress =
        addresses.find(
          (
            address: Address
          ) =>
            address.isDefault
        );

      setSelectedAddress(
        defaultAddress ||
          addresses[0]
      );
    }
  }, [addresses]);

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={
        onClose
      }
    >
      {/* BACKDROP */}

      <TouchableWithoutFeedback
        onPress={onClose}
      >
        <View
          className="
            flex-1
            justify-end
          "
          style={{
            backgroundColor:
              "rgba(0,0,0,0.45)",
          }}
        >
          {/* PREVENT CLOSE */}

          <TouchableWithoutFeedback>
            <View
              className="
                bg-white
                rounded-t-[42px]
                overflow-hidden
              "
              style={{
                height: "82%",
              }}
            >
              {/* =================================================
                 HANDLE
              ================================================= */}

              <View className="items-center pt-4">
                <View
                  className="
                    w-16
                    h-1.5
                    rounded-full
                    bg-[#D1D5DB]
                  "
                />
              </View>

              {/* =================================================
                 HEADER
              ================================================= */}

              <View
                className="
                  px-6
                  pt-5
                  pb-5
                  flex-row
                  items-center
                  justify-between
                "
              >
                {/* LEFT */}

                <View>
                  <Text
                    className="
                      text-black
                      text-[30px]
                      font-black
                    "
                  >
                    Addresses
                  </Text>

                  <Text
                    className="
                      text-[#6B7280]
                      text-sm
                      mt-1
                    "
                  >
                    Choose delivery address
                  </Text>
                </View>

                {/* CLOSE */}

                <TouchableOpacity
                  activeOpacity={
                    0.8
                  }
                  onPress={
                    onClose
                  }
                  className="
                    w-12
                    h-12
                    rounded-full
                    bg-[#F3F4F6]
                    items-center
                    justify-center
                  "
                >
                  <Ionicons
                    name="close"
                    size={22}
                    color="#111"
                  />
                </TouchableOpacity>
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
                  paddingHorizontal: 20,
                  paddingBottom: 40,
                }}
              >
                {/* =================================================
                   LOADING
                ================================================= */}

                {addressesLoading ? (
                  <View className="py-24 items-center">
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
                        name="location-outline"
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
                        text-[#6B7280]
                        mt-5
                        text-base
                        font-medium
                      "
                    >
                      Loading addresses...
                    </Text>
                  </View>
                ) : isError ? (
                  /* =================================================
                     ERROR
                  ================================================= */

                  <View className="py-24 items-center px-6">
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
                        name="alert-circle-outline"
                        size={54}
                        color="#EF4444"
                      />
                    </View>

                    <Text
                      className="
                        text-black
                        text-2xl
                        font-black
                        text-center
                      "
                    >
                      Failed to load
                      addresses
                    </Text>

                    <Text
                      className="
                        text-[#6B7280]
                        text-center
                        mt-3
                        leading-7
                      "
                    >
                      Please try again later.
                    </Text>
                  </View>
                ) : !addresses?.length ? (
                  /* =================================================
                     EMPTY
                  ================================================= */

                  <View className="py-24 items-center px-6">
                    <View
                      className="
                        w-28
                        h-28
                        rounded-full
                        bg-[#F3F4F6]
                        items-center
                        justify-center
                        mb-6
                      "
                    >
                      <Ionicons
                        name="location-outline"
                        size={54}
                        color="#999"
                      />
                    </View>

                    <Text
                      className="
                        text-black
                        text-2xl
                        font-black
                        text-center
                      "
                    >
                      No addresses found
                    </Text>

                    <Text
                      className="
                        text-[#6B7280]
                        text-center
                        mt-3
                        leading-7
                      "
                    >
                      Add an address before
                      checkout.
                    </Text>
                  </View>
                ) : (
                  /* =================================================
                     ADDRESS LIST
                  ================================================= */

                  <View className="pb-4">
                    {addresses.map(
                      (
                        address: Address
                      ) => {
                        const isSelected =
                          selectedAddress?.id ===
                          address.id;

                        return (
                          <TouchableOpacity
                            key={
                              address.id
                            }
                            activeOpacity={
                              0.9
                            }
                            onPress={() =>
                              setSelectedAddress(
                                address
                              )
                            }
                            className={`
                              rounded-[30px]
                              p-5
                              mb-4
                              ${
                                isSelected
                                  ? "bg-[#D9F26A]"
                                  : "bg-[#F3F4F6]"
                              }
                            `}
                          >
                            {/* TOP */}

                            <View
                              className="
                                flex-row
                                justify-between
                                items-start
                              "
                            >
                              {/* LEFT */}

                              <View className="flex-1 pr-4">
                                {/* LABEL */}

                                <View
                                  className="
                                    flex-row
                                    items-center
                                    flex-wrap
                                    mb-3
                                  "
                                >
                                  <Text
                                    className={`
                                      text-[18px]
                                      font-black
                                      mr-2
                                      ${
                                        isSelected
                                          ? "text-black"
                                          : "text-black"
                                      }
                                    `}
                                  >
                                    {address.label ||
                                      "Address"}
                                  </Text>

                                  {address.isDefault && (
                                    <View
                                      className={`
                                        px-3
                                        py-1
                                        rounded-full
                                        ${
                                          isSelected
                                            ? "bg-black"
                                            : "bg-white"
                                        }
                                      `}
                                    >
                                      <Text
                                        className={`
                                          text-xs
                                          font-bold
                                          ${
                                            isSelected
                                              ? "text-white"
                                              : "text-black"
                                          }
                                        `}
                                      >
                                        Default
                                      </Text>
                                    </View>
                                  )}
                                </View>

                                {/* NAME */}

                                <Text
                                  className="
                                    text-black
                                    font-bold
                                    text-[17px]
                                    mb-2
                                  "
                                >
                                  {
                                    address.fullName
                                  }
                                </Text>

                                {/* ADDRESS */}

                                <Text
                                  className="
                                    text-[#4B5563]
                                    text-[15px]
                                    leading-7
                                  "
                                >
                                  {
                                    address.streetAddress
                                  }
                                </Text>

                                <Text
                                  className="
                                    text-[#4B5563]
                                    text-[15px]
                                    leading-7
                                  "
                                >
                                  {
                                    address.city
                                  }
                                  ,{" "}
                                  {
                                    address.state
                                  }{" "}
                                  {
                                    address.zipCode
                                  }
                                </Text>

                                {/* PHONE */}

                                <Text
                                  className="
                                    text-[#6B7280]
                                    mt-3
                                    text-sm
                                    font-medium
                                  "
                                >
                                  {
                                    address.phoneNumber
                                  }
                                </Text>
                              </View>

                              {/* CHECK */}

                              <View
                                className={`
                                  w-12
                                  h-12
                                  rounded-full
                                  items-center
                                  justify-center
                                  ${
                                    isSelected
                                      ? "bg-black"
                                      : "bg-white"
                                  }
                                `}
                              >
                                <Ionicons
                                  name={
                                    isSelected
                                      ? "checkmark"
                                      : "location-outline"
                                  }
                                  size={
                                    22
                                  }
                                  color={
                                    isSelected
                                      ? "#D9F26A"
                                      : "#111"
                                  }
                                />
                              </View>
                            </View>
                          </TouchableOpacity>
                        );
                      }
                    )}
                  </View>
                )}
              </ScrollView>

              {/* =================================================
                 FOOTER
              ================================================= */}

              <View
                className="
                  px-6
                  pt-4
                  pb-8
                  bg-white
                "
                style={{
                  borderTopWidth: 1,
                  borderTopColor:
                    "#F3F4F6",
                }}
              >
                <TouchableOpacity
                  activeOpacity={
                    0.9
                  }
                  onPress={() => {
                    if (
                      selectedAddress
                    ) {
                      onProceed(
                        selectedAddress
                      );
                    }
                  }}
                  disabled={
                    !selectedAddress ||
                    isProcessing
                  }
                  className={`
                    rounded-[28px]
                    py-5
                    items-center
                    justify-center
                    ${
                      selectedAddress
                        ? "bg-[#D9F26A]"
                        : "bg-[#E5E7EB]"
                    }
                  `}
                >
                  {isProcessing ? (
                    <ActivityIndicator
                      size="small"
                      color="#111"
                    />
                  ) : (
                    <View
                      className="
                        flex-row
                        items-center
                      "
                    >
                      <Text
                        className={`
                          text-[17px]
                          font-black
                          mr-3
                          ${
                            selectedAddress
                              ? "text-black"
                              : "text-[#888]"
                          }
                        `}
                      >
                        Continue to Payment
                      </Text>

                      <Ionicons
                        name="arrow-forward"
                        size={20}
                        color={
                          selectedAddress
                            ? "#111"
                            : "#888"
                        }
                      />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddressSelectionModal;