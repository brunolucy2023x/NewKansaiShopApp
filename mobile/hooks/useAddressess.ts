import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { supabase } from "@/lib/supabase";

import type {  Address } from "@/types";

/* =========================================================
   USE ADDRESSES
========================================================= */

export const useAddresses = () => {
  const queryClient =
    useQueryClient();

  /* =====================================================
     GET ADDRESSES
  ===================================================== */

  const {
    data: addresses = [],

    isLoading,

    isError,
  } = useQuery<Address[]>({
    queryKey: ["addresses"],

    queryFn: async () => {
      const {
        data,
        error,
      } = await supabase
        .from("addresses")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

      if (error) {
        console.error(
          "GET ADDRESSES ERROR:",
          error
        );

        throw error;
      }

      return (
        data || []
      ) as Address[];
    },
  });

  /* =====================================================
     ADD ADDRESS
  ===================================================== */

  const addAddressMutation =
    useMutation({
      mutationFn: async (
        addressData: Omit<
          Address,
          "id"
        >
      ) => {
        if (
          addressData.isDefault
        ) {
          await supabase
            .from("addresses")
            .update({
              isDefault: false,
            })
            .eq(
              "isDefault",
              true
            );
        }

        const {
          data,
          error,
        } = await supabase
          .from("addresses")
          .insert([
            addressData,
          ])
          .select()
          .single();

        if (error) {
          console.error(
            "ADD ADDRESS ERROR:",
            error
          );

          throw error;
        }

        return data;
      },

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "addresses",
            ],
          }
        );
      },
    });

  /* =====================================================
     UPDATE ADDRESS
  ===================================================== */

  const updateAddressMutation =
    useMutation({
      mutationFn: async ({
        addressId,

        addressData,
      }: {
        addressId: string;

        addressData: Partial<Address>;
      }) => {
        if (
          addressData.isDefault
        ) {
          await supabase
            .from("addresses")
            .update({
              isDefault: false,
            })
            .eq(
              "isDefault",
              true
            );
        }

        const {
          data,
          error,
        } = await supabase
          .from("addresses")
          .update(
            addressData
          )
          .eq(
            "id",
            addressId
          )
          .select()
          .single();

        if (error) {
          console.error(
            "UPDATE ADDRESS ERROR:",
            error
          );

          throw error;
        }

        return data;
      },

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "addresses",
            ],
          }
        );
      },
    });

  /* =====================================================
     DELETE ADDRESS
  ===================================================== */

  const deleteAddressMutation =
    useMutation({
      mutationFn: async (
        addressId: string
      ) => {
        const {
          error,
        } = await supabase
          .from("addresses")
          .delete()
          .eq(
            "id",
            addressId
          );

        if (error) {
          console.error(
            "DELETE ADDRESS ERROR:",
            error
          );

          throw error;
        }

        return addressId;
      },

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "addresses",
            ],
          }
        );
      },
    });

  /* =====================================================
     RETURN
  ===================================================== */

  return {
    addresses,

    isLoading,

    isError,

    addAddress:
      addAddressMutation.mutate,

    updateAddress:
      updateAddressMutation.mutate,

    deleteAddress:
      deleteAddressMutation.mutate,

    isAddingAddress:
      addAddressMutation.isPending,

    isUpdatingAddress:
      updateAddressMutation.isPending,

    isDeletingAddress:
      deleteAddressMutation.isPending,
  };
};