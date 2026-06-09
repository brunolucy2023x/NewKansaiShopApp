import { useState } from "react";
import {
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  XIcon,
  UploadIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
} from "lucide-react";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { supabase } from "../lib/supabase";

function ExpertsPage() {
  const queryClient = useQueryClient();

  const [showModal, setShowModal] =
    useState(false);

  const [editingExpert, setEditingExpert] =
    useState(null);

  const [uploading, setUploading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      profession: "",
      bio: "",
      phone: "",
      email: "",
      location: "",
      imageFile: null,
    });

  /* =========================
     FETCH
  ========================= */

  const {
    data: experts = [],
    isLoading,
  } = useQuery({
    queryKey: ["experts"],

    queryFn: async () => {
      const { data, error } =
        await supabase
          .from("experts")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      if (error) throw error;

      return data;
    },
  });

  /* =========================
     CREATE
  ========================= */

  const createMutation = useMutation({
    mutationFn: async (
      expertData
    ) => {
      setUploading(true);

      let imageUrl = "";

      if (expertData.imageFile) {
        const file =
          expertData.imageFile;

        const ext =
          file.name.split(".").pop();

        const fileName = `expert-${Date.now()}.${ext}`;

        const {
          error: uploadError,
        } = await supabase.storage
          .from("experts")
          .upload(fileName, file);

        if (uploadError)
          throw uploadError;

        const { data } =
          supabase.storage
            .from("experts")
            .getPublicUrl(fileName);

        imageUrl =
          data.publicUrl;
      }

      const { error } =
        await supabase
          .from("experts")
          .insert([
            {
              name:
                expertData.name,
              profession:
                expertData.profession,
              bio:
                expertData.bio,
              phone:
                expertData.phone,
              email:
                expertData.email,
              location:
                expertData.location,
              image: imageUrl,
            },
          ]);

      setUploading(false);

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["experts"],
      });

      closeModal();
    },
  });

  /* =========================
     UPDATE
  ========================= */

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      expertData,
    }) => {
      setUploading(true);

      let imageUrl =
        editingExpert?.image || "";

      if (expertData.imageFile) {
        const file =
          expertData.imageFile;

        const ext =
          file.name.split(".").pop();

        const fileName = `expert-${Date.now()}.${ext}`;

        const {
          error: uploadError,
        } = await supabase.storage
          .from("experts")
          .upload(fileName, file);

        if (uploadError)
          throw uploadError;

        const { data } =
          supabase.storage
            .from("experts")
            .getPublicUrl(fileName);

        imageUrl =
          data.publicUrl;
      }

      const { error } =
        await supabase
          .from("experts")
          .update({
            name:
              expertData.name,
            profession:
              expertData.profession,
            bio:
              expertData.bio,
            phone:
              expertData.phone,
            email:
              expertData.email,
            location:
              expertData.location,
            image: imageUrl,
          })
          .eq("id", id);

      setUploading(false);

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["experts"],
      });

      closeModal();
    },
  });

  /* =========================
     DELETE
  ========================= */

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } =
        await supabase
          .from("experts")
          .delete()
          .eq("id", id);

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["experts"],
      });
    },
  });

  const closeModal = () => {
    setShowModal(false);

    setEditingExpert(null);

    setFormData({
      name: "",
      profession: "",
      bio: "",
      phone: "",
      email: "",
      location: "",
      imageFile: null,
    });
  };

  const handleEdit = (
    expert
  ) => {
    setEditingExpert(expert);

    setFormData({
      name:
        expert.name || "",
      profession:
        expert.profession ||
        "",
      bio:
        expert.bio || "",
      phone:
        expert.phone || "",
      email:
        expert.email || "",
      location:
        expert.location ||
        "",
      imageFile: null,
    });

    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingExpert) {
      updateMutation.mutate({
        id: editingExpert.id,
        expertData: formData,
      });
    } else {
      createMutation.mutate(
        formData
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Experts
          </h1>

          <p className="opacity-70">
            Manage painters and
            contractors
          </p>
        </div>

        <button
          className="btn btn-primary gap-2"
          onClick={() =>
            setShowModal(true)
          }
        >
          <PlusIcon className="w-5 h-5" />
          Add Expert
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {experts.map((expert) => (
            <div
              key={expert.id}
              className="card bg-base-100 shadow-xl"
            >
              <figure>
                <img
                  src={
                    expert.image ||
                    "/placeholder.png"
                  }
                  alt={expert.name}
                  className="h-64 w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title">
                  {expert.name}
                </h2>

                <div className="badge badge-primary">
                  {
                    expert.profession
                  }
                </div>

                <p>
                  {expert.bio}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="w-4 h-4" />
                    {expert.phone}
                  </div>

                  <div className="flex items-center gap-2">
                    <MailIcon className="w-4 h-4" />
                    {expert.email}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4" />
                    {expert.location}
                  </div>
                </div>

                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn btn-square btn-ghost"
                    onClick={() =>
                      handleEdit(
                        expert
                      )
                    }
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>

                  <button
                    className="btn btn-square btn-ghost text-error"
                    onClick={() =>
                      deleteMutation.mutate(
                        expert.id
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
          <div className="modal-box max-w-2xl">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-2xl">
                {editingExpert
                  ? "Edit Expert"
                  : "Add Expert"}
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
                placeholder="Full Name"
                className="input input-bordered w-full"
                value={
                  formData.name
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name:
                      e.target
                        .value,
                  })
                }
                required
              />

              <input
                type="text"
                placeholder="Profession"
                className="input input-bordered w-full"
                value={
                  formData.profession
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    profession:
                      e.target
                        .value,
                  })
                }
                required
              />

              <textarea
                placeholder="Biography"
                className="textarea textarea-bordered w-full"
                value={
                  formData.bio
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bio:
                      e.target
                        .value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Phone"
                className="input input-bordered w-full"
                value={
                  formData.phone
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone:
                      e.target
                        .value,
                  })
                }
              />

              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                value={
                  formData.email
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email:
                      e.target
                        .value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Location"
                className="input input-bordered w-full"
                value={
                  formData.location
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location:
                      e.target
                        .value,
                  })
                }
              />

              <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer">
                <UploadIcon className="w-8 h-8 mb-2" />
                Upload Expert Photo

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
                  : editingExpert
                  ? "Update Expert"
                  : "Create Expert"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpertsPage;