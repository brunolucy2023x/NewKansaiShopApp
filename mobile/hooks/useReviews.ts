import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  supabase,
} from "@/lib/supabase";

import {
  useAuth,
} from "@clerk/clerk-expo";

/* =========================================================
   TYPES
========================================================= */

interface CreateReviewData {
  productId: string;

  orderId: string;

  rating: number;
}

/* =========================================================
   HOOK
========================================================= */

export const useReviews =
  () => {
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
       CREATE REVIEW
    ===================================================== */

    const createReview =
      useMutation({
        mutationFn:
          async ({
            productId,

            orderId,

            rating,
          }: CreateReviewData) => {
            /* ===============================================
               AUTH CHECK
            =============================================== */

            if (!userId) {
              throw new Error(
                "User not authenticated"
              );
            }

            /* ===============================================
               INSERT REVIEW
            =============================================== */

            const {
              error:
                reviewError,
            } =
              await supabase
                .from(
                  "reviews"
                )
                .insert({
                  product_id:
                    productId,

                  order_id:
                    orderId,

                  user_id:
                    userId,

                  rating,
                });

            if (
              reviewError
            )
              throw reviewError;

            /* ===============================================
               GET ALL REVIEWS
            =============================================== */

            const {
              data:
                reviews,
              error:
                reviewsError,
            } =
              await supabase
                .from(
                  "reviews"
                )
                .select(
                  "rating"
                )
                .eq(
                  "product_id",
                  productId
                );

            if (
              reviewsError
            )
              throw reviewsError;

            /* ===============================================
               CALCULATE STATS
            =============================================== */

            const totalReviews =
              reviews?.length ||
              0;

            const averageRating =
              totalReviews >
              0
                ? reviews.reduce(
                    (
                      sum,
                      review: any
                    ) =>
                      sum +
                      review.rating,

                    0
                  ) /
                  totalReviews
                : 0;

            /* ===============================================
               UPDATE PRODUCT
            =============================================== */

            const {
              error:
                updateError,
            } =
              await supabase
                .from(
                  "products"
                )
                .update({
                  averageRating:
                    Number(
                      averageRating.toFixed(
                        1
                      )
                    ),

                  totalReviews,
                })
                .eq(
                  "id",
                  productId
                );

            if (
              updateError
            )
              throw updateError;

            /* ===============================================
               MARK ORDER REVIEWED
            =============================================== */

            const {
              error:
                orderError,
            } =
              await supabase
                .from(
                  "orders"
                )
                .update({
                  hasReviewed:
                    true,
                })
                .eq(
                  "id",
                  orderId
                );

            if (
              orderError
            )
              throw orderError;

            return {
              success: true,
            };
          },

        /* ===============================================
           SUCCESS
        =============================================== */

        onSuccess: () => {
          queryClient.invalidateQueries(
            {
              queryKey: [
                "products",
              ],
            }
          );

          queryClient.invalidateQueries(
            {
              queryKey: [
                "product",
              ],
            }
          );

          queryClient.invalidateQueries(
            {
              queryKey: [
                "orders",
              ],
            }
          );
        },
      });

    /* =====================================================
       RETURN
    ===================================================== */

    return {
      isCreatingReview:
        createReview.isPending,

      createReviewAsync:
        createReview.mutateAsync,
    };
  };