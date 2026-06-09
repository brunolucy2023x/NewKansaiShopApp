import {
  View,
  Text,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

/* =========================================================
   TYPES
========================================================= */

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function OrderSummary({
  subtotal,
  shipping,
  tax,
  total,
}: OrderSummaryProps) {
  const savings =
    subtotal * 0.08;

  return (
    <View className="px-5 mt-6 mb-8">
      <View
        className="
          bg-[#F3F4F6]
          rounded-[34px]
          p-6
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

        <View className="flex-row items-center justify-between mb-7">
          <View>
            <Text
              className="
                text-black
                text-[28px]
                font-black
              "
            >
              Order Summary
            </Text>

            <Text
              className="
                text-[#6B7280]
                mt-1
                text-sm
              "
            >
              Review your payment details
            </Text>
          </View>

          <View
            className="
              w-14
              h-14
              rounded-3xl
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

        {/* =================================================
           SUMMARY ITEMS
        ================================================= */}

        <View className="gap-5">
          {/* SUBTOTAL */}

          <SummaryRow
            label="Subtotal"
            value={`$${subtotal.toFixed(
              2
            )}`}
          />

          {/* SHIPPING */}

          <View
            className="
              flex-row
              justify-between
              items-center
            "
          >
            <Text
              className="
                text-[#6B7280]
                text-[15px]
                font-medium
              "
            >
              Shipping
            </Text>

            {shipping === 0 ? (
              <View
                className="
                  bg-[#D9F26A]
                  px-4
                  py-2
                  rounded-full
                  flex-row
                  items-center
                "
              >
                <Ionicons
                  name="checkmark-circle"
                  size={15}
                  color="#111"
                />

                <Text
                  className="
                    text-black
                    font-bold
                    text-xs
                    ml-1
                  "
                >
                  Free Delivery
                </Text>
              </View>
            ) : (
              <Text
                className="
                  text-black
                  font-bold
                  text-[16px]
                "
              >
                $
                {shipping.toFixed(
                  2
                )}
              </Text>
            )}
          </View>

          {/* TAX */}

          <SummaryRow
            label="Tax"
            value={`$${tax.toFixed(
              2
            )}`}
          />

          {/* SAVINGS */}

          <View
            className="
              flex-row
              justify-between
              items-center
            "
          >
            <Text
              className="
                text-[#6B7280]
                text-[15px]
                font-medium
              "
            >
              Savings
            </Text>

            <Text
              className="
                text-[#22C55E]
                font-black
                text-[16px]
              "
            >
              -$
              {savings.toFixed(
                2
              )}
            </Text>
          </View>

          {/* =================================================
             DIVIDER
          ================================================= */}

          <View
            className="
              h-[1px]
              bg-[#E5E7EB]
              my-2
            "
          />

          {/* =================================================
             TOTAL
          ================================================= */}

          <View
            className="
              flex-row
              items-end
              justify-between
            "
          >
            <View>
              <Text
                className="
                  text-black
                  text-[22px]
                  font-black
                "
              >
                Total Payment
              </Text>

              <Text
                className="
                  text-[#6B7280]
                  text-sm
                  mt-1
                "
              >
                Including VAT & taxes
              </Text>
            </View>

            <Text
              className="
                text-black
                text-[38px]
                font-black
              "
            >
              $
              {total.toFixed(
                2
              )}
            </Text>
          </View>

          {/* =================================================
             SECURITY CARD
          ================================================= */}

          <View
            className="
              mt-5
              bg-white
              rounded-[26px]
              p-4
              flex-row
              items-center
            "
          >
            {/* ICON */}

            <View
              className="
                w-12
                h-12
                rounded-full
                bg-[#D9F26A]
                items-center
                justify-center
              "
            >
              <Ionicons
                name="shield-checkmark"
                size={20}
                color="#111"
              />
            </View>

            {/* TEXT */}

            <View className="ml-4 flex-1">
              <Text
                className="
                  text-black
                  font-bold
                  text-[15px]
                "
              >
                Secure Checkout
              </Text>

              <Text
                className="
                  text-[#6B7280]
                  text-xs
                  mt-1
                  leading-5
                "
              >
                Your payment information is
                encrypted and protected.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

/* =========================================================
   SUMMARY ROW
========================================================= */

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View
      className="
        flex-row
        justify-between
        items-center
      "
    >
      <Text
        className="
          text-[#6B7280]
          text-[15px]
          font-medium
        "
      >
        {label}
      </Text>

      <Text
        className="
          text-black
          font-bold
          text-[16px]
        "
      >
        {value}
      </Text>
    </View>
  );
}