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
        bg-[#F3F4F6]
        rounded-[34px]
        p-5
        mb-5
      "
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
      }}
    >
      {/* =================================================
         HEADER
      ================================================= */}

      <View
        className="
          flex-row
          items-start
          justify-between
        "
      >
        {/* LEFT */}

        <View className="flex-row flex-1 pr-4">
          {/* ICON */}

          <View
            className="
              w-14
              h-14
              rounded-[20px]
              bg-[#D9F26A]
              items-center
              justify-center
              mr-4
            "
          >
            <Ionicons
              name="location"
              size={24}
              color="#111"
            />
          </View>

          {/* TEXT */}

          <View className="flex-1">
            {/* LABEL */}

            <View
              className="
                flex-row
                items-center
                flex-wrap
                mb-2
              "
            >
              <Text
                numberOfLines={1}
                className="
                  text-black
                  text-[20px]
                  font-black
                  mr-2
                "
              >
                {address.label ||
                  "Shipping Address"}
              </Text>

              {address.isDefault && (
                <View
                  className="
                    bg-black
                    px-3
                    py-1
                    rounded-full
                  "
                >
                  <Text
                    className="
                      text-[#D9F26A]
                      text-[10px]
                      font-black
                    "
                  >
                    DEFAULT
                  </Text>
                </View>
              )}
            </View>

            {/* SUBTEXT */}

            <Text
              className="
                text-[#6B7280]
                text-sm
              "
            >
              Delivery destination
            </Text>
          </View>
        </View>
      </View>

      {/* =================================================
         ADDRESS CONTENT
      ================================================= */}

      <View className="mt-6">
        {/* NAME */}

        <Text
          className="
            text-black
            text-[17px]
            font-black
            mb-3
          "
        >
          {address.fullName}
        </Text>

        {/* STREET */}

        <Text
          className="
            text-[#4B5563]
            text-[15px]
            leading-7
          "
        >
          {address.streetAddress}
        </Text>

        {/* CITY */}

        <Text
          className="
            text-[#6B7280]
            text-[15px]
            mt-2
            leading-7
          "
        >
          {address.city},{" "}
          {address.state}{" "}
          {address.zipCode}
        </Text>

        {/* PHONE */}

        <View
          className="
            flex-row
            items-center
            mt-5
          "
        >
          <View
            className="
              w-10
              h-10
              rounded-full
              bg-white
              items-center
              justify-center
              mr-3
            "
          >
            <Ionicons
              name="call-outline"
              size={18}
              color="#111"
            />
          </View>

          <Text
            className="
              text-[#374151]
              text-sm
              font-semibold
            "
          >
            {address.phoneNumber}
          </Text>
        </View>
      </View>

      {/* =================================================
         DIVIDER
      ================================================= */}

      <View
        className="
          h-[1px]
          bg-[#E5E7EB]
          my-6
        "
      />

      {/* =================================================
         ACTIONS
      ================================================= */}

      <View className="flex-row gap-4">
        {/* EDIT */}

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            onEdit(address)
          }
          disabled={
            isUpdatingAddress
          }
          className="
            flex-1
            bg-[#D9F26A]
            py-4
            rounded-[24px]
            items-center
            justify-center
            flex-row
          "
        >
          {isUpdatingAddress ? (
            <ActivityIndicator
              size="small"
              color="#111"
            />
          ) : (
            <>
              <Ionicons
                name="create-outline"
                size={18}
                color="#111"
              />

              <Text
                className="
                  text-black
                  font-black
                  text-[15px]
                  ml-2
                "
              >
                Edit
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* DELETE */}

        <TouchableOpacity
          activeOpacity={0.9}
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
          className="
            flex-1
            bg-white
            py-4
            rounded-[24px]
            items-center
            justify-center
            flex-row
          "
        >
          {isDeletingAddress ? (
            <ActivityIndicator
              size="small"
              color="#EF4444"
            />
          ) : (
            <>
              <Ionicons
                name="trash-outline"
                size={18}
                color="#EF4444"
              />

              <Text
                className="
                  text-[#EF4444]
                  font-black
                  text-[15px]
                  ml-2
                "
              >
                Remove
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}