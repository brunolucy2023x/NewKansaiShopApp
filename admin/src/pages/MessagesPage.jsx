import { useState } from "react";

import {
  MailIcon,
  EyeIcon,
  Trash2Icon,
  XIcon,
  MessageSquareIcon,
} from "lucide-react";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { supabase } from "../lib/supabase";

function MessagesPage() {
  const queryClient =
    useQueryClient();

  const [selectedMessage, setSelectedMessage] =
    useState(null);

  /* ========================================
     FETCH MESSAGES
  ======================================== */

  const {
    data: messages = [],
    isLoading,
  } = useQuery({
    queryKey: ["messages"],

    queryFn: async () => {
      const { data, error } =
        await supabase
          .from("messages")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      if (error) throw error;

      return data;
    },
  });

  /* ========================================
     MARK AS READ
  ======================================== */

  const markReadMutation =
    useMutation({
      mutationFn: async (id) => {
        const { error } =
          await supabase
            .from("messages")
            .update({
              status: "read",
            })
            .eq("id", id);

        if (error)
          throw error;
      },

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "messages",
            ],
          }
        );
      },
    });

  /* ========================================
     DELETE
  ======================================== */

  const deleteMutation =
    useMutation({
      mutationFn: async (id) => {
        const { error } =
          await supabase
            .from("messages")
            .delete()
            .eq("id", id);

        if (error)
          throw error;
      },

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "messages",
            ],
          }
        );
      },
    });

  const unreadCount =
    messages.filter(
      (m) =>
        m.status ===
        "unread"
    ).length;

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Messages
          </h1>

          <p className="opacity-70">
            Customer inquiries and
            expert requests
          </p>
        </div>

        <div className="badge badge-primary badge-lg">
          {unreadCount} Unread
        </div>
      </div>

      {/* LIST */}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : messages.length ===
        0 ? (
        <div className="text-center py-20 opacity-70">
          No messages found
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map(
            (message) => (
              <div
                key={message.id}
                className={`card shadow-xl ${
                  message.status ===
                  "unread"
                    ? "bg-primary/5 border border-primary"
                    : "bg-base-100"
                }`}
              >
                <div className="card-body">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquareIcon className="w-5 h-5 text-primary" />

                        <h2 className="font-bold">
                          {
                            message.subject
                          }
                        </h2>

                        {message.status ===
                          "unread" && (
                          <div className="badge badge-primary">
                            New
                          </div>
                        )}
                      </div>

                      <p className="font-medium">
                        {
                          message.name
                        }
                      </p>

                      <p className="text-sm opacity-70">
                        {
                          message.email
                        }
                      </p>

                      <p className="line-clamp-2 mt-2">
                        {
                          message.message
                        }
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => {
                          setSelectedMessage(
                            message
                          );

                          if (
                            message.status ===
                            "unread"
                          ) {
                            markReadMutation.mutate(
                              message.id
                            );
                          }
                        }}
                      >
                        <EyeIcon className="w-5 h-5" />
                      </button>

                      <button
                        className="btn btn-square btn-ghost text-error"
                        onClick={() =>
                          deleteMutation.mutate(
                            message.id
                          )
                        }
                      >
                        <Trash2Icon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* VIEW MESSAGE MODAL */}

      {selectedMessage && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-2xl">
                Message Details
              </h3>

              <button
                className="btn btn-circle btn-sm"
                onClick={() =>
                  setSelectedMessage(
                    null
                  )
                }
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-bold">
                  Subject
                </label>

                <p>
                  {
                    selectedMessage.subject
                  }
                </p>
              </div>

              <div>
                <label className="font-bold">
                  Name
                </label>

                <p>
                  {
                    selectedMessage.name
                  }
                </p>
              </div>

              <div>
                <label className="font-bold">
                  Email
                </label>

                <p className="flex items-center gap-2">
                  <MailIcon className="w-4 h-4" />

                  {
                    selectedMessage.email
                  }
                </p>
              </div>

              <div>
                <label className="font-bold">
                  Phone
                </label>

                <p>
                  {selectedMessage.phone ||
                    "-"}
                </p>
              </div>

              <div>
                <label className="font-bold">
                  Message
                </label>

                <div className="bg-base-200 rounded-xl p-4 mt-2">
                  {
                    selectedMessage.message
                  }
                </div>
              </div>

              <div>
                <label className="font-bold">
                  Sent
                </label>

                <p>
                  {new Date(
                    selectedMessage.created_at
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessagesPage;