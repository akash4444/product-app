"use client";
import { ShoppingCart } from "lucide-react";
import useCartStore from "@/store/cartStore";

const CartIcon = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalQuantity = cartItems.length;

  return (
    <div className="relative flex items-center">
      <ShoppingCart className="w-6 h-6" />
      {totalQuantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {totalQuantity}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
