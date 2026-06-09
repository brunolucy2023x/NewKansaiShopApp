import mongoose from "mongoose";

import { Product } from "../models/product.model.js";

import { ENV } from "../config/env.js";

const products = [
  {
    name: "Premium Interior Wall Paint",
    description:
      "Luxury smooth-finish paint with long-lasting color protection for residential and commercial interiors.",
    price: 48.99,
    stock: 140,
    category: "Paints",
    brand: "ColorMax",
    tags: ["Interior", "Luxury", "Matte"],
    featured: true,
    discount: 10,
    sku: "PNT-1001",
    images: [
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200",
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200",
    ],
    averageRating: 4.8,
    totalReviews: 224,
  },

  {
    name: "Exterior Weather Guard Paint",
    description:
      "Premium outdoor paint designed for weather resistance, UV protection, and long durability.",
    price: 52.99,
    stock: 110,
    category: "Paints",
    brand: "Duracoat",
    tags: ["Exterior", "Weatherproof"],
    featured: true,
    discount: 15,
    sku: "PNT-1002",
    images: [
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=1200",
      "https://images.unsplash.com/photo-1616628182509-6f3c63c8799b?w=1200",
    ],
    averageRating: 4.7,
    totalReviews: 180,
  },

  {
    name: "D8 Reinforcement Steel Bar",
    description:
      "High-strength deformed steel bar ideal for residential and commercial reinforcement works.",
    price: 13.5,
    stock: 320,
    category: "Deformed Bars",
    brand: "SteelCore",
    tags: ["Steel", "Construction"],
    featured: false,
    discount: 5,
    sku: "BAR-2001",
    images: [
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200",
      "https://images.unsplash.com/photo-1599707254554-027aeb4deacd?w=1200",
    ],
    averageRating: 4.6,
    totalReviews: 96,
  },

  {
    name: "D12 Heavy Duty Steel Bar",
    description:
      "Heavy-duty reinforcement bar engineered for high-load structural applications.",
    price: 18.99,
    stock: 280,
    category: "Deformed Bars",
    brand: "BuildStrong",
    tags: ["Heavy Duty", "Steel"],
    featured: true,
    discount: 12,
    sku: "BAR-2002",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200",
    ],
    averageRating: 4.9,
    totalReviews: 135,
  },

  {
    name: "Premium Portland Cement",
    description:
      "Reliable all-purpose cement suitable for foundations, plastering, and heavy construction.",
    price: 10.99,
    stock: 550,
    category: "Cement",
    brand: "UltraMix",
    tags: ["Cement", "Foundation"],
    featured: true,
    discount: 8,
    sku: "CEM-3001",
    images: [
      "https://images.unsplash.com/photo-1513467655676-561b7d489a88?w=1200",
      "https://images.unsplash.com/photo-1591588582259-e675bd2e6088?w=1200",
    ],
    averageRating: 4.8,
    totalReviews: 342,
  },

  {
    name: "Rapid Dry Cement",
    description:
      "Fast-setting cement perfect for urgent repairs and industrial-grade construction.",
    price: 12.5,
    stock: 360,
    category: "Cement",
    brand: "QuickSet",
    tags: ["Fast Dry", "Industrial"],
    featured: false,
    discount: 6,
    sku: "CEM-3002",
    images: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200",
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1200",
    ],
    averageRating: 4.5,
    totalReviews: 165,
  },

  {
    name: "Galvanized Binding Wire",
    description:
      "Flexible and durable galvanized wire for tying reinforcement bars in construction.",
    price: 7.99,
    stock: 420,
    category: "Wire Products",
    brand: "WireFlex",
    tags: ["Binding", "Galvanized"],
    featured: false,
    discount: 4,
    sku: "WIR-4001",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200",
    ],
    averageRating: 4.4,
    totalReviews: 82,
  },

  {
    name: "Heavy Duty Chainlink Fence",
    description:
      "Secure galvanized chainlink fencing for residential and commercial protection.",
    price: 64.99,
    stock: 130,
    category: "Wire Products",
    brand: "SecureMesh",
    tags: ["Fence", "Security"],
    featured: true,
    discount: 10,
    sku: "WIR-4002",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1200",
    ],
    averageRating: 4.5,
    totalReviews: 122,
  },

  {
    name: "Modern Steel Security Door",
    description:
      "Premium anti-theft steel security door with modern architectural finish.",
    price: 269.99,
    stock: 42,
    category: "Doors & Windows",
    brand: "SafeGuard",
    tags: ["Security", "Steel Door"],
    featured: true,
    discount: 18,
    sku: "DRW-5001",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200",
    ],
    averageRating: 4.9,
    totalReviews: 211,
  },

  {
    name: "Aluminium Sliding Window",
    description:
      "Elegant aluminium sliding window with durable weatherproof finishing.",
    price: 194.99,
    stock: 70,
    category: "Doors & Windows",
    brand: "VisionGlass",
    tags: ["Window", "Aluminium"],
    featured: false,
    discount: 7,
    sku: "DRW-5002",
    images: [
      "https://images.unsplash.com/photo-1448630360428-65456885c650?w=1200",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
    ],
    averageRating: 4.7,
    totalReviews: 172,
  },

  {
    name: "Industrial Concrete Mixer",
    description:
      "Professional concrete mixer machine engineered for large-scale construction sites.",
    price: 949.99,
    stock: 18,
    category: "Construction Equipment",
    brand: "BuildMach",
    tags: ["Mixer", "Industrial"],
    featured: true,
    discount: 20,
    sku: "EQP-6001",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200",
      "https://images.unsplash.com/photo-1541976590-713941681591?w=1200",
    ],
    averageRating: 4.9,
    totalReviews: 94,
  },

  {
    name: "Heavy Duty Wheelbarrow",
    description:
      "Reliable wheelbarrow for transporting sand, cement, and construction materials.",
    price: 84.99,
    stock: 100,
    category: "Construction Equipment",
    brand: "CarryMax",
    tags: ["Wheelbarrow", "Transport"],
    featured: false,
    discount: 5,
    sku: "EQP-6002",
    images: [
      "https://images.unsplash.com/photo-1599707254554-027aeb4deacd?w=1200",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200",
    ],
    averageRating: 4.6,
    totalReviews: 72,
  },

  {
    name: "Professional Paint Brush Set",
    description:
      "Premium quality paint brushes for smooth wall finishes and detailed painting.",
    price: 16.99,
    stock: 210,
    category: "Brushes & Rollers",
    brand: "BrushPro",
    tags: ["Brushes", "Painting"],
    featured: false,
    discount: 9,
    sku: "BRS-7001",
    images: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200",
      "https://images.unsplash.com/photo-1581090700227-1e8e8f1d7d8b?w=1200",
    ],
    averageRating: 4.5,
    totalReviews: 108,
  },

  {
    name: "Advanced Paint Roller Kit",
    description:
      "Ergonomic roller painting kit designed for smooth and fast wall coverage.",
    price: 21.99,
    stock: 170,
    category: "Brushes & Rollers",
    brand: "RollerTech",
    tags: ["Rollers", "Painting"],
    featured: true,
    discount: 14,
    sku: "BRS-7002",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200",
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200",
    ],
    averageRating: 4.7,
    totalReviews: 149,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(ENV.DB_URL);

    console.log("🚀 MongoDB Connected");

    await Product.deleteMany({});

    console.log("🗑 Existing products removed");

    const insertedProducts = await Product.insertMany(products);

    console.log(
      `✅ ${insertedProducts.length} premium products seeded`
    );

    const categories = [
      ...new Set(products.map((item) => item.category)),
    ];

    console.log("\n📦 Categories:");
    categories.forEach((category) =>
      console.log(`• ${category}`)
    );

    console.log("\n⭐ Featured Products:");

    products
      .filter((item) => item.featured)
      .forEach((item) =>
        console.log(`• ${item.name}`)
      );

    await mongoose.connection.close();

    console.log("\n✅ Seeding completed successfully");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);

    process.exit(1);
  }
};

seedDatabase();