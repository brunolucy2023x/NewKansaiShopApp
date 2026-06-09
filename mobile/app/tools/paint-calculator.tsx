import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string;
  price: number;
  coverage_per_litre?: number;
};

type CalculationResult = {
  paintArea: number;
  litresNeeded: number;
  estimatedCost: number;
};

export default function PaintCalculatorScreen() {
  const [wallLength, setWallLength] = useState("");
  const [wallHeight, setWallHeight] = useState("");
  const [doors, setDoors] = useState("0");
  const [windows, setWindows] = useState("0");
  const [coats, setCoats] = useState("2");

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] = useState(true);

  const [result, setResult] =
    useState<CalculationResult | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("name");

      if (error) throw error;

      setProducts(data || []);

      if (data?.length) {
        setSelectedProduct(data[0]);
      }
    } catch (error) {
      console.log("Product Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePaint = () => {
    if (
      !wallLength ||
      !wallHeight ||
      !selectedProduct
    ) {
      return;
    }

    const length = Number(wallLength);
    const height = Number(wallHeight);

    const totalWallArea = length * height;

    const doorArea = Number(doors) * 1.8;
    const windowArea = Number(windows) * 1.5;

    const paintArea =
      totalWallArea - doorArea - windowArea;

    const totalArea =
      paintArea * Number(coats);

    const coverage =
      selectedProduct.coverage_per_litre || 12;

    const litresNeeded =
      Math.ceil(totalArea / coverage);

    const estimatedCost =
      litresNeeded * selectedProduct.price;

    setResult({
      paintArea,
      litresNeeded,
      estimatedCost,
    });
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F1F5F9",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#F8FAFC",
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View
        style={{
          backgroundColor: "#2563EB",
          paddingTop: 70,
          paddingBottom: 35,
          paddingHorizontal: 24,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 30,
            fontWeight: "800",
          }}
        >
          Paint Estimator
        </Text>

        <Text
          style={{
            color: "#DBEAFE",
            marginTop: 8,
            fontSize: 15,
          }}
        >
          Calculate paint quantity and project cost
        </Text>
      </View>

      <View
        style={{
          padding: 18,
        }}
      >
        {/* Dimensions Card */}
        <View
          style={card}
        >
          <Text style={sectionTitle}>
            Room Details
          </Text>

          <Input
            label="Wall Length (m)"
            value={wallLength}
            onChangeText={setWallLength}
          />

          <Input
            label="Wall Height (m)"
            value={wallHeight}
            onChangeText={setWallHeight}
          />

          <Input
            label="Doors"
            value={doors}
            onChangeText={setDoors}
          />

          <Input
            label="Windows"
            value={windows}
            onChangeText={setWindows}
          />

          <Input
            label="Number of Coats"
            value={coats}
            onChangeText={setCoats}
          />
        </View>

        {/* Products */}
        <View
          style={[
            card,
            { marginTop: 18 },
          ]}
        >
          <Text style={sectionTitle}>
            Paint Products
          </Text>

          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              onPress={() =>
                setSelectedProduct(product)
              }
              style={{
                backgroundColor:
                  selectedProduct?.id ===
                  product.id
                    ? "#DBEAFE"
                    : "#F8FAFC",

                borderWidth:
                  selectedProduct?.id ===
                  product.id
                    ? 2
                    : 1,

                borderColor:
                  selectedProduct?.id ===
                  product.id
                    ? "#2563EB"
                    : "#E2E8F0",

                padding: 15,
                borderRadius: 16,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 16,
                }}
              >
                {product.name}
              </Text>

              <Text
                style={{
                  color: "#64748B",
                  marginTop: 4,
                }}
              >
                Coverage:{" "}
                {product.coverage_per_litre || 12}
                m²/L
              </Text>

              <Text
                style={{
                  color: "#16A34A",
                  fontWeight: "700",
                  marginTop: 4,
                }}
              >
                KSh{" "}
                {Number(
                  product.price
                ).toLocaleString()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Calculate Button */}
        <TouchableOpacity
          onPress={calculatePaint}
          style={{
            backgroundColor: "#16A34A",
            height: 60,
            borderRadius: 18,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 17,
              fontWeight: "800",
            }}
          >
            Calculate Paint
          </Text>
        </TouchableOpacity>

        {/* Results */}
        {result && (
          <View
            style={[
              card,
              {
                marginTop: 20,
                backgroundColor:
                  "#ECFDF5",
              },
            ]}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "800",
                marginBottom: 18,
                color: "#166534",
              }}
            >
              Calculation Results
            </Text>

            <ResultRow
              label="Paintable Area"
              value={`${result.paintArea.toFixed(
                2
              )} m²`}
            />

            <ResultRow
              label="Paint Required"
              value={`${result.litresNeeded} L`}
            />

            <ResultRow
              label="Estimated Cost"
              value={`KSh ${result.estimatedCost.toLocaleString()}`}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function Input({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}) {
  return (
    <View
      style={{
        marginBottom: 14,
      }}
    >
      <Text
        style={{
          marginBottom: 6,
          fontWeight: "600",
          color: "#334155",
        }}
      >
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
        placeholder="Enter value"
        style={{
          backgroundColor: "#F8FAFC",
          borderWidth: 1,
          borderColor: "#CBD5E1",
          borderRadius: 14,
          paddingHorizontal: 15,
          height: 54,
        }}
      />
    </View>
  );
}

function ResultRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
      }}
    >
      <Text
        style={{
          color: "#475569",
        }}
      >
        {label}
      </Text>

      <Text
        style={{
          fontWeight: "700",
          color: "#0F172A",
        }}
      >
        {value}
      </Text>
    </View>
  );
}

const card = {
  backgroundColor: "#FFFFFF",
  borderRadius: 20,
  padding: 18,
  shadowColor: "#000",
  shadowOpacity: 0.06,
  shadowRadius: 10,
  elevation: 2,
};

const sectionTitle = {
  fontSize: 18,
  fontWeight: "800" as const,
  marginBottom: 16,
  color: "#0F172A",
};