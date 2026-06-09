import { useState } from "react";

import {
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  XIcon,
  HelpCircleIcon,
} from "lucide-react";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { supabase } from "../lib/supabase";

function FAQPage() {
  const queryClient = useQueryClient();

  const [showModal, setShowModal] =
    useState(false);

  const [editingFaq, setEditingFaq] =
    useState(null);

  const [formData, setFormData] =
    useState({
      question: "",
      answer: "",
    });

  /* =========================================================
     FETCH FAQS
  ========================================================= */

  const {
    data: faqs = [],
    isLoading,
  } = useQuery({
    queryKey: ["faqs"],

    queryFn: async () => {
      const { data, error } =
        await supabase
          .from("faqs")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      if (error) throw error;

      return data;
    },
  });

  /* =========================================================
     CREATE FAQ
  ========================================================= */

  const createMutation = useMutation({
    mutationFn: async (
      faqData
    ) => {
      const { error } =
        await supabase
          .from("faqs")
          .insert([
            {
              question:
                faqData.question,
              answer:
                faqData.answer,
            },
          ]);

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["faqs"],
      });

      closeModal();
    },
  });

  /* =========================================================
     UPDATE FAQ
  ========================================================= */

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      faqData,
    }) => {
      const { error } =
        await supabase
          .from("faqs")
          .update({
            question:
              faqData.question,
            answer:
              faqData.answer,
          })
          .eq("id", id);

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["faqs"],
      });

      closeModal();
    },
  });

  /* =========================================================
     DELETE FAQ
  ========================================================= */

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } =
        await supabase
          .from("faqs")
          .delete()
          .eq("id", id);

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["faqs"],
      });
    },
  });

  /* =========================================================
     HELPERS
  ========================================================= */

  const closeModal = () => {
    setShowModal(false);

    setEditingFaq(null);

    setFormData({
      question: "",
      answer: "",
    });
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);

    setFormData({
      question:
        faq.question || "",
      answer:
        faq.answer || "",
    });

    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingFaq) {
      updateMutation.mutate({
        id: editingFaq.id,
        faqData: formData,
      });
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
            FAQs
          </h1>

          <p className="opacity-70">
            Manage frequently asked
            questions
          </p>
        </div>

        <button
          className="btn btn-primary gap-2"
          onClick={() =>
            setShowModal(true)
          }
        >
          <PlusIcon className="w-5 h-5" />
          Add FAQ
        </button>
      </div>

      {/* FAQ LIST */}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : faqs.length === 0 ? (
        <div className="text-center py-20 opacity-70">
          No FAQs found
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="card bg-base-100 shadow-xl"
            >
              <div className="card-body">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <HelpCircleIcon className="w-5 h-5 text-primary" />

                      <h2 className="font-bold text-lg">
                        {
                          faq.question
                        }
                      </h2>
                    </div>

                    <p className="opacity-80 whitespace-pre-wrap">
                      {faq.answer}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() =>
                        handleEdit(
                          faq
                        )
                      }
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>

                    <button
                      className="btn btn-square btn-ghost text-error"
                      onClick={() =>
                        deleteMutation.mutate(
                          faq.id
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

      {/* MODAL */}

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-2xl">
                {editingFaq
                  ? "Edit FAQ"
                  : "Add FAQ"}
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
                placeholder="Question"
                className="input input-bordered w-full"
                value={
                  formData.question
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    question:
                      e.target
                        .value,
                  })
                }
                required
              />

              <textarea
                placeholder="Answer"
                className="textarea textarea-bordered w-full h-40"
                value={
                  formData.answer
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    answer:
                      e.target
                        .value,
                  })
                }
                required
              />

              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                {editingFaq
                  ? "Update FAQ"
                  : "Create FAQ"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FAQPage;