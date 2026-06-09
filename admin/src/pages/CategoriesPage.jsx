import { useState, useMemo } from "react";
import {
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  XIcon,
  UploadIcon,
  SearchIcon,
} from "lucide-react";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { supabase } from "../lib/supabase";

function CategoriesPage() {
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState(null);

  const [loadingAction, setLoadingAction] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    imageFile: null,
  });

  /* ================= FETCH ================= */
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  /* ================= FILTER ================= */
  const filteredCategories = useMemo(() => {
    return categories.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  /* ================= UPLOAD ================= */
  const uploadImage = async (file) => {
    const ext = file.name.split(".").pop();
    const fileName = `cat_${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("categories")
      .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("categories")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  /* ================= CREATE / UPDATE ================= */
  const mutation = useMutation({
    mutationFn: async ({ id, data }) => {
      setLoadingAction(true);

      let imageUrl = editing?.image || "";

      if (data.imageFile) {
        imageUrl = await uploadImage(data.imageFile);
      }

      if (editing) {
        const { error } = await supabase
          .from("categories")
          .update({
            name: data.name,
            description: data.description,
            image: imageUrl,
          })
          .eq("id", id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("categories").insert([
          {
            name: data.name,
            description: data.description,
            image: imageUrl,
          },
        ]);

        if (error) throw error;
      }

      setLoadingAction(false);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      closeModal();
    },

    onError: (err) => {
      setLoadingAction(false);
      alert(err.message);
    },
  });

  /* ================= DELETE ================= */
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries(["categories"]),
  });

  /* ================= HELPERS ================= */
  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", description: "", imageFile: null });
    setPreview(null);
    setModalOpen(true);
  };

  const openEdit = (cat) => {
    setEditing(cat);
    setForm({
      name: cat.name,
      description: cat.description,
      imageFile: null,
    });
    setPreview(cat.image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
    setPreview(null);
    setForm({ name: "", description: "", imageFile: null });
  };

  const handleFile = (file) => {
    setForm({ ...form, imageFile: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({
      id: editing?.id,
      data: form,
    });
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="opacity-70">Manage your collection</p>
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 w-4 h-4 opacity-60" />
            <input
              className="input input-bordered pl-9"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button onClick={openCreate} className="btn btn-primary gap-2">
            <PlusIcon className="w-5 h-5" />
            Add
          </button>
        </div>
      </div>

      {/* GRID */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="text-center opacity-60 py-20">
          No categories found
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="group bg-base-100 rounded-2xl overflow-hidden shadow hover:shadow-2xl transition"
            >
              <div className="relative overflow-hidden">
                <img
                  src={cat.image || "/placeholder.png"}
                  className="h-52 w-full object-cover group-hover:scale-105 transition duration-300"
                />

                {/* overlay actions */}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => openEdit(cat)}
                    className="btn btn-sm btn-circle bg-base-100"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => deleteMutation.mutate(cat.id)}
                    className="btn btn-sm btn-circle btn-error"
                  >
                    <Trash2Icon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-5">
                <h2 className="text-lg font-semibold">{cat.name}</h2>
                <p className="text-sm opacity-70 line-clamp-2">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-base-100 w-full max-w-xl rounded-2xl p-6">
            {/* header */}
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold">
                {editing ? "Edit Category" : "New Category"}
              </h3>

              <button onClick={closeModal} className="btn btn-circle btn-sm">
                <XIcon className="w-4 h-4" />
              </button>
            </div>

            {/* form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="input input-bordered w-full"
                placeholder="Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />

              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              {/* image preview */}
              {preview && (
                <img
                  src={preview}
                  className="h-40 w-full object-cover rounded-xl"
                />
              )}

              <label className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center cursor-pointer hover:bg-base-200">
                <UploadIcon className="w-5 h-5 mb-2" />
                Upload Image

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => handleFile(e.target.files[0])}
                />
              </label>

              <button className="btn btn-primary w-full" disabled={loadingAction}>
                {loadingAction
                  ? "Saving..."
                  : editing
                  ? "Update"
                  : "Create"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoriesPage;