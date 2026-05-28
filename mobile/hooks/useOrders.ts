import {
  useQuery,
} from "@tanstack/react-query";

import {
  supabase,
} from "@/lib/supabase";

import {
  Order,
  OrderItem,
} from "@/types";

import {
  useAuth,
} from "@clerk/clerk-expo";

/* =========================================================
   HOOK
========================================================= */

export const useOrders =
  () => {
    /* =====================================================
       AUTH
    ===================================================== */

    const {
      userId,
    } = useAuth();

    /* =====================================================
       QUERY
    ===================================================== */

    return useQuery<
      Order[]
    >({
      queryKey: [
        "orders",
        userId,
      ],

      enabled:
        !!userId,

      queryFn:
        async () => {
          /* ===============================================
             GET ORDERS
          =============================================== */

          const {
            data,
            error,
          } =
            await supabase
              .from(
                "orders"
              )
              .select(
                `
              id,
              totalPrice,
              status,
              hasReviewed,
              shippingAddress,
              created_at,

              orderItems:order_items (
                id,
                name,
                price,
                quantity,
                image,

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
              )
            `
              )
              .eq(
                "user_id",
                userId
              )
              .order(
                "created_at",
                {
                  ascending:
                    false,
                }
              );

          if (error)
            throw error;

          /* ===============================================
             FORMAT DATA
          =============================================== */

          const orders: Order[] =
            (
              data || []
            ).map(
              (
                order: any
              ) => ({
                id: order.id,

                totalPrice:
                  order.totalPrice,

                status:
                  order.status,

                hasReviewed:
                  order.hasReviewed,

                shippingAddress:
                  order.shippingAddress,

                created_at:
                  order.created_at,

                orderItems:
                  (
                    order.orderItems ||
                    []
                  ).map(
                    (
                      item: any
                    ): OrderItem => ({
                      id: item.id,

                      name:
                        item.name,

                      price:
                        item.price,

                      quantity:
                        item.quantity,

                      image:
                        item.image,

                      product:
                        item.product,
                    })
                  ),
              })
            );

          return orders;
        },
    });
  };