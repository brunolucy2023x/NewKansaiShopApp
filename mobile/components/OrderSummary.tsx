import {
  View,
  Text,
} from "react-native";

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
  return (
    <View className="px-6 mt-6">
      <View
        className="
          bg-surface
          rounded-3xl
          p-5
          border
          border-border
        "
      >
        {/* =================================================
           HEADER
        ================================================= */}

        <Text
          className="
            text-text-primary
            text-xl
            font-bold
            mb-5
          "
        >
          Order Summary
        </Text>

        {/* =================================================
           SUMMARY ITEMS
        ================================================= */}

        <View className="gap-4">
          {/* SUBTOTAL */}

          <View
            className="
              flex-row
              justify-between
              items-center
            "
          >
            <Text
              className="
                text-text-secondary
                text-base
              "
            >
              Subtotal
            </Text>

            <Text
              className="
                text-text-primary
                font-semibold
                text-base
              "
            >
              $
              {subtotal.toFixed(
                2
              )}
            </Text>
          </View>

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
                text-text-secondary
                text-base
              "
            >
              Shipping
            </Text>

            <Text
              className="
                text-text-primary
                font-semibold
                text-base
              "
            >
              {shipping ===
              0 ? (
                <Text className="text-green-500">
                  Free
                </Text>
              ) : (
                `$${shipping.toFixed(
                  2
                )}`
              )}
            </Text>
          </View>

          {/* TAX */}

          <View
            className="
              flex-row
              justify-between
              items-center
            "
          >
            <Text
              className="
                text-text-secondary
                text-base
              "
            >
              Tax
            </Text>

            <Text
              className="
                text-text-primary
                font-semibold
                text-base
              "
            >
              $
              {tax.toFixed(2)}
            </Text>
          </View>

          {/* =================================================
             DIVIDER
          ================================================= */}

          <View
            className="
              border-t
              border-border
              pt-4
              mt-1
            "
          />

          {/* =================================================
             TOTAL
          ================================================= */}

          <View
            className="
              flex-row
              justify-between
              items-center
            "
          >
            <View>
              <Text
                className="
                  text-text-primary
                  font-bold
                  text-lg
                "
              >
                Total
              </Text>

              <Text
                className="
                  text-text-secondary
                  text-xs
                  mt-1
                "
              >
                Including taxes
              </Text>
            </View>

            <Text
              className="
                text-primary
                font-bold
                text-3xl
              "
            >
              $
              {total.toFixed(
                2
              )}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}