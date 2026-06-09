// src/pages/ProductsPage.jsx

import { useEffect, useState } from "react";
import {
  PlusIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

/* =========================================================
   EMPTY FORM TEMPLATE
========================================================= */
const emptyForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  category: "",
  imageFile: null,
};

function ProductsPage() {
  const queryClient = useQueryClient();

  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);

  /* =========================================================
     FETCH PRODUCTS
  ========================================================= */
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  /* =========================================================
     RESET FORM WHEN SWITCHING MODE
========================================================= */
  useEffect(() => {
    if (!selected) setForm(emptyForm);
  }, [selected]);

  /* =========================================================
     CREATE / UPDATE
========================================================= */
  const saveProduct = useMutation({
    mutationFn: async () => {
      setUploading(true);

      let imageUrl = selected?.images?.[0] || "";

      // upload image if new
      if (form.imageFile) {
        const file = form.imageFile;
        const ext = file.name.split(".").pop();
        const fileName = `${Date.now()}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("products")
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
      }

      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category,
        images: imageUrl ? [imageUrl] : [],
      };

      if (selected) {
        const { error } = await supabase
          .from("products")
          .update(payload)
          .eq("id", selected.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("products")
          .insert([payload]);

        if (error) throw error;
      }

      setUploading(false);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setSelected(null);
      setForm(emptyForm);
    },

    onError: (err) => {
      setUploading(false);
      alert(err.message || "Error saving product");
    },
  });

  /* =========================================================
     DELETE
========================================================= */
  const deleteProduct = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  /* =========================================================
     UI
========================================================= */
  return (
    <div className="h-[calc(100vh-80px)] flex gap-6 overflow-hidden">

      {/* =====================================================
         LEFT: PRODUCT LIST
      ===================================================== */}
      <div className="w-2/3 overflow-y-auto space-y-4 pr-2">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Products</h1>

          <button
            onClick={() => {
              setSelected(null);
              setForm(emptyForm);
            }}
            className="btn btn-primary gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            New Product
          </button>
        </div>

        {/* LIST */}
        {isLoading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <div className="space-y-3">
            {products.map((p) => (
              <div
                key={p.id}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition
                ${
                  selected?.id === p.id
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-white/10 hover:bg-white/5"
                }`}
                onClick={() => {
                  setSelected(p);
                  setForm({
                    name: p.name || "",
                    description: p.description || "",
                    price: p.price || "",
                    stock: p.stock || "",
                    category: p.category || "",
                    imageFile: null,
                  });
                }}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={p.images?.[0] || "/placeholder.png"}
                    className="w-12 h-12 rounded-lg object-cover"
                  />

                  <div>
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-xs opacity-60">
                      {p.category}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    className="btn btn-sm btn-ghost"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProduct.mutate(p.id);
                    }}
                    className="btn btn-sm btn-ghost text-red-400"
                  >
                    <Trash2Icon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =====================================================
         RIGHT: EDITOR PANEL
      ===================================================== */}
      <div className="w-1/3 border-l border-white/10 pl-4 overflow-y-auto">

        <h2 className="text-xl font-bold mb-4">
          {selected ? "Edit Product" : "Create Product"}
        </h2>

        <div className="space-y-3">

          <input
            className="input input-bordered w-full"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            className="input input-bordered w-full"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <input
            className="input input-bordered w-full"
            placeholder="Stock"
            type="number"
            value={form.stock}
            onChange={(e) =>
              setForm({ ...form, stock: e.target.value })
            }
          />

          <input
            className="input input-bordered w-full"
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />

          {/* IMAGE */}
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            onChange={(e) =>
              setForm({
                ...form,
                imageFile: e.target.files[0],
              })
            }
          />

          {selected?.images?.[0] && !form.imageFile && (
            <img
              src={selected.images[0]}
              className="w-full h-40 object-cover rounded-xl"
            />
          )}

          <button
            onClick={() => saveProduct.mutate()}
            disabled={uploading}
            className="btn btn-primary w-full"
          >
            {uploading
              ? "Saving..."
              : selected
              ? "Update Product"
              : "Create Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;