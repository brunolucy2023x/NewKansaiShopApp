import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  supabase,
} from "@/lib/supabase";

import {
  Product,
} from "@/types";

import {
  useAuth,
} from "@clerk/clerk-expo";

/* =========================================================
   HOOK
========================================================= */

const useWishlist = () => {
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
     GET WISHLIST
  ===================================================== */

  const {
    data: wishlist,

    isLoading,

    isError,
  } = useQuery<
    Product[]
  >({
    queryKey: [
      "wishlist",
      userId,
    ],

    enabled:
      !!userId,

    queryFn:
      async () => {
        /* ===============================================
           GET WISHLIST
        =============================================== */

        const {
          data,
          error,
        } =
          await supabase
            .from(
              "wishlists"
            )
            .select(
              `
              id,

              product:products (
                id,
                name,
                description,
                price,
                stock,
                category,
                images,
                averageRating,
                totalReviews,
                created_at
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
           FORMAT PRODUCTS
        =============================================== */

        return (
          (
            data || []
          )
            .map(
              (
                item: any
              ) =>
                item.product
            )
            .filter(Boolean) as Product[]
        );
      },
  });

  /* =====================================================
     ADD TO WISHLIST
  ===================================================== */

  const addToWishlistMutation =
    useMutation({
      mutationFn:
        async (
          productId: string
        ) => {
          if (!userId) {
            throw new Error(
              "User not authenticated"
            );
          }

          /* =============================================
             CHECK EXISTING
          ============================================= */

          const {
            data:
              existing,
          } =
            await supabase
              .from(
                "wishlists"
              )
              .select(
                "id"
              )
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
             ALREADY EXISTS
          ============================================= */

          if (
            existing
          ) {
            return;
          }

          /* =============================================
             INSERT
          ============================================= */

          const {
            error,
          } =
            await supabase
              .from(
                "wishlists"
              )
              .insert({
                user_id:
                  userId,

                product_id:
                  productId,
              });

          if (error)
            throw error;
        },

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "wishlist",
            ],
          }
        );
      },
    });

  /* =====================================================
     REMOVE FROM WISHLIST
  ===================================================== */

  const removeFromWishlistMutation =
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
                "wishlists"
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
              "wishlist",
            ],
          }
        );
      },
    });

  /* =====================================================
     CHECK IN WISHLIST
  ===================================================== */

  const isInWishlist =
    (
      productId: string
    ) => {
      return (
        wishlist?.some(
          (
            product
          ) =>
            product.id ===
            productId
        ) ?? false
      );
    };

  /* =====================================================
     TOGGLE
  ===================================================== */

  const toggleWishlist =
    (
      productId: string
    ) => {
      if (
        isInWishlist(
          productId
        )
      ) {
        removeFromWishlistMutation.mutate(
          productId
        );
      } else {
        addToWishlistMutation.mutate(
          productId
        );
      }
    };

  /* =====================================================
     RETURN
  ===================================================== */

  return {
    wishlist:
      wishlist || [],

    isLoading,

    isError,

    wishlistCount:
      wishlist?.length ||
      0,

    isInWishlist,

    toggleWishlist,

    addToWishlist:
      addToWishlistMutation.mutate,

    removeFromWishlist:
      removeFromWishlistMutation.mutate,

    isAddingToWishlist:
      addToWishlistMutation.isPending,

    isRemovingFromWishlist:
      removeFromWishlistMutation.isPending,
  };
};

export default useWishlist;