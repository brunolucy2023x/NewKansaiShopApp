import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { Address } from "@/types";

/* =========================================================
   TYPES
========================================================= */

interface AddressCardProps {
  address: Address;

  onEdit: (
    address: Address
  ) => void;

  onDelete: (
    addressId: string,
    label: string
  ) => void;

  isUpdatingAddress: boolean;

  isDeletingAddress: boolean;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function AddressCard({
  address,

  onEdit,

  onDelete,

  isUpdatingAddress,

  isDeletingAddress,
}: AddressCardProps) {
  return (
    <View
      className="
        bg-surface
        rounded-3xl
        p-5
        mb-3
        border
        border-border
      "
    >
      {/* =================================================
         HEADER
      ================================================= */}

      <View className="flex-row items-center justify-between mb-4">
        {/* LEFT */}

        <View className="flex-row items-center flex-1">
          {/* ICON */}

          <View
            className="
              bg-primary/20
              rounded-full
              w-12
              h-12
              items-center
              justify-center
              mr-3
            "
          >
            <Ionicons
              name="location"
              size={24}
              color="#1DB954"
            />
          </View>

          {/* LABEL */}

          <View className="flex-1">
            <Text
              className="
                text-text-primary
                font-bold
                text-lg
              "
              numberOfLines={1}
            >
              {address.label ||
                "Address"}
            </Text>

            <Text className="text-text-secondary text-xs mt-1">
              Shipping Address
            </Text>
          </View>
        </View>

        {/* DEFAULT BADGE */}

        {address.isDefault && (
          <View
            className="
              bg-primary
              px-3
              py-1
              rounded-full
            "
          >
            <Text
              className="
                text-background
                text-xs
                font-bold
              "
            >
              Default
            </Text>
          </View>
        )}
      </View>

      {/* =================================================
         ADDRESS INFO
      ================================================= */}

      <View className="ml-[60px]">
        {/* NAME */}

        <Text
          className="
            text-text-primary
            font-semibold
            mb-1
          "
        >
          {
            address.fullName
          }
        </Text>

        {/* STREET */}

        <Text
          className="
            text-text-secondary
            text-sm
            mb-1
          "
        >
          {
            address.streetAddress
          }
        </Text>

        {/* CITY */}

        <Text
          className="
            text-text-secondary
            text-sm
            mb-2
          "
        >
          {address.city},{" "}
          {address.state}{" "}
          {
            address.zipCode
          }
        </Text>

        {/* PHONE */}

        <Text
          className="
            text-text-secondary
            text-sm
          "
        >
          {
            address.phoneNumber
          }
        </Text>
      </View>

      {/* =================================================
         ACTIONS
      ================================================= */}

      <View className="flex-row mt-5 gap-3">
        {/* EDIT */}

        <TouchableOpacity
          className="
            flex-1
            bg-primary/20
            py-3
            rounded-2xl
            items-center
            justify-center
          "
          activeOpacity={0.7}
          onPress={() =>
            onEdit(address)
          }
          disabled={
            isUpdatingAddress
          }
        >
          {isUpdatingAddress ? (
            <ActivityIndicator
              size="small"
              color="#1DB954"
            />
          ) : (
            <Text
              className="
                text-primary
                font-bold
              "
            >
              Edit
            </Text>
          )}
        </TouchableOpacity>

        {/* DELETE */}

        <TouchableOpacity
          className="
            flex-1
            bg-red-500/20
            py-3
            rounded-2xl
            items-center
            justify-center
          "
          activeOpacity={0.7}
          onPress={() =>
            onDelete(
              address.id || "",
              address.label ||
                "Address"
            )
          }
          disabled={
            isDeletingAddress
          }
        >
          {isDeletingAddress ? (
            <ActivityIndicator
              size="small"
              color="#EF4444"
            />
          ) : (
            <Text
              className="
                text-red-500
                font-bold
              "
            >
              Delete
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}