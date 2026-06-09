import { useState } from "react";
import { SearchIcon, UsersIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

function CustomersPage() {
  const [search, setSearch] =
    useState("");

  const {
    data: customers = [],
    isLoading,
  } = useQuery({
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

  const filteredCustomers =
    customers.filter((customer) =>
      `${customer.full_name} ${customer.email}`
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Customers
          </h1>

          <p className="text-base-content/70">
            Manage registered users
          </p>
        </div>

        <div className="badge badge-primary badge-lg gap-2">
          <UsersIcon className="w-4 h-4" />
          {customers.length} Customers
        </div>
      </div>

      {/* SEARCH */}

      <div className="relative">
        <SearchIcon className="absolute left-4 top-3.5 w-4 h-4 opacity-60" />

        <input
          type="text"
          placeholder="Search customer..."
          className="input input-bordered w-full pl-10"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />
      </div>

      {/* TABLE */}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : filteredCustomers.length ===
        0 ? (
        <div className="text-center py-20 opacity-70">
          No customers found
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-box shadow">
          <table className="table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Joined</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map(
                (customer) => (
                  <tr
                    key={customer.id}
                  >
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-12 rounded-full">
                            <img
                              src={
                                customer.avatar ||
                                "https://ui-avatars.com/api/?name=Customer"
                              }
                              alt=""
                            />
                          </div>
                        </div>

                        <div>
                          <div className="font-bold">
                            {customer.full_name ||
                              "Unnamed"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      {
                        customer.email
                      }
                    </td>

                    <td>
                      {customer.phone ||
                        "-"}
                    </td>

                    <td>
                      {new Date(
                        customer.created_at
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CustomersPage;