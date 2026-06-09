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

function DealsPage() {
  const queryClient = useQueryClient();

  const [showModal, setShowModal] =
    useState(false);

  const [editingDeal, setEditingDeal] =
    useState(null);

  const [uploading, setUploading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      discount_percent: "",
      expires_at: "",
      imageFile: null,
    });

  /* FETCH */

  const {
    data: deals = [],
    isLoading,
  } = useQuery({
    queryKey: ["deals"],

    queryFn: async () => {
      const { data, error } =
        await supabase
          .from("deals")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      if (error) throw error;

      return data;
    },
  });

  /* CREATE */

  const createMutation = useMutation({
    mutationFn: async (dealData) => {
      setUploading(true);

      let imageUrl = "";

      if (dealData.imageFile) {
        const file =
          dealData.imageFile;

        const ext =
          file.name.split(".").pop();

        const fileName = `deal-${Date.now()}.${ext}`;

        const {
          error: uploadError,
        } = await supabase.storage
          .from("deals")
          .upload(fileName, file);

        if (uploadError)
          throw uploadError;

        const { data } =
          supabase.storage
            .from("deals")
            .getPublicUrl(fileName);

        imageUrl =
          data.publicUrl;
      }

      const { error } =
        await supabase
          .from("deals")
          .insert([
            {
              title:
                dealData.title,
              description:
                dealData.description,
              discount_percent:
                Number(
                  dealData.discount_percent
                ),
              expires_at:
                dealData.expires_at,
              image: imageUrl,
            },
          ]);

      setUploading(false);

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["deals"],
      });

      closeModal();
    },
  });

  /* UPDATE */

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      dealData,
    }) => {
      setUploading(true);

      let imageUrl =
        editingDeal?.image || "";

      if (dealData.imageFile) {
        const file =
          dealData.imageFile;

        const ext =
          file.name.split(".").pop();

        const fileName = `deal-${Date.now()}.${ext}`;

        const {
          error: uploadError,
        } = await supabase.storage
          .from("deals")
          .upload(fileName, file);

        if (uploadError)
          throw uploadError;

        const { data } =
          supabase.storage
            .from("deals")
            .getPublicUrl(fileName);

        imageUrl =
          data.publicUrl;
      }

      const { error } =
        await supabase
          .from("deals")
          .update({
            title:
              dealData.title,
            description:
              dealData.description,
            discount_percent:
              Number(
                dealData.discount_percent
              ),
            expires_at:
              dealData.expires_at,
            image: imageUrl,
          })
          .eq("id", id);

      setUploading(false);

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["deals"],
      });

      closeModal();
    },
  });

  /* DELETE */

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } =
        await supabase
          .from("deals")
          .delete()
          .eq("id", id);

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["deals"],
      });
    },
  });

  const closeModal = () => {
    setShowModal(false);

    setEditingDeal(null);

    setFormData({
      title: "",
      description: "",
      discount_percent: "",
      expires_at: "",
      imageFile: null,
    });
  };

  const handleEdit = (deal) => {
    setEditingDeal(deal);

    setFormData({
      title: deal.title || "",
      description:
        deal.description || "",
      discount_percent:
        deal.discount_percent ||
        "",
      expires_at:
        deal.expires_at
          ?.split("T")[0] || "",
      imageFile: null,
    });

    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingDeal) {
      updateMutation.mutate({
        id: editingDeal.id,
        dealData: formData,
      });
    } else {
      createMutation.mutate(
        formData
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Deals
          </h1>

          <p className="opacity-70">
            Manage promotions
          </p>
        </div>

        <button
          className="btn btn-primary gap-2"
          onClick={() =>
            setShowModal(true)
          }
        >
          <PlusIcon className="w-5 h-5" />
          Add Deal
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="card bg-base-100 shadow-xl"
            >
              <figure>
                <img
                  src={
                    deal.image ||
                    "/placeholder.png"
                  }
                  alt={deal.title}
                  className="h-52 w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title">
                  {deal.title}
                </h2>

                <p>
                  {
                    deal.description
                  }
                </p>

                <div className="badge badge-success">
                  {
                    deal.discount_percent
                  }
                  % OFF
                </div>

                <p className="text-sm opacity-70">
                  Expires:
                  {" "}
                  {new Date(
                    deal.expires_at
                  ).toLocaleDateString()}
                </p>

                <div className="card-actions justify-end">
                  <button
                    className="btn btn-square btn-ghost"
                    onClick={() =>
                      handleEdit(
                        deal
                      )
                    }
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>

                  <button
                    className="btn btn-square btn-ghost text-error"
                    onClick={() =>
                      deleteMutation.mutate(
                        deal.id
                      )
                    }
                  >
                    <Trash2Icon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-xl">
                {editingDeal
                  ? "Edit Deal"
                  : "Add Deal"}
              </h3>

              <button
                className="btn btn-circle btn-sm"
                onClick={
                  closeModal
                }
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-4 mt-5"
            >
              <input
                type="text"
                placeholder="Deal Title"
                className="input input-bordered w-full"
                value={
                  formData.title
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title:
                      e.target
                        .value,
                  })
                }
                required
              />

              <textarea
                placeholder="Description"
                className="textarea textarea-bordered w-full"
                value={
                  formData.description
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description:
                      e.target
                        .value,
                  })
                }
              />

              <input
                type="number"
                placeholder="Discount %"
                className="input input-bordered w-full"
                value={
                  formData.discount_percent
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discount_percent:
                      e.target
                        .value,
                  })
                }
                required
              />

              <input
                type="date"
                className="input input-bordered w-full"
                value={
                  formData.expires_at
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    expires_at:
                      e.target
                        .value,
                  })
                }
              />

              <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer">
                <UploadIcon className="w-8 h-8 mb-2" />

                Upload Image

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

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={
                  uploading
                }
              >
                {uploading
                  ? "Uploading..."
                  : editingDeal
                  ? "Update Deal"
                  : "Create Deal"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DealsPage;