import { useAddresses } from "@/hooks/useAddressess";

import { Address } from "@/types";

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
     SUPABASE ADDRESSES
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

      if (
        defaultAddress
      ) {
        setSelectedAddress(
          defaultAddress
        );
      }
    }
  }, [addresses]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={
        onClose
      }
    >
      <View
        className="
          flex-1
          bg-black/60
          justify-end
        "
      >
        <View
          className="
            bg-background
            rounded-t-3xl
            h-[75%]
          "
        >
          {/* =================================================
             HEADER
          ================================================= */}

          <View
            className="
              flex-row
              items-center
              justify-between
              p-6
              border-b
              border-surface
            "
          >
            {/* TITLE */}

            <View>
              <Text
                className="
                  text-text-primary
                  text-2xl
                  font-bold
                "
              >
                Select Address
              </Text>

              <Text
                className="
                  text-text-secondary
                  text-sm
                  mt-1
                "
              >
                Choose delivery address
              </Text>
            </View>

            {/* CLOSE BTN */}

            <TouchableOpacity
              onPress={
                onClose
              }
              className="
                bg-surface
                rounded-full
                p-2
              "
              activeOpacity={
                0.7
              }
            >
              <Ionicons
                name="close"
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          {/* =================================================
             ADDRESSES LIST
          ================================================= */}

          <ScrollView
            className="flex-1"
            contentContainerStyle={{
              padding: 24,

              paddingBottom: 40,
            }}
            showsVerticalScrollIndicator={
              false
            }
          >
            {/* =============================================
               LOADING
            ============================================= */}

            {addressesLoading ? (
              <View className="py-16 items-center">
                <ActivityIndicator
                  size="large"
                  color="#1DB954"
                />

                <Text className="text-text-secondary mt-4">
                  Loading addresses...
                </Text>
              </View>
            ) : isError ? (
              /* ===========================================
                 ERROR
              =========================================== */

              <View className="py-16 items-center">
                <Ionicons
                  name="alert-circle-outline"
                  size={64}
                  color="#EF4444"
                />

                <Text className="text-text-primary text-xl font-bold mt-4">
                  Failed to load
                  addresses
                </Text>

                <Text className="text-text-secondary text-center mt-2">
                  Please try again
                </Text>
              </View>
            ) : !addresses?.length ? (
              /* ===========================================
                 EMPTY
              =========================================== */

              <View className="py-16 items-center">
                <Ionicons
                  name="location-outline"
                  size={64}
                  color="#666"
                />

                <Text className="text-text-primary text-xl font-bold mt-4">
                  No addresses
                  found
                </Text>

                <Text className="text-text-secondary text-center mt-2">
                  Add an address
                  before checkout
                </Text>
              </View>
            ) : (
              /* ===========================================
                 ADDRESS CARDS
              =========================================== */

              <View className="gap-4">
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
                        className={`rounded-3xl p-6 border-2 ${
                          isSelected
                            ? "border-primary bg-primary/10"
                            : "border-surface bg-surface"
                        }`}
                        activeOpacity={
                          0.8
                        }
                        onPress={() =>
                          setSelectedAddress(
                            address
                          )
                        }
                      >
                        <View className="flex-row items-start justify-between">
                          {/* LEFT */}

                          <View className="flex-1">
                            {/* LABEL */}

                            <View className="flex-row items-center mb-3 flex-wrap">
                              <Text className="text-primary font-bold text-lg mr-2">
                                {address.label ||
                                  "Address"}
                              </Text>

                              {/* DEFAULT */}

                              {address.isDefault && (
                                <View
                                  className="
                                    bg-primary/20
                                    rounded-full
                                    px-3
                                    py-1
                                  "
                                >
                                  <Text
                                    className="
                                      text-primary
                                      text-xs
                                      font-semibold
                                    "
                                  >
                                    Default
                                  </Text>
                                </View>
                              )}
                            </View>

                            {/* NAME */}

                            <Text className="text-text-primary font-semibold text-lg mb-2">
                              {
                                address.fullName
                              }
                            </Text>

                            {/* STREET */}

                            <Text className="text-text-secondary text-base leading-6 mb-1">
                              {
                                address.streetAddress
                              }
                            </Text>

                            {/* CITY */}

                            <Text className="text-text-secondary text-base mb-2">
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

                            <Text className="text-text-secondary text-base">
                              {
                                address.phoneNumber
                              }
                            </Text>
                          </View>

                          {/* CHECKMARK */}

                          {isSelected && (
                            <View
                              className="
                                bg-primary
                                rounded-full
                                p-2
                                ml-3
                              "
                            >
                              <Ionicons
                                name="checkmark"
                                size={22}
                                color="#121212"
                              />
                            </View>
                          )}
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
              p-6
              border-t
              border-surface
            "
          >
            <TouchableOpacity
              className={`rounded-2xl py-5 ${
                selectedAddress
                  ? "bg-primary"
                  : "bg-surface"
              }`}
              activeOpacity={0.9}
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
            >
              <View
                className="
                  flex-row
                  items-center
                  justify-center
                "
              >
                {isProcessing ? (
                  <ActivityIndicator
                    size="small"
                    color="#121212"
                  />
                ) : (
                  <>
                    <Text
                      className={`
                        font-bold
                        text-lg
                        mr-2
                        ${
                          selectedAddress
                            ? "text-background"
                            : "text-text-secondary"
                        }
                      `}
                    >
                      Continue to
                      Payment
                    </Text>

                    <Ionicons
                      name="arrow-forward"
                      size={20}
                      color={
                        selectedAddress
                          ? "#121212"
                          : "#666"
                      }
                    />
                  </>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddressSelectionModal;