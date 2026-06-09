import { useState } from "react";

import {
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  XIcon,
  UploadIcon,
  BookOpenIcon,
} from "lucide-react";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { supabase } from "../lib/supabase";

function PaintingTipsPage() {
  const queryClient =
    useQueryClient();

  const [showModal, setShowModal] =
    useState(false);

  const [editingTip, setEditingTip] =
    useState(null);

  const [uploading, setUploading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      content: "",
      imageFile: null,
    });

  /* ========================================
     FETCH TIPS
  ======================================== */

  const {
    data: tips = [],
    isLoading,
  } = useQuery({
    queryKey: ["painting_tips"],

    queryFn: async () => {
      const { data, error } =
        await supabase
          .from("painting_tips")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      if (error) throw error;

      return data;
    },
  });

  /* ========================================
     CREATE
  ======================================== */

  const createMutation =
    useMutation({
      mutationFn: async (
        tipData
      ) => {
        setUploading(true);

        let imageUrl = "";

        if (
          tipData.imageFile
        ) {
          const file =
            tipData.imageFile;

          const ext =
            file.name
              .split(".")
              .pop();

          const fileName = `tip-${Date.now()}.${ext}`;

          const {
            error:
              uploadError,
          } =
            await supabase.storage
              .from(
                "painting-tips"
              )
              .upload(
                fileName,
                file
              );

          if (
            uploadError
          )
            throw uploadError;

          const {
            data,
          } =
            supabase.storage
              .from(
                "painting-tips"
              )
              .getPublicUrl(
                fileName
              );

          imageUrl =
            data.publicUrl;
        }

        const { error } =
          await supabase
            .from(
              "painting_tips"
            )
            .insert([
              {
                title:
                  tipData.title,
                content:
                  tipData.content,
                image:
                  imageUrl,
              },
            ]);

        setUploading(false);

        if (error)
          throw error;
      },

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "painting_tips",
            ],
          }
        );

        closeModal();
      },
    });

  /* ========================================
     UPDATE
  ======================================== */

  const updateMutation =
    useMutation({
      mutationFn: async ({
        id,
        tipData,
      }) => {
        setUploading(true);

        let imageUrl =
          editingTip?.image ||
          "";

        if (
          tipData.imageFile
        ) {
          const file =
            tipData.imageFile;

          const ext =
            file.name
              .split(".")
              .pop();

          const fileName = `tip-${Date.now()}.${ext}`;

          const {
            error:
              uploadError,
          } =
            await supabase.storage
              .from(
                "painting-tips"
              )
              .upload(
                fileName,
                file
              );

          if (
            uploadError
          )
            throw uploadError;

          const {
            data,
          } =
            supabase.storage
              .from(
                "painting-tips"
              )
              .getPublicUrl(
                fileName
              );

          imageUrl =
            data.publicUrl;
        }

        const { error } =
          await supabase
            .from(
              "painting_tips"
            )
            .update({
              title:
                tipData.title,
              content:
                tipData.content,
              image:
                imageUrl,
            })
            .eq("id", id);

        setUploading(false);

        if (error)
          throw error;
      },

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "painting_tips",
            ],
          }
        );

        closeModal();
      },
    });

  /* ========================================
     DELETE
  ======================================== */

  const deleteMutation =
    useMutation({
      mutationFn: async (
        id
      ) => {
        const { error } =
          await supabase
            .from(
              "painting_tips"
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
              "painting_tips",
            ],
          }
        );
      },
    });

  const closeModal = () => {
    setShowModal(false);

    setEditingTip(null);

    setFormData({
      title: "",
      content: "",
      imageFile: null,
    });
  };

  const handleEdit = (
    tip
  ) => {
    setEditingTip(tip);

    setFormData({
      title:
        tip.title || "",
      content:
        tip.content ||
        "",
      imageFile: null,
    });

    setShowModal(true);
  };

  const handleSubmit = (
    e
  ) => {
    e.preventDefault();

    if (
      editingTip
    ) {
      updateMutation.mutate(
        {
          id: editingTip.id,
          tipData:
            formData,
        }
      );
    } else {
      createMutation.mutate(
        formData
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Painting Tips
          </h1>

          <p className="opacity-70">
            Manage painting
            articles and
            guides
          </p>
        </div>

        <button
          className="btn btn-primary gap-2"
          onClick={() =>
            setShowModal(true)
          }
        >
          <PlusIcon className="w-5 h-5" />
          Add Tip
        </button>
      </div>

      {/* LIST */}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : tips.length ===
        0 ? (
        <div className="text-center py-20 opacity-70">
          No tips found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tips.map(
            (tip) => (
              <div
                key={tip.id}
                className="card bg-base-100 shadow-xl"
              >
                <figure>
                  <img
                    src={
                      tip.image ||
                      "/placeholder.png"
                    }
                    alt={
                      tip.title
                    }
                    className="h-56 w-full object-cover"
                  />
                </figure>

                <div className="card-body">
                  <div className="flex items-center gap-2">
                    <BookOpenIcon className="w-5 h-5 text-primary" />

                    <h2 className="card-title">
                      {
                        tip.title
                      }
                    </h2>
                  </div>

                  <p className="line-clamp-4">
                    {
                      tip.content
                    }
                  </p>

                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() =>
                        handleEdit(
                          tip
                        )
                      }
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>

                    <button
                      className="btn btn-square btn-ghost text-error"
                      onClick={() =>
                        deleteMutation.mutate(
                          tip.id
                        )
                      }
                    >
                      <Trash2Icon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* MODAL */}

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-2xl">
                {editingTip
                  ? "Edit Tip"
                  : "Add Tip"}
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
              className="space-y-4 mt-6"
            >
              <input
                type="text"
                placeholder="Tip Title"
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
                placeholder="Tip Content"
                className="textarea textarea-bordered w-full h-52"
                value={
                  formData.content
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content:
                      e.target
                        .value,
                  })
                }
                required
              />

              <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer">
                <UploadIcon className="w-8 h-8 mb-2" />
                Upload Cover Image

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      imageFile:
                        e.target
                          .files?.[0] ||
                        null,
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
                  : editingTip
                  ? "Update Tip"
                  : "Create Tip"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaintingTipsPage;