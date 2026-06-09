// src/pages/DashboardPage.jsx

import { useQueries } from "@tanstack/react-query";
import {
  DollarSignIcon,
  ShoppingBagIcon,
  UsersIcon,
  PackageIcon,
  FolderIcon,
  BadgePercentIcon,
  UserRoundIcon,
  BookOpenIcon,
  AlertTriangleIcon,
  StarIcon,
  SparklesIcon,
} from "lucide-react";

import { supabase } from "../lib/supabase";

const fetchTable = async (table) => {
  const { data, error } = await supabase
    .from(table)
    .select("*");

  if (error) throw error;

  return data || [];
};

function DashboardPage() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["products"],
        queryFn: () => fetchTable("products"),
      },
      {
        queryKey: ["orders"],
        queryFn: () => fetchTable("orders"),
      },
      {
        queryKey: ["customers"],
        queryFn: () => fetchTable("customers"),
      },
      {
        queryKey: ["categories"],
        queryFn: () => fetchTable("categories"),
      },
      {
        queryKey: ["deals"],
        queryFn: () => fetchTable("deals"),
      },
      {
        queryKey: ["experts"],
        queryFn: () => fetchTable("experts"),
      },
      {
        queryKey: ["painting_tips"],
        queryFn: () =>
          fetchTable("painting_tips"),
      },
    ],
  });

  const [
    productsQuery,
    ordersQuery,
    customersQuery,
    categoriesQuery,
    dealsQuery,
    expertsQuery,
    tipsQuery,
  ] = results;

  const products =
    productsQuery.data || [];

  const orders =
    ordersQuery.data || [];

  const customers =
    customersQuery.data || [];

  const categories =
    categoriesQuery.data || [];

  const deals =
    dealsQuery.data || [];

  const experts =
    expertsQuery.data || [];

  const tips =
    tipsQuery.data || [];

  const isLoading = results.some(
    (query) => query.isLoading
  );

  const hasError = results.some(
    (query) => query.error
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="alert alert-error">
        Failed to load dashboard data.
      </div>
    );
  }

  const totalRevenue = orders.reduce(
    (sum, order) =>
      sum +
      Number(order.total_price || 0),
    0
  );

  const featuredProducts =
    products.filter(
      (product) => product.featured
    );

  const newArrivals = products.filter(
    (product) =>
      product.is_new_arrival
  );

  const lowStockProducts =
    products.filter(
      (product) =>
        Number(product.stock || 0) <= 5
    );

  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(
          b.created_at
        ) -
        new Date(a.created_at)
    )
    .slice(0, 5);

  const stats = [
    {
      title: "Revenue",
      value: `KSh ${totalRevenue.toLocaleString()}`,
      icon: (
        <DollarSignIcon className="h-8 w-8" />
      ),
      color: "text-green-400",
    },

    {
      title: "Orders",
      value: orders.length,
      icon: (
        <ShoppingBagIcon className="h-8 w-8" />
      ),
      color: "text-blue-400",
    },

    {
      title: "Customers",
      value: customers.length,
      icon: (
        <UsersIcon className="h-8 w-8" />
      ),
      color: "text-cyan-400",
    },

    {
      title: "Products",
      value: products.length,
      icon: (
        <PackageIcon className="h-8 w-8" />
      ),
      color: "text-orange-400",
    },

    {
      title: "Categories",
      value: categories.length,
      icon: (
        <FolderIcon className="h-8 w-8" />
      ),
      color: "text-purple-400",
    },

    {
      title: "Deals",
      value: deals.length,
      icon: (
        <BadgePercentIcon className="h-8 w-8" />
      ),
      color: "text-pink-400",
    },

    {
      title: "Experts",
      value: experts.length,
      icon: (
        <UserRoundIcon className="h-8 w-8" />
      ),
      color: "text-yellow-400",
    },

    {
      title: "Painting Tips",
      value: tips.length,
      icon: (
        <BookOpenIcon className="h-8 w-8" />
      ),
      color: "text-indigo-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div>
        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Welcome to PaintHub Admin
        </p>
      </div>

      {/* STATS */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="
              rounded-2xl
              border border-white/10
              bg-white/[0.03]
              backdrop-blur-xl
              p-6
            "
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">
                  {stat.title}
                </p>

                <h3 className="text-2xl font-bold mt-2 text-white">
                  {stat.value}
                </h3>
              </div>

              <div className={stat.color}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* INSIGHTS */}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center gap-3 mb-4">
            <StarIcon className="w-5 h-5 text-yellow-400" />
            <h2 className="font-semibold text-white">
              Featured Products
            </h2>
          </div>

          <p className="text-4xl font-bold text-white">
            {featuredProducts.length}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center gap-3 mb-4">
            <SparklesIcon className="w-5 h-5 text-cyan-400" />
            <h2 className="font-semibold text-white">
              New Arrivals
            </h2>
          </div>

          <p className="text-4xl font-bold text-white">
            {newArrivals.length}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangleIcon className="w-5 h-5 text-red-400" />
            <h2 className="font-semibold text-white">
              Low Stock
            </h2>
          </div>

          <p className="text-4xl font-bold text-white">
            {lowStockProducts.length}
          </p>
        </div>
      </div>

      {/* OVERVIEW */}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-lg font-semibold text-white mb-5">
            Store Overview
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Products</span>
              <strong>
                {products.length}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Categories</span>
              <strong>
                {categories.length}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Deals</span>
              <strong>
                {deals.length}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Experts</span>
              <strong>
                {experts.length}
              </strong>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-lg font-semibold text-white mb-5">
            Recent Orders
          </h2>

          <div className="space-y-3">
            {recentOrders.length === 0 ? (
              <p className="text-gray-400">
                No orders yet.
              </p>
            ) : (
              recentOrders.map(
                (order, index) => (
                  <div
                    key={
                      order.id || index
                    }
                    className="flex justify-between border-b border-white/10 pb-2"
                  >
                    <span>
                      Order #
                      {order.id}
                    </span>

                    <strong>
                      KSh{" "}
                      {Number(
                        order.total_price || 0
                      ).toLocaleString()}
                    </strong>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;