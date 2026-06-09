import SafeScreen from "@/components/SafeScreen";

import {
  useAddresses,
} from "@/hooks/useAddressess";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
  ActivityIndicator,
} from "react-native";

import {
  useState,
} from "react";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  router,
} from "expo-router";

export default function AddressesScreen() {
  const {
    addresses,

    addAddress,

    deleteAddress,

    isLoading,

    isAddingAddress,

    isDeletingAddress,
  } = useAddresses();

  const [
    showForm,
    setShowForm,
  ] = useState(false);

  const [
    label,
    setLabel,
  ] = useState("");

  const [
    fullName,
    setFullName,
  ] = useState("");

  const [
    streetAddress,
    setStreetAddress,
  ] = useState("");

  const [
    city,
    setCity,
  ] = useState("");

  const [
    state,
    setState,
  ] = useState("");

  const [
    zipCode,
    setZipCode,
  ] = useState("");

  const [
    phoneNumber,
    setPhoneNumber,
  ] = useState("");

  const [
    isDefault,
    setIsDefault,
  ] = useState(true);

  const resetForm =
    () => {
      setLabel("");

      setFullName("");

      setStreetAddress("");

      setCity("");

      setState("");

      setZipCode("");

      setPhoneNumber("");

      setIsDefault(true);
    };

  const handleSave =
    () => {
      if (
        !label ||
        !fullName ||
        !streetAddress ||
        !city ||
        !state ||
        !zipCode ||
        !phoneNumber
      ) {
        Alert.alert(
          "Missing Fields",
          "Please fill all fields."
        );

        return;
      }

      addAddress(
        {
          label,

          fullName,

          streetAddress,

          city,

          state,

          zipCode,

          phoneNumber,

          isDefault,
        },

        {
          onSuccess: () => {
            Alert.alert(
              "Success",
              "Address saved successfully."
            );

            resetForm();

            setShowForm(false);
          },

          onError: (
            error: any
          ) => {
            Alert.alert(
              "Error",
              error.message
            );
          },
        }
      );
    };

  return (
    <SafeScreen>
      <View className="flex-1 bg-white">
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

          <View className="ml-4">
            <Text
              className="
                text-2xl
                font-black
              "
            >
              Addresses
            </Text>

            <Text
              className="
                text-gray-500
              "
            >
              Manage delivery locations
            </Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={{
            paddingBottom: 150,
          }}
        >
          {/* =====================================
              ADD BUTTON
          ===================================== */}

          <TouchableOpacity
            onPress={() =>
              setShowForm(
                !showForm
              )
            }
            className="
              mx-5
              mt-6
              bg-[#D9F26A]
              rounded-3xl
              py-5
              items-center
            "
          >
            <Text
              className="
                font-black
                text-lg
              "
            >
              + Add Address
            </Text>
          </TouchableOpacity>

          {/* =====================================
              FORM
          ===================================== */}

          {showForm && (
            <View
              className="
                mx-5
                mt-5
                bg-gray-50
                rounded-3xl
                p-5
              "
            >
              <Input
                placeholder="Label (Home, Office)"
                value={label}
                onChangeText={
                  setLabel
                }
              />

              <Input
                placeholder="Full Name"
                value={fullName}
                onChangeText={
                  setFullName
                }
              />

              <Input
                placeholder="Street Address"
                value={
                  streetAddress
                }
                onChangeText={
                  setStreetAddress
                }
              />

              <Input
                placeholder="City"
                value={city}
                onChangeText={
                  setCity
                }
              />

              <Input
                placeholder="County / State"
                value={state}
                onChangeText={
                  setState
                }
              />

              <Input
                placeholder="Postal Code"
                value={zipCode}
                onChangeText={
                  setZipCode
                }
              />

              <Input
                placeholder="Phone Number"
                value={
                  phoneNumber
                }
                onChangeText={
                  setPhoneNumber
                }
                keyboardType="phone-pad"
              />

              <View
                className="
                  flex-row
                  justify-between
                  items-center
                  mt-4
                "
              >
                <Text
                  className="
                    font-semibold
                  "
                >
                  Default Address
                </Text>

                <Switch
                  value={
                    isDefault
                  }
                  onValueChange={
                    setIsDefault
                  }
                />
              </View>

              <TouchableOpacity
                onPress={
                  handleSave
                }
                disabled={
                  isAddingAddress
                }
                className="
                  bg-black
                  rounded-2xl
                  py-4
                  items-center
                  mt-6
                "
              >
                {isAddingAddress ? (
                  <ActivityIndicator
                    color="#fff"
                  />
                ) : (
                  <Text
                    className="
                      text-white
                      font-black
                    "
                  >
                    Save Address
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* =====================================
              SAVED ADDRESSES
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
                mb-4
              "
            >
              Saved Addresses
            </Text>

            {isLoading ? (
              <ActivityIndicator />
            ) : addresses
                .length === 0 ? (
              <Text
                className="
                  text-gray-500
                "
              >
                No addresses found.
              </Text>
            ) : (
              addresses.map(
                (
                  address: any
                ) => (
                  <View
                    key={
                      address.id
                    }
                    className="
                      bg-gray-50
                      rounded-3xl
                      p-5
                      mb-4
                    "
                  >
                    <View
                      className="
                        flex-row
                        justify-between
                      "
                    >
                      <Text
                        className="
                          font-black
                        "
                      >
                        {
                          address.label
                        }
                      </Text>

                      {address.isDefault && (
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
                      )}
                    </View>

                    <Text
                      className="
                        mt-3
                        font-semibold
                      "
                    >
                      {
                        address.fullName
                      }
                    </Text>

                    <Text
                      className="
                        mt-1
                        text-gray-600
                      "
                    >
                      {
                        address.streetAddress
                      }
                    </Text>

                    <Text
                      className="
                        text-gray-600
                      "
                    >
                      {
                        address.city
                      }
                      ,{" "}
                      {
                        address.state
                      }
                    </Text>

                    <Text
                      className="
                        mt-2
                      "
                    >
                      {
                        address.phoneNumber
                      }
                    </Text>

                    <TouchableOpacity
                      onPress={() =>
                        deleteAddress(
                          address.id
                        )
                      }
                      disabled={
                        isDeletingAddress
                      }
                      className="
                        mt-4
                      "
                    >
                      <Text
                        className="
                          text-red-500
                          font-bold
                        "
                      >
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
              )
            )}
          </View>
        </ScrollView>
      </View>
    </SafeScreen>
  );
}

function Input({
  ...props
}: any) {
  return (
    <TextInput
      {...props}
      className="
        bg-white
        border
        border-gray-200
        rounded-2xl
        px-4
        py-4
        mt-3
      "
    />
  );
}