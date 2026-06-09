// hooks/useCreateOrder.ts

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  useAuth,
} from "@clerk/clerk-expo";

import { supabase } from "@/lib/supabase";

import useCart from "@/hooks/useCart";

export interface CreateOrderPayload {
  shippingAddress: any;

  paymentMethod:
    | "cod"
    | "mpesa";

  mpesaPhone?: string;
}

const useCreateOrder = () => {
  const queryClient =
    useQueryClient();

  const { userId } =
    useAuth();

  const {
    cart,
    cartTotal,
    clearCart,
  } = useCart();

  const createOrderMutation =
    useMutation({
      mutationFn:
        async ({
          shippingAddress,
          paymentMethod,
          mpesaPhone,
        }: CreateOrderPayload) => {
          if (!userId) {
            throw new Error(
              "User not authenticated"
            );
          }

          if (
            !cart?.items?.length
          ) {
            throw new Error(
              "Cart is empty"
            );
          }

          const shipping =
            cartTotal >= 5000
              ? 0
              : 300;

          const total =
            cartTotal +
            shipping;

          const {
            data: order,
            error: orderError,
          } = await supabase
            .from("orders")
            .insert({
              user_id: userId,
              total_price: total,
              status: "pending",
              shipping_address:
                shippingAddress,
              order_items:
                cart.items.map(
                  (item) => ({
                    product_id:
                      item.product.id,
                    name:
                      item.product.name,
                    quantity:
                      item.quantity,
                    price:
                      item.product.price,
                    image:
                      item.product
                        .images?.[0] ?? null,
                  })
                ),
            })
            .select()
            .single();

          if (orderError) {
            throw orderError;
          }

          const orderItems =
            cart.items.map(
              (item) => ({
                order_id:
                  order.id,
                product_id:
                  item.product.id,
                name:
                  item.product.name,
                image:
                  item.product
                    .images?.[0] ?? null,
                quantity:
                  item.quantity,
                price:
                  item.product.price,
              })
            );

          const {
            error:
              orderItemsError,
          } = await supabase
            .from(
              "order_items"
            )
            .insert(
              orderItems
            );

          if (
            orderItemsError
          ) {
            throw orderItemsError;
          }

          console.log(
            "Payment Method:",
            paymentMethod
          );

          console.log(
            "M-Pesa Phone:",
            mpesaPhone
          );

          await new Promise(
            (
              resolve
            ) => {
              clearCart();

              setTimeout(
                resolve,
                500
              );
            }
          );

          return order;
        },

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "orders",
            ],
          }
        );

        queryClient.invalidateQueries(
          {
            queryKey: [
              "cart",
            ],
          }
        );
      },
    });

  return {
    createOrder:
      createOrderMutation.mutate,

    createOrderAsync:
      createOrderMutation.mutateAsync,

    isCreatingOrder:
      createOrderMutation.isPending,

    createOrderError:
      createOrderMutation.error,
  };
};

export default useCreateOrder;
