import { useState } from "react";

import {
  StarIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { supabase } from "../lib/supabase";

function FeaturedProductsPage() {
  const queryClient =
    useQueryClient();

  const [selectedProduct, setSelectedProduct] =
    useState("");

  /* =========================================
     PRODUCTS
  ========================================= */

  const {
    data: products = [],
  } = useQuery({
    queryKey: ["products"],

    queryFn: async () => {
      const { data, error } =
        await supabase
          .from("products")
          .select("*")
          .order("name");

      if (error) throw error;

      return data;
    },
  });

  /* =========================================
     FEATURED PRODUCTS
  ========================================= */

  const {
    data: featuredProducts = [],
    isLoading,
  } = useQuery({
    queryKey: [
      "featured_products",
    ],

    queryFn: async () => {
      const { data, error } =
        await supabase
          .from(
            "featured_products"
          )
          .select(`
            id,
            product_id,
            products(*)
          `);

      if (error) throw error;

      return data;
    },
  });

  /* =========================================
     ADD FEATURED
  ========================================= */

  const addMutation = useMutation({
    mutationFn: async () => {
      if (
        !selectedProduct
      )
        return;

      const { error } =
        await supabase
          .from(
            "featured_products"
          )
          .insert([
            {
              product_id:
                selectedProduct,
            },
          ]);

      if (error) throw error;
    },

    onSuccess: () => {
      setSelectedProduct("");

      queryClient.invalidateQueries(
        {
          queryKey: [
            "featured_products",
          ],
        }
      );
    },
  });

  /* =========================================
     REMOVE FEATURED
  ========================================= */

  const deleteMutation =
    useMutation({
      mutationFn: async (
        id
      ) => {
        const { error } =
          await supabase
            .from(
              "featured_products"
            )
            .delete()
            .eq("id", id);

        if (error)
          throw error;
      },

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "featured_products",
            ],
          }
        );
      },
    });

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div>
        <h1 className="text-2xl font-bold">
          Featured Products
        </h1>

        <p className="opacity-70">
          Choose products
          shown on the home
          page
        </p>
      </div>

      {/* ADD PRODUCT */}

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">
            Add Featured Product
          </h2>

          <div className="flex gap-3">
            <select
              className="select select-bordered flex-1"
              value={
                selectedProduct
              }
              onChange={(e) =>
                setSelectedProduct(
                  e.target.value
                )
              }
            >
              <option value="">
                Select Product
              </option>

              {products.map(
                (
                  product
                ) => (
                  <option
                    key={
                      product.id
                    }
                    value={
                      product.id
                    }
                  >
                    {
                      product.name
                    }
                  </option>
                )
              )}
            </select>

            <button
              className="btn btn-primary gap-2"
              onClick={() =>
                addMutation.mutate()
              }
            >
              <PlusIcon className="w-5 h-5" />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* FEATURED LIST */}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : featuredProducts.length ===
        0 ? (
        <div className="text-center py-20 opacity-70">
          No featured products
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {featuredProducts.map(
            (
              featured
            ) => {
              const product =
                featured.products;

              return (
                <div
                  key={
                    featured.id
                  }
                  className="card bg-base-100 shadow-xl"
                >
                  <figure>
                    <img
                      src={
                        product
                          ?.images?.[0] ||
                        "/placeholder.png"
                      }
                      alt={
                        product?.name
                      }
                      className="h-56 w-full object-cover"
                    />
                  </figure>

                  <div className="card-body">
                    <div className="flex justify-between items-start">
                      <h2 className="card-title">
                        {
                          product?.name
                        }
                      </h2>

                      <StarIcon className="w-5 h-5 text-warning fill-warning" />
                    </div>

                    <p>
                      {
                        product?.category
                      }
                    </p>

                    <p className="font-bold text-lg">
                      KSh{" "}
                      {Number(
                        product?.price ||
                          0
                      ).toLocaleString()}
                    </p>

                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-error btn-sm gap-2"
                        onClick={() =>
                          deleteMutation.mutate(
                            featured.id
                          )
                        }
                      >
                        <Trash2Icon className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

export default FeaturedProductsPage;