// hooks/useAddresses.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/lib/supabase";

export type Address = {
  id: string;

  label: string;

  fullName: string;

  streetAddress: string;

  city: string;

  state: string;

  zipCode: string;

  phoneNumber: string;

  isDefault: boolean;

  created_at?: string;
};

const TABLE_NAME = "addresses";

export const useAddresses = () => {
  const queryClient = useQueryClient();

  /* =========================================================
     GET ADDRESSES
  ========================================================= */

  const {
    data: addresses = [],

    isLoading,

    isError,
  } = useQuery({
    queryKey: ["addresses"],

    queryFn: async () => {
      const { data, error } =
        await supabase
          .from(TABLE_NAME)
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      if (error) {
        throw error;
      }

      return data;
    },
  });

  /* =========================================================
     ADD ADDRESS
  ========================================================= */

  const {
    mutate: addAddress,

    isPending: isAddingAddress,
  } = useMutation({
    mutationFn: async (
      addressData: Omit<
        Address,
        "id"
      >
    ) => {
      /* =========================================
         HANDLE DEFAULT ADDRESS
      ========================================= */

      if (addressData.isDefault) {
        await supabase
          .from(TABLE_NAME)
          .update({
            isDefault: false,
          })
          .eq("isDefault", true);
      }

      /* =========================================
         INSERT ADDRESS
      ========================================= */

      const { data, error } =
        await supabase
          .from(TABLE_NAME)
          .insert([
            {
              ...addressData,
            },
          ])
          .select()
          .single();

      if (error) {
        throw error;
      }

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
    },
  });

  /* =========================================================
     UPDATE ADDRESS
  ========================================================= */

  const {
    mutate: updateAddress,

    isPending: isUpdatingAddress,
  } = useMutation({
    mutationFn: async ({
      addressId,

      addressData,
    }: {
      addressId: string;

      addressData: Partial<Address>;
    }) => {
      /* =========================================
         HANDLE DEFAULT ADDRESS
      ========================================= */

      if (addressData.isDefault) {
        await supabase
          .from(TABLE_NAME)
          .update({
            isDefault: false,
          })
          .eq("isDefault", true);
      }

      /* =========================================
         UPDATE ADDRESS
      ========================================= */

      const { data, error } =
        await supabase
          .from(TABLE_NAME)
          .update(addressData)
          .eq("id", addressId)
          .select()
          .single();

      if (error) {
        throw error;
      }

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
    },
  });

  /* =========================================================
     DELETE ADDRESS
  ========================================================= */

  const {
    mutate: deleteAddress,

    isPending: isDeletingAddress,
  } = useMutation({
    mutationFn: async (
      addressId: string
    ) => {
      const { error } =
        await supabase
          .from(TABLE_NAME)
          .delete()
          .eq("id", addressId);

      if (error) {
        throw error;
      }

      return addressId;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
    },
  });

  return {
    addresses,

    isLoading,

    isError,

    addAddress,

    updateAddress,

    deleteAddress,

    isAddingAddress,

    isUpdatingAddress,

    isDeletingAddress,
  };
};