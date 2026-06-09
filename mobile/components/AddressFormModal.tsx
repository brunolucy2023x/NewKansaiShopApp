import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";

import SafeScreen from "./SafeScreen";

import { Ionicons } from "@expo/vector-icons";

/* =========================================================
   TYPES
========================================================= */

interface AddressFormData {
  label: string;

  fullName: string;

  streetAddress: string;

  city: string;

  state: string;

  zipCode: string;

  phoneNumber: string;

  isDefault: boolean;
}

interface AddressFormModalProps {
  visible: boolean;

  isEditing: boolean;

  addressForm: AddressFormData;

  isAddingAddress: boolean;

  isUpdatingAddress: boolean;

  onClose: () => void;

  onSave: () => void;

  onFormChange: (
    form: AddressFormData
  ) => void;
}

/* =========================================================
   COMPONENT
========================================================= */

const AddressFormModal = ({
  addressForm,

  isAddingAddress,

  isEditing,

  isUpdatingAddress,

  onClose,

  onFormChange,

  onSave,

  visible,
}: AddressFormModalProps) => {
  /* =====================================================
     VALIDATION
  ===================================================== */

  const validateForm = () => {
    if (
      !addressForm.label.trim()
    ) {
      Alert.alert(
        "Validation Error",
        "Please enter address label"
      );

      return false;
    }

    if (
      !addressForm.fullName.trim()
    ) {
      Alert.alert(
        "Validation Error",
        "Please enter full name"
      );

      return false;
    }

    if (
      !addressForm.streetAddress.trim()
    ) {
      Alert.alert(
        "Validation Error",
        "Please enter street address"
      );

      return false;
    }

    if (
      !addressForm.city.trim()
    ) {
      Alert.alert(
        "Validation Error",
        "Please enter city"
      );

      return false;
    }

    if (
      !addressForm.state.trim()
    ) {
      Alert.alert(
        "Validation Error",
        "Please enter state"
      );

      return false;
    }

    if (
      !addressForm.phoneNumber.trim()
    ) {
      Alert.alert(
        "Validation Error",
        "Please enter phone number"
      );

      return false;
    }

    return true;
  };

  /* =====================================================
     SAVE
  ===================================================== */

  const handleSave = () => {
    if (!validateForm())
      return;

    onSave();
  };

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
      <KeyboardAvoidingView
        behavior={
          Platform.OS ===
          "ios"
            ? "padding"
            : "height"
        }
        className="flex-1"
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
                  height: "92%",
                }}
              >
                <SafeScreen>
                  {/* =================================================
                     HANDLE
                  ================================================= */}

                  <View className="items-center pt-2">
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
                      pb-4
                      flex-row
                      items-center
                      justify-between
                    "
                  >
                    {/* LEFT */}

                    <View className="flex-1 pr-4">
                      <Text
                        className="
                          text-black
                          text-[30px]
                          font-black
                        "
                      >
                        {isEditing
                          ? "Edit Address"
                          : "New Address"}
                      </Text>

                      <Text
                        className="
                          text-[#6B7280]
                          text-sm
                          mt-1
                        "
                      >
                        {isEditing
                          ? "Update your delivery address"
                          : "Add a new delivery address"}
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
                     FORM
                  ================================================= */}

                  <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={
                      false
                    }
                    contentContainerStyle={{
                      paddingHorizontal: 24,
                      paddingBottom: 40,
                    }}
                  >
                    {/* LABEL */}

                    <InputField
                      label="Address Label"
                      placeholder="Home, Office..."
                      value={
                        addressForm.label
                      }
                      onChangeText={(
                        text
                      ) =>
                        onFormChange({
                          ...addressForm,
                          label: text,
                        })
                      }
                    />

                    {/* FULL NAME */}

                    <InputField
                      label="Full Name"
                      placeholder="Enter your full name"
                      value={
                        addressForm.fullName
                      }
                      onChangeText={(
                        text
                      ) =>
                        onFormChange({
                          ...addressForm,
                          fullName:
                            text,
                        })
                      }
                    />

                    {/* STREET */}

                    <InputField
                      label="Street Address"
                      placeholder="Street address"
                      multiline
                      value={
                        addressForm.streetAddress
                      }
                      onChangeText={(
                        text
                      ) =>
                        onFormChange({
                          ...addressForm,
                          streetAddress:
                            text,
                        })
                      }
                    />

                    {/* CITY */}

                    <InputField
                      label="City"
                      placeholder="Enter city"
                      value={
                        addressForm.city
                      }
                      onChangeText={(
                        text
                      ) =>
                        onFormChange({
                          ...addressForm,
                          city: text,
                        })
                      }
                    />

                    {/* STATE */}

                    <InputField
                      label="State"
                      placeholder="Enter state"
                      value={
                        addressForm.state
                      }
                      onChangeText={(
                        text
                      ) =>
                        onFormChange({
                          ...addressForm,
                          state: text,
                        })
                      }
                    />

                    {/* ZIP */}

                    <InputField
                      label="ZIP Code"
                      placeholder="10001"
                      keyboardType="numeric"
                      value={
                        addressForm.zipCode
                      }
                      onChangeText={(
                        text
                      ) =>
                        onFormChange({
                          ...addressForm,
                          zipCode:
                            text,
                        })
                      }
                    />

                    {/* PHONE */}

                    <InputField
                      label="Phone Number"
                      placeholder="+254..."
                      keyboardType="phone-pad"
                      value={
                        addressForm.phoneNumber
                      }
                      onChangeText={(
                        text
                      ) =>
                        onFormChange({
                          ...addressForm,
                          phoneNumber:
                            text,
                        })
                      }
                    />

                    {/* =================================================
                       DEFAULT SWITCH
                    ================================================= */}

                    <View
                      className="
                        bg-[#F3F4F6]
                        rounded-[28px]
                        p-5
                        flex-row
                        items-center
                        justify-between
                        mt-2
                        mb-8
                      "
                    >
                      <View className="flex-1 pr-4">
                        <Text
                          className="
                            text-black
                            font-black
                            text-[16px]
                          "
                        >
                          Set as default
                        </Text>

                        <Text
                          className="
                            text-[#6B7280]
                            text-sm
                            mt-1
                            leading-6
                          "
                        >
                          Use this address for future
                          orders and deliveries.
                        </Text>
                      </View>

                      <Switch
                        value={
                          addressForm.isDefault
                        }
                        onValueChange={(
                          value
                        ) =>
                          onFormChange({
                            ...addressForm,
                            isDefault:
                              value,
                          })
                        }
                        trackColor={{
                          false:
                            "#D1D5DB",
                          true:
                            "#D9F26A",
                        }}
                        thumbColor="#FFFFFF"
                      />
                    </View>

                    {/* =================================================
                       SAVE BUTTON
                    ================================================= */}

                    <TouchableOpacity
                      activeOpacity={
                        0.9
                      }
                      onPress={
                        handleSave
                      }
                      disabled={
                        isAddingAddress ||
                        isUpdatingAddress
                      }
                      className="
                        bg-[#D9F26A]
                        rounded-[28px]
                        py-5
                        items-center
                        justify-center
                        mb-8
                      "
                    >
                      {isAddingAddress ||
                      isUpdatingAddress ? (
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
                          <Ionicons
                            name={
                              isEditing
                                ? "checkmark"
                                : "add"
                            }
                            size={20}
                            color="#111"
                          />

                          <Text
                            className="
                              text-black
                              font-black
                              text-[17px]
                              ml-3
                            "
                          >
                            {isEditing
                              ? "Save Changes"
                              : "Add Address"}
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  </ScrollView>
                </SafeScreen>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddressFormModal;

/* =========================================================
   INPUT FIELD
========================================================= */

interface InputFieldProps {
  label: string;

  placeholder: string;

  value: string;

  onChangeText: (
    text: string
  ) => void;

  multiline?: boolean;

  keyboardType?: any;
}

function InputField({
  label,

  placeholder,

  value,

  onChangeText,

  multiline = false,

  keyboardType = "default",
}: InputFieldProps) {
  return (
    <View className="mb-5">
      {/* LABEL */}

      <Text
        className="
          text-black
          font-bold
          text-[15px]
          mb-3
        "
      >
        {label}
      </Text>

      {/* INPUT */}

      <TextInput
        className="
          bg-[#F3F4F6]
          text-black
          px-5
          py-5
          rounded-[24px]
          text-[15px]
        "
        placeholder={
          placeholder
        }
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={
          onChangeText
        }
        multiline={multiline}
        keyboardType={
          keyboardType
        }
        style={{
          minHeight:
            multiline
              ? 120
              : undefined,

          textAlignVertical:
            multiline
              ? "top"
              : "center",
        }}
      />
    </View>
  );
}