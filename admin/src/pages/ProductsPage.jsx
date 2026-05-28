// src/pages/ProductsPage.jsx

import { useState } from "react";

import {
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  XIcon,
  UploadIcon,
} from "lucide-react";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { supabase } from "../lib/supabase";

function ProductsPage() {
  const queryClient = useQueryClient();

  /* =========================================================
     STATE
  ========================================================= */

  const [showModal, setShowModal] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState(null);

  const [uploading, setUploading] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    imageFile: null,
  });

  /* =========================================================
     FETCH PRODUCTS
  ========================================================= */

  const {
    data: products = [],
    isLoading,
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

  /* =========================================================
     CREATE PRODUCT
  ========================================================= */

  const createMutation = useMutation({
    mutationFn: async (productData) => {
      setUploading(true);

      let imageUrl = "";

      /* =========================================
         IMAGE UPLOAD
      ========================================= */

      if (productData.imageFile) {
        const file =
          productData.imageFile;

        const fileExt =
          file.name.split(".").pop();

        const fileName = `${Date.now()}.${fileExt}`;

        const { error: uploadError } =
          await supabase.storage
            .from("products")
            .upload(fileName, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data } = supabase.storage
          .from("products")
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
      }

      /* =========================================
         INSERT PRODUCT
      ========================================= */

      const { error } = await supabase
        .from("products")
        .insert([
          {
            name: productData.name,

            description:
              productData.description,

            price: Number(
              productData.price
            ),

            stock: Number(
              productData.stock
            ),

            category:
              productData.category,

            images: imageUrl
              ? [imageUrl]
              : [],
          },
        ]);

      setUploading(false);

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      closeModal();
    },

    onError: (error) => {
      setUploading(false);

      console.error(error);

      alert(
        error.message ||
          "Failed to create product"
      );
    },
  });

  /* =========================================================
     UPDATE PRODUCT
  ========================================================= */

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      productData,
    }) => {
      setUploading(true);

      let imageUrl =
        editingProduct?.images?.[0] || "";

      /* =========================================
         NEW IMAGE UPLOAD
      ========================================= */

      if (productData.imageFile) {
        const file =
          productData.imageFile;

        const fileExt =
          file.name.split(".").pop();

        const fileName = `${Date.now()}.${fileExt}`;

        const { error: uploadError } =
          await supabase.storage
            .from("products")
            .upload(fileName, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data } = supabase.storage
          .from("products")
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
      }

      /* =========================================
         UPDATE PRODUCT
      ========================================= */

      const { error } = await supabase
        .from("products")
        .update({
          name: productData.name,

          description:
            productData.description,

          price: Number(
            productData.price
          ),

          stock: Number(
            productData.stock
          ),

          category:
            productData.category,

          images: imageUrl
            ? [imageUrl]
            : [],
        })
        .eq("id", id);

      setUploading(false);

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      closeModal();
    },

    onError: (error) => {
      setUploading(false);

      console.error(error);

      alert(
        error.message ||
          "Failed to update product"
      );
    },
  });

  /* =========================================================
     DELETE PRODUCT
  ========================================================= */

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  /* =========================================================
     HELPERS
  ========================================================= */

  const closeModal = () => {
    setShowModal(false);

    setEditingProduct(null);

    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      imageFile: null,
    });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name || "",

      description:
        product.description || "",

      price: product.price || "",

      stock: product.stock || "",

      category:
        product.category || "",

      imageFile: null,
    });

    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingProduct) {
      updateMutation.mutate({
        id: editingProduct.id,

        productData: formData,
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="space-y-6">
      {/* =========================================================
          HEADER
      ========================================================= */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Products
          </h1>

          <p className="text-base-content/70">
            Manage products with
            Supabase
          </p>
        </div>

        <button
          className="btn btn-primary gap-2"
          onClick={() =>
            setShowModal(true)
          }
        >
          <PlusIcon className="w-5 h-5" />

          Add Product
        </button>
      </div>

      {/* =========================================================
          PRODUCTS
      ========================================================= */}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 opacity-70">
          No products yet
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="card bg-base-100 shadow-xl"
            >
              <div className="card-body">
                <div className="flex items-center gap-6">
                  {/* IMAGE */}

                  <img
                    src={
                      product.images?.[0] ||
                      "/placeholder.png"
                    }
                    alt={product.name}
                    className="w-20 h-20 rounded-xl object-cover border border-base-300"
                  />

                  {/* CONTENT */}

                  <div className="flex-1">
                    <h2 className="card-title">
                      {product.name}
                    </h2>

                    <p className="text-sm opacity-70">
                      {product.category}
                    </p>

                    <div className="mt-2 flex items-center gap-4">
                      <span className="font-bold text-lg">
                        $
                        {Number(
                          product.price
                        ).toFixed(2)}
                      </span>

                      <span className="badge badge-outline">
                        Stock:{" "}
                        {product.stock}
                      </span>
                    </div>
                  </div>

                  {/* ACTIONS */}

                  <div className="flex gap-2">
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() =>
                        handleEdit(product)
                      }
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>

                    <button
                      className="btn btn-square btn-ghost text-error"
                      onClick={() =>
                        deleteMutation.mutate(
                          product.id
                        )
                      }
                    >
                      <Trash2Icon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================================================
          MODAL
      ========================================================= */}

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            {/* HEADER */}

            <div className="flex items-center justify-between">
              <h3 className="font-bold text-2xl">
                {editingProduct
                  ? "Edit Product"
                  : "Add Product"}
              </h3>

              <button
                className="btn btn-sm btn-circle"
                onClick={closeModal}
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-4 mt-6"
            >
              {/* NAME */}

              <input
                type="text"
                placeholder="Product Name"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name:
                      e.target.value,
                  })
                }
                required
              />

              {/* DESCRIPTION */}

              <textarea
                placeholder="Description"
                className="textarea textarea-bordered w-full h-28"
                value={
                  formData.description
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description:
                      e.target.value,
                  })
                }
                required
              />

              {/* PRICE + STOCK */}

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Price"
                  className="input input-bordered w-full"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price:
                        e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Stock"
                  className="input input-bordered w-full"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stock:
                        e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* CATEGORY */}

              <input
                type="text"
                placeholder="Category"
                className="input input-bordered w-full"
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category:
                      e.target.value,
                  })
                }
                required
              />

              {/* IMAGE UPLOAD */}

              <div className="space-y-2">
                <label className="font-medium text-sm">
                  Product Image
                </label>

                <label className="flex flex-col items-center justify-center border-2 border-dashed border-base-300 rounded-2xl p-8 cursor-pointer hover:border-primary transition-all">
                  <UploadIcon className="w-10 h-10 mb-3 opacity-70" />

                  <span className="font-medium">
                    Click to upload image
                  </span>

                  <span className="text-sm opacity-60 mt-1">
                    PNG, JPG, WEBP
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        imageFile:
                          e.target
                            .files[0],
                      })
                    }
                  />
                </label>

                {/* PREVIEW */}

                {formData.imageFile && (
                  <img
                    src={URL.createObjectURL(
                      formData.imageFile
                    )}
                    alt="Preview"
                    className="w-32 h-32 rounded-xl object-cover border border-base-300 mt-4"
                  />
                )}

                {!formData.imageFile &&
                  editingProduct
                    ?.images?.[0] && (
                    <img
                      src={
                        editingProduct
                          .images[0]
                      }
                      alt="Current"
                      className="w-32 h-32 rounded-xl object-cover border border-base-300 mt-4"
                    />
                  )}
              </div>

              {/* BUTTON */}

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Uploading...
                  </>
                ) : editingProduct ? (
                  "Update Product"
                ) : (
                  "Create Product"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;