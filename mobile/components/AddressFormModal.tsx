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
      animationType="slide"
      transparent
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
        <SafeScreen>
          {/* =================================================
             HEADER
          ================================================= */}

          <View
            className="
              px-6
              py-5
              border-b
              border-surface
              flex-row
              items-center
              justify-between
            "
          >
            {/* TITLE */}

            <View className="flex-1">
              <Text
                className="
                  text-text-primary
                  text-2xl
                  font-bold
                "
              >
                {isEditing
                  ? "Edit Address"
                  : "Add New Address"}
              </Text>

              <Text
                className="
                  text-text-secondary
                  text-sm
                  mt-1
                "
              >
                {isEditing
                  ? "Update your delivery address"
                  : "Add a new delivery address"}
              </Text>
            </View>

            {/* CLOSE BTN */}

            <TouchableOpacity
              onPress={
                onClose
              }
              className="
                bg-surface
                w-11
                h-11
                rounded-full
                items-center
                justify-center
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
             FORM
          ================================================= */}

          <ScrollView
            className="flex-1"
            contentContainerStyle={{
              paddingBottom: 50,
            }}
            showsVerticalScrollIndicator={
              false
            }
          >
            <View className="p-6">
              {/* =============================================
                 LABEL
              ============================================= */}

              <InputField
                label="Label"
                placeholder="e.g. Home, Office"
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

              {/* =============================================
                 FULL NAME
              ============================================= */}

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

              {/* =============================================
                 STREET ADDRESS
              ============================================= */}

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

              {/* =============================================
                 CITY
              ============================================= */}

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

              {/* =============================================
                 STATE
              ============================================= */}

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

              {/* =============================================
                 ZIP CODE
              ============================================= */}

              <InputField
                label="ZIP Code"
                placeholder="e.g. 10001"
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

              {/* =============================================
                 PHONE
              ============================================= */}

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

              {/* =============================================
                 DEFAULT SWITCH
              ============================================= */}

              <View
                className="
                  bg-surface
                  rounded-2xl
                  p-4
                  flex-row
                  items-center
                  justify-between
                  mb-6
                "
              >
                <View>
                  <Text
                    className="
                      text-text-primary
                      font-semibold
                    "
                  >
                    Set as default
                  </Text>

                  <Text
                    className="
                      text-text-secondary
                      text-xs
                      mt-1
                    "
                  >
                    Use this address by default
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
                  thumbColor="#FFFFFF"
                />
              </View>

              {/* =============================================
                 SAVE BTN
              ============================================= */}

              <TouchableOpacity
                className="
                  bg-primary
                  rounded-2xl
                  py-5
                  items-center
                  justify-center
                "
                activeOpacity={
                  0.8
                }
                onPress={
                  handleSave
                }
                disabled={
                  isAddingAddress ||
                  isUpdatingAddress
                }
              >
                {isAddingAddress ||
                isUpdatingAddress ? (
                  <ActivityIndicator
                    size="small"
                    color="#121212"
                  />
                ) : (
                  <Text
                    className="
                      text-background
                      font-bold
                      text-lg
                    "
                  >
                    {isEditing
                      ? "Save Changes"
                      : "Add Address"}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeScreen>
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
      <Text
        className="
          text-text-primary
          font-semibold
          mb-2
        "
      >
        {label}
      </Text>

      <TextInput
        className="
          bg-surface
          text-text-primary
          px-4
          py-4
          rounded-2xl
          text-base
        "
        placeholder={
          placeholder
        }
        placeholderTextColor="#666"
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
              ? 110
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