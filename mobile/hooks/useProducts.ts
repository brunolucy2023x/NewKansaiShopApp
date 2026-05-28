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

const useProducts = () => {
  /* =====================================================
     QUERY
  ===================================================== */

  const result =
    useQuery<Product[]>({
      queryKey: [
        "products",
      ],

      queryFn:
        async () => {
          /* ===============================================
             GET PRODUCTS
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
              .order(
                "created_at",
                {
                  ascending:
                    false,
                }
              );

          /* ===============================================
             ERROR
          =============================================== */

          if (error)
            throw error;

          /* ===============================================
             RETURN
          =============================================== */

          return (
            data || []
          ) as Product[];
        },

      staleTime:
        1000 * 60 * 5,

      gcTime:
        1000 * 60 * 30,
    });

  return result;
};

export default useProducts;