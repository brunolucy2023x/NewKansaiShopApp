// mobile/app/order-success.tsx

import SafeScreen from "@/components/SafeScreen";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  router,
} from "expo-router";

export default function OrderSuccessScreen() {
  return (
    <SafeScreen>
      <View
        className="
          flex-1
          bg-white
          justify-center
          items-center
          px-6
        "
      >
        {/* =====================================
            SUCCESS ICON
        ===================================== */}

        <View
          className="
            w-32
            h-32
            rounded-full
            bg-green-100
            items-center
            justify-center
          "
        >
          <Ionicons
            name="checkmark"
            size={72}
            color="#16A34A"
          />
        </View>

        {/* =====================================
            TITLE
        ===================================== */}

        <Text
          className="
            text-3xl
            font-black
            mt-8
            text-center
          "
        >
          Order Placed Successfully 🎉
        </Text>

        <Text
          className="
            text-gray-500
            text-center
            mt-4
            leading-6
          "
        >
          Thank you for shopping with
          PaintHub. Your order has been
          received and is being processed.
        </Text>

        {/* =====================================
            INFO CARDS
        ===================================== */}

        <View
          className="
            w-full
            mt-10
          "
        >
          <View
            className="
              bg-gray-50
              rounded-3xl
              p-5
              mb-4
            "
          >
            <Text
              className="
                font-black
              "
            >
              ✓ Order Confirmed
            </Text>

            <Text
              className="
                text-gray-500
                mt-2
              "
            >
              We have received your order.
            </Text>
          </View>

          <View
            className="
              bg-gray-50
              rounded-3xl
              p-5
              mb-4
            "
          >
            <Text
              className="
                font-black
              "
            >
              🚚 Delivery
            </Text>

            <Text
              className="
                text-gray-500
                mt-2
              "
            >
              Expected delivery within
              1 - 3 business days.
            </Text>
          </View>

          <View
            className="
              bg-gray-50
              rounded-3xl
              p-5
            "
          >
            <Text
              className="
                font-black
              "
            >
              📞 Need Help?
            </Text>

            <Text
              className="
                text-gray-500
                mt-2
              "
            >
              Contact our support team
              for any questions regarding
              your order.
            </Text>
          </View>
        </View>

        {/* =====================================
            ACTION BUTTONS
        ===================================== */}

        <View
          className="
            w-full
            mt-10
          "
        >
          <TouchableOpacity
            className="
              bg-[#D9F26A]
              rounded-3xl
              py-5
              items-center
            "
            onPress={() =>
              router.replace("/")
            }
          >
            <Text
              className="
                font-black
                text-lg
              "
            >
              Continue Shopping
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="
              mt-4
              border
              border-gray-200
              rounded-3xl
              py-5
              items-center
            "
            onPress={() =>
              router.push("/orders")
            }
          >
            <Text
              className="
                font-black
              "
            >
              View My Orders
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeScreen>
  );
}