// src/pages/OrdersPage.jsx

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { supabase } from "../lib/supabase";

function OrdersPage() {
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } =
    useQuery({
      queryKey: ["orders"],

      queryFn: async () => {
        const { data, error } =
          await supabase
            .from("orders")
            .select("*")
            .order("created_at", {
              ascending: false,
            });

        if (error) throw error;

        return data;
      },
    });

  const updateStatusMutation =
    useMutation({
      mutationFn: async ({
        id,
        status,
      }) => {
        const { error } =
          await supabase
            .from("orders")
            .update({ status })
            .eq("id", id);

        if (error) throw error;
      },

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["orders"],
        });
      },
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Orders
        </h1>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <select
                          className="select select-bordered select-sm"
                          value={
                            order.status
                          }
                          onChange={(e) =>
                            updateStatusMutation.mutate(
                              {
                                id: order.id,
                                status:
                                  e.target
                                    .value,
                              }
                            )
                          }
                        >
                          <option value="pending">
                            Pending
                          </option>

                          <option value="shipped">
                            Shipped
                          </option>

                          <option value="delivered">
                            Delivered
                          </option>
                        </select>
                      </td>

                      <td>
                        $
                        {Number(
                          order.total_price
                        ).toFixed(2)}
                      </td>

                      <td>
                        {new Date(
                          order.created_at
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;