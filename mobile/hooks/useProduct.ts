import {
  useQuery,
} from "@tanstack/react-query";

import {
  supabase,
} from "@/lib/supabase";

import {
  Product,
} from "@/types";

/* =========================================================
   HOOK
========================================================= */

export const useProduct = (
  productId: string
) => {
  /* =====================================================
     QUERY
  ===================================================== */

  const result =
    useQuery<Product>({
      queryKey: [
        "product",
        productId,
      ],

      enabled:
        !!productId,

      queryFn:
        async () => {
          /* ===============================================
             GET PRODUCT
          =============================================== */

          const {
            data,
            error,
          } =
            await supabase
              .from(
                "products"
              )
              .select(
                `
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
              `
              )
              .eq(
                "id",
                productId
              )
              .single();

          /* ===============================================
             ERROR
          =============================================== */

          if (error)
            throw error;

          /* ===============================================
             RETURN
          =============================================== */

          return data as Product;
        },
    });

  return result;
};