import { useState } from "react";

import {
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  XIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
} from "lucide-react";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { supabase } from "../lib/supabase";

function StoreLocationsPage() {
  const queryClient =
    useQueryClient();

  const [showModal, setShowModal] =
    useState(false);

  const [editingStore, setEditingStore] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      address: "",
      phone: "",
      email: "",
      latitude: "",
      longitude: "",
      opening_hours: "",
    });

  /* ========================================
     FETCH STORES
  ======================================== */

  const {
    data: stores = [],
    isLoading,
  } = useQuery({
    queryKey: ["store_locations"],

    queryFn: async () => {
      const { data, error } =
        await supabase
          .from("store_locations")
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
        storeData
      ) => {
        const { error } =
          await supabase
            .from(
              "store_locations"
            )
            .insert([
              {
                name:
                  storeData.name,
                address:
                  storeData.address,
                phone:
                  storeData.phone,
                email:
                  storeData.email,
                latitude:
                  storeData.latitude
                    ? Number(
                        storeData.latitude
                      )
                    : null,
                longitude:
                  storeData.longitude
                    ? Number(
                        storeData.longitude
                      )
                    : null,
                opening_hours:
                  storeData.opening_hours,
              },
            ]);

        if (error)
          throw error;
      },

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "store_locations",
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
        storeData,
      }) => {
        const { error } =
          await supabase
            .from(
              "store_locations"
            )
            .update({
              name:
                storeData.name,
              address:
                storeData.address,
              phone:
                storeData.phone,
              email:
                storeData.email,
              latitude:
                storeData.latitude
                  ? Number(
                      storeData.latitude
                    )
                  : null,
              longitude:
                storeData.longitude
                  ? Number(
                      storeData.longitude
                    )
                  : null,
              opening_hours:
                storeData.opening_hours,
            })
            .eq("id", id);

        if (error)
          throw error;
      },

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "store_locations",
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
              "store_locations"
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
              "store_locations",
            ],
          }
        );
      },
    });

  /* ========================================
     HELPERS
  ======================================== */

  const closeModal = () => {
    setShowModal(false);

    setEditingStore(null);

    setFormData({
      name: "",
      address: "",
      phone: "",
      email: "",
      latitude: "",
      longitude: "",
      opening_hours: "",
    });
  };

  const handleEdit = (
    store
  ) => {
    setEditingStore(store);

    setFormData({
      name:
        store.name || "",
      address:
        store.address ||
        "",
      phone:
        store.phone || "",
      email:
        store.email || "",
      latitude:
        store.latitude ||
        "",
      longitude:
        store.longitude ||
        "",
      opening_hours:
        store.opening_hours ||
        "",
    });

    setShowModal(true);
  };

  const handleSubmit = (
    e
  ) => {
    e.preventDefault();

    if (
      editingStore
    ) {
      updateMutation.mutate(
        {
          id: editingStore.id,
          storeData:
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
            Store Locations
          </h1>

          <p className="opacity-70">
            Manage branch
            locations
          </p>
        </div>

        <button
          className="btn btn-primary gap-2"
          onClick={() =>
            setShowModal(true)
          }
        >
          <PlusIcon className="w-5 h-5" />
          Add Store
        </button>
      </div>

      {/* STORES */}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : stores.length ===
        0 ? (
        <div className="text-center py-20 opacity-70">
          No store locations
          found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {stores.map(
            (store) => (
              <div
                key={store.id}
                className="card bg-base-100 shadow-xl"
              >
                <div className="card-body">
                  <h2 className="card-title">
                    {
                      store.name
                    }
                  </h2>

                  <div className="space-y-3 mt-2">
                    <div className="flex gap-2">
                      <MapPinIcon className="w-4 h-4 mt-1 text-primary" />

                      <span>
                        {
                          store.address
                        }
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <PhoneIcon className="w-4 h-4 mt-1 text-primary" />

                      <span>
                        {
                          store.phone
                        }
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <MailIcon className="w-4 h-4 mt-1 text-primary" />

                      <span>
                        {
                          store.email
                        }
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <ClockIcon className="w-4 h-4 mt-1 text-primary" />

                      <span>
                        {
                          store.opening_hours
                        }
                      </span>
                    </div>
                  </div>

                  <div className="card-actions justify-end mt-4">
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() =>
                        handleEdit(
                          store
                        )
                      }
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>

                    <button
                      className="btn btn-square btn-ghost text-error"
                      onClick={() =>
                        deleteMutation.mutate(
                          store.id
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
                {editingStore
                  ? "Edit Store"
                  : "Add Store"}
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
                placeholder="Store Name"
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

              <textarea
                placeholder="Address"
                className="textarea textarea-bordered w-full"
                value={
                  formData.address
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address:
                      e.target
                        .value,
                  })
                }
                required
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

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  step="any"
                  placeholder="Latitude"
                  className="input input-bordered"
                  value={
                    formData.latitude
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      latitude:
                        e.target
                          .value,
                    })
                  }
                />

                <input
                  type="number"
                  step="any"
                  placeholder="Longitude"
                  className="input input-bordered"
                  value={
                    formData.longitude
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      longitude:
                        e.target
                          .value,
                    })
                  }
                />
              </div>

              <input
                type="text"
                placeholder="Opening Hours"
                className="input input-bordered w-full"
                value={
                  formData.opening_hours
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    opening_hours:
                      e.target
                        .value,
                  })
                }
              />

              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                {editingStore
                  ? "Update Store"
                  : "Create Store"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StoreLocationsPage;