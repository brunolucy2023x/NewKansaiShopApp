import { useState } from "react";

import {
  SparklesIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { supabase } from "../lib/supabase";

function NewArrivalsPage() {
  const queryClient =
    useQueryClient();

  const [selectedProduct, setSelectedProduct] =
    useState("");

  /* ========================================
     PRODUCTS
  ======================================== */

  const {
    data: products = [],
  } = useQuery({
    queryKey: ["products"],

    queryFn: async () => {
      const { data, error } =
        await supabase
          .from("products")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      if (error) throw error;

      return data;
    },
  });

  /* ========================================
     NEW ARRIVALS
  ======================================== */

  const {
    data: arrivals = [],
    isLoading,
  } = useQuery({
    queryKey: ["new_arrivals"],

    queryFn: async () => {
      const { data, error } =
        await supabase
          .from("new_arrivals")
          .select(`
            id,
            product_id,
            products(*)
          `)
          .order("created_at", {
            ascending: false,
          });

      if (error) throw error;

      return data;
    },
  });

  /* ========================================
     ADD ARRIVAL
  ======================================== */

  const addMutation = useMutation({
    mutationFn: async () => {
      if (!selectedProduct)
        return;

      const exists =
        arrivals.find(
          (item) =>
            item.product_id ===
            selectedProduct
        );

      if (exists) {
        alert(
          "Product already added as new arrival"
        );
        return;
      }

      const { error } =
        await supabase
          .from("new_arrivals")
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
            "new_arrivals",
          ],
        }
      );
    },
  });

  /* ========================================
     REMOVE
  ======================================== */

  const deleteMutation =
    useMutation({
      mutationFn: async (
        id
      ) => {
        const { error } =
          await supabase
            .from(
              "new_arrivals"
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
              "new_arrivals",
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
          New Arrivals
        </h1>

        <p className="opacity-70">
          Manage newly added
          products
        </p>
      </div>

      {/* ADD PRODUCT */}

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">
            Add Product
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

      {/* LIST */}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : arrivals.length ===
        0 ? (
        <div className="text-center py-20 opacity-70">
          No new arrivals
          added yet
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {arrivals.map(
            (arrival) => {
              const product =
                arrival.products;

              return (
                <div
                  key={
                    arrival.id
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

                      <SparklesIcon className="w-5 h-5 text-success" />
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
                            arrival.id
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

export default NewArrivalsPage;