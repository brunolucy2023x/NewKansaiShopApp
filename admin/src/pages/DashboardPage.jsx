// src/pages/DashboardPage.jsx

import { useQuery } from "@tanstack/react-query";

import {
  DollarSignIcon,
  ShoppingBagIcon,
  UsersIcon,
  PackageIcon,
} from "lucide-react";

import { supabase } from "../lib/supabase";

function DashboardPage() {
  /* =========================================================
     PRODUCTS
  ========================================================= */

  const { data: products = [] } =
    useQuery({
      queryKey: ["products"],

      queryFn: async () => {
        const { data, error } =
          await supabase
            .from("products")
            .select("*");

        if (error) throw error;

        return data;
      },
    });

  /* =========================================================
     ORDERS
  ========================================================= */

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],

    queryFn: async () => {
      const { data, error } =
        await supabase
          .from("orders")
          .select("*");

      if (error) throw error;

      return data;
    },
  });

  /* =========================================================
     CUSTOMERS
  ========================================================= */

  const { data: customers = [] } =
    useQuery({
      queryKey: ["customers"],

      queryFn: async () => {
        const { data, error } =
          await supabase
            .from("customers")
            .select("*");

        if (error) throw error;

        return data;
      },
    });

  /* =========================================================
     TOTAL REVENUE
  ========================================================= */

  const totalRevenue = orders.reduce(
    (sum, order) =>
      sum +
      Number(order.total_price || 0),
    0
  );

  const stats = [
    {
      title: "Revenue",
      value: `$${totalRevenue.toFixed(
        2
      )}`,
      icon: (
        <DollarSignIcon className="w-8 h-8" />
      ),
    },

    {
      title: "Orders",
      value: orders.length,
      icon: (
        <ShoppingBagIcon className="w-8 h-8" />
      ),
    },

    {
      title: "Customers",
      value: customers.length,
      icon: (
        <UsersIcon className="w-8 h-8" />
      ),
    },

    {
      title: "Products",
      value: products.length,
      icon: (
        <PackageIcon className="w-8 h-8" />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="stats shadow w-full">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="stat"
          >
            <div className="stat-figure text-primary">
              {stat.icon}
            </div>

            <div className="stat-title">
              {stat.title}
            </div>

            <div className="stat-value">
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;