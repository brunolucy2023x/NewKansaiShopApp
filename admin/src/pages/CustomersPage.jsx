// src/pages/CustomersPage.jsx

import { useQuery } from "@tanstack/react-query";

import { supabase } from "../lib/supabase";

function CustomersPage() {
  const { data: customers = [], isLoading } =
    useQuery({
      queryKey: ["customers"],

      queryFn: async () => {
        const { data, error } =
          await supabase
            .from("customers")
            .select("*")
            .order("created_at", {
              ascending: false,
            });

        if (error) throw error;

        return data;
      },
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Customers
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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Joined</th>
                  </tr>
                </thead>

                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>
                        {customer.name}
                      </td>

                      <td>
                        {customer.email}
                      </td>

                      <td>
                        {new Date(
                          customer.created_at
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

export default CustomersPage;