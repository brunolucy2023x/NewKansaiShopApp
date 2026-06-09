import ProductsGrid from "@/components/ProductsGrid";
import SafeScreen from "@/components/SafeScreen";
import useProducts from "@/hooks/useProducts";


import TopNavigation from "@/components/TopNavigation";


import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StatusBar,
  FlatList,
  Image,
  ScrollView,
} from "react-native";

/* =========================================================
   BANNERS
========================================================= */

const bannerA = require("../../assets/images/bannera.png");
const bannerB = require("../../assets/images/bannerb.png");
const bannerC = require("../../assets/images/bannerc.png");
const bannerD = require("../../assets/images/bannerd.png");
const bannerE = require("../../assets/images/bannere.png");
const bannerF = require("../../assets/images/bannerf.png");
const bannerG = require("../../assets/images/bannerg.png");

/* =========================================================
   FEATURE CARDS
========================================================= */

const features = [
  {
    title: "Fast Delivery",
    icon: "local-shipping",
    bg: "#EEF2FF",
    color: "#4338CA",
  },
  {
    title: "Secure Payment",
    icon: "security",
    bg: "#ECFDF5",
    color: "#059669",
  },
  {
    title: "Verified Suppliers",
    icon: "verified",
    bg: "#FEF3C7",
    color: "#D97706",
  },
  {
    title: "Bulk Discounts",
    icon: "discount",
    bg: "#FEE2E2",
    color: "#DC2626",
  },
];

/* =========================================================
   DEAL BANNERS
========================================================= */

const dealBanners = [
  bannerB,
  bannerC,
  bannerD,
  bannerE,
  bannerF,
  bannerG,
];

/* =========================================================
   COMPONENT
========================================================= */

const ShopScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const {
    data: products = [],
    isLoading,
    isError,
  } = useProducts();

  /* =====================================================
     CATEGORIES
  ===================================================== */

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(products.map((p: any) => p.category).filter(Boolean)),
    ];

    return [
      { name: "All", icon: "apps-outline" as const },
      ...uniqueCategories.map((category: string) => ({
        name: category,
        icon:
          category === "Paints"
            ? "color-fill-outline"
            : category === "Deformed Bars"
            ? "hammer-outline"
            : category === "Cement"
            ? "cube-outline"
            : category === "Wire Products"
            ? "git-network-outline"
            : category === "Doors & Windows"
            ? "home-outline"
            : category === "Construction Equipment"
            ? "construct-outline"
            : category === "Brushes & Rollers"
            ? "brush-outline"
            : "grid-outline",
      })),
    ];
  }, [products]);

  /* =====================================================
     FILTER PRODUCTS
  ===================================================== */

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (p: any) => p.category === selectedCategory
      );
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter((p: any) =>
        p.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [products, selectedCategory, searchQuery]);

  /* =====================================================
     LOADING
  ===================================================== */

  if (isLoading) {
    return (
      <SafeScreen>
        <LoadingUI />
      </SafeScreen>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (isError) {
    return (
      <SafeScreen>
        <ErrorUI />
      </SafeScreen>
    );
  }

  /* =====================================================
     HEADER
  ===================================================== */

  const Header = () => (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F8FAFC"
      />



      {/* TOP BAR */}
      <View className="px-6 pt-5 flex-row items-center justify-between">
        <View>
          <Text className="text-[#94A3B8] text-sm font-medium">
            Best Building Materials
          </Text>

          <Text className="text-[#0F172A] text-[34px] font-black mt-1">
            Marketplace
          </Text>
        </View>

        <TouchableOpacity className="w-14 h-14 rounded-full bg-white items-center justify-center border border-[#E2E8F0]">
          <Ionicons
            name="cart-outline"
            size={26}
            color="#0F172A"
          />
        </TouchableOpacity>
      </View>

      {/* SEARCH CARD */}
      <View className="px-6 mt-7">
        <View className="bg-white rounded-[26px] px-5 py-5 border border-[#E2E8F0] flex-row items-center">
          <Ionicons
            name="search-outline"
            size={24}
            color="#64748B"
          />

          <TextInput
            placeholder="Search products..."
            placeholderTextColor="#94A3B8"
            className="flex-1 ml-4 text-[#0F172A] text-[15px]"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <TouchableOpacity className="bg-[#0F172A] w-11 h-11 rounded-full items-center justify-center">
            <Ionicons
              name="options-outline"
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* HERO SECTION */}
      <View className="px-6 mt-7">
        <View className="bg-[#0F172A] rounded-[34px] overflow-hidden">
          <Image
            source={bannerA}
            resizeMode="cover"
            className="w-full h-[260px]"
          />

          <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/30" />

          <View className="absolute bottom-0 left-0 right-0 p-7">
            <Text className="text-[#D9F26A] text-sm font-bold">
              SPECIAL OFFERS
            </Text>

            <Text className="text-white text-[34px] font-black mt-2">
              Construction
            </Text>

            <Text className="text-white text-[34px] font-black -mt-2">
              Mega Sale
            </Text>

            <TouchableOpacity className="mt-5 bg-[#D9F26A] self-start px-6 py-4 rounded-full">
              <Text className="text-black font-black">
                Shop Deals
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* FEATURE GRID */}
      <View className="px-6 mt-8">
        <View className="flex-row flex-wrap justify-between">
          {features.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              className="w-[48%] rounded-[28px] p-5 mb-4"
              style={{
                backgroundColor: item.bg,
              }}
            >
              <View
                className="w-14 h-14 rounded-full items-center justify-center"
                style={{
                  backgroundColor: item.color,
                }}
              >
                <MaterialIcons
                  name={item.icon as any}
                  size={28}
                  color="#fff"
                />
              </View>

              <Text className="text-[#0F172A] font-black text-[15px] mt-4">
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* TODAY DEALS */}
      <View className="mt-6">
        <View className="px-6 flex-row items-center justify-between">
          <View>
            <Text className="text-[#0F172A] text-[30px] font-black">
              Today's Deals
            </Text>

            <Text className="text-[#64748B] mt-1">
              Save more on top products
            </Text>
          </View>

          <TouchableOpacity>
            <Text className="text-[#0F172A] font-black">
              See All
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 24,
            paddingTop: 22,
          }}
        >
          {dealBanners.map((banner, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              className="mr-5"
            >
              <View className="bg-white rounded-[30px] overflow-hidden border border-[#E2E8F0]">
                <Image
                  source={banner}
                  resizeMode="cover"
                  className="w-[280px] h-[170px]"
                />

                <View className="p-5">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-[#0F172A] text-[18px] font-black">
                      Flash Offer
                    </Text>

                    <View className="bg-[#D9F26A] px-3 py-2 rounded-full">
                      <Text className="text-black text-xs font-black">
                        -30%
                      </Text>
                    </View>
                  </View>

                  <Text className="text-[#64748B] mt-2">
                    Wholesale prices available today
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* CATEGORIES */}
      <View className="mt-10 px-6 mb-5">
        <Text className="text-[#0F172A] text-[30px] font-black">
          Categories
        </Text>
      </View>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.name}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
        }}
        renderItem={({ item }) => {
          const isSelected = selectedCategory === item.name;

          return (
            <TouchableOpacity
              onPress={() => setSelectedCategory(item.name)}
              className={`mr-4 rounded-[24px] px-5 py-5 items-center ${
                isSelected
                  ? "bg-[#0F172A]"
                  : "bg-white border border-[#E2E8F0]"
              }`}
              style={{
                width: 110,
              }}
            >
              <View
                className={`w-14 h-14 rounded-full items-center justify-center ${
                  isSelected
                    ? "bg-[#D9F26A]"
                    : "bg-[#F8FAFC]"
                }`}
              >
                <Ionicons
                  name={item.icon}
                  size={28}
                  color="#0F172A"
                />
              </View>

              <Text
                className={`text-xs font-black text-center mt-4 ${
                  isSelected
                    ? "text-white"
                    : "text-[#334155]"
                }`}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* PRODUCTS HEADER */}
      <View className="mt-12 px-6 mb-7 flex-row items-center justify-between">
        <View>
          <Text className="text-[#0F172A] text-[30px] font-black">
            Trending Products
          </Text>

          <Text className="text-[#64748B] mt-1">
            {filteredProducts.length} items available
          </Text>
        </View>

        <TouchableOpacity className="bg-[#D9F26A] px-5 py-4 rounded-full">
          <Text className="text-black font-black">
            Explore
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );

  /* =====================================================
     MAIN
  ===================================================== */

  return (
    <SafeScreen>
      <View className="flex-1 bg-[#F8FAFC]">


      <TopNavigation />

        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 16,
          }}
          renderItem={({ item }) => (
            <ProductsGrid
              products={[item]}
              isLoading={false}
              isError={false}
            />
          )}
          ListHeaderComponent={<Header />}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeScreen>
  );
};

export default ShopScreen;

/* =========================================================
   LOADING UI
========================================================= */

function LoadingUI() {
  return (
    <View className="flex-1 items-center justify-center bg-[#F8FAFC]">
      <ActivityIndicator size="large" color="#0F172A" />
    </View>
  );
}

/* =========================================================
   ERROR UI
========================================================= */

function ErrorUI() {
  return (
    <View className="flex-1 items-center justify-center px-8 bg-[#F8FAFC]">
      <Ionicons
        name="cloud-offline-outline"
        size={54}
        color="#EF4444"
      />

      <Text className="text-[#0F172A] text-[22px] font-black mt-4">
        Failed to load products
      </Text>
    </View>
  );
}