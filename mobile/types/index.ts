/* =========================================================
   PRODUCT
========================================================= */

export interface Product {
  id: string;

  name: string;

  description: string;

  price: number;

  stock: number;

  category: string;

  images: string[];

  averageRating: number;

  totalReviews: number;

  created_at?: string;
}

/* =========================================================
   USER
========================================================= */

export interface User {
  id: string;

  clerk_id?: string;

  email: string;

  first_name?: string;

  last_name?: string;

  image_url?: string;

  addresses?: Address[];

  wishlist?: string[];

  role?: string;

  created_at?: string;
}

/* =========================================================
   ADDRESS
========================================================= */

export interface Address {
  id?: string;

  label?: string;

  fullName: string;

  streetAddress: string;

  city: string;

  state: string;

  zipCode: string;

  phoneNumber: string;

  isDefault?: boolean;

  created_at?: string;
}

/* =========================================================
   ORDER ITEM
========================================================= */

export interface OrderItem {
  id: string;

  product?: Product;

  name: string;

  price: number;

  quantity: number;

  image: string;
}

/* =========================================================
   ORDER
========================================================= */

export interface Order {
  id: string;

  user?: string;

  clerk_id?: string;

  orderItems: OrderItem[];

  shippingAddress: {
    fullName: string;

    streetAddress: string;

    city: string;

    state: string;

    zipCode: string;

    phoneNumber: string;
  };

  paymentResult?: {
    id?: string;

    status?: string;
  };

  totalPrice: number;

  status:
    | "pending"
    | "paid"
    | "shipped"
    | "delivered";

  hasReviewed?: boolean;

  created_at?: string;
}

/* =========================================================
   REVIEW
========================================================= */

export interface Review {
  id: string;

  productId: string;

  userId: string | User;

  orderId: string;

  rating: number;

  created_at?: string;
}

/* =========================================================
   CART ITEM
========================================================= */

export interface CartItem {
  id: string;

  product: Product;

  quantity: number;
}

/* =========================================================
   CART
========================================================= */

export interface Cart {
  id?: string;

  user?: string;

  clerk_id?: string;

  items: CartItem[];

  created_at?: string;
}