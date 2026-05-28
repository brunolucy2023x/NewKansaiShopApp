import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { supabase } from "@/lib/supabase";

import {
  Cart,
  CartItem,
  Product,
} from "@/types";

import {
  useAuth,
} from "@clerk/clerk-expo";

/* =========================================================
   HOOK
========================================================= */

const useCart = () => {
  /* =====================================================
     AUTH
  ===================================================== */

  const { userId } =
    useAuth();

  /* =====================================================
     QUERY CLIENT
  ===================================================== */

  const queryClient =
    useQueryClient();

  /* =====================================================
     GET CART
  ===================================================== */

  const {
    data: cart,

    isLoading,

    isError,
  } = useQuery({
    queryKey: [
      "cart",
      userId,
    ],

    enabled: !!userId,

    queryFn:
      async (): Promise<Cart> => {
        /* ===============================================
           GET CART ITEMS
        =============================================== */

        const {
          data,
          error,
        } =
          await supabase
            .from(
              "cart_items"
            )
            .select(
              `
              id,
              quantity,

              product:products (
                id,
                name,
                description,
                price,
                stock,
                category,
                images,
                averageRating,
                totalReviews
              )
            `
            )
            .eq(
              "user_id",
              userId
            );

        if (error)
          throw error;

        /* ===============================================
           FORMAT ITEMS
        =============================================== */

        const items: CartItem[] =
          (
            data || []
          ).map(
            (
              item: any
            ) => ({
              id: item.id,

              quantity:
                item.quantity,

              product:
                item.product as Product,
            })
          );

        return {
          id: userId || "",

          items,
        };
      },
  });

  /* =====================================================
     ADD TO CART
  ===================================================== */

  const addToCartMutation =
    useMutation({
      mutationFn:
        async ({
          productId,

          quantity = 1,
        }: {
          productId: string;

          quantity?: number;
        }) => {
          if (!userId)
            throw new Error(
              "User not authenticated"
            );

          /* =============================================
             CHECK EXISTING
          ============================================= */

          const {
            data:
              existingItem,
          } =
            await supabase
              .from(
                "cart_items"
              )
              .select("*")
              .eq(
                "user_id",
                userId
              )
              .eq(
                "product_id",
                productId
              )
              .single();

          /* =============================================
             UPDATE EXISTING
          ============================================= */

          if (
            existingItem
          ) {
            const {
              error,
            } =
              await supabase
                .from(
                  "cart_items"
                )
                .update({
                  quantity:
                    existingItem.quantity +
                    quantity,
                })
                .eq(
                  "id",
                  existingItem.id
                );

            if (error)
              throw error;
          }

          /* =============================================
             INSERT NEW
          ============================================= */

          else {
            const {
              error,
            } =
              await supabase
                .from(
                  "cart_items"
                )
                .insert({
                  user_id:
                    userId,

                  product_id:
                    productId,

                  quantity,
                });

            if (error)
              throw error;
          }
        },

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "cart",
            ],
          }
        );
      },
    });

  /* =====================================================
     UPDATE QUANTITY
  ===================================================== */

  const updateQuantityMutation =
    useMutation({
      mutationFn:
        async ({
          productId,

          quantity,
        }: {
          productId: string;

          quantity: number;
        }) => {
          const {
            error,
          } =
            await supabase
              .from(
                "cart_items"
              )
              .update({
                quantity,
              })
              .eq(
                "user_id",
                userId
              )
              .eq(
                "product_id",
                productId
              );

          if (error)
            throw error;
        },

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "cart",
            ],
          }
        );
      },
    });

  /* =====================================================
     REMOVE FROM CART
  ===================================================== */

  const removeFromCartMutation =
    useMutation({
      mutationFn:
        async (
          productId: string
        ) => {
          const {
            error,
          } =
            await supabase
              .from(
                "cart_items"
              )
              .delete()
              .eq(
                "user_id",
                userId
              )
              .eq(
                "product_id",
                productId
              );

          if (error)
            throw error;
        },

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "cart",
            ],
          }
        );
      },
    });

  /* =====================================================
     CLEAR CART
  ===================================================== */

  const clearCartMutation =
    useMutation({
      mutationFn:
        async () => {
          const {
            error,
          } =
            await supabase
              .from(
                "cart_items"
              )
              .delete()
              .eq(
                "user_id",
                userId
              );

          if (error)
            throw error;
        },

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "cart",
            ],
          }
        );
      },
    });

  /* =====================================================
     TOTALS
  ===================================================== */

  const cartTotal =
    cart?.items?.reduce(
      (
        sum,
        item
      ) =>
        sum +
        item.product
          .price *
          item.quantity,

      0
    ) ?? 0;

  const cartItemCount =
    cart?.items?.reduce(
      (
        sum,
        item
      ) =>
        sum +
        item.quantity,

      0
    ) ?? 0;

  /* =====================================================
     RETURN
  ===================================================== */

  return {
    cart,

    isLoading,

    isError,

    cartTotal,

    cartItemCount,

    addToCart:
      addToCartMutation.mutate,

    updateQuantity:
      updateQuantityMutation.mutate,

    removeFromCart:
      removeFromCartMutation.mutate,

    clearCart:
      clearCartMutation.mutate,

    isAddingToCart:
      addToCartMutation.isPending,

    isUpdating:
      updateQuantityMutation.isPending,

    isRemoving:
      removeFromCartMutation.isPending,

    isClearing:
      clearCartMutation.isPending,
  };
};

export default useCart;